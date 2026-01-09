import { ExternalLink, Copy, FileText, Zap, Check } from 'lucide-react';
import { useState } from 'react';

export default function ToolchainModule() {
  const [copied, setCopied] = useState(false);

  const tools = [
    { name: 'DeepSeek 官网', url: 'https://www.deepseek.com', desc: '官方直连 · 无广告' },
    { name: 'Kimi Chat', url: 'https://kimi.moonshot.cn', desc: '国产长文本助手' },
  ];

  const prompt = `## DeepSeek 数据分析角色设定
你是一位拥有10年经验的资深数据分析师，精通 Python Pandas 和可视化。

请帮我分析以下数据：
[在此处粘贴数据]

要求：
1. 进行数据清洗，处理缺失值
2. 分析数据的分布特征
3. 给出 3 个关键的业务洞察
4. 提供可视化的 Python 代码建议`;

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };



  return (
    <div className="bg-white rounded-xl shadow-lg border-2 border-blue-100 overflow-hidden ring-1 ring-blue-50/50">
      {/* Header */}
      <div className="px-5 py-4 border-b border-blue-100 bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-between shadow-sm">
        <h3 className="font-bold text-base text-white flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-300 fill-current animate-pulse" />
          工具链集成
        </h3>
        <span className="text-[11px] bg-white/20 text-white px-2.5 py-1 rounded-full font-medium backdrop-blur-sm border border-white/10">
          课程配套
        </span>
      </div>
      
      <div className="p-5 space-y-6 bg-gradient-to-b from-white to-blue-50/30">
        {/* 1. Official Direct Link */}
        <div>
          <div className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-1 h-4 bg-blue-600 rounded-full"></div>
            官方直连
            <span className="text-[11px] font-normal text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">(避开搜索广告干扰)</span>
          </div>
          <div className="space-y-3">
            {tools.map((tool, idx) => (
              <a 
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-xl group transition-all border border-gray-200 hover:border-blue-300 shadow-sm hover:shadow-md"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800 group-hover:text-blue-700">{tool.name}</span>
                  <span className="text-[11px] text-gray-500 group-hover:text-blue-500">{tool.desc}</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-50 group-hover:bg-white flex items-center justify-center transition-colors">
                   <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

        {/* 2. Resource Kit */}
        <div>
          <div className="text-sm font-bold text-gray-800 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1 h-4 bg-purple-600 rounded-full"></div>
              <span>资源配套</span>
            </div>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">Prompt 库</span>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
            {/* Preview Area */}
            <div className="p-4 bg-slate-50/50 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-gray-800">数据分析师角色设定.txt</span>
              </div>
              <div className="text-xs text-gray-600 font-mono leading-relaxed line-clamp-3 opacity-90 bg-white p-2 rounded border border-gray-100">
                {prompt}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex divide-x divide-gray-200 bg-gray-50">
              <button 
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 hover:bg-white transition-all group font-medium text-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-gray-500 group-hover:text-blue-600" />
                    <span className="text-gray-600 group-hover:text-blue-600">一键复制</span>
                  </>
                )}
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
