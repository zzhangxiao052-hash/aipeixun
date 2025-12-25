import { useState, useEffect, useRef } from 'react';
import { 
  AlertTriangle, FileText, PlayCircle, CheckCircle, XCircle, 
  RefreshCw, Sparkles, Send, ArrowRight, Copy, Download, 
  Bot, User, FileEdit, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { updateUserPoints, addPointHistory, POINT_RULES } from '../utils/pointsSystem';

// Mock Data: Raw Meeting Transcript
const MEETING_TRANSCRIPT = `
[00:00] 主持人：大家好，今天我们主要讨论一下关于“智慧社区”试点项目的推进情况。首先请张工汇报一下目前的进度。
[00:15] 张工（技术部）：好的。目前我们已经完成了 3 个小区的硬件安装，包括人脸识别门禁和高空抛物监控。但是，数据对接这块遇到点问题，街道办的服务器接口文档更新不及时，导致我们部分数据无法实时上传。
[00:45] 李主任（街道办）：这个情况我知道，信息科的小王这周休假了。我记一下，明天让他回来先处理这个接口文档的事情，务必在周三前把新文档发给你们。
[01:10] 主持人：好的，接口文档是关键。另外，居民对新系统的反馈怎么样？
[01:20] 王姐（社区）：大部分居民是支持的，觉得安全了。但是也有几户老年人反映，人脸识别有时候不灵，特别是晚上光线不好的时候。
[01:35] 张工：这个我们注意到了，下周计划去现场加装补光灯，并升级一下识别算法，应该能解决。
[01:50] 主持人：行。那我们定一下接下来的重点：第一，李主任这边周三前搞定接口文档；第二，技术部下周五前完成补光灯加装和算法升级；第三，社区这边继续收集居民意见，半个月后我们再开会复盘。大家没意见吧？
[02:15] 众人：没意见。
`;

export default function Workshop() {
  const [activeTab, setActiveTab] = useState('requirements'); // requirements, materials
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // idle, submitting, success, fail
  
  // Simulate AI Streaming
  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedContent('');
    setActiveTab('preview'); // Auto switch to preview to see result

    // Mock AI Response
    const targetContent = `## 智慧社区项目推进会议纪要

**会议时间**：2024年5月20日
**参会人员**：主持人、张工（技术部）、李主任（街道办）、王姐（社区）

### 一、 会议核心议题
本次会议主要围绕“智慧社区”试点项目的硬件安装进度、数据对接问题及居民反馈进行讨论与部署。

### 二、 核心决议与待办事项
| 待办事项 | 责任人 | 截止时间 | 备注 |
| :--- | :--- | :--- | :--- |
| **更新服务器接口文档** | 李主任（街道办） | 本周三前 | 需联系信息科小王处理 |
| **加装补光灯及升级算法** | 张工（技术部） | 下周五前 | 解决夜间识别率低问题 |
| **持续收集居民反馈** | 王姐（社区） | 持续进行 | 半月后复盘 |

### 三、 问题摘要
1. **数据对接**：因接口文档更新滞后，导致部分数据无法实时上传。
2. **设备体验**：部分老年居民反映夜间人脸识别不灵敏。

---
*生成模型：DeepSeek-V2 | 耗时：2.3s*`;

    let i = 0;
    const interval = setInterval(() => {
      setGeneratedContent(targetContent.slice(0, i));
      i += 5; // Speed of typing
      if (i > targetContent.length) {
        clearInterval(interval);
        setIsGenerating(false);
      }
    }, 30);
  };

  const handleSubmit = () => {
    setSubmissionStatus('submitting');
    setTimeout(() => {
      // Simple validation: Check if content contains key keywords
      if (generatedContent.includes('李主任') && generatedContent.includes('周三')) {
        setSubmissionStatus('success');
        
        // 更新积分
        const newPointsData = updateUserPoints(POINT_RULES.TASK_COMPLETE);
        
        // 添加积分历史记录
        addPointHistory(
          'TASK_COMPLETE',
          POINT_RULES.TASK_COMPLETE.points,
          '完成效能跃升任务：生成会议纪要初稿'
        );
        
        // 触发全局事件，通知其他组件积分已更新
        window.dispatchEvent(new Event('pointsUpdated'));
        
        console.log('✅ 任务完成，积分已更新:', newPointsData);
      } else {
        setSubmissionStatus('fail');
      }
    }, 1500);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50 font-sans">
      
      {/* --- Left Column: Context & Materials --- */}
      <div className="w-[40%] min-w-[400px] bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        {/* Header Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('requirements')}
            className={`flex-1 py-4 text-sm font-bold transition-colors relative ${activeTab === 'requirements' ? 'text-blue-700 bg-blue-50/50' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FileText className="w-4 h-4 inline-block mr-2" />
            任务要求
            {activeTab === 'requirements' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('materials')}
            className={`flex-1 py-4 text-sm font-bold transition-colors relative ${activeTab === 'materials' ? 'text-blue-700 bg-blue-50/50' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <FileEdit className="w-4 h-4 inline-block mr-2" />
            会议录音文本
            {activeTab === 'materials' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>}
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {activeTab === 'requirements' ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">场景背景</h3>
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-blue-900 text-sm leading-relaxed">
                  你是一名街道办的工作人员。刚刚结束了一场关于“智慧社区”项目的推进会，领导要求你立刻整理出一份<b>结构清晰</b>的会议纪要，并明确<b>待办事项（To-Do List）</b>。
                </div>
              </section>

              <section>
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-3">考核要点</h3>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>提取会议核心议题</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>准确识别 3 个关键待办事项（责任人+截止时间）</span>
                  </li>
                  <li className="flex gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span>格式规范，包含表格形式的任务清单</span>
                  </li>
                </ul>
              </section>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900">录音转写文本 (Raw Text)</h3>
                <button className="text-xs text-blue-600 hover:underline flex items-center gap-1">
                  <Copy className="w-3 h-3" /> 复制全文
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-sm text-gray-700 leading-loose font-mono whitespace-pre-wrap">
                {MEETING_TRANSCRIPT}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --- Right Column: AI Workbench --- */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FA]">
        
        {/* Safety Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-6 py-2 flex items-center justify-center gap-2 text-amber-800 text-xs font-medium">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>数据安全提示：本环境为模拟沙箱，请勿输入真实涉密数据。</span>
        </div>

        <div className="flex-1 flex flex-col p-6 gap-6 overflow-hidden">
          
          {/* 1. Prompt Input Area */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-1 flex-shrink-0">
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-sm font-bold text-gray-800">AI 指令输入 (Prompt)</span>
              </div>
              <textarea 
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="请输入指令，例如：'请帮我总结这份会议记录，提取出待办事项，用表格形式展示...'"
                className="w-full h-24 p-3 bg-gray-50 rounded-xl border border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none text-sm outline-none"
              ></textarea>
            </div>
            <div className="bg-gray-50 px-4 py-2 rounded-b-xl border-t border-gray-100 flex justify-between items-center">
              <div className="flex gap-2">
                <button 
                  onClick={() => setPrompt("请阅读上述会议录音，整理一份会议纪要。要求：\n1. 包含会议时间、地点、人物。\n2. 总结核心议题。\n3. 将待办事项整理为表格（包含任务、责任人、截止时间）。")}
                  className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:text-blue-600 hover:border-blue-200 transition-colors"
                >
                  ✨ 插入推荐提示词
                </button>
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all shadow-lg shadow-blue-200"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    生成中...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    开始生成
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Result Preview Area */}
          <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-200 flex flex-col overflow-hidden relative">
            <div className="px-6 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-bold text-gray-700">生成结果预览</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Copy className="w-4 h-4" />
                </button>
                <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto bg-white">
              {generatedContent ? (
                <div className="prose prose-sm max-w-none text-gray-800">
                  <div className="whitespace-pre-wrap font-sans leading-relaxed">
                    {generatedContent}
                    {isGenerating && <span className="inline-block w-2 h-4 bg-blue-600 ml-1 animate-pulse"></span>}
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-300">
                  <Bot className="w-16 h-16 mb-4 opacity-20" />
                  <p className="text-sm">在上方输入指令并点击生成，AI 将在此处输出结果</p>
                </div>
              )}
            </div>

            {/* Submit Bar (Overlay at bottom) */}
            {generatedContent && !isGenerating && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-in slide-in-from-bottom-4 fade-in duration-500">
                <button 
                  onClick={handleSubmit}
                  disabled={submissionStatus === 'submitting'}
                  className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2"
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      正在提交...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      提交作业成果
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* --- Success/Fail Modals (Reused from previous version) --- */}
      {submissionStatus === 'success' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
            <div className="bg-green-50 p-8 flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">实操通过！</h3>
              <p className="text-sm text-gray-600 mt-2">
                您已成功掌握“会议纪要生成”的 Prompt 技巧。
              </p>
              <div className="mt-4 px-4 py-2 bg-white rounded-full border border-green-200 text-green-700 font-bold text-sm shadow-sm flex items-center gap-2">
                <span>实操能力 +1</span>
                <span className="w-1 h-1 bg-green-300 rounded-full"></span>
                <span>积分 +20</span>
              </div>
            </div>
            <div className="p-6 border-t border-gray-100">
              <Link 
                to="/video/201?t=740&completed=task_740"
                className="w-full py-3 bg-green-600 hover:bg-green-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-green-200 transition-all flex items-center justify-center gap-2"
              >
                返回课程 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {submissionStatus === 'fail' && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden scale-100 animate-in zoom-in-95 duration-200">
            <div className="bg-red-50 p-6 flex flex-col items-center text-center border-b border-red-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">结果未达标</h3>
              <p className="text-sm text-gray-600 mt-2">
                生成的纪要中似乎缺少了关键的“待办事项”或“责任人”信息。
              </p>
            </div>
            <div className="p-6">
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-100 mb-6">
                <h4 className="text-sm font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Bot className="w-4 h-4" />
                  AI 建议
                </h4>
                <p className="text-xs text-blue-800 leading-relaxed">
                  尝试在 Prompt 中更明确地指示 AI：“请提取出具体的待办事项、责任人和截止时间，并以表格形式列出。”
                </p>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={() => setSubmissionStatus('idle')}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-bold rounded-lg transition-colors"
                >
                  调整 Prompt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
