import React, { useState } from 'react';
import { Bluetooth, Watch, Headphones, Lightbulb, BarChart2, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const mockBluetoothDevices = [
  { name: 'My Smartwatch', type: 'watch', rssi: -60, macAddress: 'C0:27:15:3A:B1:FF', technology: 'BLE', paired: true, manufacturer: 'Fitbit', services: ['Heart Rate', 'Battery Service', 'Device Information'] },
  { name: 'Wireless Buds', type: 'headphones', rssi: -55, macAddress: '88:4A:E3:B2:C4:01', technology: 'Classic', paired: true, manufacturer: 'Sony', services: ['A2DP Sink', 'AVRCP Target'] },
  { name: 'Smart Lightbulb', type: 'iot', rssi: -75, macAddress: 'A0:B1:C2:D3:E4:F5', technology: 'BLE', paired: false, manufacturer: 'Philips', services: ['Generic Access', 'Generic Attribute', 'Light Control'] },
  { name: 'Unknown Device', type: null, rssi: -82, macAddress: 'F1:D2:E3:C4:B5:A6', technology: 'BLE', paired: false, manufacturer: 'Unknown', services: ['00001800-0000-1000-8000-00805f9b34fb'] },
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
  const [expandedRows, setExpandedRows] = useState<string[]>([]);

  const toggleRow = (macAddress: string) => {
    setExpandedRows(current =>
      current.includes(macAddress)
        ? current.filter(mac => mac !== macAddress)
        : [...current, macAddress]
    );
  };

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
              <TableHead className="w-16 text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockBluetoothDevices.sort((a,b) => b.rssi - a.rssi).map((dev) => (
              <React.Fragment key={dev.macAddress}>
                <TableRow>
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
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => toggleRow(dev.macAddress)}>
                       {expandedRows.includes(dev.macAddress) ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                       <span className="sr-only">Toggle Details</span>
                    </Button>
                  </TableCell>
                </TableRow>
                {expandedRows.includes(dev.macAddress) && (
                  <TableRow className="bg-muted/20 hover:bg-muted/20">
                    <TableCell colSpan={6} className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-semibold text-muted-foreground">Manufacturer</p>
                          <p>{dev.manufacturer}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-muted-foreground">Paired Status</p>
                          <p>{dev.paired ? 'Yes' : 'No'}</p>
                        </div>
                        <div className="md:col-span-3">
                          <p className="font-semibold text-muted-foreground">Advertised Services</p>
                          <ul className="list-disc list-inside mt-1 space-y-1">
                            {dev.services.map(service => <li key={service} className="font-mono text-xs">{service}</li>)}
                          </ul>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default BluetoothScanner;
