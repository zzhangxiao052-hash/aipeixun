import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, CheckCircle, Award, Calendar, ArrowRight, BarChart2 } from 'lucide-react';

const MY_COURSES = {
  inProgress: [
    {
      id: 1,
      title: '公文写作神器：让 AI 帮你写通知、总结与报告',
      progress: 45,
      lastLearned: '2小时前',
      totalLessons: 8,
      completedLessons: 3,
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      nextLesson: '如何用 AI 润色公文语气'
    },
    {
      id: 3,
      title: '零代码数据分析：用对话的方式做 Excel 透视表',
      progress: 12,
      lastLearned: '1天前',
      totalLessons: 10,
      completedLessons: 1,
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
      nextLesson: '数据清洗的基本概念'
    }
  ],
  completed: [
    {
      id: 2,
      title: '智能会议纪要：录音一键转文字',
      completedDate: '2024-05-20',
      score: 98,
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=800',
      certificateId: 'CERT-20240520-001'
    }
  ]
};

export default function MyCourses() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('learning'); // learning, completed

  return (
    <div className="min-h-screen bg-[#F8F9FA] pb-12">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1800px] mx-auto px-4 md:px-14 py-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">我的学习中心</h1>
          <p className="text-gray-500">
            在这里追踪您的 AI 技能提升进度，查看已获得的证书。
          </p>
        </div>
        
        {/* Tabs */}
        <div className="max-w-[1800px] mx-auto px-4 md:px-14">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('learning')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2
                ${activeTab === 'learning' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'}
              `}
            >
              <Clock className="w-4 h-4" />
              正在学习 ({MY_COURSES.inProgress.length})
            </button>
            <button
              onClick={() => setActiveTab('completed')}
              className={`pb-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-2
                ${activeTab === 'completed' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'}
              `}
            >
              <CheckCircle className="w-4 h-4" />
              已完成 ({MY_COURSES.completed.length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-14 py-8">
        
        {/* Learning Tab Content */}
        {activeTab === 'learning' && (
          <div className="space-y-6">
            {MY_COURSES.inProgress.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow">
                <div className="w-full md:w-64 h-40 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                    已学 {course.progress}%
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span className="flex items-center gap-1">
                        <BarChart2 className="w-4 h-4" />
                        进度: {course.completedLessons}/{course.totalLessons} 节
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        上次学习: {course.lastLearned}
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-600">
                      下一节: <span className="font-medium text-gray-900">{course.nextLesson}</span>
                    </p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 flex justify-end">
                    <button 
                      onClick={() => navigate(`/video/${course.id}`)}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-sm shadow-blue-200"
                    >
                      继续学习
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {MY_COURSES.inProgress.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
                <p className="text-gray-500">暂无正在学习的课程，快去“推荐课程”看看吧！</p>
              </div>
            )}
          </div>
        )}

        {/* Completed Tab Content */}
        {activeTab === 'completed' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MY_COURSES.completed.map(course => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                <div className="h-40 relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover grayscale" />
                  <div className="absolute inset-0 bg-blue-900/20 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur text-blue-800 px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                      <CheckCircle className="w-5 h-5" />
                      已完成
                    </div>
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                  <div className="space-y-2 text-sm text-gray-500 mb-6">
                    <div className="flex justify-between">
                      <span>完成时间</span>
                      <span className="font-medium text-gray-900">{course.completedDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>考核成绩</span>
                      <span className="font-medium text-green-600">{course.score} 分</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                    <span className="text-xs text-gray-400">证书编号: {course.certificateId}</span>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-800 flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      查看证书
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
