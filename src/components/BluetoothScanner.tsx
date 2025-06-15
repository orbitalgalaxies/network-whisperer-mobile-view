
import { Bluetooth, Watch, Headphones, Lightbulb, BarChart2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockBluetoothDevices = [
  { name: 'My Smartwatch', type: 'watch', rssi: -60, macAddress: 'C0:27:15:3A:B1:FF', technology: 'BLE' },
  { name: 'Wireless Buds', type: 'headphones', rssi: -55, macAddress: '88:4A:E3:B2:C4:01', technology: 'Classic' },
  { name: 'Smart Lightbulb', type: 'iot', rssi: -75, macAddress: 'A0:B1:C2:D3:E4:F5', technology: 'BLE' },
  { name: 'Unknown Device', type: null, rssi: -82, macAddress: 'F1:D2:E3:C4:B5:A6', technology: 'BLE' },
];

const getIcon = (type: string | null) => {
  switch (type) {
    case 'watch':
      return <Watch className="text-muted-foreground" />;
    case 'headphones':
      return <Headphones className="text-muted-foreground" />;
    case 'iot':
      return <Lightbulb className="text-muted-foreground" />;
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
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Device Name</TableHead>
              <TableHead>MAC Address</TableHead>
              <TableHead>Technology</TableHead>
              <TableHead>Signal (RSSI)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBluetoothDevices.sort((a,b) => b.rssi - a.rssi).map((dev) => (
              <TableRow key={dev.name}>
                <TableCell>{getIcon(dev.type)}</TableCell>
                <TableCell className="font-semibold">{dev.name}</TableCell>
                <TableCell className="font-mono text-xs">{dev.macAddress}</TableCell>
                <TableCell>
                  <Badge variant={dev.technology === 'BLE' ? 'default' : 'secondary'}>
                    {dev.technology}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 text-primary">
                    <BarChart2 size={16} />
                    {dev.rssi} dBm
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BluetoothScanner;
