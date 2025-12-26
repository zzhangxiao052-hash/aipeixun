import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import BannerCarousel from '../components/BannerCarousel';


import { RECOMMENDED_VIDEOS, COGNITIVE_VIDEOS, SKILL_VIDEOS, LIFE_VIDEOS, FEATURED_REVIEWS } from '../data/mockData';

export default function Dashboard() {
  return (
    <div className="min-h-screen">
      
      {/* --- 1. Banner Section (Full Width & Under Navbar) --- */}
      <section className="-mt-16 relative z-0">
        <BannerCarousel />
      </section>



      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-8 space-y-10">
        
        {/* --- 2. Recommendations (智能推荐流) --- */}
        <VideoSection 
          title="为你推荐" 
          badge="AI 精选" 
          badgeColor="bg-blue-100 text-blue-700"
          tags={['行政', '财务', '技术', '安全', '人事', '营销', '运营', '管理', '法律', '研发']}
          videos={RECOMMENDED_VIDEOS}
          moreLink="/category/recommended"
          categoryKey="recommended"
        />

        {/* --- 3. Cognitive Layer (前沿洞察) --- */}
        <VideoSection 
          title="前沿洞察" 
          badge="思维重构" 
          badgeColor="bg-purple-100 text-purple-700"
          tags={['名词解释', 'AI通识', '行业趋势', '政策解读', '伦理规范', '未来展望', '专家访谈', '案例拆解']}
          videos={COGNITIVE_VIDEOS}
          moreLink="/category/cognitive"
          categoryKey="cognitive"
        />

        {/* --- 4. Skill Layer (效能跃升) --- */}
        <VideoSection 
          title="效能跃升" 
          badge="降本增效" 
          badgeColor="bg-green-100 text-green-700"
          tags={['办公提效', '公文生成', '数据分析', '图像处理', '视频剪辑', '代码辅助', '会议纪要', '邮件撰写', '流程自动化']}
          videos={SKILL_VIDEOS}
          moreLink="/category/skill"
          categoryKey="skill"
        />

        {/* --- 5. Life Layer (场景创新) --- */}
        <VideoSection 
          title="场景创新" 
          badge="应用拓展" 
          badgeColor="bg-orange-100 text-orange-700"
          tags={['生活助手', '趣味创作', '学习辅导', '健康咨询', '旅游规划', '创意写作', '艺术设计', '情感陪伴']}
          videos={LIFE_VIDEOS}
          moreLink="/category/life"
          categoryKey="life"
        />

        {/* --- 6. Featured Reviews (精彩评价) --- */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">精彩评价</h2>
            <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded font-bold">学员热评</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURED_REVIEWS.map(review => (
              <Link 
                key={review.id} 
                to={`/video/${review.videoId}`}
                className="group bg-white p-5 rounded-xl border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex items-center gap-3 mb-4">
                  <img src={review.avatar} alt={review.user} className="w-10 h-10 rounded-full bg-gray-100" />
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{review.user}</div>
                    <div className="text-xs text-gray-500">{review.role}</div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-grow line-clamp-3">
                  "{review.content}"
                </p>

                <div className="pt-4 border-t border-gray-50 mt-auto">
                  <div className="flex items-center justify-between text-xs group-hover:text-blue-600 transition-colors">
                    <span className="text-gray-400">来自课程</span>
                    <span className="font-medium truncate max-w-[150px]">《{review.videoTitle}》</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function VideoSection({ title, badge, badgeColor, tags, videos, moreLink = '#', categoryKey }) {
  const [activeCategory, setActiveCategory] = useState('全部');

  const filteredVideos = activeCategory === '全部' 
    ? videos 
    : videos.filter(video => video.tags.includes(activeCategory));

  return (
    <section>
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <span className={`text-xs px-2 py-1 ${badgeColor} rounded font-bold`}>{badge}</span>
          
          <Link to={moreLink} className="flex items-center gap-0.5 text-xs font-medium text-gray-500 hover:text-white bg-gray-100 hover:bg-blue-600 px-3 py-1 rounded-full transition-all ml-2 group/more">
            更多
            <ChevronRight className="w-3 h-3 group-hover/more:translate-x-0.5 transition-transform" />
          </Link>
        </div>
        <div className="flex gap-2">
          {['全部', ...tags].map(tag => (
            <button 
              key={tag} 
              onClick={() => setActiveCategory(tag)}
              className={`px-4 py-1.5 text-sm rounded-full border transition-all font-medium ${
                activeCategory === tag 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {filteredVideos.map(video => (
          <VideoCard key={video.id} data={video} categoryKey={categoryKey} />
        ))}
      </div>
    </section>
  );
}

function VideoCard({ data, categoryKey }) {
  return (
    <Link to={`/video/${data.id}${categoryKey ? `?from=${categoryKey}` : ''}`} className="group bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Thumbnail Container */}
      <div className="relative aspect-video bg-gray-100 overflow-hidden">
        <img src={data.cover} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        
        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/70 backdrop-blur-sm text-white text-[10px] font-medium px-1.5 py-0.5 rounded">
          {data.duration}
        </div>
        
        {/* Update Badge */}
        {data.isUpdated && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg shadow-blue-900/20 z-10">
            UPDATE
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-[14px] font-bold text-gray-800 leading-snug line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors h-10">
          {data.title}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex gap-1">
            {data.tags.map(tag => (
              <span key={tag} className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] text-gray-500 font-medium group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
