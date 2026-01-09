import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#1A1A1A] text-gray-400 py-12 mt-auto">
      <div className="max-w-[1800px] mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start border-b border-gray-800 pb-10 mb-8 gap-10">
          
          {/* Left: Brand Info */}
          <div className="space-y-5 max-w-sm">
            <h3 className="text-white text-2xl font-bold">树科云境AI</h3>
            <div className="text-lg space-y-3">
              <p>树科云境AI</p>
              <p>邮箱：info@example.com</p>
            </div>
          </div>

          {/* Middle: Quick Links */}
          <div className="flex-1 px-4 md:px-20">
            <h3 className="text-white text-2xl font-bold mb-6">快捷入口</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 text-lg">
              <Link to="/category/recommended" className="hover:text-white transition-colors">推荐视频</Link>
              <Link to="/category/cognitive" className="hover:text-white transition-colors">前沿洞察</Link>
              <Link to="/category/skill" className="hover:text-white transition-colors">效能跃升</Link>
              <Link to="/category/life" className="hover:text-white transition-colors">场景创新</Link>
              <Link to="/profile" className="hover:text-white transition-colors">个人中心</Link>
              <Link to="/settings" className="hover:text-white transition-colors">系统设置</Link>
            </div>
          </div>

          {/* Right: QR Code */}
          <div className="flex flex-col items-start md:items-center">
            <h3 className="text-white text-2xl font-bold mb-6">关注我们</h3>
            <div className="bg-white p-1.5 rounded-lg">
              {/* Placeholder for QR Code */}
              <div className="w-28 h-28 bg-gray-200 flex items-center justify-center rounded">
                <svg className="w-20 h-20 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 13h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v2h-3v-2zm-3 0h2v2h-2v-2zm-3 4h3v2h-3v-2zm3 0h2v2h-2v-2zm-3-4h2v2h-2v-2zm3-3h3v2h-3v-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-center text-sm text-gray-600 space-y-2">
          <p>© 树科云境科技（重庆）技术支持</p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <span>工信部备案号：渝ICP备20007997号-1</span>
            <span className="hidden md:inline">|</span>
            <span>公安备案号：渝公网安备50011202503976</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
