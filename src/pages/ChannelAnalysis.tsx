import { ArrowLeft, Wifi, Radio, Signal, Users, Clock, Eye, AlertTriangle, BarChart3, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
const mockChannelData = [{
  channel: 1,
  band: '2.4GHz',
  networkCount: 4,
  utilization: 85,
  signalStrength: -45,
  noiseLevel: -92,
  channelWidth: 20,
  beaconActivity: 78,
  hiddenNetworks: 1,
  clientDensity: 12,
  throughput: 15.2,
  latency: 28,
  networks: [{
    ssid: 'HomeNet_2G',
    bssid: '00:11:22:33:44:55',
    security: 'WPA2',
    vendor: 'Netgear',
    signal: -45
  }, {
    ssid: 'Neighbor1',
    bssid: '00:11:22:33:44:56',
    security: 'WPA2',
    vendor: 'Linksys',
    signal: -67
  }, {
    ssid: 'xfinitywifi',
    bssid: '00:11:22:33:44:57',
    security: 'Open',
    vendor: 'Cisco',
    signal: -72
  }, {
    ssid: '',
    bssid: '00:11:22:33:44:58',
    security: 'WPA2',
    vendor: 'Unknown',
    signal: -78
  }]
}, {
  channel: 6,
  band: '2.4GHz',
  networkCount: 7,
  utilization: 92,
  signalStrength: -52,
  noiseLevel: -89,
  channelWidth: 20,
  beaconActivity: 95,
  hiddenNetworks: 2,
  clientDensity: 18,
  throughput: 8.7,
  latency: 45,
  networks: [{
    ssid: 'OfficeWifi',
    bssid: '00:22:33:44:55:66',
    security: 'WPA3',
    vendor: 'Asus',
    signal: -52
  }, {
    ssid: 'Guest_Network',
    bssid: '00:22:33:44:55:67',
    security: 'Open',
    vendor: 'TP-Link',
    signal: -58
  }, {
    ssid: 'Building_WiFi',
    bssid: '00:22:33:44:55:68',
    security: 'WPA2',
    vendor: 'Ubiquiti',
    signal: -64
  }]
}, {
  channel: 11,
  band: '2.4GHz',
  networkCount: 3,
  utilization: 65,
  signalStrength: -58,
  noiseLevel: -94,
  channelWidth: 20,
  beaconActivity: 52,
  hiddenNetworks: 0,
  clientDensity: 8,
  throughput: 22.1,
  latency: 18,
  networks: [{
    ssid: 'SmartHome_Net',
    bssid: '00:33:44:55:66:77',
    security: 'WPA3',
    vendor: 'Eero',
    signal: -58
  }, {
    ssid: 'IoT_Devices',
    bssid: '00:33:44:55:66:78',
    security: 'WPA2',
    vendor: 'Amazon',
    signal: -71
  }]
}, {
  channel: 36,
  band: '5GHz',
  networkCount: 2,
  utilization: 35,
  signalStrength: -41,
  noiseLevel: -98,
  channelWidth: 80,
  beaconActivity: 28,
  hiddenNetworks: 0,
  clientDensity: 5,
  throughput: 45.8,
  latency: 12,
  networks: [{
    ssid: 'HomeNet_5G',
    bssid: '00:44:55:66:77:88',
    security: 'WPA3',
    vendor: 'Netgear',
    signal: -41
  }, {
    ssid: 'Gaming_Network',
    bssid: '00:44:55:66:77:89',
    security: 'WPA2',
    vendor: 'Asus',
    signal: -63
  }]
}, {
  channel: 149,
  band: '5GHz',
  networkCount: 1,
  utilization: 15,
  signalStrength: -48,
  noiseLevel: -102,
  channelWidth: 160,
  beaconActivity: 12,
  hiddenNetworks: 0,
  clientDensity: 3,
  throughput: 67.3,
  latency: 8,
  networks: [{
    ssid: 'Premium_5G',
    bssid: '00:55:66:77:88:99',
    security: 'WPA3',
    vendor: 'Apple',
    signal: -48
  }]
}];
const getUtilizationColor = (utilization: number) => {
  if (utilization >= 80) return 'text-red-600';
  if (utilization >= 60) return 'text-yellow-600';
  return 'text-green-600';
};
const getChannelOverlap = (channel: number, band: string) => {
  if (band === '2.4GHz') {
    const overlappingChannels = [];
    if (channel > 1) overlappingChannels.push(channel - 1);
    if (channel < 11) overlappingChannels.push(channel + 1);
    return overlappingChannels;
  }
  return [];
};
const ChannelAnalysis = () => {
  const navigate = useNavigate();
  const utilizationData = mockChannelData.map(channel => ({
    channel: `Ch ${channel.channel}`,
    utilization: channel.utilization,
    networkCount: channel.networkCount
  }));
  const throughputData = mockChannelData.map(channel => ({
    channel: `Ch ${channel.channel}`,
    throughput: channel.throughput,
    latency: channel.latency
  }));
  return <div className="min-h-screen bg-background text-foreground">
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/')} className="mb-4">
            <ArrowLeft size={16} className="mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold">Advanced Channel Analysis</h1>
          <p className="text-muted-foreground">Comprehensive channel optimization and interference analysis</p>
        </div>

        {/* Channel Utilization Overview */}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 size={24} />
                Channel Utilization
              </CardTitle>
              <CardDescription>
                Percentage of time each channel is busy
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={utilizationData} onClick={data => {
                  if (data && data.activeLabel) {
                    const channelNum = data.activeLabel.replace('Ch ', '');
                    navigate(`/channel/${channelNum}`);
                  }
                }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="utilization" fill="hsl(var(--primary))" className="cursor-pointer" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={24} />
                Throughput & Latency
              </CardTitle>
              <CardDescription>
                Performance metrics per channel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={throughputData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="channel" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="throughput" stroke="hsl(var(--primary))" strokeWidth={2} />
                    <Line type="monotone" dataKey="latency" stroke="hsl(var(--secondary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Channel Analysis */}
        <div className="grid gap-6">
          {mockChannelData.map(channel => {
          const overlappingChannels = getChannelOverlap(channel.channel, channel.band);
          const utilizationColor = getUtilizationColor(channel.utilization);
          return <Card key={channel.channel} id={`channel-${channel.channel}`} className="bg-secondary/50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Radio size={24} />
                        Channel {channel.channel} ({channel.band})
                      </CardTitle>
                      <CardDescription>
                        {channel.networkCount} networks • {channel.channelWidth} MHz width
                      </CardDescription>
                    </div>
                    <Badge className={utilizationColor}>
                      {channel.utilization}% busy
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Key Metrics Grid */}
                  <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Signal size={20} className="mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Signal</div>
                      <div className="font-semibold">{channel.signalStrength} dBm</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <AlertTriangle size={20} className="mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Noise</div>
                      <div className="font-semibold">{channel.noiseLevel} dBm</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Activity size={20} className="mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Beacon Activity</div>
                      <div className="font-semibold">{channel.beaconActivity}%</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Users size={20} className="mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Clients</div>
                      <div className="font-semibold">{channel.clientDensity}</div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <Clock size={20} className="mx-auto mb-1" />
                      <div className="text-sm text-muted-foreground">Latency</div>
                      <div className="font-semibold">{channel.latency} ms</div>
                    </div>
                  </div>

                  {/* Channel Overlap Information */}
                  {overlappingChannels.length > 0 && <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 mx-0 my-[6px] py-px">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle size={16} className="text-yellow-600" />
                        <span className="font-medium text-yellow-800 dark:text-yellow-300">Channel Overlap Detected</span>
                      </div>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        This channel overlaps with channels: {overlappingChannels.join(', ')}
                      </p>
                    </div>}

                  {/* Hidden Networks Alert */}
                  {channel.hiddenNetworks > 0 && <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 py-px px-[9px] my-[6px]">
                      <div className="flex items-center gap-2">
                        <Eye size={16} className="text-blue-600" />
                        <span className="font-medium text-blue-800 dark:text-blue-300">
                          {channel.hiddenNetworks} hidden network(s) detected
                        </span>
                      </div>
                    </div>}

                  {/* Access Points on this Channel */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Wifi size={18} />
                      Access Points on Channel {channel.channel}
                    </h4>
                    <div className="space-y-2">
                      {channel.networks.map((network, idx) => <div key={idx} className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                          <div>
                            <div className="font-medium">
                              {network.ssid || <span className="italic text-muted-foreground">Hidden Network</span>}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {network.bssid} • {network.vendor} • {network.security}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">{network.signal} dBm</div>
                          </div>
                        </div>)}
                    </div>
                  </div>
                </CardContent>
              </Card>;
        })}
        </div>

        {/* Recommendations */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle size={24} />
              Channel Optimization Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="font-medium text-green-800 dark:text-green-300">Best 2.4GHz Channel: 11</div>
                <div className="text-sm text-green-700 dark:text-green-400">
                  Lowest utilization (65%) with good signal quality and minimal interference
                </div>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="font-medium text-green-800 dark:text-green-300">Best 5GHz Channel: 149</div>
                <div className="text-sm text-green-700 dark:text-green-400">
                  Ultra-low utilization (15%) with 160MHz width support and excellent throughput
                </div>
              </div>
              <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="font-medium text-red-800 dark:text-red-300">Avoid Channel 6</div>
                <div className="text-sm text-red-700 dark:text-red-400">
                  Heavily congested (92% utilization) with 7 competing networks and high latency
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
};
export default ChannelAnalysis;