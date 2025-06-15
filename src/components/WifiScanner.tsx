
import { Wifi, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockWifiNetworks = [
  { ssid: 'HomeNetwork_5G', signal: -45, security: 'WPA2' },
  { ssid: 'xfinitywifi', signal: -67, security: 'Open' },
  { ssid: 'NeighborNet', signal: -78, security: 'WPA2/WPA3' },
  { ssid: 'MyPhone_Hotspot', signal: -52, security: 'WPA3' },
];

const WifiScanner = () => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent-foreground">
          <Wifi size={20} />
          Available Wi-Fi Networks
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockWifiNetworks.map((net) => (
          <div key={net.ssid} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
            <div className="flex flex-col">
              <span className="font-semibold">{net.ssid}</span>
              <span className="text-sm text-muted-foreground">{net.security}</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <BarChart2 size={20} />
              <span>{net.signal} dBm</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default WifiScanner;
