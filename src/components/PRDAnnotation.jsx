import { useState } from 'react';
import { Info, X } from 'lucide-react';

/**
 * PRD标注组件 - 在页面上添加需求说明标注
 * 
 * @param {Object} props
 * @param {string} props.title - 标注标题
 * @param {string} props.content - 标注内容（支持换行）
 * @param {string} props.position - 标注位置：'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
 * @param {string} props.arrowDirection - 箭头方向：'up' | 'down' | 'left' | 'right'
 * @param {string} props.color - 标注颜色：'red' | 'blue' | 'green' | 'orange'
 * @param {number} props.offsetX - X轴偏移量（px）
 * @param {number} props.offsetY - Y轴偏移量（px）
 */
export default function PRDAnnotation({ 
  title = '需求说明',
  content = '',
  position = 'top-right',
  arrowDirection = 'down',
  color = 'red',
  offsetX = 0,
  offsetY = 0,
  children
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // 颜色配置
  const colorClasses = {
    red: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      text: 'text-red-700',
      icon: 'text-red-500',
      arrow: 'border-red-500'
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-500',
      text: 'text-blue-700',
      icon: 'text-blue-500',
      arrow: 'border-blue-500'
    },
    green: {
      bg: 'bg-green-50',
      border: 'border-green-500',
      text: 'text-green-700',
      icon: 'text-green-500',
      arrow: 'border-green-500'
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-500',
      text: 'text-orange-700',
      icon: 'text-orange-500',
      arrow: 'border-orange-500'
    }
  };

  // 位置配置
  const positionClasses = {
    'top-left': 'top-0 left-0',
    'top-right': 'top-0 right-0',
    'bottom-left': 'bottom-0 left-0',
    'bottom-right': 'bottom-0 right-0'
  };

  // 箭头样式
  const arrowStyles = {
    up: 'bottom-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent',
    down: 'top-full left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent',
    left: 'right-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent',
    right: 'left-full top-1/2 -translate-y-1/2 border-t-8 border-b-8 border-l-8 border-t-transparent border-b-transparent'
  };

  const currentColor = colorClasses[color] || colorClasses.red;

  return (
    <div 
      className={`absolute ${positionClasses[position]} z-50 pointer-events-auto`}
      style={{ 
        transform: `translate(${offsetX}px, ${offsetY}px)`,
        maxWidth: '280px'
      }}
    >
      {/* 标注框 */}
      <div className={`
        ${currentColor.bg} ${currentColor.border} border-2 rounded-lg shadow-lg
        transition-all duration-200
        ${isExpanded ? 'p-3' : 'p-2'}
      `}>
        {/* 箭头 */}
        <div 
          className={`absolute w-0 h-0 ${arrowStyles[arrowDirection]} ${currentColor.arrow}`}
        />

        {/* 标题栏 */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            <Info className={`w-4 h-4 ${currentColor.icon}`} />
            <span className={`text-xs font-bold ${currentColor.text}`}>
              {title}
            </span>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`${currentColor.icon} hover:opacity-70 transition-opacity`}
          >
            {isExpanded ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <span className="text-xs font-bold">+</span>
            )}
          </button>
        </div>

        {/* 内容区 */}
        {isExpanded && (
          <div className={`text-xs ${currentColor.text} leading-relaxed whitespace-pre-line`}>
            {content}
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * PRD标注容器组件 - 包裹需要标注的元素
 */
export function PRDAnnotationWrapper({ children, annotations = [] }) {
  // 检查URL参数，只有带 ?prd=true 时才显示标注
  const urlParams = new URLSearchParams(window.location.search);
  const showPRD = urlParams.get('prd') === 'true';

  if (!showPRD) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {children}
      {annotations.map((annotation, index) => (
        <PRDAnnotation key={index} {...annotation} />
      ))}
    </div>
  );
}
