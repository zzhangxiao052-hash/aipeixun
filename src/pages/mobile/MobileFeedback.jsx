import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronLeft, Lightbulb, Wrench, Send, 
  CheckCircle, Bug, AlertTriangle, Smile, Upload 
} from 'lucide-react';
import MobileStatusBar from './MobileStatusBar';

export default function MobileFeedback() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('course'); // 'course' or 'support'
  const [submitted, setSubmitted] = useState(false);
  
  // Separate state for each form to persist data when switching tabs
  const [courseForm, setCourseForm] = useState({
    topic: '',
    description: '',
    urgency: 'normal',
    contact: ''
  });

  const [supportForm, setSupportForm] = useState({
    type: 'bug',
    description: '',
    contact: ''
  });

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setSubmitted(true), 800);
  };

  const issueTypes = [
    { id: 'bug', label: '功能异常', icon: Bug, color: 'text-red-500' },
    { id: 'experience', label: '体验不佳', icon: AlertTriangle, color: 'text-orange-500' },
    { id: 'suggestion', label: '功能建议', icon: Smile, color: 'text-green-500' },
    { id: 'other', label: '其他问题', icon: Wrench, color: 'text-gray-500' },
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 max-w-[480px] mx-auto shadow-2xl flex flex-col">
        <MobileStatusBar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">提交成功</h2>
          <p className="text-gray-500 mb-8 text-sm">
            {activeTab === 'course' 
              ? '感谢您的建议，我们会尽快评估规划。' 
              : '技术团队已收到反馈，将尽快处理。'}
          </p>
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors w-full"
          >
            返回上一页
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 max-w-[480px] mx-auto shadow-2xl flex flex-col">
      <MobileStatusBar />
      
      {/* Header */}
      <div className="bg-white px-4 py-3 flex items-center gap-4 shadow-sm sticky top-0 z-10">
        <button 
          onClick={() => navigate(-1)}
          className="p-1 -ml-1 text-gray-600 active:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">意见反馈</h1>
      </div>

      {/* Tabs */}
      <div className="p-4 pb-0">
        <div className="bg-white p-1 rounded-xl shadow-sm flex">
          <button
            onClick={() => setActiveTab('course')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all
              ${activeTab === 'course' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Lightbulb className="w-4 h-4" />
            我想学
          </button>
          <button
            onClick={() => setActiveTab('support')}
            className={`flex-1 py-2.5 text-sm font-bold rounded-lg flex items-center justify-center gap-2 transition-all
              ${activeTab === 'support' 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Wrench className="w-4 h-4" />
            技术工单
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {activeTab === 'course' ? (
          <form onSubmit={handleCourseSubmit} className="space-y-5">
            <div className="bg-white p-5 rounded-2xl shadow-sm space-y-5">
              {/* Topic */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  课程主题 <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="例如：DeepSeek 高级微调"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  value={courseForm.topic}
                  onChange={e => setCourseForm({...courseForm, topic: e.target.value})}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  具体需求描述
                </label>
                <textarea 
                  rows="4"
                  placeholder="请详细描述您想学习的具体内容..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm"
                  value={courseForm.description}
                  onChange={e => setCourseForm({...courseForm, description: e.target.value})}
                ></textarea>
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  需求紧迫度
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'low', label: '不急' },
                    { value: 'normal', label: '一般' },
                    { value: 'high', label: '很急' }
                  ].map(opt => (
                    <label 
                      key={opt.value}
                      className={`cursor-pointer border rounded-xl py-2.5 text-center transition-all
                        ${courseForm.urgency === opt.value 
                          ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' 
                          : 'border-gray-100 bg-gray-50 text-gray-500'}
                      `}
                    >
                      <input 
                        type="radio" 
                        name="urgency" 
                        value={opt.value} 
                        checked={courseForm.urgency === opt.value}
                        onChange={e => setCourseForm({...courseForm, urgency: e.target.value})}
                        className="hidden" 
                      />
                      <span className="text-xs">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  联系方式 (选填)
                </label>
                <input 
                  type="text" 
                  placeholder="邮箱或微信"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  value={courseForm.contact}
                  onChange={e => setCourseForm({...courseForm, contact: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-blue-600 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              提交需求
            </button>
          </form>
        ) : (
          <form onSubmit={handleSupportSubmit} className="space-y-5">
            <div className="bg-white p-5 rounded-2xl shadow-sm space-y-5">
              {/* Issue Type */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  问题类型 <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {issueTypes.map(type => (
                    <label 
                      key={type.id}
                      className={`cursor-pointer border rounded-xl p-3 flex items-center gap-3 transition-all
                        ${supportForm.type === type.id 
                          ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                          : 'border-gray-100 bg-gray-50'}
                      `}
                    >
                      <input 
                        type="radio" 
                        name="type" 
                        value={type.id} 
                        checked={supportForm.type === type.id}
                        onChange={e => setSupportForm({...supportForm, type: e.target.value})}
                        className="hidden" 
                      />
                      <type.icon className={`w-5 h-5 ${supportForm.type === type.id ? 'text-blue-600' : type.color}`} />
                      <span className={`text-xs font-bold ${supportForm.type === type.id ? 'text-blue-700' : 'text-gray-600'}`}>
                        {type.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  问题描述 <span className="text-red-500">*</span>
                </label>
                <textarea 
                  rows="5"
                  required
                  placeholder="请详细描述您遇到的问题..."
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm"
                  value={supportForm.description}
                  onChange={e => setSupportForm({...supportForm, description: e.target.value})}
                ></textarea>
              </div>

              {/* Screenshot Upload */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  截图上传 (选填)
                </label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center text-gray-400 bg-gray-50">
                  <Upload className="w-6 h-6 mb-1" />
                  <span className="text-xs">点击上传图片</span>
                </div>
              </div>

              {/* Contact */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">
                  联系方式 (选填)
                </label>
                <input 
                  type="text" 
                  placeholder="方便我们联系您"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
                  value={supportForm.contact}
                  onChange={e => setSupportForm({...supportForm, contact: e.target.value})}
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-blue-600 active:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              提交工单
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
