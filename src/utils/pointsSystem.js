// 积分系统管理工具

// 积分规则配置
export const POINT_RULES = {
  VIDEO_COMPLETE: { points: 5, cognition: 5 },
  TASK_COMPLETE: { points: 20, tools: 5, practice: 15 },
  COMMENT_LIKE: { points: 2, innovation: 2 },
  BOOKMARK_ADD: { points: 1, efficiency: 1 },
  SHARE_COURSE: { points: 3, innovation: 3 },
  STREAK_7_DAYS: { points: 50, cognition: 10, tools: 10, practice: 10, innovation: 10, efficiency: 10 },
  QUALITY_COMMENT: { points: 5, cognition: 3, innovation: 2 }
};

// 默认用户数据
const DEFAULT_USER_DATA = {
  totalPoints: 0,
  cognition: 0,
  tools: 0,
  practice: 0,
  innovation: 0,
  efficiency: 0,
  level: 1,
  lastUpdated: new Date().toISOString()
};

// 获取用户积分数据
export const getUserPoints = () => {
  try {
    const data = localStorage.getItem('user_points');
    if (data) {
      return JSON.parse(data);
    }
    // 如果没有数据，初始化默认数据
    localStorage.setItem('user_points', JSON.stringify(DEFAULT_USER_DATA));
    return DEFAULT_USER_DATA;
  } catch (error) {
    console.error('获取用户积分失败:', error);
    return DEFAULT_USER_DATA;
  }
};

// 更新用户积分
export const updateUserPoints = (rule) => {
  try {
    const currentData = getUserPoints();
    
    // 计算新的积分
    const newData = {
      totalPoints: currentData.totalPoints + (rule.points || 0),
      cognition: currentData.cognition + (rule.cognition || 0),
      tools: currentData.tools + (rule.tools || 0),
      practice: currentData.practice + (rule.practice || 0),
      innovation: currentData.innovation + (rule.innovation || 0),
      efficiency: currentData.efficiency + (rule.efficiency || 0),
      level: calculateLevel(currentData.totalPoints + (rule.points || 0)),
      lastUpdated: new Date().toISOString()
    };
    
    // 保存到 localStorage
    localStorage.setItem('user_points', JSON.stringify(newData));
    
    console.log('✅ 积分更新成功:', {
      before: currentData.totalPoints,
      after: newData.totalPoints,
      added: rule.points
    });
    
    return newData;
  } catch (error) {
    console.error('更新用户积分失败:', error);
    return getUserPoints();
  }
};

// 计算用户等级
const calculateLevel = (totalPoints) => {
  if (totalPoints >= 1000) return 5;
  if (totalPoints >= 500) return 4;
  if (totalPoints >= 200) return 3;
  if (totalPoints >= 50) return 2;
  return 1;
};

// 获取等级信息
export const getLevelInfo = (level) => {
  const levels = {
    1: { name: 'AI新手', color: 'text-gray-600', bg: 'bg-gray-100', nextPoints: 50 },
    2: { name: 'AI学徒', color: 'text-blue-600', bg: 'bg-blue-100', nextPoints: 200 },
    3: { name: 'AI实践者', color: 'text-green-600', bg: 'bg-green-100', nextPoints: 500 },
    4: { name: 'AI专家', color: 'text-purple-600', bg: 'bg-purple-100', nextPoints: 1000 },
    5: { name: 'AI大师', color: 'text-orange-600', bg: 'bg-orange-100', nextPoints: null }
  };
  return levels[level] || levels[1];
};

// 计算雷达图数据（每个维度最大值为100）
export const calculateRadarData = (userData) => {
  // 每个维度的理论最大积分（可根据实际情况调整）
  const MAX_POINTS = {
    cognition: 500,
    tools: 500,
    practice: 500,
    innovation: 500,
    efficiency: 500
  };
  
  return {
    cognition: Math.min(100, (userData.cognition / MAX_POINTS.cognition) * 100),
    tools: Math.min(100, (userData.tools / MAX_POINTS.tools) * 100),
    practice: Math.min(100, (userData.practice / MAX_POINTS.practice) * 100),
    innovation: Math.min(100, (userData.innovation / MAX_POINTS.innovation) * 100),
    efficiency: Math.min(100, (userData.efficiency / MAX_POINTS.efficiency) * 100)
  };
};

// 获取排名百分位（模拟）
export const getRankPercentile = (totalPoints) => {
  // 这里是模拟数据，实际应该从后端获取
  if (totalPoints >= 500) return 5;
  if (totalPoints >= 300) return 10;
  if (totalPoints >= 150) return 20;
  if (totalPoints >= 50) return 40;
  return 60;
};

// 添加积分记录（用于历史记录）
export const addPointHistory = (action, points, description) => {
  try {
    const history = JSON.parse(localStorage.getItem('point_history') || '[]');
    const newRecord = {
      id: Date.now(),
      action,
      points,
      description,
      timestamp: new Date().toISOString()
    };
    
    history.unshift(newRecord);
    
    // 只保留最近50条记录
    if (history.length > 50) {
      history.splice(50);
    }
    
    localStorage.setItem('point_history', JSON.stringify(history));
  } catch (error) {
    console.error('添加积分记录失败:', error);
  }
};

// 获取积分历史
export const getPointHistory = () => {
  try {
    return JSON.parse(localStorage.getItem('point_history') || '[]');
  } catch (error) {
    console.error('获取积分历史失败:', error);
    return [];
  }
};
