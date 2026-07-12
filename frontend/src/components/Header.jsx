import React from 'react';
import { routes } from '../data/stitchContent.js';

export default function Header({ currentPath = '/', onNavigate, token, userRole, onLogout }) {
  const navigate = (event, path) => {
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Kỷ Yếu Số Tiếp Sức 2026" onClick={(event) => navigate(event, '/')}>
        <span className="brand-mark">TS</span>
        <span>
          <strong>Kỷ Yếu Số</strong>
          <small>Tiếp Sức 2026</small>
        </span>
      </a>
      <nav className="nav-links" aria-label="Điều hướng chính">
        {routes.map((item) => (
          <a
            className={item.path === currentPath ? 'active' : ''}
            key={item.path}
            href={item.path}
            onClick={(event) => navigate(event, item.path)}
          >
            {item.shortLabel}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        {userRole === 'ROLE_ADMIN' && (
          <a
            className={`text-sm font-bold ${currentPath === '/admin' ? 'text-primary animate-pulse' : 'text-outline hover:text-primary'} transition-colors cursor-pointer`}
            href="/admin"
            onClick={(event) => navigate(event, '/admin')}
          >
            Quản trị
          </a>
        )}
        {token && userRole !== 'ROLE_GUEST' ? (
          <button
            onClick={onLogout}
            className="text-xs font-bold text-outline hover:text-error transition-colors"
          >
            Đăng xuất
          </button>
        ) : (
          <a
            className={`text-xs font-bold ${currentPath === '/login' ? 'text-primary' : 'text-outline hover:text-primary'} transition-colors cursor-pointer`}
            href="/login"
            onClick={(event) => navigate(event, '/login')}
          >
            Đăng nhập
          </a>
        )}
        <a className="header-action" href="/so-luu-but" onClick={(event) => navigate(event, '/so-luu-but')}>
          Gửi lời chúc
        </a>
      </div>
    </header>
  );
}
