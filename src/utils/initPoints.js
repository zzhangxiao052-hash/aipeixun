// 初始化用户积分数据（仅用于演示）
import { getUserPoints } from './pointsSystem';

export const initializeUserPoints = () => {
  const currentData = getUserPoints();
  
  // 如果总积分为0，说明是新用户，设置一些初始数据用于演示
  if (currentData.totalPoints === 0) {
    const demoData = {
      totalPoints: 120,
      cognition: 85,
      tools: 90,
      practice: 75,
      innovation: 65,
      efficiency: 88,
      level: 2,
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem('user_points', JSON.stringify(demoData));
    console.log('✅ 初始化用户积分数据:', demoData);
    return demoData;
  }
  
  return currentData;
};
