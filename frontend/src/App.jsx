import React from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import ClosingScreen from './screens/ClosingScreen.jsx';
import GratitudeScreen from './screens/GratitudeScreen.jsx';
import GuestbookScreen from './screens/GuestbookScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import LetterScreen from './screens/LetterScreen.jsx';
import MemberProfileScreen from './screens/MemberProfileScreen.jsx';
import MemberWallScreen from './screens/MemberWallScreen.jsx';
import MomentsScreen from './screens/MomentsScreen.jsx';
import LoginScreen from './screens/LoginScreen.jsx';
import AdminDashboardScreen from './screens/AdminDashboardScreen.jsx';

const screenByPath = {
  '/': HomeScreen,
  '/khoanh-khac': MomentsScreen,
  '/thu-cam-on': LetterScreen,
  '/loi-ket': ClosingScreen,
  '/so-luu-but': GuestbookScreen,
  '/biet-on': GratitudeScreen,
  '/ho-so-thanh-vien': MemberProfileScreen,
  '/vinh-danh': MemberWallScreen,
  '/login': LoginScreen,
  '/admin': AdminDashboardScreen,
};

// Global fetch interceptor to handle expired JWT (HTTP 401)
const originalFetch = window.fetch;
window.fetch = async function (...args) {
  const response = await originalFetch(...args);
  if (response.status === 401) {
    const url = typeof args[0] === 'string' ? args[0] : args[0]?.url;
    if (url && (url.includes('/api/auth/login') || url.includes('/api/auth/guest'))) {
      return response;
    }

    const role = localStorage.getItem('userRole');
    if (role === 'ROLE_ADMIN' || role === 'ROLE_USER') {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      localStorage.removeItem('guest_session_id');
      
      alert('Phiên làm việc của bạn đã hết hạn. Vui lòng đăng nhập lại.');
      window.location.href = '/login';
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      localStorage.removeItem('guest_session_id');
      
      // Reload page to request a fresh guest token
      window.location.reload();
    }
  }
  return response;
};

function getInitialPath() {
  const path = window.location.pathname;
  return screenByPath[path] ? path : '/';
}

function getInitialMemberId() {
  const saved = localStorage.getItem('selectedMemberId');
  return saved ? Number(saved) : 1;
}

export default function App() {
  const [currentPath, setCurrentPath] = React.useState(getInitialPath);
  const [selectedMemberId, setSelectedMemberId] = React.useState(getInitialMemberId);
  const [token, setToken] = React.useState(localStorage.getItem('token') || null);
  const [userRole, setUserRole] = React.useState(localStorage.getItem('userRole') || 'ROLE_GUEST');

  const Screen = screenByPath[currentPath] ?? HomeScreen;

  // Initialize Guest Token on load if not logged in
  React.useEffect(() => {
    if (!token) {
      fetch('http://localhost:8080/api/auth/guest', { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          localStorage.setItem('token', data.token);
          localStorage.setItem('guest_session_id', data.guestUuid);
          localStorage.setItem('userRole', 'ROLE_GUEST');
          setToken(data.token);
          setUserRole('ROLE_GUEST');
        })
        .catch(err => console.error('Lỗi lấy guest token:', err));
    }
  }, [token]);

  React.useEffect(() => {
    const onPopState = () => setCurrentPath(getInitialPath());
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path) => {
    if (path === currentPath) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectMemberId = (id) => {
    setSelectedMemberId(id);
    localStorage.setItem('selectedMemberId', id);
  };

  const handleLoginSuccess = (loginData) => {
    localStorage.setItem('token', loginData.token);
    localStorage.setItem('userRole', loginData.role);
    localStorage.setItem('username', loginData.username);
    if (loginData.volunteerId) {
      localStorage.setItem('volunteerId', loginData.volunteerId);
    }
    setToken(loginData.token);
    setUserRole(loginData.role);
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUserRole('ROLE_GUEST');
    navigate('/');
  };

  return (
    <>
      <Header 
        currentPath={currentPath} 
        onNavigate={navigate} 
        token={token}
        userRole={userRole}
        onLogout={handleLogout}
      />
      <main>
        <Screen
          onNavigate={navigate}
          selectedMemberId={selectedMemberId}
          onSelectMemberId={handleSelectMemberId}
          onLoginSuccess={handleLoginSuccess}
        />
      </main>
      <Footer />
    </>
  );
}
