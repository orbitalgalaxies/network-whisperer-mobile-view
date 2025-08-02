import { Upload, Download, Laptop, Smartphone, Tv2, Server, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockConnectedDevices = [
  { id: 1, name: 'Desktop-PC', ip: '192.168.1.5', mac: '00:1B:63:84:45:E6', connection: 'Ethernet', type: 'desktop' },
  { id: 2, name: 'My-iPhone', ip: '192.168.1.12', mac: '34:12:98:C7:B6:A2', connection: 'Wi-Fi', type: 'smartphone' },
  { id: 3, name: 'Living-Room-TV', ip: '192.168.1.9', mac: 'F8:E4:3B:9A:2C:11', connection: 'Wi-Fi', type: 'tv' },
  { id: 4, name: 'Home-Server', ip: '192.168.1.2', mac: 'B2:A1:C9:8D:4F:5E', connection: 'Ethernet', type: 'server' },
];

// Traffic data with spikes and downfalls for anomaly detection
const trafficHistory = [
  { time: '60s', upload: 12.3, download: 85.4, anomaly: false },
  { time: '55s', upload: 14.1, download: 89.2, anomaly: false },
  { time: '50s', upload: 13.8, download: 87.1, anomaly: false },
  { time: '45s', upload: 2.1, download: 15.3, anomaly: true }, // Downfall
  { time: '40s', upload: 3.2, download: 23.7, anomaly: true },
  { time: '35s', upload: 11.9, download: 82.5, anomaly: false },
  { time: '30s', upload: 15.2, download: 88.9, anomaly: false },
  { time: '25s', upload: 45.8, download: 156.3, anomaly: true }, // Spike
  { time: '20s', upload: 38.2, download: 142.1, anomaly: true },
  { time: '15s', upload: 16.4, download: 91.2, anomaly: false },
  { time: '10s', upload: 14.9, download: 86.7, anomaly: false },
  { time: '5s', upload: 15.7, download: 88.2, anomaly: false },
  { time: 'now', upload: 15.7, download: 88.2, anomaly: false },
];

// Anomaly detection logic
const detectAnomalies = (data: typeof trafficHistory) => {
  const avgUpload = data.reduce((sum, d) => sum + d.upload, 0) / data.length;
  const avgDownload = data.reduce((sum, d) => sum + d.download, 0) / data.length;
  
  const anomalies = data.filter(d => {
    const uploadDeviation = Math.abs(d.upload - avgUpload) / avgUpload;
    const downloadDeviation = Math.abs(d.download - avgDownload) / avgDownload;
    return uploadDeviation > 0.5 || downloadDeviation > 0.5; // 50% deviation threshold
  });

  return {
    hasAnomalies: anomalies.length > 0,
    count: anomalies.length,
    latest: anomalies[anomalies.length - 1] || null,
    avgUpload,
    avgDownload
  };
};

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
  const anomalyData = detectAnomalies(trafficHistory);
  
  return (
    <div className="space-y-6">
      {/* Anomaly Alert */}
      {anomalyData.hasAnomalies && (
        <Alert className="border-destructive bg-destructive/10">
          <AlertTriangle className="h-4 w-4 text-destructive" />
          <AlertDescription className="text-destructive">
            <strong>Traffic Anomalies Detected:</strong> {anomalyData.count} anomalies found in the last 60 seconds. 
            Unusual {anomalyData.latest?.upload! > anomalyData.avgUpload ? 'spikes' : 'drops'} in network traffic detected.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upload Speed</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15.7 Mbps</div>
            <p className="text-xs text-muted-foreground">Real-time upload bandwidth</p>
            <div className="flex items-center gap-1 mt-2 text-xs">
              <TrendingUp className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Avg: {anomalyData.avgUpload.toFixed(1)} Mbps</span>
            </div>
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
            <div className="flex items-center gap-1 mt-2 text-xs">
              <TrendingDown className="h-3 w-3 text-muted-foreground" />
              <span className="text-muted-foreground">Avg: {anomalyData.avgDownload.toFixed(1)} Mbps</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Traffic Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Live Traffic Monitor
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time upload/download speeds over the last 60 seconds. Red markers indicate anomalies.
          </p>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficHistory}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false}
                label={{ value: 'Speed (Mbps)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  borderColor: 'hsl(var(--border))',
                  borderRadius: 'var(--radius)',
                }}
                formatter={(value: number, name: string) => [
                  `${value.toFixed(1)} Mbps`,
                  name === 'upload' ? 'Upload' : 'Download'
                ]}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="upload" 
                stroke="hsl(var(--chart-1))" 
                name="Upload" 
                dot={(props: any) => {
                  const data = trafficHistory[props.payload?.index];
                  if (data?.anomaly) {
                    return <circle cx={props.cx} cy={props.cy} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />;
                  }
                  return <circle cx={props.cx} cy={props.cy} r="2" fill="hsl(var(--chart-1))" />;
                }}
                strokeWidth={2}
                activeDot={{ r: 4, stroke: "hsl(var(--chart-1))", strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="download" 
                stroke="hsl(var(--chart-2))" 
                name="Download" 
                dot={(props: any) => {
                  const data = trafficHistory[props.payload?.index];
                  if (data?.anomaly) {
                    return <circle cx={props.cx} cy={props.cy} r="6" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />;
                  }
                  return <circle cx={props.cx} cy={props.cy} r="2" fill="hsl(var(--chart-2))" />;
                }}
                strokeWidth={2}
                activeDot={{ r: 4, stroke: "hsl(var(--chart-2))", strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

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
