
import { Wifi, BarChart2, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockWifiNetworks = [
  { ssid: 'HomeNetwork_5G', signal: -45, security: 'WPA2', channel: 149, channelWidth: 80 },
  { ssid: 'xfinitywifi', signal: -67, security: 'Open', channel: 6, channelWidth: 20 },
  { ssid: 'NeighborNet', signal: -78, security: 'WPA2/WPA3', channel: 11, channelWidth: 20 },
  { ssid: 'MyPhone_Hotspot', signal: -52, security: 'WPA3', channel: 44, channelWidth: 40 },
  { ssid: 'AnotherNet_2.4G', signal: -85, security: 'WPA2', channel: 6, channelWidth: 20 },
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
}

const WifiScanner = () => {
    const { best2_4, best5 } = getChannelRecommendation(mockWifiNetworks);

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
                                <TableHead>Security</TableHead>
                                <TableHead>Signal (dBm)</TableHead>
                                <TableHead>Channel</TableHead>
                                <TableHead>Width (MHz)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockWifiNetworks.sort((a, b) => b.signal - a.signal).map((net) => (
                                <TableRow key={net.ssid}>
                                    <TableCell className="font-semibold">{net.ssid}</TableCell>
                                    <TableCell>{net.security}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-primary">
                                            <BarChart2 size={16} />
                                            {net.signal}
                                        </div>
                                    </TableCell>
                                    <TableCell>{net.channel}</TableCell>
                                    <TableCell>{net.channelWidth}</TableCell>
                                </TableRow>
                            ))}
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
