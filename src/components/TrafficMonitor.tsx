import { Upload, Download, Laptop, Smartphone, Tv2, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const mockConnectedDevices = [
  { id: 1, name: 'Desktop-PC', ip: '192.168.1.5', mac: '00:1B:63:84:45:E6', connection: 'Ethernet', type: 'desktop' },
  { id: 2, name: 'My-iPhone', ip: '192.168.1.12', mac: '34:12:98:C7:B6:A2', connection: 'Wi-Fi', type: 'smartphone' },
  { id: 3, name: 'Living-Room-TV', ip: '192.168.1.9', mac: 'F8:E4:3B:9A:2C:11', connection: 'Wi-Fi', type: 'tv' },
  { id: 4, name: 'Home-Server', ip: '192.168.1.2', mac: 'B2:A1:C9:8D:4F:5E', connection: 'Ethernet', type: 'server' },
];

const getDeviceIcon = (type: string) => {
  switch (type) {
    case 'desktop':
      return <Laptop className="h-5 w-5 text-muted-foreground" />;
    case 'smartphone':
      return <Smartphone className="h-5 w-5 text-muted-foreground" />;
    case 'tv':
      return <Tv2 className="h-5 w-5 text-muted-foreground" />;
    case 'server':
      return <Server className="h-5 w-5 text-muted-foreground" />;
    default:
      return <Laptop className="h-5 w-5 text-muted-foreground" />;
  }
};


const TrafficMonitor = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upload Speed</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.7 Mbps</div>
            <p className="text-xs text-muted-foreground">Real-time upload bandwidth</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Download Speed</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.2 Mbps</div>
            <p className="text-xs text-muted-foreground">Real-time download bandwidth</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Connected Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Device Name</TableHead>
                <TableHead>IP Address</TableHead>
                <TableHead className="hidden sm:table-cell">MAC Address</TableHead>
                <TableHead>Connection</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockConnectedDevices.map((device) => (
                <TableRow key={device.id}>
                  <TableCell>{getDeviceIcon(device.type)}</TableCell>
                  <TableCell className="font-medium">{device.name}</TableCell>
                  <TableCell>{device.ip}</TableCell>
                  <TableCell className="font-mono text-xs hidden sm:table-cell">{device.mac}</TableCell>
                  <TableCell>
                    <Badge variant={device.connection === 'Wi-Fi' ? 'default' : 'secondary'}>
                      {device.connection}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrafficMonitor;
