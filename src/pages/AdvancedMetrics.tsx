import { Activity, Radio, ArrowLeft, ChevronDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const mockWifiNetworks = [
  { 
    ssid: 'HomeNetwork_5G', 
    signal: -45, 
    security: 'WPA2', 
    channel: 149, 
    channelWidth: 80, 
    snr: 35, 
    noiseFloor: -95, 
    ber: 0.001, 
    mcs: 11, 
    cqi: 14, 
    rsrq: -8 
  },
  { 
    ssid: 'xfinitywifi', 
    signal: -67, 
    security: 'Open', 
    channel: 6, 
    channelWidth: 20, 
    snr: 22, 
    noiseFloor: -92, 
    ber: 0.01, 
    mcs: 7, 
    cqi: 9, 
    rsrq: -12 
  },
  { 
    ssid: 'NeighborNet', 
    signal: -78, 
    security: 'WPA2/WPA3', 
    channel: 11, 
    channelWidth: 20, 
    snr: 15, 
    noiseFloor: -93, 
    ber: 0.05, 
    mcs: 4, 
    cqi: 6, 
    rsrq: -15 
  },
];

const getSignalQuality = (snr: number) => {
    if (snr >= 30) return { quality: 'Excellent', color: 'text-green-600' };
    if (snr >= 20) return { quality: 'Good', color: 'text-blue-600' };
    if (snr >= 10) return { quality: 'Fair', color: 'text-yellow-600' };
    return { quality: 'Poor', color: 'text-red-600' };
};

const getBERQuality = (ber: number) => {
    if (ber <= 0.001) return { quality: 'Excellent', color: 'text-green-600' };
    if (ber <= 0.01) return { quality: 'Good', color: 'text-blue-600' };
    if (ber <= 0.05) return { quality: 'Fair', color: 'text-yellow-600' };
    return { quality: 'Poor', color: 'text-red-600' };
};

const getCQIQuality = (cqi: number) => {
    if (cqi >= 12) return { quality: 'Excellent', color: 'text-green-600' };
    if (cqi >= 8) return { quality: 'Good', color: 'text-blue-600' };
    if (cqi >= 5) return { quality: 'Fair', color: 'text-yellow-600' };
    return { quality: 'Poor', color: 'text-red-600' };
};

const AdvancedMetrics = () => {
    const navigate = useNavigate();
    const [expandedCards, setExpandedCards] = useState<string[]>([]);
    const [guideExpanded, setGuideExpanded] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="p-4 md:p-6">
                <div className="mb-6">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate('/')}
                        className="mb-4"
                    >
                        <ArrowLeft size={16} className="mr-2" />
                        Back
                    </Button>
                    <h1 className="text-3xl font-bold">Advanced Signal Quality Metrics</h1>
                    <p className="text-muted-foreground">Professional-grade signal analysis for network optimization</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity size={24} />
                            Advanced Signal Quality Metrics
                        </CardTitle>
                        <CardDescription>
                            Professional-grade signal analysis for network optimization.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {mockWifiNetworks.map((net) => {
                                const snrQuality = getSignalQuality(net.snr);
                                const berQuality = getBERQuality(net.ber);
                                const cqiQuality = getCQIQuality(net.cqi);
                                
                                return (
                                    <Collapsible 
                                        key={net.ssid}
                                        open={expandedCards.includes(net.ssid)}
                                        onOpenChange={(open) => {
                                            setExpandedCards(prev => 
                                                open 
                                                    ? [...prev, net.ssid]
                                                    : prev.filter(id => id !== net.ssid)
                                            );
                                        }}
                                    >
                                        <Card className="bg-secondary/50">
                                            <CardHeader className="pb-3">
                                                <CollapsibleTrigger className="w-full">
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-lg">{net.ssid}</CardTitle>
                                                        <ChevronDown 
                                                            size={16} 
                                                            className={`transition-transform ${
                                                                expandedCards.includes(net.ssid) ? 'rotate-180' : ''
                                                            }`}
                                                        />
                                                    </div>
                                                </CollapsibleTrigger>
                                            </CardHeader>
                                            <CollapsibleContent>
                                                <CardContent className="space-y-3">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">SNR:</span>
                                                        <span className={`font-semibold ${snrQuality.color}`}>{net.snr} dB</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">Noise Floor:</span>
                                                        <span className="font-semibold">{net.noiseFloor} dBm</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">BER:</span>
                                                        <span className={`font-semibold ${berQuality.color}`}>{net.ber.toFixed(3)}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">MCS Index:</span>
                                                        <span className="font-semibold">{net.mcs}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">CQI:</span>
                                                        <span className={`font-semibold ${cqiQuality.color}`}>{net.cqi}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-sm text-muted-foreground">RSRQ:</span>
                                                        <span className="font-semibold">{net.rsrq} dB</span>
                                                    </div>
                                                </CardContent>
                                            </CollapsibleContent>
                                        </Card>
                                    </Collapsible>
                                );
                            })}
                        </div>
                        
                        <Collapsible 
                            open={guideExpanded}
                            onOpenChange={setGuideExpanded}
                        >
                            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                                <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-semibold flex items-center gap-2">
                                            <Radio size={18} />
                                            Quality Metrics Guide
                                        </h4>
                                        <ChevronDown 
                                            size={16} 
                                            className={`transition-transform ${
                                                guideExpanded ? 'rotate-180' : ''
                                            }`}
                                        />
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <div className="grid gap-2 md:grid-cols-2 text-sm mt-3">
                                        <div>
                                            <strong>SNR (Signal-to-Noise Ratio):</strong>
                                            <div className="text-muted-foreground">
                                                • 30+ dB: Excellent<br/>
                                                • 20-29 dB: Good<br/>
                                                • 10-19 dB: Fair<br/>
                                                • &lt;10 dB: Poor
                                            </div>
                                        </div>
                                        <div>
                                            <strong>BER (Bit Error Rate):</strong>
                                            <div className="text-muted-foreground">
                                                • ≤0.001: Excellent<br/>
                                                • ≤0.01: Good<br/>
                                                • ≤0.05: Fair<br/>
                                                • &gt;0.05: Poor
                                            </div>
                                        </div>
                                        <div>
                                            <strong>CQI (Channel Quality):</strong>
                                            <div className="text-muted-foreground">
                                                • 12-15: Excellent<br/>
                                                • 8-11: Good<br/>
                                                • 5-7: Fair<br/>
                                                • 1-4: Poor
                                            </div>
                                        </div>
                                        <div>
                                            <strong>Noise Floor:</strong>
                                            <div className="text-muted-foreground">
                                                Typical: -90 to -100 dBm<br/>
                                                Lower values indicate<br/>
                                                less ambient noise
                                            </div>
                                        </div>
                                    </div>
                                </CollapsibleContent>
                            </div>
                        </Collapsible>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdvancedMetrics;