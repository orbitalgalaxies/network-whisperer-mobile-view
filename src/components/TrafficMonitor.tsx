
import { Network } from 'lucide-react';
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


const TrafficMonitor = () => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent-foreground">
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
  );
};

export default TrafficMonitor;
