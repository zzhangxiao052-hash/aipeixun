
export const TASKS = [
  {
    id: 'task_001',
    title: '完成《数据安全规范》测验',
    type: 'EXAM', // EXAM, PRACTICE, VIDEO
    status: 'PENDING', // PENDING, COMPLETED, OVERDUE
    priority: 'HIGH',
    deadline: '今天 18:00',
    description: '请完成《数据安全规范》课程后的结业测验，及格分数为 80 分。',
    source: {
      type: 'COURSE',
      id: 204,
      title: '网络安全基础意识'
    },
    progress: 0,
    total: 100
  },
  {
    id: 'task_002',
    title: '上传效能跃升演练报告',
    type: 'PRACTICE',
    status: 'PENDING',
    priority: 'NORMAL',
    deadline: '明天',
    description: '请根据“DeepSeek 深度解析”课程中的效能跃升任务，上传一份会议纪要生成报告。',
    source: {
      type: 'COURSE',
      id: 201,
      title: 'DeepSeek 深度解析：国产大模型应用效能跃升'
    },
    link: '/workshop', // Direct link to the workshop page
    progress: 0,
    total: 1
  },
  {
    id: 'task_003',
    title: '观看《高效办公》至 100%',
    type: 'VIDEO',
    status: 'COMPLETED',
    priority: 'NORMAL',
    deadline: '2023-12-20',
    description: '完成 Excel 高效办公技巧课程的学习。',
    source: {
      type: 'COURSE',
      id: 202,
      title: '高效办公：Excel 中的 AI 技巧'
    },
    progress: 100,
    total: 100
  }
];
