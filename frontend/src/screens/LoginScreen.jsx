import React from 'react';

export default function LoginScreen({ onNavigate, onLoginSuccess }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;

    setLoading(true);
    setError('');

    fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || 'Đăng nhập thất bại');
          });
        }
        return res.json();
      })
      .then(data => {
        setLoading(false);
        onLoginSuccess(data);
        if (data.role === 'ROLE_ADMIN') {
          onNavigate('/admin');
        } else {
          onNavigate('/biet-on');
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center pt-24 pb-section-gap bg-surface-container-lowest text-on-surface">
      <div className="max-w-md w-full mx-4 p-8 rounded-3xl bg-white border border-outline-variant shadow-lg text-center relative overflow-hidden">
        <div className="absolute -top-12 -left-12 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-secondary/10 rounded-full blur-xl"></div>
        
        <span className="material-symbols-outlined text-5xl text-primary mb-4">lock_open</span>
        <h2 className="font-display-md text-2xl font-bold text-primary mb-2">Đăng Nhập Hệ Thống</h2>
        <p className="font-body-md text-sm text-on-surface-variant mb-6">Dành cho Admin và Tình nguyện viên Tiếp Sức Mùa Thi</p>

        {error && (
          <div className="mb-4 p-3 bg-error-container text-error rounded-xl text-sm font-bold text-left flex items-center gap-2">
            <span className="material-symbols-outlined text-md">error</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1">Tên đăng nhập</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-md">person</span>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Nhập tài khoản"
                className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-xl outline-none focus:ring-primary focus:border-primary bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1">Mật khẩu</label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-md">lock</span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Nhập mật khẩu"
                className="w-full pl-10 pr-4 py-2 border border-outline-variant rounded-xl outline-none focus:ring-primary focus:border-primary bg-white text-sm"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <span className="animate-spin material-symbols-outlined text-md">progress_activity</span>
                Đang đăng nhập...
              </>
            ) : (
              'Đăng nhập'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
