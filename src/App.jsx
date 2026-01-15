import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import GlobalNavbar from './components/GlobalNavbar';
import Dashboard from './pages/Dashboard';
import TaskCenter from './pages/TaskCenter';

import Login from './pages/Login';
import Footer from './components/Footer';
import FeedbackSidebar from './components/FeedbackSidebar';

import Courses from './pages/Courses';
import Profile from './pages/Profile';

import VideoDetail from './pages/VideoDetail';

import RecommendedCourses from './pages/RecommendedCourses';
import MyCourses from './pages/MyCourses';
import CategoryPage from './pages/CategoryPage';
import RequestCourse from './pages/RequestCourse';
import TechnicalSupport from './pages/TechnicalSupport';
import Settings from './pages/Settings';
import HistoryPage from './pages/HistoryPage';
import CoverageDetails from './pages/dashboard/CoverageDetails';
import DurationDetails from './pages/dashboard/DurationDetails';
import CompletionDetails from './pages/dashboard/CompletionDetails';
import ResourceDetails from './pages/dashboard/ResourceDetails';
import PCSearchResults from './pages/PCSearchResults';
import { initializeUserPoints } from './utils/initPoints';

// Mobile Pages
import MobileHome from './pages/mobile/MobileHome';
import MobileProfile from './pages/mobile/MobileProfile';
import MobileHistory from './pages/mobile/MobileHistory';
import MobileFavorites from './pages/mobile/MobileFavorites';
import MobileCategory from './pages/mobile/MobileCategory';
import MobileVideoDetail from './pages/mobile/MobileVideoDetail';
import MobileNotifications from './pages/mobile/MobileNotifications';
import MobileSearch from './pages/mobile/MobileSearch';
import MobileSearchResults from './pages/mobile/MobileSearchResults';
import MobileFeedback from './pages/mobile/MobileFeedback';

import MobileCockpit from './pages/mobile/MobileCockpit';
import MobileProfileEdit from './pages/mobile/MobileProfileEdit';
import MobileChangePassword from './pages/mobile/MobileChangePassword';
import MobileMemberManage from './pages/mobile/MobileMemberManage';
import MobileRankingList from './pages/mobile/MobileRankingList';

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isMobilePage = location.pathname.startsWith('/mobile');

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {!isLoginPage && !isMobilePage && <GlobalNavbar />}
      <main className={`flex-1 ${!isLoginPage && !isMobilePage ? "pt-16" : ""}`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks" element={<TaskCenter />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/courses" element={<RecommendedCourses />} />
          <Route path="/courses/recommended" element={<RecommendedCourses />} />
          <Route path="/courses/my" element={<MyCourses />} />

          <Route path="/video" element={<VideoDetail />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/feedback/request" element={<RequestCourse />} />
          <Route path="/feedback/support" element={<TechnicalSupport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/dashboard/coverage" element={<CoverageDetails />} />
          <Route path="/dashboard/duration" element={<DurationDetails />} />
          <Route path="/dashboard/completion" element={<CompletionDetails />} />
          <Route path="/dashboard/resource-usage" element={<ResourceDetails />} />
          <Route path="/search" element={<PCSearchResults />} />
          
          {/* Mobile Routes */}
          <Route path="/mobile" element={<MobileHome />} />
          <Route path="/mobile/home" element={<MobileHome />} />
          <Route path="/mobile/category" element={<MobileCategory />} />
          <Route path="/mobile/history" element={<MobileHistory />} />
          <Route path="/mobile/favorites" element={<MobileFavorites />} />
          <Route path="/mobile/profile" element={<MobileProfile />} />
          <Route path="/mobile/video/:id" element={<MobileVideoDetail />} />
          <Route path="/mobile/notifications" element={<MobileNotifications />} />
          <Route path="/mobile/search" element={<MobileSearch />} />
          <Route path="/mobile/search-results" element={<MobileSearchResults />} />
          <Route path="/mobile/feedback" element={<MobileFeedback />} />

          <Route path="/mobile/cockpit" element={<MobileCockpit />} />
          <Route path="/mobile/members" element={<MobileMemberManage />} />
          <Route path="/mobile/profile/edit" element={<MobileProfileEdit />} />
          <Route path="/mobile/settings/password" element={<MobileChangePassword />} />
          <Route path="/mobile/ranking" element={<MobileRankingList />} />
        </Routes>
      </main>
      {!isLoginPage && !isMobilePage && <Footer />}
      {!isLoginPage && !isMobilePage && <FeedbackSidebar />}
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
