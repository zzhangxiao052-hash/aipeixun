import { useState } from 'react';
import { Wrench, Send, ArrowLeft, CheckCircle, Upload, Bug, AlertTriangle, Smile } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechnicalSupport() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    type: 'bug',
    description: '',
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
          <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">工单已提交！</h2>
          <p className="text-gray-500 mb-8">技术团队已收到您的反馈，我们将尽快处理并修复问题。</p>
          <Link to="/" className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            返回首页
          </Link>
        </div>
      </div>
    );
  }

  const issueTypes = [
    { id: 'bug', label: '功能异常', icon: Bug, color: 'text-red-500' },
    { id: 'experience', label: '体验不佳', icon: AlertTriangle, color: 'text-orange-500' },
    { id: 'suggestion', label: '功能建议', icon: Smile, color: 'text-green-500' },
    { id: 'other', label: '其他问题', icon: Wrench, color: 'text-gray-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 md:px-14">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-800 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> 返回首页
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">技术工单反馈</h1>
              <p className="text-gray-500">遇到问题或有改进建议？请告诉我们。</p>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Issue Type */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                问题类型 <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {issueTypes.map(type => (
                  <label 
                    key={type.id}
                    className={`cursor-pointer border rounded-xl p-3 flex flex-col items-center justify-center gap-2 transition-all h-24
                      ${formData.type === type.id 
                        ? 'bg-blue-50 border-blue-500 ring-1 ring-blue-500' 
                        : 'border-gray-200 hover:bg-gray-50'}
                    `}
                  >
                    <input 
                      type="radio" 
                      name="type" 
                      value={type.id} 
                      checked={formData.type === type.id}
                      onChange={e => setFormData({...formData, type: e.target.value})}
                      className="hidden" 
                    />
                    <type.icon className={`w-6 h-6 ${formData.type === type.id ? 'text-blue-600' : type.color}`} />
                    <span className={`text-xs font-bold ${formData.type === type.id ? 'text-blue-700' : 'text-gray-600'}`}>
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
                placeholder="请详细描述您遇到的问题，包括复现步骤、报错信息等..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              ></textarea>
            </div>

            {/* Screenshot Upload (Mock) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                截图上传 (选填)
              </label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                <Upload className="w-8 h-8 mb-2 group-hover:text-blue-500 transition-colors" />
                <span className="text-xs group-hover:text-blue-600">点击或拖拽上传图片</span>
              </div>
            </div>

            {/* Contact (Optional) */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                联系方式 (选填)
              </label>
              <input 
                type="text" 
                placeholder="方便我们联系您确认问题细节"
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
              提交工单
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
