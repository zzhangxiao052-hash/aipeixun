import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import GlobalNavbar from './components/GlobalNavbar';
import Dashboard from './pages/Dashboard';
import TaskCenter from './pages/TaskCenter';
import Workshop from './pages/Workshop';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import Toolkit from './pages/Toolkit';
import VideoDetail from './pages/VideoDetail';

import RecommendedCourses from './pages/RecommendedCourses';
import MyCourses from './pages/MyCourses';
import { initializeUserPoints } from './utils/initPoints';

function App() {
  // 初始化用户积分数据
  useEffect(() => {
    initializeUserPoints();
  }, []);
  
  return (
    <Router>
      <div className="min-h-screen bg-[#F8F9FA]">
        <GlobalNavbar />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskCenter />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/courses" element={<RecommendedCourses />} />
            <Route path="/courses/recommended" element={<RecommendedCourses />} />
            <Route path="/courses/my" element={<MyCourses />} />
            <Route path="/toolkit" element={<Toolkit />} />
            <Route path="/video" element={<VideoDetail />} />
            <Route path="/video/:id" element={<VideoDetail />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
