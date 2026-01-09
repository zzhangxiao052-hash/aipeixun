import { Lightbulb, Wrench, ArrowUp, MessageSquarePlus, Bug, MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function FeedbackSidebar() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-2 bottom-24 z-50 flex flex-col gap-3">
      {/* Demand Collection: "I want to learn" */}
      {/* Contact Us: Hover for QR Code */}
      <div className="relative group">
        <button 
          className="flex flex-col items-center justify-center w-14 h-14 bg-white rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <div className="w-6 h-6 text-gray-600 group-hover:text-blue-600 mb-1 transition-colors">
            <MessageCircle className="w-full h-full" />
          </div>
          <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-600 transition-colors leading-none">联系</span>
        </button>
        
        {/* QR Code Popup */}
        <div className="absolute right-full top-0 mr-3 w-32 p-3 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-right scale-95 group-hover:scale-100">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
             <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ContactSupport" alt="QR Code" className="w-full h-full object-cover" />
          </div>
          <div className="text-center text-xs font-bold text-gray-700">
            扫码联系客服
          </div>
          <div className="text-center text-[10px] text-gray-400 mt-1">
            工作日 9:00-18:00
          </div>
        </div>
      </div>

      {/* Demand Collection: "I want to learn" */}
      <Link 
        to="/feedback/request"
        className="group relative flex flex-col items-center justify-center w-14 h-14 bg-white rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        title="我想学什么 - 需求收集"
      >
        <div className="w-6 h-6 text-gray-600 group-hover:text-blue-600 mb-1 transition-colors">
          <Lightbulb className="w-full h-full" />
        </div>
        <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-600 transition-colors leading-none">我想学</span>
      </Link>

      {/* Technical Ticket: "Bug/Experience" */}
      {/* Technical Ticket: "Bug/Experience" */}
      <Link 
        to="/feedback/support"
        className="group relative flex flex-col items-center justify-center w-14 h-14 bg-white rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        title="技术工单 - Bug/体验反馈"
      >
        <div className="w-6 h-6 text-gray-600 group-hover:text-blue-600 mb-1 transition-colors">
          <Wrench className="w-full h-full" />
        </div>
        <span className="text-[10px] font-bold text-gray-500 group-hover:text-blue-600 transition-colors leading-none scale-90">技术工单</span>
      </Link>

      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        className={`group flex flex-col items-center justify-center w-14 h-14 bg-white rounded-xl shadow-lg border border-gray-100 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${showTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <div className="w-6 h-6 text-gray-400 group-hover:text-gray-800 mb-1 transition-colors">
          <ArrowUp className="w-full h-full" />
        </div>
        <span className="text-[10px] font-bold text-gray-400 group-hover:text-gray-800 transition-colors leading-none">顶部</span>
      </button>
    </div>
  );
}
