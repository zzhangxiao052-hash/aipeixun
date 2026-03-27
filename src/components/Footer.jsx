import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#12141A] text-gray-400 py-12 mt-auto border-t border-gray-800/60 relative overflow-hidden">
      {/* Decorative background elements for tech feel */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-[1800px] mx-auto px-6 relative z-10">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start pb-12 gap-12 md:gap-8">
          
          {/* Left: Brand Info */}
          <div className="flex-1 max-w-md space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/5 p-1.5 rounded-lg border border-white/10 shadow-sm backdrop-blur-sm">
                <img src="/logo.png" alt="树科云境AI Logo" className="h-9 w-auto object-contain" onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = '/vite.svg'; // Fallback if logo not found
                }} />
              </div>
              <h3 className="text-white text-2xl font-bold tracking-wide">树科云境AI</h3>
            </div>
            <p className="text-sm leading-relaxed text-gray-400/90 text-justify">
              致力于打造专业、高效、智能的政企AI培训平台，以科技赋能业务，用AI驱动未来。为政府与企业提供全方位的人工智能认知与效能提升解决方案。
            </p>
          </div>

          {/* Middle: Friendly Links */}
          <div className="flex-[0.8] md:px-4">
            <h3 className="text-gray-200 text-lg font-semibold mb-6 tracking-wide flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-sm"></span>
              友情链接
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              <a href="#" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors"></span>
                树科云境官网
              </a>
              <a href="https://zsv2.yunjingai.net/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors"></span>
                云境AI·慧眼报告平台
              </a>
              <a href="https://data.yunjingai.net/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors"></span>
                数据治理平台
              </a>
              <a href="https://spark.yunjingai.net/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors"></span>
                云境妙笔平台
              </a>
              <a href="https://agent.yunjingai.net/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 transition-colors"></span>
                智能体应用平台
              </a>
            </div>
          </div>

          {/* Right: Quick Navigation */}
          <div className="flex-[0.8]">
            <h3 className="text-gray-200 text-lg font-semibold mb-6 tracking-wide flex items-center gap-2">
              <span className="w-1 h-4 bg-blue-500 rounded-sm"></span>
              快速导航
            </h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm">
              <Link to="/category/cognitive" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                前沿洞察
              </Link>
              <Link to="/category/skill" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                效能跃升
              </Link>
              <Link to="/category/life" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                场景创新
              </Link>
              <Link to="/courses" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                全部课程
              </Link>
              <Link to="/profile" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                个人中心
              </Link>
              <Link to="/settings" className="text-gray-400 hover:text-blue-400 hover:translate-x-1 transition-all duration-300 flex items-center gap-2 group">
                <span className="w-1 h-1 bg-gray-600 rounded-full group-hover:bg-blue-400 transition-colors"></span>
                系统设置
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="pt-8 border-t border-gray-800/60 flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-gray-500">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <p className="text-gray-400">© {new Date().getFullYear()} 树科云境科技（重庆）</p>
            <span className="hidden md:inline text-gray-700">|</span>
            <span className="hover:text-gray-400 cursor-default transition-colors">工信部备案号：渝ICP备20007997号-1</span>
            <span className="hidden md:inline text-gray-700">|</span>
            <span className="hover:text-gray-400 cursor-default transition-colors">公安备案号：渝公网安备50011202503976</span>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:text-blue-400 transition-colors">隐私政策</a>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <a href="#" className="hover:text-blue-400 transition-colors">用户协议</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
