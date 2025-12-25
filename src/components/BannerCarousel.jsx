import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BANNERS = [
  {
    id: 1,
    type: 'gradient',
    className: 'bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-500',
    brand: '树科云境',
    title: '专家经验转化为标准化方法论',
    description: '消除 AI 技术恐慌，聚焦公文写作、政策解读、数据合规。',
    link: '/category/cognitive'
  },
  {
    id: 2,
    type: 'gradient',
    className: 'bg-gradient-to-bl from-blue-500 via-cyan-500 to-teal-400',
    brand: '树科云境',
    title: '工具化降低使用门槛',
    description: '聚焦财务人事流、营销获客。用 AI 工具重塑业务流程，让每一次创新都触手可及。',
    link: '/category/life'
  },
  {
    id: 3,
    type: 'gradient',
    className: 'bg-gradient-to-tr from-blue-700 via-indigo-600 to-violet-600',
    brand: '树科云境',
    title: '安全 · 合规 · 高效',
    description: '关注政绩、数据与安全。为政企提供可信赖的 AI 智能化转型方案。',
    link: '/category/skill'
  }
];

export default function BannerCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % BANNERS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent(prev => (prev - 1 + BANNERS.length) % BANNERS.length);
  const next = () => setCurrent(prev => (prev + 1) % BANNERS.length);

  return (
    <div className="relative w-full h-[400px] md:h-[480px] overflow-hidden group shadow-xl">
      {/* Slides */}
      <div 
        className="flex transition-transform duration-700 ease-out h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {BANNERS.map((banner) => (
          <div key={banner.id} className="w-full h-full flex-shrink-0 relative">
            {/* Background Gradient */}
            <div className={`w-full h-full ${banner.className} relative overflow-hidden`}>
              {/* Abstract Decorative Elements (Right Side) */}
              <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute bottom-0 right-20 w-[300px] h-[300px] bg-white/10 rounded-lg rotate-12 blur-2xl pointer-events-none"></div>
              <div className="absolute top-10 right-1/3 w-[200px] h-[200px] bg-white/5 rounded-full blur-xl pointer-events-none"></div>
              
              {/* Geometric Shapes (Simulating 3D feel) */}
              <div className="absolute right-[10%] top-1/2 -translate-y-1/2 hidden md:block opacity-80">
                 <div className="relative w-64 h-64 border-4 border-white/20 rounded-2xl transform rotate-45 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-48 h-48 bg-white/10 rounded-xl backdrop-blur-md shadow-2xl border border-white/30"></div>
                 </div>
              </div>
            </div>
            
            {/* Content Container */}
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                {/* Text Content (Left) */}
                <div className="text-white z-10 space-y-6">
                  <div className="flex items-center space-x-3 opacity-90">
                    <span className="text-xl md:text-2xl font-bold tracking-wider">{banner.brand}</span>
                    <div className="h-px w-12 bg-white/60"></div>
                    <span className="text-sm md:text-base font-light tracking-widest uppercase">AI Platform</span>
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-sm">
                    {banner.title}
                  </h2>
                  
                  <p className="text-lg md:text-xl text-blue-50/90 max-w-xl leading-relaxed font-light">
                    {banner.description}
                  </p>
                  
                  <div className="pt-4">
                    <Link 
                      to={banner.link}
                      className="inline-flex px-8 py-3 bg-white text-blue-900 hover:bg-blue-50 rounded-full font-bold transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 items-center gap-2"
                    >
                      立即探索
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Right side is reserved for visuals/shapes defined in background */}
                <div className="hidden md:block"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button 
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/30 hover:bg-black/50 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              current === idx ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
