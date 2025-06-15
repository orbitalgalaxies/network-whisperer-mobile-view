
import { Network, Upload, Download, Laptop, Smartphone, Tv2, Server } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge, badgeVariants } from '@/components/ui/badge';
import { VariantProps } from 'class-variance-authority';

const mockPacketData = [
  { id: 1, timestamp: '15:34:01.123', source: '192.168.1.10:54321', destination: '104.18.32.227:443', protocol: 'TCP', length: 124, info: 'HTTPS Handshake' },
  { id: 2, timestamp: '15:34:01.256', source: '10.0.0.5:123', destination: '216.239.35.4:123', protocol: 'UDP', length: 76, info: 'NTP Query' },
  { id: 3, timestamp: '15:34:01.301', source: '192.168.1.1', destination: '192.168.1.10', protocol: 'ICMP', length: 98, info: 'Echo (ping) reply' },
  { id: 4, timestamp: '15:34:02.048', source: '192.168.1.10:54322', destination: '172.217.16.46:80', protocol: 'TCP', length: 66, info: '[SYN] Seq=0 Win=64240' },
  { id: 5, timestamp: '15:34:02.199', source: '8.8.8.8:53', destination: '192.168.1.10:61345', protocol: 'DNS', length: 153, info: 'Standard query response 0x1234 A lovable.dev' },
  { id: 6, timestamp: '15:34:02.450', source: '192.168.1.10:54321', destination: '104.18.32.227:443', protocol: 'TLSv1.3', length: 512, info: 'Application Data' },
  { id: 7, timestamp: '15:34:03.112', source: '192.168.1.10:1900', destination: '239.255.255.250:1900', protocol: 'SSDP', length: 345, info: 'M-SEARCH * HTTP/1.1' },
];

const getProtocolBadgeVariant = (protocol: string): VariantProps<typeof badgeVariants>['variant'] => {
  switch (protocol.toUpperCase()) {
    case 'TCP':
    case 'TLSV1.3':
      return 'default';
    case 'UDP':
    case 'DNS':
    case 'SSDP':
      return 'secondary';
    case 'ICMP':
      return 'destructive';
    default:
      return 'outline';
  }
};

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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network size={20} />
            Traffic Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] hidden sm:table-cell">Time</TableHead>
                <TableHead>Source</TableHead>
                <TableHead className="hidden md:table-cell">Destination</TableHead>
                <TableHead>Protocol</TableHead>
                <TableHead className="hidden lg:table-cell">Length</TableHead>
                <TableHead>Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockPacketData.map((packet) => (
                <TableRow key={packet.id}>
                  <TableCell className="font-mono text-xs hidden sm:table-cell">{packet.timestamp}</TableCell>
                  <TableCell className="font-mono text-xs">{packet.source}</TableCell>
                  <TableCell className="font-mono text-xs hidden md:table-cell">{packet.destination}</TableCell>
                  <TableCell>
                    <Badge variant={getProtocolBadgeVariant(packet.protocol)}>
                      {packet.protocol}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{packet.length}</TableCell>
                  <TableCell className="text-xs truncate max-w-[150px] sm:max-w-xs">{packet.info}</TableCell>
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
