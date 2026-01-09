import { useState, useEffect } from 'react';
import { Wifi, Signal, Battery } from 'lucide-react';

export default function MobileStatusBar({ theme = 'light' }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';

  return (
    <div className={`flex justify-between items-center px-4 py-2 text-xs font-medium ${textColor} select-none z-50 relative`}>
      <div className="flex items-center gap-1">
        <span>{formatTime(time)}</span>
      </div>
      <div className="flex items-center gap-2">
        <Signal className="w-3.5 h-3.5" />
        <span className="text-[10px]">5G</span>
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-0.5">
          <span className="text-[10px]">100%</span>
          <Battery className="w-4 h-4 rotate-90" />
        </div>
      </div>
    </div>
  );
}
