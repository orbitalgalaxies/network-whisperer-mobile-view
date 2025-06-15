
import Header from '@/components/Header';
import WifiScanner from '@/components/WifiScanner';
import BluetoothScanner from '@/components/BluetoothScanner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="p-4 md:p-6">
        <Tabs defaultValue="wifi" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="wifi">Wi-Fi Analyzer</TabsTrigger>
            <TabsTrigger value="bluetooth">Bluetooth Scanner</TabsTrigger>
          </TabsList>
          <TabsContent value="wifi" className="mt-4">
            <WifiScanner />
          </TabsContent>
          <TabsContent value="bluetooth" className="mt-4">
            <BluetoothScanner />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
