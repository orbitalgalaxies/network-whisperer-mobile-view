
import { Bluetooth, Watch, Headphones } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const mockBluetoothDevices = [
  { name: 'My Smartwatch', type: 'watch', rssi: -60 },
  { name: 'Wireless Buds', type: 'headphones', rssi: -55 },
  { name: 'Unknown Device', type: null, rssi: -82 },
];

const getIcon = (type: string | null) => {
  switch (type) {
    case 'watch':
      return <Watch className="text-muted-foreground" />;
    case 'headphones':
      return <Headphones className="text-muted-foreground" />;
    default:
      return <Bluetooth className="text-muted-foreground" />;
  }
};

const BluetoothScanner = () => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent-foreground">
          <Bluetooth size={20} />
          Nearby Bluetooth Devices
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockBluetoothDevices.map((dev) => (
          <div key={dev.name} className="flex items-center justify-between p-3 rounded-lg bg-secondary">
            <div className="flex items-center gap-3">
              {getIcon(dev.type)}
              <span className="font-semibold">{dev.name}</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span>{dev.rssi} dBm</span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BluetoothScanner;
