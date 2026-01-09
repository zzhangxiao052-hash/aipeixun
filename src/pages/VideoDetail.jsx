import { useState, useEffect, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  ThumbsUp,
  Bookmark,
  Share2,
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  Maximize,
  Minimize,
  Settings,
  MessageSquare,
  Send,
  X,
  Plus,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Lock,
  List,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";
import BookmarkModal from "../components/BookmarkModal";
import ToolchainModule from "../components/ToolchainModule";

// Mock Data
const VIDEO_INFO = {
  id: 201,
  title: "DeepSeek 深度解析：国产大模型应用效能跃升",
  views: "12.5w",
  date: "2023-12-10",
  desc: "本课程深入解析 DeepSeek 大模型的架构与应用场景，重点讲解在公文写作、数据分析中的效能跃升技巧。",
  chapters: [
    { time: 10, label: "1. 模型架构简介" },
    { time: 35, label: "2. 提示词工程基础" },
    { time: 65, label: "3. 实际应用案例" },
    { time: 85, label: "4. 常见问题解答" },
  ],
  stats: { likes: 154, bookmarks: 32, shares: 20 },
};

const MOCK_DANMU = [
  { id: 1, time: 2, content: "前排围观！", color: "#ffffff" },
  { id: 2, time: 5, content: "DeepSeek 确实强！", color: "#ff0000" },
  { id: 3, time: 10, content: "这个讲师讲得很好", color: "#ffffff" },
  { id: 4, time: 15, content: "记笔记了记笔记了", color: "#ffff00" },
  { id: 5, time: 20, content: "BGM好评", color: "#ffffff" },
  { id: 6, time: 30, content: "干货满满", color: "#00ff00" },
  { id: 7, time: 45, content: "这就是国产之光吗", color: "#ffffff" },
  { id: 8, time: 60, content: "太强了", color: "#ffffff" },
  { id: 9, time: 75, content: "听不懂但大受震撼", color: "#ff00ff" },
  { id: 10, time: 90, content: "学到了学到了", color: "#ffffff" },
];

const COLLECTION_DATA = {
  title: "DeepSeek 大模型实战系列",
  total: 5,
  current: 2,
  list: [
    {
      id: 101,
      title: "01. DeepSeek 基础入门与环境搭建",
      duration: "15:30",
      status: "completed",
    },
    {
      id: 201,
      title: "02. DeepSeek 深度解析：国产大模型应用效能跃升",
      duration: "45:20",
      status: "playing",
    },
    {
      id: 103,
      title: "03. Prompt 提示词工程进阶指南",
      duration: "32:15",
      status: "normal",
    },
    {
      id: 104,
      title: "04. RAG 检索增强生成实战",
      duration: "28:40",
      status: "normal",
    },
    {
      id: 105,
      title: "05. Agent 智能体开发实战",
      duration: "40:10",
      status: "normal",
    },
  ],
};

const RELATED_VIDEOS = [
  {
    id: 1,
    title: "Prompt 提示词进阶指南",
    cover:
      "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=400&q=80",
    views: "8.2w",
  },
  {
    id: 2,
    title: "AI 绘图工具对比评测",
    cover:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80",
    views: "5.1w",
  },
  {
    id: 3,
    title: "数字化办公效率提升",
    cover:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=80",
    views: "3.3w",
  },
];

const CATEGORY_TITLES = {
  recommended: "为你推荐",
  cognitive: "前沿洞察",
  skill: "效能跃升",
  life: "场景创新",
};

export default function VideoDetail() {
  const [searchParams] = useSearchParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // In seconds
  const [showToast, setShowToast] = useState(false);
  const [showBookmarkModal, setShowBookmarkModal] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [stats, setStats] = useState(VIDEO_INFO.stats);
  const [directoryTab, setDirectoryTab] = useState("chapters"); // 'chapters' | 'collection'

  // Danmu State
  const [showDanmu, setShowDanmu] = useState(true);
  const [danmuOpacity, setDanmuOpacity] = useState(100);
  const [danmuArea, setDanmuArea] = useState(100); // % of height
  const [activeDanmu, setActiveDanmu] = useState([]);
  const [danmuInputValue, setDanmuInputValue] = useState("");
  const [showDanmuSettings, setShowDanmuSettings] = useState(false);

  // Video Settings State
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [quality, setQuality] = useState("1080P");
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [showQualityMenu, setShowQualityMenu] = useState(false);

  // Danmu Logic
  useEffect(() => {
    if (!isPlaying || !showDanmu) return;

    const currentSeconds = Math.floor(currentTime);
    const newDanmu = MOCK_DANMU.filter((d) => d.time === currentSeconds);

    if (newDanmu.length > 0) {
      newDanmu.forEach((d) => {
        // Check if already added to avoid duplicates in strict mode or re-renders
        setActiveDanmu((prev) => {
          if (prev.some((p) => p.id === d.id)) return prev;
          const top = Math.floor(Math.random() * (danmuArea - 10)) + "%";
          return [...prev, { ...d, top, uniqueId: Date.now() + d.id }];
        });
      });
    }
  }, [currentTime, isPlaying, showDanmu, danmuArea]);

  // Cleanup finished danmu
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDanmu((prev) => {
        const now = Date.now();
        // Assume animation takes 8s, remove older ones
        // In a real app, use onAnimationEnd
        return prev.filter((d) => now - d.uniqueId < 10000); // Keep for 10s to be safe
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSendDanmu = (e) => {
    e.preventDefault();
    if (!danmuInputValue.trim()) return;

    const newDanmu = {
      id: Date.now(),
      time: Math.floor(currentTime),
      content: danmuInputValue,
      color: "#ffffff",
      isSelf: true, // Mark as self-sent
    };

    // Add to active immediately
    setActiveDanmu((prev) => [
      ...prev,
      {
        ...newDanmu,
        top: Math.floor(Math.random() * (danmuArea - 10)) + "%",
        uniqueId: Date.now(),
      },
    ]);

    setDanmuInputValue("");
    // In real app, send to server here
  };

  // 简化的收藏状态管理 - 直接操作 localStorage
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 检查是否已收藏
  useEffect(() => {
    const checkBookmark = () => {
      try {
        const data = localStorage.getItem("user_assets");
        if (data) {
          const bookmarks = JSON.parse(data);
          const exists = bookmarks.some(
            (b) => String(b.videoId) === String(VIDEO_INFO.id)
          );
          setIsBookmarked(exists);
        }
      } catch (error) {
        console.error("检查收藏状态失败:", error);
      }
    };
    checkBookmark();
  }, []);

  // 删除收藏的函数
  const handleRemoveBookmark = () => {
    try {
      console.log("开始删除收藏, videoId:", VIDEO_INFO.id);

      // 读取当前数据
      const data = localStorage.getItem("user_assets");
      if (!data) {
        console.log("没有收藏数据");
        return;
      }

      const bookmarks = JSON.parse(data);
      console.log("删除前数量:", bookmarks.length);

      // 过滤掉当前视频的所有收藏(包括重复的)
      const updated = bookmarks.filter(
        (b) => String(b.videoId) !== String(VIDEO_INFO.id)
      );
      console.log("删除后数量:", updated.length);
      console.log("删除了", bookmarks.length - updated.length, "个收藏");

      // 保存
      localStorage.setItem("user_assets", JSON.stringify(updated));

      // 立即更新状态
      setIsBookmarked(false);

      alert("删除成功!");
    } catch (error) {
      console.error("删除失败:", error);
      alert("删除失败: " + error.message);
    }
  };

  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef(null);
  const videoContainerRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = (e) => {
    if (e) e.stopPropagation();

    const elem = videoContainerRef.current;
    if (!elem) return;

    if (
      !document.fullscreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen().catch((err) => console.error(err));
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFull = !!(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
      );
      setIsFullscreen(isFull);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, []);

  // Constants
  const TOTAL_DURATION = 2720; // 45:20

  const togglePlay = () => setIsPlaying(!isPlaying);

  // 同步收藏状态到统计数据
  useEffect(() => {
    setStats((prev) => ({
      ...prev,
      bookmarks: VIDEO_INFO.stats.bookmarks + (isBookmarked ? 1 : 0),
    }));
  }, [isBookmarked]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Avoid interfering with input fields
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName))
        return;

      switch (e.code) {
        case "Space":
          e.preventDefault();
          togglePlay();
          break;
        case "ArrowLeft":
          e.preventDefault();
          setCurrentTime((t) => Math.max(0, t - 5));
          break;
        case "ArrowRight":
          e.preventDefault();
          setCurrentTime((t) => Math.min(TOTAL_DURATION, t + 5));
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPlaying]);

  // Progress Bar Dragging Logic
  const handleSeek = (clientX) => {
    if (!progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    const percentage = Math.max(0, Math.min(1, x / width));
    const newTime = Math.round(percentage * TOTAL_DURATION);
    setCurrentTime(newTime);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleSeek(e.clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        handleSeek(e.clientX);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  // Handle URL query param for seeking
  useEffect(() => {
    const t = searchParams.get("t");

    if (t) {
      const seekTime = parseInt(t, 10);
      if (!isNaN(seekTime)) {
        setCurrentTime(seekTime);
        setIsPlaying(true);
      }
    }
  }, [searchParams]);

  // Simulate Video Progress
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          const nextTime = prev + 1;
          return nextTime >= TOTAL_DURATION ? TOTAL_DURATION : nextTime;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Heartbeat: Save progress every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > 0) {
        localStorage.setItem(
          `video_progress_${VIDEO_INFO.id}`,
          currentTime.toString()
        );
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [currentTime]);

  // Resume Toast
  useEffect(() => {
    if (searchParams.get("resumed") === "true") {
      setShowToast(true);
      // Auto hide after 5 seconds
      setTimeout(() => setShowToast(false), 5000);
    } else {
      // Original demo toast logic
      const timer = setTimeout(() => {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="max-w-[1800px] mx-auto px-4 md:px-14 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* --- Left Column: Player & Content --- */}
        <div className="space-y-6">
          {/* Breadcrumb for History Resume */}
          {searchParams.get("resumed") === "true" && (
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-[-10px]">
              <Link
                to="/history"
                className="flex items-center hover:text-blue-600 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2 group-hover:bg-blue-50">
                  <ChevronLeft className="w-4 h-4" />
                </div>
                观看历史
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-gray-800 font-medium truncate max-w-[300px]">
                {VIDEO_INFO.title}
              </span>
            </div>
          )}

          {/* Breadcrumb for Category Navigation */}
          {searchParams.get("from") &&
            CATEGORY_TITLES[searchParams.get("from")] && (
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-[-10px]">
                <Link to="/" className="hover:text-blue-600 transition-colors">
                  首页
                </Link>
                <ChevronRight className="w-4 h-4" />
                <Link
                  to={`/category/${searchParams.get("from")}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {CATEGORY_TITLES[searchParams.get("from")]}
                </Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-800 font-medium truncate max-w-[300px]">
                  {VIDEO_INFO.title}
                </span>
              </div>
            )}

          {/* 1. Video Player Container */}
          <div
            ref={videoContainerRef}
            className={`relative bg-black overflow-hidden group shadow-lg cursor-pointer transition-all duration-300
              ${
                isFullscreen
                  ? "w-full h-full rounded-none"
                  : "w-full aspect-video rounded-xl"
              }`}
            onClick={togglePlay}
          >
            {/* Placeholder Video Background */}
            <img
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover opacity-80"
              alt="Video Content"
            />

            {/* Video Title Overlay (Top Left) */}
            <div className="absolute top-0 left-0 right-0 p-4 bg-gradient-to-b from-black/70 to-transparent z-20 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 opacity-0">
              <h2 className="text-white text-lg font-bold line-clamp-1 drop-shadow-md">
                {VIDEO_INFO.title}
              </h2>
              <p className="text-white/80 text-xs mt-1 line-clamp-2 max-w-[80%] drop-shadow-sm">
                {VIDEO_INFO.desc}
              </p>
            </div>

            {/* Danmu Layer */}
            {showDanmu && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                {activeDanmu.map((item) => (
                  <div
                    key={item.uniqueId}
                    className="absolute whitespace-nowrap text-white font-bold text-shadow-md animate-danmu"
                    style={{
                      top: item.top,
                      left: "100%",
                      opacity: danmuOpacity / 100,
                      color: item.color,
                      border: item.isSelf ? "1px solid rgba(255,255,255,0.5)" : "none",
                      padding: item.isSelf ? "2px 8px" : "0",
                      borderRadius: "4px",
                      backgroundColor: item.isSelf ? "rgba(0,0,0,0.2)" : "transparent",
                      fontSize: "20px", // Default size
                      textShadow: "1px 1px 2px black",
                    }}
                  >
                    {item.content}
                  </div>
                ))}
              </div>
            )}

            {/* Dynamic Toast Notification */}
            {showToast && (
              <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-black/60 backdrop-blur-md text-white p-3 rounded-lg border-l-4 border-yellow-500 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-500 flex items-start gap-3 z-20">
                <div className="text-yellow-400 mt-0.5">⚠️</div>
                <div>
                  <div className="font-bold text-sm text-yellow-400">注意</div>
                  <div className="text-xs text-gray-200">
                    {searchParams.get("resumed") === "true"
                      ? "已为您恢复至上次进度 (自动回退 5s)"
                      : "模型已更新至 V4.0，部分参数可能与视频演示不同。"}
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowToast(false);
                  }}
                  className="ml-auto text-gray-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Play Button Overlay (Center) */}
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                  className="w-16 h-16 bg-blue-600/90 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-110 backdrop-blur-sm"
                >
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </button>
              </div>
            )}

            {/* Controls Bar (Bottom) */}
            <div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-4 pb-4 pt-12 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Progress Bar with Micro-Course Indexing */}
              <div
                ref={progressBarRef}
                className="relative w-full h-1.5 bg-gray-600/50 rounded-full mb-4 cursor-pointer group/progress hover:h-2.5 transition-all py-2 -my-2 bg-clip-content"
                onMouseDown={handleMouseDown}
              >
                {/* Background Track */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1.5 bg-gray-600/50 rounded-full group-hover/progress:h-2.5 transition-all pointer-events-none"></div>

                {/* Current Progress */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 left-0 h-1.5 bg-blue-500 rounded-full group-hover/progress:h-2.5 transition-all duration-75 pointer-events-none"
                  style={{ width: `${(currentTime / TOTAL_DURATION) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow scale-0 group-hover/progress:scale-100 transition-transform"></div>
                </div>

                {/* Chapter Dots */}
                {VIDEO_INFO.chapters.map((chapter, idx) => (
                  <div
                    key={idx}
                    className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full -ml-0.5 hover:scale-150 transition-transform z-10 pointer-events-none"
                    style={{ left: `${chapter.time}%` }}
                  >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {chapter.label}
                    </div>
                  </div>
                ))}
              </div>

              {/* Control Icons */}
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <button onClick={togglePlay}>
                    {isPlaying ? (
                      <Pause className="w-5 h-5" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5" fill="currentColor" />
                    )}
                  </button>
                  <span className="text-xs font-medium">
                    {formatTime(currentTime)} / {formatTime(TOTAL_DURATION)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button>
                    <Volume2 className="w-5 h-5" />
                  </button>

                  {/* Playback Speed Control */}
                  <div className="relative group/speed">
                    <button 
                      className="text-xs font-bold w-10 hover:text-blue-400 transition-colors"
                      onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    >
                      {playbackRate === 1.0 ? '倍速' : `${playbackRate}x`}
                    </button>
                    {/* Hover Menu */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover/speed:block pb-2">
                       <div className="bg-black/90 backdrop-blur-md rounded-lg p-1 shadow-xl border border-gray-800 flex flex-col gap-1">
                          {[2.0, 1.5, 1.25, 1.0, 0.75, 0.5].map(rate => (
                             <button
                                key={rate}
                                onClick={() => setPlaybackRate(rate)}
                                className={`px-3 py-1.5 text-xs rounded hover:bg-white/20 transition-colors whitespace-nowrap ${playbackRate === rate ? 'text-blue-400 font-bold' : 'text-gray-300'}`}
                             >
                                {rate === 1.0 ? '正常' : `${rate}x`}
                             </button>
                          ))}
                       </div>
                    </div>
                  </div>

                  {/* Quality Control */}
                  <div className="relative group/quality">
                    <button 
                      className="text-xs font-bold w-12 hover:text-blue-400 transition-colors"
                      onClick={() => setShowQualityMenu(!showQualityMenu)}
                    >
                      {quality}
                    </button>
                    {/* Hover Menu */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 hidden group-hover/quality:block pb-2">
                       <div className="bg-black/90 backdrop-blur-md rounded-lg p-1 shadow-xl border border-gray-800 flex flex-col gap-1">
                          {['1080P', '720P', '480P', '360P'].map(q => (
                             <button
                                key={q}
                                onClick={() => setQuality(q)}
                                className={`px-3 py-1.5 text-xs rounded hover:bg-white/20 transition-colors whitespace-nowrap ${quality === q ? 'text-blue-400 font-bold' : 'text-gray-300'}`}
                             >
                                {q}
                             </button>
                          ))}
                       </div>
                    </div>
                  </div>

                  {/* Danmu Controls */}
                  <div className="flex items-center gap-2 relative group/danmu">
                     <div className="flex items-center bg-white/10 rounded-full px-2 py-1 backdrop-blur-sm border border-white/10 focus-within:bg-white/20 transition-colors">
                        <button 
                          onClick={() => setShowDanmu(!showDanmu)}
                          className={`mr-1 ${showDanmu ? 'text-blue-400' : 'text-gray-400'}`}
                          title={showDanmu ? "关闭弹幕" : "开启弹幕"}
                        >
                           <MessageSquare className="w-4 h-4" fill={showDanmu ? "currentColor" : "none"} />
                        </button>
                        <form onSubmit={handleSendDanmu} className="flex items-center">
                          <input 
                            type="text" 
                            value={danmuInputValue}
                            onChange={(e) => setDanmuInputValue(e.target.value)}
                            placeholder="发个弹幕见证当下"
                            className="bg-transparent border-none outline-none text-xs text-white placeholder-gray-400 w-24 focus:w-40 transition-all"
                            onKeyDown={(e) => e.stopPropagation()} // Prevent triggering video shortcuts
                          />
                        </form>
                     </div>
                     
                     {/* Danmu Settings Toggle */}
                     <button 
                        onClick={() => setShowDanmuSettings(!showDanmuSettings)}
                        className={`hover:text-blue-400 transition-colors ${showDanmuSettings ? 'text-blue-400' : ''}`}
                     >
                        <Settings className="w-5 h-5" />
                     </button>

                     {/* Danmu Settings Panel */}
                     {showDanmuSettings && (
                        <div className="absolute bottom-full right-0 mb-4 bg-black/90 backdrop-blur-md rounded-lg p-4 w-64 shadow-xl border border-gray-800 animate-in fade-in slide-in-from-bottom-2 z-50" onClick={e => e.stopPropagation()}>
                           <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-800">
                              <span className="text-sm font-bold">弹幕设置</span>
                              <button onClick={() => setShowDanmuSettings(false)}><X className="w-4 h-4 text-gray-400 hover:text-white"/></button>
                           </div>
                           
                           <div className="space-y-4">
                              <div className="space-y-1">
                                 <div className="flex justify-between text-xs text-gray-400">
                                    <span>不透明度</span>
                                    <span>{danmuOpacity}%</span>
                                 </div>
                                 <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={danmuOpacity} 
                                    onChange={(e) => setDanmuOpacity(e.target.value)}
                                    className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                 />
                              </div>

                              <div className="space-y-1">
                                 <div className="flex justify-between text-xs text-gray-400">
                                    <span>显示区域</span>
                                    <span>{danmuArea === 100 ? '满屏' : danmuArea === 50 ? '半屏' : '1/4屏'}</span>
                                 </div>
                                 <div className="flex gap-2">
                                    {[100, 50, 25].map(val => (
                                       <button 
                                          key={val}
                                          onClick={() => setDanmuArea(val)}
                                          className={`flex-1 py-1 text-xs rounded border ${danmuArea === val ? 'bg-blue-600 border-blue-600 text-white' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                                       >
                                          {val === 100 ? '满屏' : val === 50 ? '半屏' : '1/4'}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>

                  <button onClick={toggleFullscreen}>
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5" />
                    ) : (
                      <Maximize className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Video Info & Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {VIDEO_INFO.title}
            </h1>
            <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
              <div className="flex gap-4">
                <span>{VIDEO_INFO.views} 播放</span>
                <span>{VIDEO_INFO.date}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-2 border-t border-b border-gray-100 py-3">
              <ActionButton
                icon={ThumbsUp}
                label={isLiked ? "已点赞" : "点赞"}
                count={stats.likes}
                active={isLiked}
                onClick={() => {
                  const newIsLiked = !isLiked;
                  setIsLiked(newIsLiked);
                  setStats((prev) => ({
                    ...prev,
                    likes: newIsLiked ? prev.likes + 1 : prev.likes - 1,
                  }));
                }}
              />
              <ActionButton
                icon={Bookmark}
                label={isBookmarked ? "已收藏" : "收藏"}
                count={stats.bookmarks}
                active={isBookmarked}
                onClick={(e) => {
                  console.log("🔥 收藏按钮被点击!", { isBookmarked });
                  e.preventDefault();
                  e.stopPropagation();

                  if (isBookmarked) {
                    console.log("  → 直接删除收藏(无确认)");
                    handleRemoveBookmark();
                  } else {
                    console.log("  → 打开收藏弹窗");
                    setShowBookmarkModal(true);
                  }
                }}
              />
              <ActionButton icon={Share2} label="分享" count={stats.shares} />
              <div className="flex-1"></div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-4 text-gray-700 leading-relaxed">
              {VIDEO_INFO.desc}
            </div>
          </div>

          {/* 3. Comments Section */}
          {/* 3. Comments Section */}
          <CommentSection
            currentTime={currentTime}
            setCurrentTime={setCurrentTime}
            onBookmark={() => setShowBookmarkModal(true)}
          />
        </div>

        {/* --- Right Column: Sidebar --- */}
        <div className="space-y-4">
          {/* Video Directory with Tabs */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[420px]">
            {/* Tab Header */}
            <div className="flex border-b border-gray-100">
              <button
                onClick={() => setDirectoryTab("chapters")}
                className={`flex-1 py-3 text-sm font-bold text-center transition-colors relative ${
                  directoryTab === "chapters"
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <List className="w-4 h-4" />
                  章节导航
                </div>
                {directoryTab === "chapters" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
              <button
                onClick={() => setDirectoryTab("collection")}
                className={`flex-1 py-3 text-sm font-bold text-center transition-colors relative ${
                  directoryTab === "collection"
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <PlayCircle className="w-4 h-4" />
                  系列合集
                </div>
                {directoryTab === "collection" && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                )}
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
              {directoryTab === "chapters" ? (
                <div className="space-y-2">
                  {VIDEO_INFO.chapters.map((chapter, idx) => {
                    // Calculate if this chapter is currently playing
                    const chapterStartTime =
                      (chapter.time / 100) * TOTAL_DURATION;
                    const nextChapterTime =
                      idx < VIDEO_INFO.chapters.length - 1
                        ? (VIDEO_INFO.chapters[idx + 1].time / 100) *
                          TOTAL_DURATION
                        : TOTAL_DURATION;
                    const isCurrentChapter =
                      currentTime >= chapterStartTime &&
                      currentTime < nextChapterTime;

                    return (
                      <div
                        key={idx}
                        onClick={() => {
                          const seekTime = Math.floor(chapterStartTime);
                          setCurrentTime(seekTime);
                          setIsPlaying(true);
                        }}
                        className={`p-3 rounded-lg cursor-pointer transition-all group
                           ${
                             isCurrentChapter
                               ? "bg-blue-50 border-2 border-blue-200 shadow-sm"
                               : "border-2 border-transparent hover:bg-gray-50 hover:border-gray-200"
                           }
                         `}
                      >
                        <div className="flex items-start gap-3">
                          {/* Chapter Number */}
                          <div
                            className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold
                             ${
                               isCurrentChapter
                                 ? "bg-blue-600 text-white"
                                 : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
                             }
                           `}
                          >
                            {String(idx + 1).padStart(2, "0")}
                          </div>

                          <div className="flex-1 min-w-0">
                            {/* Chapter Title */}
                            <div
                              className={`text-sm font-medium mb-1 line-clamp-2
                               ${
                                 isCurrentChapter
                                   ? "text-blue-700"
                                   : "text-gray-800 group-hover:text-blue-600"
                               }
                             `}
                            >
                              {chapter.label}
                            </div>

                            {/* Time Info */}
                            <div className="flex items-center gap-2">
                              <span
                                className={`text-xs font-mono
                                 ${
                                   isCurrentChapter
                                     ? "text-blue-600"
                                     : "text-gray-500"
                                 }
                               `}
                              >
                                {Math.floor(chapterStartTime / 60)}:
                                {Math.floor(chapterStartTime % 60)
                                  .toString()
                                  .padStart(2, "0")}
                              </span>
                              {isCurrentChapter && (
                                <div className="flex items-center gap-1">
                                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></div>
                                  <span className="text-xs text-blue-600 font-medium">
                                    正在播放
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="px-1 pb-2 border-b border-gray-50 mb-2">
                    <div className="text-xs font-bold text-gray-500 mb-1">
                      当前系列
                    </div>
                    <div className="font-bold text-gray-800 text-sm mb-2">
                      {COLLECTION_DATA.title}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${
                              (COLLECTION_DATA.current /
                                COLLECTION_DATA.total) *
                              100
                            }%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">
                        {COLLECTION_DATA.current}/{COLLECTION_DATA.total}
                      </span>
                    </div>
                  </div>

                  {COLLECTION_DATA.list.map((item) => (
                    <Link
                      key={item.id}
                      to={`/video?id=${item.id}`}
                      className={`block p-3 rounded-lg border transition-all
                         ${
                           item.status === "playing"
                             ? "bg-blue-50 border-blue-200 shadow-sm"
                             : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200 cursor-pointer"
                         }
                       `}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center
                           ${
                             item.status === "playing"
                               ? "bg-blue-600 text-white"
                               : item.status === "completed"
                               ? "bg-green-100 text-green-600"
                               : "bg-gray-100 text-gray-500"
                           }
                         `}
                        >
                          {item.status === "playing" && (
                            <Play className="w-4 h-4 fill-current" />
                          )}
                          {item.status === "completed" && (
                            <CheckCircle2 className="w-4 h-4" />
                          )}
                          {item.status === "normal" && (
                            <PlayCircle className="w-4 h-4" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-medium line-clamp-1
                             ${
                               item.status === "playing"
                                 ? "text-blue-700"
                                 : "text-gray-700"
                             }
                           `}
                          >
                            {item.title}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5 flex items-center gap-2">
                            <span>{item.duration}</span>
                            {item.status === "playing" && (
                              <span className="text-blue-500">观看中</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Toolchain Module */}
          <ToolchainModule />

          {/* Recommended Videos */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <h3 className="font-bold text-sm text-gray-800">推荐视频</h3>
            </div>
            <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
              {RELATED_VIDEOS.map((video) => (
                <Link
                  key={video.id}
                  to={`/video?id=${video.id}`}
                  className="flex gap-3 group cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
                >
                  <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={video.cover}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      12:30
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800 group-hover:text-blue-600 line-clamp-2 mb-1 transition-colors">
                      {video.title}
                    </h4>
                    <div className="text-xs text-gray-500 space-y-0.5">
                      <div>技术部培训中心</div>
                      <div>{video.views} 播放 · 2天前</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Bookmark Modal --- */}
      {showBookmarkModal && (
        <BookmarkModal
          onClose={() => setShowBookmarkModal(false)}
          videoInfo={VIDEO_INFO}
          onConfirm={() => {
            // 关闭弹窗
            setShowBookmarkModal(false);
            // 重新检查收藏状态
            setTimeout(() => {
              const data = localStorage.getItem("user_assets");
              if (data) {
                const bookmarks = JSON.parse(data);
                const exists = bookmarks.some(
                  (b) => String(b.videoId) === String(VIDEO_INFO.id)
                );
                setIsBookmarked(exists);
              }
            }, 100);
          }}
        />
      )}
    </div>
  );
}

function ActionButton({ icon: Icon, label, count, active, onClick }) {
  const handleClick = (e) => {
    console.log("⚡ ActionButton 内部点击", { label, active });
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200
        ${
          active
            ? "text-blue-600 bg-blue-50 font-bold"
            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
        }
      `}
    >
      <Icon className={`w-5 h-5 ${active ? "fill-current" : ""}`} />
      <span className="text-sm">
        {label} {count !== undefined && count}
      </span>
    </button>
  );
}

function CommentSection({ currentTime, setCurrentTime, onBookmark }) {
  const [isFocused, setIsFocused] = useState(false);
  const [includeTimestamp, setIncludeTimestamp] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [likedComments, setLikedComments] = useState(new Set()); // 跟踪已点赞的评论
  const [likedReplies, setLikedReplies] = useState(new Set()); // 跟踪已点赞的回复
  const [replyingTo, setReplyingTo] = useState(null); // 当前正在回复的评论ID
  const [replyingToReply, setReplyingToReply] = useState(null); // 当前正在回复的回复ID
  const [replyText, setReplyText] = useState(""); // 回复内容
  const [replies, setReplies] = useState({}); // 存储每个评论的回复列表 { commentId: [replies] }

  const [comments, setComments] = useState([
    {
      id: 1,
      user: "User_1",
      time: "2023-12-25 14:30",
      content:
        "这门课程非常有帮助，特别是关于 Prompt 优化的部分，解决了我很多实际工作中的困惑！期待更新更多高阶内容。",
      likes: 12,
      timestamp: "09:30",
    },
    {
      id: 2,
      user: "Dev_Mike",
      time: "2023-12-25 10:15",
      content: "请问这个模型在本地部署需要多少显存？",
      likes: 5,
      timestamp: null,
    },
    {
      id: 3,
      user: "AI_Fan",
      time: "2023-12-24 18:45",
      content: "第3章的参数设置好像有点问题，建议核对一下。",
      likes: 8,
      timestamp: "15:20",
    },
  ]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // 处理点赞
  const handleLike = (commentId) => {
    const isLiked = likedComments.has(commentId);

    // 更新点赞状态
    const newLikedComments = new Set(likedComments);
    if (isLiked) {
      newLikedComments.delete(commentId);
    } else {
      newLikedComments.add(commentId);
    }
    setLikedComments(newLikedComments);

    // 更新评论点赞数
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + (isLiked ? -1 : 1) }
          : comment
      )
    );
  };

  // 处理回复
  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyingToReply(null);
    setReplyText("");
  };

  // 处理回复的回复
  const handleReplyToReply = (commentId, replyId, replyUser) => {
    setReplyingTo(commentId);
    setReplyingToReply(replyId);
    setReplyText(`@${replyUser} `);
  };

  // 提交回复
  const handleSubmitReply = (commentId) => {
    if (!replyText.trim()) return;

    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newReply = {
      id: Date.now(),
      user: "Me",
      time: timeString,
      content: replyText,
      likes: 0,
      replyToUser: replyingToReply
        ? replies[commentId]?.find((r) => r.id === replyingToReply)?.user
        : null,
    };

    setReplies((prev) => ({
      ...prev,
      [commentId]: [...(prev[commentId] || []), newReply],
    }));

    setReplyText("");
    setReplyingTo(null);
    setReplyingToReply(null);
  };

  // 取消回复
  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyingToReply(null);
    setReplyText("");
  };

  // 处理回复点赞
  const handleLikeReply = (replyId, commentId) => {
    const isLiked = likedReplies.has(replyId);

    // 更新点赞状态
    const newLikedReplies = new Set(likedReplies);
    if (isLiked) {
      newLikedReplies.delete(replyId);
    } else {
      newLikedReplies.add(replyId);
    }
    setLikedReplies(newLikedReplies);

    // 更新回复点赞数
    setReplies((prev) => ({
      ...prev,
      [commentId]: prev[commentId].map((reply) =>
        reply.id === replyId
          ? { ...reply, likes: reply.likes + (isLiked ? -1 : 1) }
          : reply
      ),
    }));
  };

  const handlePostComment = () => {
    if (!commentText.trim()) return;

    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(
      now.getMonth() + 1
    ).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    const newComment = {
      id: Date.now(),
      user: "Me",
      time: timeString,
      content: commentText,
      likes: 0,
      timestamp: includeTimestamp ? formatTime(currentTime) : null,
    };

    setComments([newComment, ...comments]);
    setCommentText("");
    setIncludeTimestamp(false);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" /> 评论 ({comments.length})
        </h3>
      </div>

      {/* Input Area */}
      <div className="flex gap-4 mb-8">
        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
          U
        </div>
        <div className="flex-1 relative group">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              setIncludeTimestamp(true); // Auto-check on focus
            }}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            placeholder="发一条友善的评论..."
            className={`w-full bg-gray-50 border rounded-xl p-3 min-h-[80px] focus:outline-none focus:bg-white transition-all resize-none text-sm
              ${
                isFocused
                  ? "border-blue-500 ring-4 ring-blue-500/10"
                  : "border-gray-200"
              }
            `}
          ></textarea>

          {/* Bottom Actions (Visible on Focus) */}
          <div
            className={`absolute bottom-3 left-3 right-3 flex items-center justify-between transition-opacity duration-200 ${
              isFocused ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-500 hover:text-blue-600 select-none">
              <input
                type="checkbox"
                checked={includeTimestamp}
                onChange={(e) => setIncludeTimestamp(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>引用当前时间 ({formatTime(currentTime)})</span>
            </label>

            <button
              onClick={handlePostComment}
              className="px-4 py-1.5 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
            >
              发布
            </button>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4 group">
            {/* Minimalist Avatar */}
            <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs text-gray-500 font-bold">
              {comment.user[0]}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-gray-800 text-sm">
                  {comment.user}
                </span>
                <span className="text-xs text-gray-400">{comment.time}</span>
              </div>

              <p className="text-sm text-gray-700 leading-relaxed">
                {comment.timestamp && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      // 将时间戳 "MM:SS" 转换为秒数
                      const [minutes, seconds] = comment.timestamp
                        .split(":")
                        .map(Number);
                      const timeInSeconds = minutes * 60 + seconds;
                      setCurrentTime(timeInSeconds);
                    }}
                    className="text-blue-600 hover:underline font-medium mr-1 inline-flex items-center gap-0.5"
                  >
                    <Play className="w-3 h-3" fill="currentColor" />
                    {comment.timestamp}
                  </button>
                )}
                {comment.content}
              </p>

              <div className="flex items-center gap-4 mt-2">
                <button
                  onClick={() => handleLike(comment.id)}
                  className={`flex items-center gap-1 text-xs transition-colors
                    ${
                      likedComments.has(comment.id)
                        ? "text-blue-600 font-medium"
                        : "text-gray-400 hover:text-blue-600"
                    }
                  `}
                >
                  <ThumbsUp
                    className={`w-3.5 h-3.5 ${
                      likedComments.has(comment.id) ? "fill-current" : ""
                    }`}
                  />
                  {comment.likes}
                </button>
                <button
                  onClick={() => handleReply(comment.id)}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> 回复
                </button>
                <button
                  onClick={onBookmark}
                  className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Bookmark className="w-3.5 h-3.5" /> 收藏
                </button>
              </div>

              {/* 回复输入框 */}
              {replyingTo === comment.id && (
                <div className="mt-3 ml-8 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="flex gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      U
                    </div>
                    <div className="flex-1">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder={`回复 @${comment.user}...`}
                        className="w-full bg-gray-50 border border-blue-300 rounded-lg p-2 text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 resize-none"
                        rows="2"
                        autoFocus
                      />
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <button
                          onClick={handleCancelReply}
                          className="px-3 py-1 text-xs text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          取消
                        </button>
                        <button
                          onClick={() => handleSubmitReply(comment.id)}
                          disabled={!replyText.trim()}
                          className="px-3 py-1 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          回复
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 回复列表 */}
              {replies[comment.id] && replies[comment.id].length > 0 && (
                <div className="mt-3 ml-8 space-y-3">
                  {replies[comment.id].map((reply) => (
                    <div
                      key={reply.id}
                      className="flex gap-2 p-2 bg-gray-50 rounded-lg group"
                    >
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center text-xs text-gray-500 font-bold">
                        {reply.user[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-gray-800 text-xs">
                            {reply.user}
                          </span>
                          <span className="text-xs text-gray-400">
                            {reply.time}
                          </span>
                          {reply.replyToUser && (
                            <>
                              <span className="text-xs text-gray-400">
                                回复
                              </span>
                              <span className="text-xs text-blue-600 font-medium">
                                @{reply.replyToUser}
                              </span>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-gray-700 leading-relaxed mb-2">
                          {reply.content}
                        </p>

                        {/* 回复的操作按钮 */}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              handleLikeReply(reply.id, comment.id)
                            }
                            className={`flex items-center gap-1 text-xs transition-colors
                              ${
                                likedReplies.has(reply.id)
                                  ? "text-blue-600 font-medium"
                                  : "text-gray-400 hover:text-blue-600"
                              }
                            `}
                          >
                            <ThumbsUp
                              className={`w-3 h-3 ${
                                likedReplies.has(reply.id) ? "fill-current" : ""
                              }`}
                            />
                            {reply.likes > 0 && reply.likes}
                          </button>
                          <button
                            onClick={() =>
                              handleReplyToReply(
                                comment.id,
                                reply.id,
                                reply.user
                              )
                            }
                            className="flex items-center gap-1 text-xs text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <MessageCircle className="w-3 h-3" /> 回复
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
