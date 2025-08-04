import { ArrowLeft, Wifi, Radio, Signal, Users, Clock, Eye, AlertTriangle, BarChart3, Activity, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const mockChannelData = {
  '1': { 
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
    networks: [
      { ssid: 'HomeNet_2G', bssid: '00:11:22:33:44:55', security: 'WPA2', vendor: 'Netgear', signal: -45 },
      { ssid: 'Neighbor1', bssid: '00:11:22:33:44:56', security: 'WPA2', vendor: 'Linksys', signal: -67 },
      { ssid: 'xfinitywifi', bssid: '00:11:22:33:44:57', security: 'Open', vendor: 'Cisco', signal: -72 },
      { ssid: '', bssid: '00:11:22:33:44:58', security: 'WPA2', vendor: 'Unknown', signal: -78 }
    ]
  },
  '6': { 
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
    networks: [
      { ssid: 'OfficeWifi', bssid: '00:22:33:44:55:66', security: 'WPA3', vendor: 'Asus', signal: -52 },
      { ssid: 'Guest_Network', bssid: '00:22:33:44:55:67', security: 'Open', vendor: 'TP-Link', signal: -58 },
      { ssid: 'Building_WiFi', bssid: '00:22:33:44:55:68', security: 'WPA2', vendor: 'Ubiquiti', signal: -64 }
    ]
  },
  '11': { 
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
    networks: [
      { ssid: 'SmartHome_Net', bssid: '00:33:44:55:66:77', security: 'WPA3', vendor: 'Eero', signal: -58 },
      { ssid: 'IoT_Devices', bssid: '00:33:44:55:66:78', security: 'WPA2', vendor: 'Amazon', signal: -71 }
    ]
  },
  '36': { 
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
    networks: [
      { ssid: 'HomeNet_5G', bssid: '00:44:55:66:77:88', security: 'WPA3', vendor: 'Netgear', signal: -41 },
      { ssid: 'Gaming_Network', bssid: '00:44:55:66:77:89', security: 'WPA2', vendor: 'Asus', signal: -63 }
    ]
  },
  '149': { 
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
    networks: [
      { ssid: 'Premium_5G', bssid: '00:55:66:77:88:99', security: 'WPA3', vendor: 'Apple', signal: -48 }
    ]
  }
};

const getUtilizationColor = (utilization: number) => {
  if (utilization >= 80) return 'text-red-600';
  if (utilization >= 60) return 'text-yellow-600';
  return 'text-green-600';
};

const ChannelDetail = () => {
  const navigate = useNavigate();
  const { channelId } = useParams();
  const [metricsExpanded, setMetricsExpanded] = useState(true);
  
  const channel = mockChannelData[channelId as keyof typeof mockChannelData];
  
  if (!channel) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Channel Not Found</h1>
          <Button onClick={() => navigate('/channel-analysis')}>
            Back to Channel Analysis
          </Button>
        </div>
      </div>
    );
  }

  const utilizationColor = getUtilizationColor(channel.utilization);
  
  // Mock historical data for this channel
  const historicalData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    utilization: Math.max(10, channel.utilization + (Math.random() - 0.5) * 20),
    throughput: Math.max(1, channel.throughput + (Math.random() - 0.5) * 10),
    latency: Math.max(5, channel.latency + (Math.random() - 0.5) * 20)
  }));

  const securityData = [
    { name: 'WPA3', value: channel.networks.filter(n => n.security === 'WPA3').length, color: '#22c55e' },
    { name: 'WPA2', value: channel.networks.filter(n => n.security === 'WPA2').length, color: '#3b82f6' },
    { name: 'Open', value: channel.networks.filter(n => n.security === 'Open').length, color: '#ef4444' }
  ].filter(item => item.value > 0);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="p-4 md:p-6">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/channel-analysis')}
            className="mb-4"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Channel Analysis
          </Button>
          <h1 className="text-3xl font-bold">Channel {channel.channel} Details</h1>
          <p className="text-muted-foreground">
            {channel.band} • {channel.channelWidth} MHz • {channel.networkCount} networks
          </p>
        </div>

        {/* Channel Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Radio size={24} />
                  Channel {channel.channel} ({channel.band})
                </CardTitle>
                <CardDescription>
                  Real-time channel performance and interference analysis
                </CardDescription>
              </div>
              <Badge className={utilizationColor}>
                {channel.utilization}% busy
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
          <Collapsible 
            open={metricsExpanded}
            onOpenChange={setMetricsExpanded}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Channel Metrics</span>
                <ChevronDown 
                  size={16} 
                  className={`transition-transform ${
                    metricsExpanded ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6 mt-4">
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
                  <BarChart3 size={20} className="mx-auto mb-1" />
                  <div className="text-sm text-muted-foreground">Throughput</div>
                  <div className="font-semibold">{channel.throughput} Mbps</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <Clock size={20} className="mx-auto mb-1" />
                  <div className="text-sm text-muted-foreground">Latency</div>
                  <div className="font-semibold">{channel.latency} ms</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          </CardContent>
        </Card>

        {/* Historical Performance */}
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>24-Hour Utilization Trend</CardTitle>
              <CardDescription>Channel usage over the past 24 hours</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="utilization" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Distribution</CardTitle>
              <CardDescription>Security protocols used by networks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={securityData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {securityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Network Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wifi size={18} />
              Networks on Channel {channel.channel}
            </CardTitle>
            <CardDescription>
              Detailed information about all detected access points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {channel.networks.map((network, idx) => (
                <div key={idx} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-lg">
                      {network.ssid || <span className="italic text-muted-foreground">Hidden Network</span>}
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>BSSID: {network.bssid}</div>
                      <div className="flex gap-4">
                        <span>Vendor: {network.vendor}</span>
                        <span>Security: {network.security}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">{network.signal} dBm</div>
                    <div className="text-sm text-muted-foreground">Signal Strength</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        {channel.hiddenNetworks > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-600">
                <Eye size={20} />
                Hidden Network Alert
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700 dark:text-blue-400">
                {channel.hiddenNetworks} hidden network(s) detected on this channel. 
                These networks don't broadcast their SSID but still consume airtime.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ChannelDetail;