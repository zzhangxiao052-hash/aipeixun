import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import GlobalNavbar from './components/GlobalNavbar';
import Dashboard from './pages/Dashboard';
import TaskCenter from './pages/TaskCenter';
import Workshop from './pages/Workshop';
import Login from './pages/Login';
import Footer from './components/Footer';

import Courses from './pages/Courses';
import Profile from './pages/Profile';
import Toolkit from './pages/Toolkit';
import VideoDetail from './pages/VideoDetail';

import RecommendedCourses from './pages/RecommendedCourses';
import MyCourses from './pages/MyCourses';
import CategoryPage from './pages/CategoryPage';
import RequestCourse from './pages/RequestCourse';
import TechnicalSupport from './pages/TechnicalSupport';
import Settings from './pages/Settings';
import { initializeUserPoints } from './utils/initPoints';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {!isLoginPage && <GlobalNavbar />}
      <main className={`flex-1 ${!isLoginPage ? "pt-16" : ""}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
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
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/feedback/request" element={<RequestCourse />} />
          <Route path="/feedback/support" element={<TechnicalSupport />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  // 初始化用户积分数据
  useEffect(() => {
    initializeUserPoints();
  }, []);
  
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
