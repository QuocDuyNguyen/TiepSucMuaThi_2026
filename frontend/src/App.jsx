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

const screenByPath = {
  '/': HomeScreen,
  '/khoanh-khac': MomentsScreen,
  '/thu-cam-on': LetterScreen,
  '/loi-ket': ClosingScreen,
  '/so-luu-but': GuestbookScreen,
  '/biet-on': GratitudeScreen,
  '/ho-so-thanh-vien': MemberProfileScreen,
  '/vinh-danh': MemberWallScreen,
};

function getInitialPath() {
  const path = window.location.pathname;
  return screenByPath[path] ? path : '/';
}

export default function App() {
  const [currentPath, setCurrentPath] = React.useState(getInitialPath);
  const [selectedMemberId, setSelectedMemberId] = React.useState(1);
  const Screen = screenByPath[currentPath] ?? HomeScreen;

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

  return (
    <>
      <Header currentPath={currentPath} onNavigate={navigate} />
      <main>
        <Screen
          onNavigate={navigate}
          selectedMemberId={selectedMemberId}
          onSelectMemberId={setSelectedMemberId}
        />
      </main>
      <Footer />
    </>
  );
}
