
import { Wifi } from 'lucide-react';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 border-b border-border">
      <div className="flex items-center gap-2">
        <Wifi className="text-primary" />
        <h1 className="text-xl font-bold text-primary">NetPulse</h1>
      </div>
    </header>
  );
};

export default Header;
