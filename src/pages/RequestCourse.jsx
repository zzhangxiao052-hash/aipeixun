import { useState } from 'react';
import { Lightbulb, Send, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RequestCourse() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    topic: '',
    description: '',
    urgency: 'normal',
    contact: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
    }, 800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">反馈已收到！</h2>
          <p className="text-gray-500 mb-8">感谢您的宝贵建议，我们会认真评估并尽快规划相关课程。</p>
          <Link to="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-14">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> 返回首页
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">我想学什么</h1>
              <p className="text-gray-500">告诉我们您感兴趣的课程主题，我们将为您量身定制。</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Topic */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                课程主题 <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                required
                placeholder="例如：DeepSeek 高级微调效能跃升"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.topic}
                onChange={e => setFormData({...formData, topic: e.target.value})}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                具体需求描述
              </label>
              <textarea 
                rows="4"
                placeholder="请详细描述您想学习的具体内容、应用场景或遇到的痛点..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                需求紧迫度
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: 'low', label: '不急，随便看看' },
                  { value: 'normal', label: '一般，近期需要' },
                  { value: 'high', label: '很急，项目卡点' }
                ].map(opt => (
                  <label 
                    key={opt.value}
                    className={`cursor-pointer border rounded-xl p-3 text-center transition-all
                      ${formData.urgency === opt.value 
                        ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' 
                        : 'border-gray-200 hover:bg-gray-50 text-gray-600'}
                    `}
                  >
                    <input 
                      type="radio" 
                      name="urgency" 
                      value={opt.value} 
                      checked={formData.urgency === opt.value}
                      onChange={e => setFormData({...formData, urgency: e.target.value})}
                      className="hidden" 
                    />
                    <span className="text-sm">{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contact (Optional) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                联系方式 (选填)
              </label>
              <input 
                type="text" 
                placeholder="留下您的邮箱或微信，课程上线第一时间通知您"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                value={formData.contact}
                onChange={e => setFormData({...formData, contact: e.target.value})}
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              提交需求
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
