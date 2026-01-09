import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { ChevronLeft, Heart, Share2, MessageSquare, Star, ThumbsUp, Send, PlayCircle, X, MoreHorizontal, Play, Pause, Maximize, Minimize, Lock, Unlock, Plus, Check, Folder, Volume2, Settings2 } from 'lucide-react';
import useBookmarks from '../../hooks/useBookmarks';

import MobileStatusBar from './MobileStatusBar';

export default function MobileVideoDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.highlightCommentId) {
      setActiveTab('comments');
      // Wait for tab switch and render
      setTimeout(() => {
        const element = document.getElementById(`comment-${location.state.highlightCommentId}`);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Add highlight effect
          element.style.backgroundColor = '#eff6ff'; // blue-50
          setTimeout(() => {
            element.style.backgroundColor = '';
          }, 2000);
        }
      }, 300);
    }
  }, [location.state]);
  const [activeTab, setActiveTab] = useState('intro');
  const [isLiked, setIsLiked] = useState(false);
  const { isBookmarked, addBookmark, removeBookmark, bookmarks } = useBookmarks(id);
  const [showFavoriteDrawer, setShowFavoriteDrawer] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('默认收藏夹');
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [newFolderInput, setNewFolderInput] = useState('');
  
  // Derive unique folders from existing bookmarks
  const existingFolders = ['默认收藏夹', ...new Set(bookmarks.map(b => b.folder).filter(f => f && f !== '默认收藏夹'))];

  const handleFavoriteClick = () => {
    if (isBookmarked) {
      removeBookmark(id);
    } else {
      setShowFavoriteDrawer(true);
    }
  };

  const confirmFavorite = () => {
    const folder = isCreatingFolder ? (newFolderInput.trim() || '默认收藏夹') : selectedFolder;
    addBookmark({
      videoId: id,
      title: '2025最新AI大模型全栈工程师实战课程：从零基础到独立开发 Agent',
      thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
      duration: '45:20',
      folder: folder,
      date: new Date().toISOString().split('T')[0]
    });
    setShowFavoriteDrawer(false);
    setIsCreatingFolder(false);
    setNewFolderInput('');
  };
  const [danmakuInput, setDanmakuInput] = useState('');
  const [danmakuList, setDanmakuList] = useState([
    { id: 1, text: '干货满满', top: '10%', left: '100%', speed: 15 },
    { id: 2, text: '终于听懂了Transformer', top: '20%', left: '120%', speed: 12 },
    { id: 3, text: 'AI改变世界，未来已来', top: '35%', left: '140%', speed: 18 },
    { id: 4, text: '讲师讲得太好了', top: '50%', left: '160%', speed: 14 },
    { id: 5, text: '记笔记记笔记', top: '65%', left: '180%', speed: 16 },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [showDanmaku, setShowDanmaku] = useState(true);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [resolution, setResolution] = useState('1080P');
  const [showResolutionMenu, setShowResolutionMenu] = useState(false);
  const [showSeriesDrawer, setShowSeriesDrawer] = useState(false);
  const [currentEpisode, setCurrentEpisode] = useState(1);

  const [currentIntroIndex, setCurrentIntroIndex] = useState(0);
  
  // Danmaku Settings
  const [showDanmakuSettings, setShowDanmakuSettings] = useState(false);
  const [danmakuOpacity, setDanmakuOpacity] = useState(100);
  const [danmakuArea, setDanmakuArea] = useState('full'); // full, half, quarter
  
  // Volume Settings
  const [volume, setVolume] = useState(100);
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  const controlTimeoutRef = useRef(null);
  const videoContainerRef = useRef(null);
  const duration = 2720; // 45:20

  const introTexts = [
    "本课程深入浅出地讲解了Transformer的核心原理",
    "从Attention机制到Self-Attention的详细推导",
    "结合代码实战，让你真正掌握大模型开发",
    "适合所有想要入门AI大模型的开发者"
  ];

  const resolutions = ['1080P', '720P', '480P', '360P'];

  const episodes = [
    { id: 1, title: '第 1 节', subtitle: 'AI 发展史与基础' },
    { id: 2, title: '第 2 节', subtitle: '环境搭建 (Conda/CUDA)' },
    { id: 3, title: '第 3 节', subtitle: 'Transformer 核心原理' },
    { id: 4, title: '第 4 节', subtitle: 'BERT 与预训练模型' },
    { id: 5, title: '第 5 节', subtitle: 'GPT 架构演进' },
    { id: 6, title: '第 6 节', subtitle: 'Prompt Engineering 指南' },
    { id: 7, title: '第 7 节', subtitle: 'LangChain 框架基础' },
    { id: 8, title: '第 8 节', subtitle: 'RAG 检索增强生成' },
    { id: 9, title: '第 9 节', subtitle: '向量数据库实战' },
    { id: 10, title: '第 10 节', subtitle: 'Agent 智能体开发' },
    { id: 11, title: '第 11 节', subtitle: '大模型微调 (LoRA)' },
    { id: 12, title: '第 12 节', subtitle: '模型部署与优化' },
  ];

  const resetControlTimeout = () => {
    if (controlTimeoutRef.current) {
      clearTimeout(controlTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      controlTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 2000);
    }
  };

  const handleInteraction = () => {
    resetControlTimeout();
  };

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (isLocked) return; // Prevent play toggle if locked
    if (showSpeedMenu || showResolutionMenu || showDanmakuSettings || showVolumeControl) {
      setShowSpeedMenu(false);
      setShowResolutionMenu(false);
      setShowDanmakuSettings(false);
      setShowVolumeControl(false);
      return;
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    if (isPlaying) {
      resetControlTimeout();
    } else {
      setShowControls(true);
      if (controlTimeoutRef.current) clearTimeout(controlTimeoutRef.current);
    }
  }, [isPlaying]);

  // Intro Carousel Effect
  useEffect(() => {
    if (!isFullscreen) return;
    const interval = setInterval(() => {
      setCurrentIntroIndex(prev => (prev + 1) % introTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isFullscreen]);

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };



  const toggleDanmakuSettings = (e) => {
    e.stopPropagation();
    setShowDanmakuSettings(!showDanmakuSettings);
    setShowSpeedMenu(false);
    setShowResolutionMenu(false);
    setShowVolumeControl(false);
  };

  // Gesture State
  const [touchStart, setTouchStart] = useState(null);
  const [touchMove, setTouchMove] = useState(null);
  const [gestureAction, setGestureAction] = useState(null); // 'seek', 'volume', 'brightness'
  const [gestureValue, setGestureValue] = useState(null); // Display value for overlay
  const lastTapRef = useRef(0);
  const [brightness, setBrightness] = useState(100);

  // Handle Touch Gestures
  const handleTouchStart = (e) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
      time: Date.now(),
      initialTime: currentTime,
      initialVolume: volume,
      initialBrightness: brightness
    });
    
    // Double Tap Detection
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      togglePlay();
      setGestureAction('play-toggle');
      setTimeout(() => setGestureAction(null), 500);
    }
    lastTapRef.current = now;
  };

  const processGestureMove = (currentX, currentY) => {
    if (!touchStart || isLocked) return;
    
    const deltaX = currentX - touchStart.x;
    const deltaY = touchStart.y - currentY; // Up is positive
    
    setTouchMove({ x: currentX, y: currentY });

    // Determine gesture type if not already set
    if (!gestureAction) {
      if (Math.abs(deltaX) > 10 && Math.abs(deltaY) < 10) {
        setGestureAction('seek');
      } else if (Math.abs(deltaY) > 10 && Math.abs(deltaX) < 10) {
        // Left side brightness, Right side volume
        const screenWidth = window.innerWidth;
        if (touchStart.x < screenWidth / 2) {
          setGestureAction('brightness');
        } else {
          setGestureAction('volume');
        }
      }
    }

    // Execute Action
    if (gestureAction === 'seek') {
      const seekDelta = (deltaX / window.innerWidth) * 180; // 180s max seek per swipe
      const newTime = Math.max(0, Math.min(duration, touchStart.initialTime + seekDelta));
      setCurrentTime(newTime);
      setGestureValue(`${seekDelta > 0 ? '+' : ''}${Math.round(seekDelta)}s`);
    } else if (gestureAction === 'volume') {
      const volDelta = (deltaY / window.innerHeight) * 100;
      const newVol = Math.max(0, Math.min(100, touchStart.initialVolume + volDelta));
      setVolume(newVol);
      setGestureValue(`${Math.round(newVol)}%`);
    } else if (gestureAction === 'brightness') {
      const brightDelta = (deltaY / window.innerHeight) * 100;
      const newBright = Math.max(0, Math.min(100, touchStart.initialBrightness + brightDelta));
      setBrightness(newBright);
      setGestureValue(`${Math.round(newBright)}%`);
    }
  };

  const handleTouchMove = (e) => {
    processGestureMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  // Mouse Handlers for PC Testing
  const handleMouseDown = (e) => {
    setTouchStart({
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
      initialTime: currentTime,
      initialVolume: volume,
      initialBrightness: brightness
    });
    
    // Double Click Detection
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      togglePlay();
      setGestureAction('play-toggle');
      setTimeout(() => setGestureAction(null), 500);
    }
    lastTapRef.current = now;
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 0) {
      if (touchStart) handleTouchEnd();
      return;
    }
    processGestureMove(e.clientX, e.clientY);
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
    setTouchMove(null);
    setGestureAction(null);
    setGestureValue(null);
    resetControlTimeout();
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev < duration ? prev + 1 * playbackRate : duration));
      }, 1000 / playbackRate);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    setCurrentTime(Math.floor(percentage * duration));
  };

  const handleSendDanmaku = () => {
    if (!danmakuInput.trim()) return;
    const maxTop = danmakuArea === 'quarter' ? 20 : danmakuArea === 'half' ? 45 : 80;
    const newDanmaku = {
      id: Date.now(),
      text: danmakuInput,
      top: `${Math.random() * maxTop}%`,
      left: '100%',
      speed: 10 + Math.random() * 10,
      isSelf: true,
    };
    setDanmakuList([...danmakuList, newDanmaku]);
    setDanmakuInput('');
  };

  return (
    <div className="min-h-screen bg-[#f1f2f3] text-black flex flex-col max-w-[480px] mx-auto shadow-2xl">
      {/* 顶部固定区域 */}
      <div className="sticky top-0 z-50 bg-white">
        <div className="bg-black">
          <MobileStatusBar theme="dark" />
        </div>
        {/* 沉浸式播放器区域 */}
        <div 
          ref={videoContainerRef}
          className={`w-full bg-black relative shadow-lg overflow-hidden group select-none ${isFullscreen ? 'fixed inset-0 z-[100] h-screen' : 'aspect-video'}`}
          onClick={handleInteraction}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleTouchEnd}
          onMouseLeave={handleTouchEnd}
          style={{ filter: `brightness(${brightness}%)` }}
        >
          {/* 视频背景 (模拟) */}
          <img 
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
            className={`absolute inset-0 w-full h-full transition-all duration-300 ${isFullscreen ? 'object-contain' : 'object-cover'} opacity-80`}
            alt="Video Cover"
            draggable="false"
          />

          {/* 顶部轮播简介 (仅全屏显示) */}
          {isFullscreen && showControls && !isLocked && (
            <div className="absolute top-4 left-14 right-16 z-20 overflow-hidden h-6 pointer-events-none">
              <div 
                className="transition-transform duration-500 ease-in-out"
                style={{ transform: `translateY(-${currentIntroIndex * 100}%)` }}
              >
                {introTexts.map((text, index) => (
                  <div key={index} className="h-6 flex items-center text-sm text-white/90 font-medium text-shadow-md whitespace-nowrap overflow-hidden text-ellipsis">
                    {text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 返回按钮 */}
          {!isLocked && (
            <button 
              onClick={(e) => { e.stopPropagation(); isFullscreen ? toggleFullscreen(e) : navigate(-1); }}
              className={`absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-sm rounded-full z-20 active:scale-95 transition-transform ${showControls ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
          )}

          {/* 屏幕锁定按钮 */}
          {isFullscreen && (
             <button
               onClick={(e) => {
                 e.stopPropagation();
                 setIsLocked(!isLocked);
                 resetControlTimeout();
               }}
               className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/40 backdrop-blur-sm rounded-full z-30 active:scale-95 transition-all duration-300 ${showControls ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}`}
             >
               {isLocked ? (
                 <Lock className="w-6 h-6 text-blue-400" />
               ) : (
                 <Unlock className="w-6 h-6 text-white" />
               )}
             </button>
          )}
          
          {/* 播放/暂停 居中按钮 */}
          {!isPlaying && !isLocked && (
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
              <button
                onClick={togglePlay}
                className="w-12 h-12 bg-blue-600/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl pointer-events-auto"
              >
                <Play className="w-5 h-5 text-white ml-1" fill="currentColor" />
              </button>
            </div>
          )}

          {/* 弹幕层 */}
          {showDanmaku && isPlaying && (
            <div 
              className="absolute inset-x-0 top-0 z-0 pointer-events-none overflow-hidden transition-all duration-300"
              style={{ 
                opacity: danmakuOpacity / 100,
                height: danmakuArea === 'quarter' ? '25%' : danmakuArea === 'half' ? '50%' : '100%',
                maskImage: 'linear-gradient(to bottom, black 90%, transparent 100%)'
              }}
            >
              {danmakuList.map((dm) => (
                <div
                  key={dm.id}
                  className={`absolute whitespace-nowrap text-shadow-md font-medium text-sm ${dm.isSelf ? 'text-blue-400 border border-blue-400 px-2 rounded-full' : 'text-white/90'}`}
                  style={{
                    top: dm.top,
                    left: dm.left,
                    animation: `danmaku-move ${dm.speed / playbackRate}s linear infinite`,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.8)'
                  }}
                >
                  {dm.text}
                </div>
              ))}
            </div>
          )}

          {/* Gesture Feedback Overlay */}
          {gestureAction && gestureValue && (
            <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
              <div className="bg-black/60 backdrop-blur-sm px-6 py-3 rounded-xl text-white font-bold text-xl flex items-center gap-3">
                {gestureAction === 'volume' && <Volume2 className="w-6 h-6" />}
                {gestureAction === 'brightness' && <div className="w-6 h-6 border-2 border-white rounded-full border-dashed animate-spin-slow" />}
                {gestureAction === 'seek' && (gestureValue.includes('+') ? <div className="rotate-0">⏩</div> : <div className="rotate-180">⏩</div>)}
                {gestureAction === 'play-toggle' && (isPlaying ? <Play className="w-8 h-8 fill-white"/> : <Pause className="w-8 h-8 fill-white"/>)}
                <span>{gestureValue}</span>
                {gestureAction === 'seek' && <span className="text-sm font-normal opacity-80 ml-2">{formatTime(currentTime)}</span>}
              </div>
            </div>
          )}

          {/* 底部控制栏 */}
          {!isLocked && (
            <div 
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
              onClick={(e) => e.stopPropagation()}
            >
            {/* 进度条 */}
            <div 
              className="relative w-full h-1 bg-white/30 rounded-full mb-3 cursor-pointer touch-none"
              onClick={handleProgressClick}
            >
              <div 
                className="absolute top-0 left-0 h-full bg-blue-500 rounded-full relative"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              >
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-sm scale-100" />
              </div>
            </div>

            {/* 按钮与时间 */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-4">
                <button onClick={togglePlay}>
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current" />
                  )}
                </button>
                <span className="text-xs font-medium opacity-90">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>
              
              <div className="flex items-center gap-4">
                {/* 音量控制 */}
                <div className="relative">
                  {showVolumeControl && (
                    <div 
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-black/90 backdrop-blur-md rounded-lg p-3 border border-white/10 shadow-xl z-50 flex flex-col items-center h-32"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="text-xs text-white/80 mb-2">{volume}%</div>
                      <div className="h-24 w-8 flex items-center justify-center relative">
                        {/* Background Track */}
                        <div className="absolute w-1 h-full bg-white/20 rounded-full overflow-hidden">
                           <div 
                             className="absolute bottom-0 left-0 w-full bg-blue-500 transition-all"
                             style={{ height: `${volume}%` }}
                           />
                        </div>
                        
                        {/* Slider Input */}
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={volume} 
                          onChange={(e) => setVolume(e.target.value)}
                          className="absolute w-24 h-8 opacity-0 cursor-pointer -rotate-90"
                          style={{ transformOrigin: 'center' }}
                        />
                      </div>
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowVolumeControl(!showVolumeControl);
                      setShowSpeedMenu(false);
                      setShowResolutionMenu(false);
                      setShowDanmakuSettings(false);
                    }}
                    className={`transition-colors flex items-center justify-center ${showVolumeControl ? 'text-blue-400' : 'text-white/90'}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* 弹幕设置 */}
                <div className="relative">
                  {showDanmakuSettings && (
                    <div 
                      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-black/90 backdrop-blur-md rounded-xl overflow-hidden flex flex-col w-64 p-4 border border-white/10 shadow-2xl z-50 animate-fade-in"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-2">
                        <span className="text-sm font-bold text-white">弹幕设置</span>
                        <button onClick={() => setShowDanmakuSettings(false)}>
                          <X className="w-4 h-4 text-white/60 hover:text-white" />
                        </button>
                      </div>
                      
                      {/* 开关 */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs text-white/80">显示弹幕</span>
                        <button 
                          onClick={() => setShowDanmaku(!showDanmaku)}
                          className={`w-10 h-5 rounded-full relative transition-colors ${showDanmaku ? 'bg-blue-600' : 'bg-white/20'}`}
                        >
                          <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-all ${showDanmaku ? 'left-6' : 'left-1'}`} />
                        </button>
                      </div>

                      {/* 不透明度 */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-white/60 mb-1">
                          <span>不透明度</span>
                          <span>{danmakuOpacity}%</span>
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max="100" 
                          value={danmakuOpacity} 
                          onChange={(e) => setDanmakuOpacity(e.target.value)}
                          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                      </div>

                      {/* 显示区域 */}
                      <div>
                        <div className="text-xs text-white/60 mb-2">显示区域</div>
                        <div className="flex bg-white/10 rounded-lg p-1">
                          {['full', 'half', 'quarter'].map((area) => (
                            <button
                              key={area}
                              onClick={() => setDanmakuArea(area)}
                              className={`flex-1 py-1 text-[10px] rounded-md transition-all ${
                                danmakuArea === area 
                                  ? 'bg-blue-600 text-white shadow-sm' 
                                  : 'text-white/60 hover:text-white'
                              }`}
                            >
                              {area === 'full' ? '满屏' : area === 'half' ? '半屏' : '1/4'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <button 
                    onClick={toggleDanmakuSettings} 
                    className={`flex items-center justify-center transition-colors ${showDanmaku ? 'text-blue-400' : 'text-white/70'}`}
                  >
                     <div className="border border-current rounded px-1 text-[10px] font-medium leading-tight">弹</div>
                  </button>
                </div>

                {/* 倍速 */}
                <div className="relative">
                  {showSpeedMenu && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col w-16 py-1 border border-white/10 shadow-xl">
                      {[2.0, 1.5, 1.25, 1.0, 0.75].map((rate) => (
                        <button
                          key={rate}
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlaybackRate(rate);
                            setShowSpeedMenu(false);
                          }}
                          className={`py-2 w-full text-xs font-medium transition-colors ${
                            playbackRate === rate ? 'text-blue-500 bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowSpeedMenu(!showSpeedMenu);
                    }} 
                    className={`text-xs font-medium w-8 text-center transition-colors ${showSpeedMenu ? 'text-blue-400' : 'text-white/90'}`}
                  >
                    {playbackRate === 1.0 ? '倍速' : `${playbackRate}x`}
                  </button>
                </div>

                {/* 清晰度 */}
                <div className="relative">
                  {showResolutionMenu && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 bg-black/90 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col w-16 py-1 border border-white/10 shadow-xl z-40">
                      {resolutions.map((res) => (
                        <button
                          key={res}
                          onClick={(e) => {
                            e.stopPropagation();
                            setResolution(res);
                            setShowResolutionMenu(false);
                          }}
                          className={`py-2 w-full text-xs font-medium transition-colors ${
                            resolution === res ? 'text-blue-500 bg-white/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  )}
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowResolutionMenu(!showResolutionMenu);
                      setShowSpeedMenu(false);
                    }} 
                    className={`text-xs font-medium min-w-[3rem] text-center transition-colors ${showResolutionMenu ? 'text-blue-400' : 'text-white/90'}`}
                  >
                    {resolution}
                  </button>
                </div>

                <button onClick={toggleFullscreen}>
                  {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
          )}
          </div>

        {/* 导航栏与弹幕输入 */}
        <div className="flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab('intro')}
            className={`text-[15px] font-medium relative ${activeTab === 'intro' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            简介
            {activeTab === 'intro' && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full" />}
          </button>
          <button 
            onClick={() => setActiveTab('comments')}
            className={`text-[15px] font-medium relative ${activeTab === 'comments' ? 'text-blue-600' : 'text-gray-600'}`}
          >
            评论 <span className="text-xs text-gray-400 font-normal">8288</span>
            {activeTab === 'comments' && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-blue-600 rounded-full" />}
          </button>
        </div>
        
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1.5 w-40">
          <input 
            type="text" 
            placeholder="点我发弹幕" 
            className="bg-transparent text-xs text-gray-600 placeholder-gray-400 outline-none flex-1 min-w-0"
            value={danmakuInput}
            onChange={(e) => setDanmakuInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendDanmaku()}
          />
          <button onClick={handleSendDanmaku}>
            <Send className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="flex-1 overflow-y-auto bg-white">
        {activeTab === 'intro' && (
          <div className="pb-8">
            {/* 视频信息 */}
            <div className="p-4 pb-2">
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-base font-medium leading-snug text-gray-900 line-clamp-2">
                  2025最新AI大模型全栈工程师实战课程：从零基础到独立开发 Agent
                </h1>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
                <div className="flex items-center gap-1">
                  <PlayCircle className="w-3 h-3" />
                  <span>12.5万</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>8.6万</span>
                </div>

              </div>

              {/* 操作按钮栏 */}
              <div className="flex items-center justify-between px-4 py-2 mb-4">
                <ActionButton 
                  icon={ThumbsUp} 
                  label="23.4万" 
                  isActive={isLiked} 
                  onClick={() => setIsLiked(!isLiked)} 
                  activeColor="text-blue-600"
                />
                <ActionButton 
                  icon={Star} 
                  label={isBookmarked ? "已收藏" : "收藏"} 
                  isActive={isBookmarked} 
                  onClick={handleFavoriteClick} 
                  activeColor="text-yellow-500"
                />
                <ActionButton 
                  icon={Share2} 
                  label="2478" 
                  isActive={false} 
                  onClick={() => {}} 
                />
              </div>
            </div>

              {/* 选集 (系列目录) */}
            <div className="border-t border-gray-100 pt-3">
              <div 
                className="flex items-center justify-between px-4 mb-3 cursor-pointer active:opacity-70 transition-opacity"
                onClick={() => setShowSeriesDrawer(true)}
              >
                <h3 className="text-sm font-medium text-gray-900">课程目录</h3>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>共 12 节</span>
                  <ChevronLeft className="w-3 h-3 rotate-180" />
                </div>
              </div>
              
              {/* 横向滚动列表 */}
              <div className="flex overflow-x-auto px-4 gap-3 pb-2 scrollbar-hide">
                {episodes.map((ep) => (
                  <SeriesItem 
                    key={ep.id} 
                    index={ep.id} 
                    title={ep.title} 
                    subtitle={ep.subtitle} 
                    isActive={currentEpisode === ep.id}
                    onClick={() => setCurrentEpisode(ep.id)}
                  />
                ))}
              </div>
            </div>

            {/* 推荐视频 (占位) */}
            <div className="mt-4 px-4">
              <h3 className="text-sm font-medium text-gray-900 mb-3">更多推荐</h3>
              <div className="flex flex-col gap-4">
                {[
                  { title: 'Stable Diffusion 终极绘画指南', time: '12:30', views: '8.2w', cover: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&q=80' },
                  { title: 'Midjourney 商业变现实战', time: '08:45', views: '5.1w', cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' },
                  { title: 'Python 零基础快速入门', time: '15:20', views: '3.3w', cover: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80' },
                  { title: 'LangChain 开发实战案例', time: '18:10', views: '2.8w', cover: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 group active:bg-gray-50 transition-colors rounded-lg">
                    {/* 左侧封面 */}
                    <div className="relative w-32 h-20 flex-shrink-0 bg-gray-200 rounded-lg overflow-hidden">
                      <img src={item.cover} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute bottom-1 right-1 text-[10px] text-white bg-black/60 px-1 rounded backdrop-blur-sm">
                        {item.time}
                      </span>
                    </div>
                    {/* 右侧信息 */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
                      <div className="text-sm text-gray-900 font-medium line-clamp-2 leading-snug">
                        {item.title}
                      </div>
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        <span>技术部培训中心</span>
                        <span>·</span>
                        <span>{item.views}播放</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 评论内容 */}
        {activeTab === 'comments' && (
          <div className="bg-white min-h-[300px]">
            {/* 热门评论/最新评论 切换栏 (简化版) */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
              <div className="text-sm font-medium text-gray-900">热门评论</div>
              <div className="flex items-center gap-4 text-xs text-gray-500">
                <span className="text-gray-900 font-medium">按热度</span>
                <span>按时间</span>
              </div>
            </div>

            {/* 评论列表 */}
            <div className="divide-y divide-gray-50">
              {dummyComments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
            
            {/* 底部提示 */}
            <div className="py-8 text-center text-xs text-gray-400">
              - 到底啦 -
            </div>
          </div>
        )}
      </div>

      {/* Favorite Folder Drawer */}
      {showFavoriteDrawer && (
        <div className="fixed inset-0 z-[70] flex flex-col justify-end">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setShowFavoriteDrawer(false)}
          />
          
          <div className="relative bg-white rounded-t-2xl w-full max-w-[480px] mx-auto flex flex-col shadow-2xl animate-slide-up max-h-[70vh]">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-900">选择收藏夹</h3>
              <button 
                onClick={() => setShowFavoriteDrawer(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 overflow-y-auto">
              <div className="space-y-2">
                {existingFolders.map((folder) => (
                  <button
                    key={folder}
                    onClick={() => {
                      setSelectedFolder(folder);
                      setIsCreatingFolder(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
                      !isCreatingFolder && selectedFolder === folder
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-gray-100 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Folder className={`w-5 h-5 ${!isCreatingFolder && selectedFolder === folder ? 'fill-blue-200' : 'fill-gray-100'}`} />
                      <span className="font-medium">{folder}</span>
                    </div>
                    {!isCreatingFolder && selectedFolder === folder && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </button>
                ))}

                {/* Create New Folder Option */}
                {isCreatingFolder ? (
                  <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                      <Folder className="w-5 h-5 text-blue-600 fill-blue-200" />
                      <span className="text-sm font-medium text-blue-700">新建收藏夹</span>
                    </div>
                    <input
                      type="text"
                      autoFocus
                      placeholder="输入收藏夹名称"
                      className="w-full px-3 py-2 bg-white border border-blue-100 rounded-lg text-sm outline-none focus:border-blue-400"
                      value={newFolderInput}
                      onChange={(e) => setNewFolderInput(e.target.value)}
                    />
                  </div>
                ) : (
                  <button
                    onClick={() => setIsCreatingFolder(true)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-300 text-gray-500 hover:bg-gray-50 hover:border-gray-400 transition-all"
                  >
                    <div className="w-5 h-5 flex items-center justify-center rounded bg-gray-100">
                      <Plus className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-medium">新建收藏夹</span>
                  </button>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 pb-safe">
              <button
                onClick={confirmFavorite}
                disabled={isCreatingFolder && !newFolderInput.trim()}
                className="w-full py-3 bg-blue-600 text-white rounded-full font-bold text-sm active:scale-[0.98] transition-transform disabled:opacity-50 disabled:scale-100"
              >
                确认收藏
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Series Drawer (Popup) */}
      {showSeriesDrawer && (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-transparent"
            onClick={() => setShowSeriesDrawer(false)}
          />
          
          {/* Drawer Content */}
          <div className="relative bg-white rounded-t-2xl w-full max-w-[480px] mx-auto max-h-[50vh] flex flex-col shadow-2xl animate-slide-up">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <h3 className="text-base font-medium text-gray-900">课程目录 ({episodes.length})</h3>
              <button 
                onClick={() => setShowSeriesDrawer(false)}
                className="p-1 text-gray-400 hover:text-gray-600 active:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4">
              <div className="grid grid-cols-1 gap-2">
                {episodes.map((ep) => (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setCurrentEpisode(ep.id);
                      setShowSeriesDrawer(false);
                    }}
                    className={`flex items-center justify-between p-3 rounded-lg text-left transition-all ${
                      currentEpisode === ep.id 
                        ? 'bg-blue-50 border border-blue-100' 
                        : 'bg-gray-50 border border-transparent active:bg-gray-100'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-sm font-medium ${currentEpisode === ep.id ? 'text-blue-600' : 'text-gray-900'}`}>
                        {ep.title}
                      </span>
                      <span className={`text-xs ${currentEpisode === ep.id ? 'text-blue-400' : 'text-gray-500'}`}>
                        {ep.subtitle}
                      </span>
                    </div>
                    {currentEpisode === ep.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes danmaku-move {
          0% { transform: translateX(0); }
          100% { transform: translateX(-200%); }
        }
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

function ActionButton({ icon: Icon, label, isActive, onClick, activeColor = 'text-blue-500' }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1 ${isActive ? activeColor : 'text-gray-500'}`}
    >
      <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
      <span className="text-xs font-medium">{label}</span>
    </button>
  );
}

function SeriesItem({ index, title, subtitle, isActive, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`flex-shrink-0 w-32 rounded-lg p-3 flex flex-col justify-center relative border transition-all ${
        isActive 
          ? 'bg-blue-50 border-blue-200 shadow-sm' 
          : 'bg-gray-50 border-gray-100 active:bg-gray-100'
      }`}
    >
      <div className={`text-sm font-medium mb-1 ${isActive ? 'text-blue-700' : 'text-gray-900'}`}>{title}</div>
      <div className={`text-xs ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>{subtitle}</div>
    </button>
  );
}

function CommentItem({ comment }) {
  return (
    <div id={`comment-${comment.id}`} className={`flex gap-3 p-4 transition-colors duration-1000 ${comment.isHighlighted ? 'bg-blue-50' : ''}`}>
      {/* Avatar */}
      <div className="flex-shrink-0">
        <img src={comment.user.avatar} alt={comment.user.name} className="w-9 h-9 rounded-full border border-gray-100" />
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-medium ${comment.user.isVip ? 'text-blue-600' : 'text-gray-600'}`}>
            {comment.user.name}
          </span>
        </div>
        
        <div className="text-sm text-gray-800 leading-relaxed mb-2">
          {comment.content}
        </div>
        
        {/* Footer */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
          <span>{comment.date}</span>
          <div className="flex items-center gap-1 ml-auto">
             <ThumbsUp className="w-3.5 h-3.5" />
             <span>{comment.likes}</span>
          </div>
          <div className="flex items-center gap-1">
             <MessageSquare className="w-3.5 h-3.5" />
          </div>
          <div className="flex items-center gap-1">
             <MoreHorizontal className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="bg-gray-50 rounded p-2 text-xs space-y-1">
            {comment.replies.slice(0, 2).map(reply => (
              <div key={reply.id} className="leading-relaxed">
                <span className="text-blue-600 font-medium">{reply.user.name}</span>
                <span className="text-gray-600">：{reply.content}</span>
              </div>
            ))}
            {comment.replies.length > 2 && (
               <div className="text-blue-600 mt-1 font-medium">
                 共{comment.replies.length}条回复 &gt;
               </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const dummyComments = [
  {
    id: 1,
    user: {
      name: 'AI探索者',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
      level: 6,
      isVip: true
    },
    content: '这节课讲得太透彻了！特别是关于Transformer的Attention机制部分，配合动画演示瞬间明白了。',
    date: '12-20',
    likes: 342,
    replies: [
      {
        id: 11,
        user: { name: '代码搬运工', level: 4 },
        content: '确实，比我看过的其他教程都清晰。',
        likes: 12
      }
    ]
  },
  {
    id: 2,
    user: {
      name: 'PyTorch新手',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka',
      level: 3,
      isVip: false
    },
    content: '请问老师，环境配置那里我一直报错，提示CUDA版本不匹配，有遇到一样问题的吗？',
    date: '12-21',
    likes: 56,
    replies: [
      {
        id: 21,
        user: { name: '热心网友A', level: 5 },
        content: '检查一下你的显卡驱动版本，可能需要更新。',
        likes: 5
      },
      {
        id: 22,
        user: { name: 'PyTorch新手', level: 3 },
        content: '更新了驱动还是不行，我再试试重装conda环境。',
        likes: 2
      },
      {
        id: 23,
        user: { name: '老司机', level: 6 },
        content: '去官网查一下PyTorch和CUDA版本的对应关系表，别下错了。',
        likes: 8
      },
      {
        id: 24,
        user: { name: 'AI路人', level: 2 },
        content: '我也遇到了，后来发现是系统环境变量没配好。',
        likes: 1
      }
    ]
  },
  {
    id: 3,
    user: {
      name: '大模型炼丹师',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
      level: 5,
      isVip: true
    },
    content: 'RAG那一部分讲得很好，但是希望能多给一些实战的代码案例，比如怎么结合LangChain使用。',
    date: '12-22',
    likes: 128,
    replies: []
  },
  {
    id: 4,
    user: {
      name: '学无止境',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Calvin',
      level: 2,
      isVip: false
    },
    content: '打卡！坚持学习第15天。',
    date: '12-23',
    likes: 15,
    replies: []
  },
  {
    id: 5,
    user: {
      name: 'TechLead',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      level: 6,
      isVip: true
    },
    content: '课程质量很高，期待后续的Agent开发实战章节。',
    date: '12-24',
    likes: 89,
    replies: []
  }
];
