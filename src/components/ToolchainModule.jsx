import { ExternalLink, Copy, Download, FileText, Zap, Check } from 'lucide-react';
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

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([prompt], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "deepseek_prompt_template.txt";
    document.body.appendChild(element); 
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50/50 to-transparent flex items-center justify-between">
        <h3 className="font-bold text-sm text-gray-800 flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-600 fill-current" />
          工具链集成
        </h3>
        <span className="text-[10px] bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full font-medium">
          课程配套
        </span>
      </div>
      
      <div className="p-4 space-y-5">
        {/* 1. Official Direct Link */}
        <div>
          <div className="text-xs font-bold text-gray-500 mb-3 flex items-center gap-1">
            官方直连
            <span className="text-[10px] font-normal text-gray-400">(避开搜索广告干扰)</span>
          </div>
          <div className="space-y-2">
            {tools.map((tool, idx) => (
              <a 
                key={idx}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-lg group transition-all border border-gray-100 hover:border-blue-200"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-bold">{tool.name}</span>
                  <span className="text-[10px] text-gray-400 group-hover:text-blue-400/80">{tool.desc}</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 opacity-50 group-hover:opacity-100" />
              </a>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="h-px bg-gray-100"></div>

        {/* 2. Resource Kit */}
        <div>
          <div className="text-xs font-bold text-gray-500 mb-3 flex items-center justify-between">
            <span>资源配套</span>
            <span className="text-[10px] text-gray-400">Prompt 库</span>
          </div>
          
          <div className="bg-slate-50 rounded-lg border border-gray-200 overflow-hidden">
            {/* Preview Area */}
            <div className="p-3 bg-slate-50 border-b border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                <span className="text-xs font-bold text-gray-700">数据分析师角色设定.txt</span>
              </div>
              <div className="text-xs text-gray-500 font-mono leading-relaxed line-clamp-3 opacity-80">
                {prompt}
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex divide-x divide-gray-200 bg-white">
              <button 
                onClick={handleCopy}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 hover:bg-gray-50 transition-colors group"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-600" />
                    <span className="text-xs font-medium text-green-600">已复制</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-600" />
                    <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600">一键复制</span>
                  </>
                )}
              </button>
              <button 
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 hover:bg-gray-50 transition-colors group"
              >
                <Download className="w-3.5 h-3.5 text-gray-500 group-hover:text-blue-600" />
                <span className="text-xs font-medium text-gray-600 group-hover:text-blue-600">.txt 下载</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
