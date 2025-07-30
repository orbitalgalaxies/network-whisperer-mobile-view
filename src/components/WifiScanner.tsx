import { Wifi, BarChart2, Star, Activity, Radio, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

const mockWifiNetworks = [
  { 
    ssid: 'HomeNetwork_5G', 
    signal: -45, 
    security: 'WPA2', 
    channel: 149, 
    channelWidth: 80, 
    snr: 35, 
    noiseFloor: -95, 
    ber: 0.001, 
    mcs: 11, 
    cqi: 14, 
    rsrq: -8 
  },
  { 
    ssid: 'xfinitywifi', 
    signal: -67, 
    security: 'Open', 
    channel: 6, 
    channelWidth: 20, 
    snr: 22, 
    noiseFloor: -92, 
    ber: 0.01, 
    mcs: 7, 
    cqi: 9, 
    rsrq: -12 
  },
  { 
    ssid: 'NeighborNet', 
    signal: -78, 
    security: 'WPA2/WPA3', 
    channel: 11, 
    channelWidth: 20, 
    snr: 15, 
    noiseFloor: -93, 
    ber: 0.05, 
    mcs: 4, 
    cqi: 6, 
    rsrq: -15 
  },
  { 
    ssid: 'MyPhone_Hotspot', 
    signal: -52, 
    security: 'WPA3', 
    channel: 44, 
    channelWidth: 40, 
    snr: 28, 
    noiseFloor: -94, 
    ber: 0.005, 
    mcs: 9, 
    cqi: 12, 
    rsrq: -10 
  },
  { 
    ssid: 'AnotherNet_2.4G', 
    signal: -85, 
    security: 'WPA2', 
    channel: 6, 
    channelWidth: 20, 
    snr: 8, 
    noiseFloor: -93, 
    ber: 0.1, 
    mcs: 2, 
    cqi: 3, 
    rsrq: -18 
  },
];

const signalHistory = [
  { time: '30s', HomeNetwork_5G: -48, xfinitywifi: -65, MyPhone_Hotspot: -55 },
  { time: '25s', HomeNetwork_5G: -46, xfinitywifi: -66, MyPhone_Hotspot: -53 },
  { time: '20s', HomeNetwork_5G: -47, xfinitywifi: -68, MyPhone_Hotspot: -54 },
  { time: '15s', HomeNetwork_5G: -45, xfinitywifi: -67, MyPhone_Hotspot: -52 },
  { time: '10s', HomeNetwork_5G: -46, xfinitywifi: -65, MyPhone_Hotspot: -51 },
  { time: '5s', HomeNetwork_5G: -45, xfinitywifi: -67, MyPhone_Hotspot: -52 },
  { time: 'now', HomeNetwork_5G: -45, xfinitywifi: -67, MyPhone_Hotspot: -52 },
];

const getChannelRecommendation = (networks: typeof mockWifiNetworks) => {
    const channelsInUse2_4 = new Set<number>();
    const channelsInUse5 = new Set<number>();

    networks.forEach(net => {
        if (net.channel <= 13) {
            channelsInUse2_4.add(net.channel);
        } else {
            channelsInUse5.add(net.channel);
        }
    });

    const best2_4 = [1, 6, 11].find(ch => !channelsInUse2_4.has(ch));
    const fiveGhzChannels = [36, 40, 44, 48, 149, 153, 157, 161];
    const best5 = fiveGhzChannels.find(ch => !channelsInUse5.has(ch));

    return { best2_4, best5 };
};

const getChannelUsage = (networks: typeof mockWifiNetworks) => {
    const channelCounts = networks.reduce((acc, net) => {
        acc[net.channel] = (acc[net.channel] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    return Object.entries(channelCounts)
        .map(([channel, count]) => ({
            channel: `Ch ${channel}`,
            networks: count,
        }))
        .sort((a, b) => parseInt(a.channel.slice(3)) - parseInt(b.channel.slice(3)));
};

const getSignalQuality = (snr: number) => {
    if (snr >= 30) return { quality: 'Excellent', color: 'text-green-600' };
    if (snr >= 20) return { quality: 'Good', color: 'text-blue-600' };
    if (snr >= 10) return { quality: 'Fair', color: 'text-yellow-600' };
    return { quality: 'Poor', color: 'text-red-600' };
};

const getBERQuality = (ber: number) => {
    if (ber <= 0.001) return { quality: 'Excellent', color: 'text-green-600' };
    if (ber <= 0.01) return { quality: 'Good', color: 'text-blue-600' };
    if (ber <= 0.05) return { quality: 'Fair', color: 'text-yellow-600' };
    return { quality: 'Poor', color: 'text-red-600' };
};

const getCQIQuality = (cqi: number) => {
    if (cqi >= 12) return { quality: 'Excellent', color: 'text-green-600' };
    if (cqi >= 8) return { quality: 'Good', color: 'text-blue-600' };
    if (cqi >= 5) return { quality: 'Fair', color: 'text-yellow-600' };
    return { quality: 'Poor', color: 'text-red-600' };
};

const WifiScanner = () => {
    const { best2_4, best5 } = getChannelRecommendation(mockWifiNetworks);
    const channelUsageData = getChannelUsage(mockWifiNetworks);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Wifi size={24} />
                        Available Wi-Fi Networks
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>SSID</TableHead>
                                <TableHead>Signal (dBm)</TableHead>
                                <TableHead>SNR (dB)</TableHead>
                                <TableHead>Channel</TableHead>
                                <TableHead className="hidden md:table-cell">Security</TableHead>
                                <TableHead className="hidden lg:table-cell">MCS</TableHead>
                                <TableHead className="hidden xl:table-cell">CQI</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockWifiNetworks.sort((a, b) => b.signal - a.signal).map((net) => {
                                const snrQuality = getSignalQuality(net.snr);
                                const cqiQuality = getCQIQuality(net.cqi);
                                return (
                                    <TableRow key={net.ssid}>
                                        <TableCell className="font-semibold">{net.ssid}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-primary">
                                                <BarChart2 size={16} />
                                                {net.signal}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className={snrQuality.color}>{net.snr}</span>
                                                <span className={`text-xs ${snrQuality.color}`}>({snrQuality.quality})</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{net.channel}</TableCell>
                                        <TableCell className="hidden md:table-cell">{net.security}</TableCell>
                                        <TableCell className="hidden lg:table-cell">{net.mcs}</TableCell>
                                        <TableCell className="hidden xl:table-cell">
                                            <div className="flex items-center gap-1">
                                                <span className={cqiQuality.color}>{net.cqi}</span>
                                                <span className={`text-xs ${cqiQuality.color}`}>({cqiQuality.quality})</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart2 size={24} />
                        Signal Strength History
                    </CardTitle>
                    <CardDescription>
                        Signal strength (dBm) of the strongest networks over the last 30 seconds.
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={signalHistory}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} domain={[-90, -30]} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                }}
                            />
                            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
                            <Line type="monotone" dataKey="HomeNetwork_5G" stroke="#8884d8" name="HomeNetwork_5G" dot={false} />
                            <Line type="monotone" dataKey="MyPhone_Hotspot" stroke="#82ca9d" name="MyPhone_Hotspot" dot={false} />
                            <Line type="monotone" dataKey="xfinitywifi" stroke="#ffc658" name="xfinitywifi" dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart2 size={24} />
                        Channel Usage
                    </CardTitle>
                    <CardDescription>
                        Number of networks found on each channel.
                    </CardDescription>
                </CardHeader>
                <CardContent className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={channelUsageData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                            <XAxis dataKey="channel" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} allowDecimals={false} width={30} />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background))',
                                    borderColor: 'hsl(var(--border))',
                                    borderRadius: 'var(--radius)',
                                }}
                                cursor={{fill: 'hsl(var(--muted))'}}
                            />
                            <Bar dataKey="networks" fill="hsl(var(--primary))" name="# of Networks" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Activity size={24} />
                        Advanced Signal Quality Metrics
                    </CardTitle>
                    <CardDescription>
                        Professional-grade signal analysis for network optimization.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {mockWifiNetworks.slice(0, 3).map((net) => {
                            const snrQuality = getSignalQuality(net.snr);
                            const berQuality = getBERQuality(net.ber);
                            const cqiQuality = getCQIQuality(net.cqi);
                            
                            return (
                                <Card key={net.ssid} className="bg-secondary/50">
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-lg">{net.ssid}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">SNR:</span>
                                            <span className={`font-semibold ${snrQuality.color}`}>{net.snr} dB</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">Noise Floor:</span>
                                            <span className="font-semibold">{net.noiseFloor} dBm</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">BER:</span>
                                            <span className={`font-semibold ${berQuality.color}`}>{net.ber.toFixed(3)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">MCS Index:</span>
                                            <span className="font-semibold">{net.mcs}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">CQI:</span>
                                            <span className={`font-semibold ${cqiQuality.color}`}>{net.cqi}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm text-muted-foreground">RSRQ:</span>
                                            <span className="font-semibold">{net.rsrq} dB</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <Radio size={18} />
                            Quality Metrics Guide
                        </h4>
                        <div className="grid gap-2 md:grid-cols-2 text-sm">
                            <div>
                                <strong>SNR (Signal-to-Noise Ratio):</strong>
                                <div className="text-muted-foreground">
                                    • 30+ dB: Excellent<br/>
                                    • 20-29 dB: Good<br/>
                                    • 10-19 dB: Fair<br/>
                                    • &lt;10 dB: Poor
                                </div>
                            </div>
                            <div>
                                <strong>BER (Bit Error Rate):</strong>
                                <div className="text-muted-foreground">
                                    • ≤0.001: Excellent<br/>
                                    • ≤0.01: Good<br/>
                                    • ≤0.05: Fair<br/>
                                    • &gt;0.05: Poor
                                </div>
                            </div>
                            <div>
                                <strong>CQI (Channel Quality):</strong>
                                <div className="text-muted-foreground">
                                    • 12-15: Excellent<br/>
                                    • 8-11: Good<br/>
                                    • 5-7: Fair<br/>
                                    • 1-4: Poor
                                </div>
                            </div>
                            <div>
                                <strong>Noise Floor:</strong>
                                <div className="text-muted-foreground">
                                    Typical: -90 to -100 dBm<br/>
                                    Lower values indicate<br/>
                                    less ambient noise
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Star size={24} />
                        Best Channel Recommendation
                    </CardTitle>
                    <CardDescription>
                        Recommended channels for setting up a new access point for minimal interference.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg bg-secondary">
                        <h4 className="font-semibold text-lg">2.4 GHz Band</h4>
                        <p className="text-3xl font-bold text-primary">{best2_4 || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">Channel {best2_4} seems to be the least crowded.</p>
                    </div>
                    <div className="p-4 rounded-lg bg-secondary">
                        <h4 className="font-semibold text-lg">5 GHz Band</h4>
                        <p className="text-3xl font-bold text-primary">{best5 || 'N/A'}</p>
                        <p className="text-sm text-muted-foreground">Channel {best5} is a good option.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default WifiScanner;
