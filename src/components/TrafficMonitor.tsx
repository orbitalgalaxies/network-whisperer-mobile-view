
import { Network } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const mockTrafficData = [
  { name: '10s ago', download: 45, upload: 28 },
  { name: '8s ago', download: 55, upload: 32 },
  { name: '6s ago', download: 60, upload: 40 },
  { name: '4s ago', download: 52, upload: 35 },
  { name: '2s ago', download: 78, upload: 48 },
  { name: 'now', download: 70, upload: 55 },
];

const TrafficMonitor = () => {
  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-accent-foreground">
          <Network size={20} />
          Network Traffic (Mbps)
        </CardTitle>
      </CardHeader>
      <CardContent className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={mockTrafficData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
                borderRadius: 'var(--radius)',
              }}
            />
            <Legend wrapperStyle={{ color: 'hsl(var(--foreground))' }} />
            <Line type="monotone" dataKey="download" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} name="Download" />
            <Line type="monotone" dataKey="upload" stroke="hsl(var(--secondary-foreground))" name="Upload" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrafficMonitor;
