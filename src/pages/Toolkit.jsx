import { useState } from 'react';
import { Terminal, MessageSquare, Code, Database, Zap, ArrowRight, Copy, Play } from 'lucide-react';

const TOOLS = [
  {
    id: 'prompt-gen',
    title: 'Prompt 生成器',
    description: '通过简单的关键词，自动生成高质量的 AI 提示词，支持 Midjourney 和 ChatGPT。',
    icon: MessageSquare,
    color: 'bg-purple-100 text-purple-600',
    status: 'Hot',
  },
  {
    id: 'api-debug',
    title: 'API 调试工具',
    description: '在线调试 RESTful API，支持 GET/POST 请求，实时查看响应结果。',
    icon: Terminal,
    color: 'bg-blue-100 text-blue-600',
    status: 'Stable',
  },
  {
    id: 'json-format',
    title: 'JSON 格式化',
    description: '自动格式化混乱的 JSON 数据，支持语法高亮和错误检测。',
    icon: Code,
    color: 'bg-green-100 text-green-600',
    status: 'New',
  },
  {
    id: 'sql-helper',
    title: 'SQL 助手',
    description: '输入自然语言需求，自动转换为标准的 SQL 查询语句。',
    icon: Database,
    color: 'bg-orange-100 text-orange-600',
    status: 'Beta',
  },
];

export default function Toolkit() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-blue-600">
            <Zap className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">AI 工具箱 Toolkit</h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            集成多种实用的 AI 辅助工具，提升您的开发与办公效率。
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOOLS.map(tool => (
            <div key={tool.id} className="bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer relative overflow-hidden">
              
              {/* Status Badge */}
              {tool.status && (
                <div className="absolute top-4 right-4 text-xs font-bold px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                  {tool.status}
                </div>
              )}

              <div className={`w-14 h-14 rounded-xl ${tool.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <tool.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-6 h-12 line-clamp-2">
                {tool.description}
              </p>

              <div className="flex items-center text-sm font-bold text-blue-600 gap-1 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                立即使用 <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          ))}

          {/* Coming Soon Card */}
          <div className="bg-gray-50 rounded-2xl border border-dashed border-gray-300 p-6 flex flex-col items-center justify-center text-center opacity-70 hover:opacity-100 transition-opacity">
            <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl text-gray-400">+</span>
            </div>
            <h3 className="text-lg font-bold text-gray-500">更多工具开发中</h3>
            <p className="text-xs text-gray-400 mt-2">敬请期待...</p>
          </div>

        </div>
      </div>
    </div>
  );
}
