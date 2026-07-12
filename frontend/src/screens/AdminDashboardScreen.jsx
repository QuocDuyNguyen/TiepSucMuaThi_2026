import React from 'react';

export default function AdminDashboardScreen({ onNavigate }) {
  const [gratitudes, setGratitudes] = React.useState([]);
  const [volunteers, setVolunteers] = React.useState([]);
  const [gallery, setGallery] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [activeTab, setActiveTab] = React.useState('messages'); // messages, volunteers, gallery
  
  // State for adding photo
  const [newPhoto, setNewPhoto] = React.useState({ imageUrl: '', category: 'Tiếp sức', displayOrder: 1, title: '', detail: '' });
  
  // State for editing gratitude
  const [editingMsg, setEditingMsg] = React.useState(null);
  const [editFormData, setEditFormData] = React.useState({
    senderName: '',
    content: ''
  });

  // State for editing volunteer
  const [editingVol, setEditingVol] = React.useState(null);
  const [editVolFormData, setEditVolFormData] = React.useState({
    fullName: '',
    roleName: '',
    avatarUrl: '',
    coverUrl: '',
    quote: '',
    bio: '',
    featured: false
  });

  // State for editing photo
  const [editingPhoto, setEditingPhoto] = React.useState(null);
  const [editPhotoFormData, setEditPhotoFormData] = React.useState({ id: '', imageUrl: '', category: 'Tiếp sức', displayOrder: 1, title: '', detail: '' });

  const [settings, setSettings] = React.useState({
    heroTitle: '',
    heroSubtitle: '',
    heroBackground: '',
    youtubeVideoUrl: '',
    footerText: '',
    letterTitle: '',
    letterSubtitle: '',
    letterDate: '',
    letterContent1: '',
    letterContent2: '',
    letterContent3: '',
    letterStat1Val: '',
    letterStat1Lbl: '',
    letterStat2Val: '',
    letterStat2Lbl: '',
    letterStat3Val: '',
    letterStat3Lbl: '',
    letterSignature: '',
    letterSignerName: '',
    letterSignerRole: '',
    letterSignerOrg: '',
    closingTitle: '',
    closingSubtitle: '',
    closingContent: '',
    closingVolTarget: 15000,
    closingStuTarget: 1200000,
    closingDaysTarget: 45,
    closingImage: ''
  });

  const token = localStorage.getItem('token');

  React.useEffect(() => {
    if (!token || localStorage.getItem('userRole') !== 'ROLE_ADMIN') {
      alert('Bạn không có quyền truy cập trang quản trị!');
      onNavigate('/');
      return;
    }
    loadAllData();
  }, [token]);

  const [users, setUsers] = React.useState([]);
  const [showAddUserModal, setShowAddUserModal] = React.useState(false);
  const [newUser, setNewUser] = React.useState({
    username: '',
    password: '',
    fullName: '',
    role: 'ROLE_USER'
  });
  const [resettingUser, setResettingUser] = React.useState(null);
  const [resetPasswordForm, setResetPasswordForm] = React.useState({ newPassword: '' });

  const loadAllData = () => {
    setLoading(true);
    const fetchGratitudes = fetch('http://localhost:8080/api/gratitudes')
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);
    
    const fetchVolunteers = fetch('http://localhost:8080/api/volunteers')
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);

    const fetchGallery = fetch('http://localhost:8080/api/gallery')
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);

    const fetchSettings = fetch('http://localhost:8080/api/settings')
      .then(res => res.ok ? res.json() : null)
      .catch(() => null);

    const fetchUsers = fetch('http://localhost:8080/api/users', { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);

    Promise.all([fetchGratitudes, fetchVolunteers, fetchGallery, fetchSettings, fetchUsers])
      .then(([gratitudeData, volunteerData, galleryData, settingsData, usersData]) => {
        setGratitudes(gratitudeData);
        setVolunteers(volunteerData);
        setGallery(galleryData);
        if (settingsData) setSettings(settingsData);
        setUsers(usersData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi tải dữ liệu admin:', err);
        setLoading(false);
      });
  };

  const handleFileUpload = async (e, setUrlCallback) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('http://localhost:8080/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setUrlCallback(data.url);
    } catch (err) {
      alert('Lỗi tải tệp: ' + err.message);
    }
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    fetch('http://localhost:8080/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(newUser)
    }).then(res => {
      if (!res.ok) throw new Error('Không thể tạo người dùng');
      return res.json();
    }).then(() => {
      alert('Tạo người dùng thành công!');
      setShowAddUserModal(false);
      setNewUser({ username: '', password: '', fullName: '', role: 'ROLE_USER' });
      loadAllData();
    }).catch(err => alert('Lỗi: ' + err.message));
  };

  const handleChangeRole = (userId, newRole) => {
    if(!window.confirm(`Bạn có chắc muốn đổi quyền người dùng này thành ${newRole === 'ROLE_ADMIN' ? 'Quản trị viên' : 'Thành viên'}?`)) return;
    fetch(`http://localhost:8080/api/users/${userId}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ role: newRole })
    }).then(res => {
      if (!res.ok) throw new Error('Lỗi cập nhật quyền');
      return res.json();
    }).then(() => {
      alert('Đổi quyền thành công!');
      loadAllData();
    }).catch(err => alert('Lỗi: ' + err.message));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!resettingUser) return;
    fetch(`http://localhost:8080/api/users/${resettingUser.id}/password`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ newPassword: resetPasswordForm.newPassword })
    }).then(res => {
      if (!res.ok) throw new Error('Không thể reset mật khẩu');
      return res.json();
    }).then(() => {
      alert('Đặt lại mật khẩu thành công!');
      setResettingUser(null);
      setResetPasswordForm({ newPassword: '' });
    }).catch(err => alert('Lỗi: ' + err.message));
  };

  const handleUpdateSettings = (e, sectionName = 'website') => {
    if (e) e.preventDefault();
    const targetUrl = 'http://localhost:8080/api/settings';
    
    fetch(targetUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(settings)
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể cập nhật cấu hình');
        return res.json();
      })
      .then(data => {
        setSettings(data);
        alert(`Cập nhật cấu hình ${sectionName} thành công!`);
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  const handleEditClick = (msg) => {
    setEditingMsg(msg);
    setEditFormData({
      senderName: msg.senderName,
      content: msg.content
    });
  };

  const handleUpdateMsg = (e) => {
    e.preventDefault();
    if (!editingMsg) return;

    fetch(`http://localhost:8080/api/gratitudes/${editingMsg.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        volunteerId: editingMsg.volunteer ? editingMsg.volunteer.id : 1,
        senderName: editFormData.senderName,
        content: editFormData.content
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể cập nhật lời tri ân');
        return res.json();
      })
      .then(() => {
        alert('Cập nhật lời tri ân thành công!');
        setEditingMsg(null);
        loadAllData();
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  const handleDeleteMsg = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lời nhắn này? Hành động này không thể hoàn tác.')) return;

    fetch(`http://localhost:8080/api/gratitudes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể xóa lời tri ân');
        return res.json();
      })
      .then(() => {
        alert('Xóa lời nhắn thành công!');
        loadAllData();
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  const handleUploadPhoto = (e) => {
    e.preventDefault();
    if (!newPhoto.imageUrl) return;

    fetch('http://localhost:8080/api/gallery', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPhoto)
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể tải ảnh lên');
        return res.json();
      })
      .then(() => {
        alert('Đăng ảnh kỷ niệm thành công!');
        setNewPhoto({ imageUrl: '', category: 'Tiếp sức', displayOrder: 1, title: '', detail: '' });
        loadAllData();
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  // Volunteer Handlers
  const handleEditVolClick = (vol) => {
    setEditingVol(vol);
    setEditVolFormData({
      fullName: vol.fullName,
      roleName: vol.roleName || '',
      avatarUrl: vol.avatarUrl || '',
      coverUrl: vol.coverUrl || '',
      quote: vol.quote || '',
      bio: vol.bio || '',
      featured: vol.featured || false
    });
  };

  const handleUpdateVol = (e) => {
    e.preventDefault();
    if (!editingVol) return;

    fetch(`http://localhost:8080/api/volunteers/${editingVol.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editVolFormData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể cập nhật thành viên');
        return res.json();
      })
      .then(() => {
        alert('Cập nhật thông tin thành viên thành công!');
        setEditingVol(null);
        loadAllData();
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  // Photo Handlers
  const handleEditPhotoClick = (photo) => {
    setEditingPhoto(photo);
    setEditPhotoFormData({
      imageUrl: photo.imageUrl,
      category: photo.category || 'Tiếp sức',
      displayOrder: photo.displayOrder || 1,
      title: photo.title || '',
      detail: photo.detail || ''
    });
  };

  const handleUpdatePhoto = (e) => {
    e.preventDefault();
    if (!editingPhoto) return;

    fetch(`http://localhost:8080/api/gallery/${editingPhoto.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editPhotoFormData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể cập nhật thông tin hình ảnh');
        return res.json();
      })
      .then(() => {
        alert('Cập nhật hình ảnh thành công!');
        setEditingPhoto(null);
        loadAllData();
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  const handleDeletePhoto = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa hình ảnh này khỏi album?')) return;

    fetch(`http://localhost:8080/api/gallery/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể xóa hình ảnh');
        return res.json();
      })
      .then(() => {
        alert('Xóa hình ảnh thành công!');
        loadAllData();
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  const handleLogout = () => {
    localStorage.clear();
    onNavigate('/');
    window.location.reload();
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-section-gap bg-surface-container-lowest text-on-surface">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-outline-variant/30 pb-6">
          <div>
            <h1 className="font-display-md text-2xl md:text-3xl font-extrabold text-primary flex items-center gap-2">
              <span className="material-symbols-outlined text-3xl">dashboard</span>
              Trang Quản Trị Hệ Thống
            </h1>
            <p className="font-body-md text-sm text-on-surface-variant">Quản lý nội dung, hình ảnh và gương mặt tiêu biểu</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 border border-error hover:bg-error hover:text-white text-error rounded-xl font-bold transition-all text-sm flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            Đăng xuất
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-outline-variant/30 pb-2">
          <button
            onClick={() => setActiveTab('messages')}
            className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'messages' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-md">forum</span>
            Quản lý Lời tri ân
          </button>
          <button
            onClick={() => setActiveTab('volunteers')}
            className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'volunteers' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-md">groups</span>
            Gương mặt tiêu biểu
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'gallery' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-md">photo_library</span>
            Album Hình Ảnh
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-md">settings</span>
            Cấu hình Website
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-md">manage_accounts</span>
            Quản lý Tài Khoản
          </button>
          <button
            onClick={() => setActiveTab('member_profiles')}
            className={`pb-2 px-1 font-bold text-sm transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'member_profiles' ? 'border-primary text-primary' : 'border-transparent text-outline hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-md">badge</span>
            Hồ sơ Thành viên
          </button>
        </div>

        {loading ? (
          <div className="text-center py-20 text-on-surface-variant italic flex flex-col items-center gap-2">
            <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
            Đang tải dữ liệu hệ thống...
          </div>
        ) : (
          <>
            {/* Tab 1: Messages */}
            {activeTab === 'messages' && (
              <div className="bg-white rounded-3xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-outline-variant/30 text-xs font-bold text-outline uppercase tracking-wider">
                        <th className="p-4 pl-6">Người gửi</th>
                        <th className="p-4">Nhãn</th>
                        <th className="p-4">Nội dung</th>
                        <th className="p-4">Gửi đến</th>
                        <th className="p-4 pr-6 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 text-sm">
                      {gratitudes.map((msg) => (
                        <tr key={msg.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="p-4 pl-6 font-bold">{msg.senderName}</td>
                          <td className="p-4">
                            {msg.verified ? (
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">TNV Đồng đội</span>
                            ) : (
                              <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full">Sĩ tử/Phụ huynh</span>
                            )}
                          </td>
                          <td className="p-4 max-w-xs md:max-w-md truncate italic">"{msg.content}"</td>
                          <td className="p-4 text-outline font-medium">
                            {msg.volunteer ? msg.volunteer.fullName : 'Hệ thống'}
                          </td>
                          <td className="p-4 pr-6 text-right flex justify-end gap-2">
                            <button
                              onClick={() => handleEditClick(msg)}
                              className="p-1.5 hover:bg-primary/10 text-primary rounded-xl transition-all"
                              title="Sửa"
                            >
                              <span className="material-symbols-outlined text-md">edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteMsg(msg.id)}
                              className="p-1.5 hover:bg-error/10 text-error rounded-xl transition-all"
                              title="Xóa"
                            >
                              <span className="material-symbols-outlined text-md">delete</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {gratitudes.length === 0 && (
                        <tr>
                          <td colSpan="5" className="p-8 text-center text-on-surface-variant italic">
                            Chưa có lời tri ân/lời chúc nào trong hệ thống.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Volunteers */}
            {activeTab === 'volunteers' && (
              <div className="bg-white rounded-3xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-outline-variant/30 text-xs font-bold text-outline uppercase tracking-wider">
                        <th className="p-4 pl-6">Hình ảnh</th>
                        <th className="p-4">Họ và tên</th>
                        <th className="p-4">Chức vụ</th>
                        <th className="p-4">Châm ngôn</th>
                        <th className="p-4">Hall of Fame</th>
                        <th className="p-4 pr-6 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 text-sm">
                      {volunteers.map((vol) => (
                        <tr key={vol.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="p-4 pl-6">
                            <img
                              src={vol.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'}
                              alt={vol.fullName}
                              className="w-10 h-10 object-cover rounded-full border border-outline-variant"
                            />
                          </td>
                          <td className="p-4 font-bold">{vol.fullName}</td>
                          <td className="p-4 text-primary font-medium">{vol.roleName || 'Tình nguyện viên'}</td>
                          <td className="p-4 max-w-xs truncate italic">"{vol.quote || 'Trống'}"</td>
                          <td className="p-4">
                            {vol.featured ? (
                              <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full flex items-center gap-1 w-max">
                                <span className="material-symbols-outlined text-xs">star</span> Tiêu biểu
                              </span>
                            ) : (
                              <span className="text-outline text-xs">Thành viên</span>
                            )}
                          </td>
                          <td className="p-4 pr-6 text-right flex justify-end gap-2">
                            <button
                              onClick={() => handleEditVolClick(vol)}
                              className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl transition-all font-bold text-xs flex items-center gap-1"
                              title="Sửa hồ sơ"
                            >
                              <span className="material-symbols-outlined text-xs">edit</span>
                              Sửa hồ sơ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 6: Member Profiles (All) */}
            {activeTab === 'member_profiles' && (
              <div className="bg-white rounded-3xl border border-outline-variant overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-surface-container-low border-b border-outline-variant/30 text-xs font-bold text-outline uppercase tracking-wider">
                        <th className="p-4 pl-6">Hình ảnh</th>
                        <th className="p-4">Họ và tên</th>
                        <th className="p-4">Chức vụ</th>
                        <th className="p-4">Châm ngôn</th>
                        <th className="p-4 pr-6 text-right">Thao tác</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-outline-variant/20 text-sm">
                      {volunteers.map((vol) => (
                        <tr key={vol.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                          <td className="p-4 pl-6">
                            <img
                              src={vol.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80'}
                              alt={vol.fullName}
                              className="w-10 h-10 object-cover rounded-full border border-outline-variant"
                            />
                          </td>
                          <td className="p-4 font-bold">{vol.fullName}</td>
                          <td className="p-4 text-primary font-medium">{vol.roleName || 'Tình nguyện viên'}</td>
                          <td className="p-4 max-w-xs truncate italic">"{vol.quote || 'Trống'}"</td>
                          <td className="p-4 pr-6 text-right flex justify-end gap-2">
                            <button
                              onClick={() => handleEditVolClick(vol)}
                              className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl transition-all font-bold text-xs flex items-center gap-1"
                              title="Sửa hồ sơ"
                            >
                              <span className="material-symbols-outlined text-xs">edit</span>
                              Sửa hồ sơ
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 3: Gallery */}
            {activeTab === 'gallery' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Add Photo Form */}
                <div className="bg-white border border-outline-variant rounded-3xl p-6 shadow-sm h-fit">
                  <h3 className="font-headline-md text-lg font-bold text-primary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">add_photo_alternate</span>
                    Đăng ảnh kỷ niệm mới
                  </h3>
                  <form onSubmit={handleUploadPhoto} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Đường dẫn ảnh (URL) hoặc Tải lên</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          required
                          placeholder="https://example.com/photo.jpg"
                          value={newPhoto.imageUrl}
                          onChange={(e) => setNewPhoto({ ...newPhoto, imageUrl: e.target.value })}
                          className="flex-1 px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                        />
                        <label className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container transition-all text-sm flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm mr-1">upload_file</span> Chọn tệp
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setNewPhoto({ ...newPhoto, imageUrl: url }))} />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Tiêu đề (Không bắt buộc)</label>
                      <input
                        type="text"
                        placeholder="Tiêu đề khoảnh khắc..."
                        value={newPhoto.title}
                        onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Chi tiết (Không bắt buộc)</label>
                      <textarea
                        rows="2"
                        placeholder="Nội dung khoảnh khắc..."
                        value={newPhoto.detail}
                        onChange={(e) => setNewPhoto({ ...newPhoto, detail: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Thể loại</label>
                        <select
                          value={newPhoto.category}
                          onChange={(e) => setNewPhoto({ ...newPhoto, category: e.target.value })}
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl bg-white outline-none focus:ring-primary text-sm"
                        >
                          <option value="Tập huấn">Tập huấn</option>
                          <option value="Tiếp sức">Tiếp sức</option>
                          <option value="Gắn kết">Gắn kết</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Thứ tự hiển thị</label>
                        <input
                          type="number"
                          min="1"
                          value={newPhoto.displayOrder}
                          onChange={(e) => setNewPhoto({ ...newPhoto, displayOrder: parseInt(e.target.value) || 1 })}
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all text-sm flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">cloud_upload</span>
                      Tải ảnh lên hệ thống
                    </button>
                  </form>
                </div>

                {/* Photos List Grid */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  {gallery.map((photo) => (
                    <div key={photo.id} className="bg-white border border-outline-variant rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
                      <div className="h-48 overflow-hidden bg-surface-container relative">
                        <img
                          src={photo.imageUrl}
                          alt={photo.category}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-3 left-3 bg-black/60 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                          {photo.category}
                        </span>
                      </div>
                      <div className="p-4 flex justify-between items-center bg-surface-container-low border-t border-outline-variant/30">
                        <span className="text-xs text-outline font-medium">Thứ tự: {photo.displayOrder}</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditPhotoClick(photo)}
                            className="p-1.5 hover:bg-primary/10 text-primary rounded-xl transition-all"
                            title="Sửa hình ảnh"
                          >
                            <span className="material-symbols-outlined text-md">edit</span>
                          </button>
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-1.5 hover:bg-error/10 text-error rounded-xl transition-all"
                            title="Xóa hình ảnh"
                          >
                            <span className="material-symbols-outlined text-md">delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {gallery.length === 0 && (
                    <div className="col-span-2 text-center py-20 text-on-surface-variant italic bg-white border border-outline-variant rounded-3xl">
                      Chưa có hình ảnh nào trong album.
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* Tab 4: Settings */}
            {activeTab === 'settings' && (
              <div className="space-y-8 bg-white border border-outline-variant rounded-3xl p-8 shadow-sm text-left">
                <div className="border-b border-outline-variant pb-4 mb-6">
                  <h2 className="font-headline-lg text-xl font-bold text-primary flex items-center gap-2">
                    <span className="material-symbols-outlined">settings_suggest</span>
                    Cấu hình Giao diện & Nội dung Website
                  </h2>
                  <p className="text-xs text-on-surface-variant">Thay đổi hình ảnh, tiêu đề và nội dung trên tất cả các trang (Có thể để trống các ô không cần thiết)</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Section 1: Home & Hero Form */}
                  <form onSubmit={(e) => handleUpdateSettings(e, 'Trang chủ & Hero')} className="space-y-4 border border-outline-variant/60 rounded-2xl p-6 bg-surface-container-lowest flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-md">home</span>
                        Trang Chủ & Hero Section
                      </h3>
                      
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Tiêu đề chính (Hero Title)</label>
                        <input
                          type="text"
                          value={settings.heroTitle || ''}
                          onChange={(e) => setSettings({ ...settings, heroTitle: e.target.value })}
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Tiêu đề phụ (Hero Subtitle)</label>
                        <textarea
                          rows="2"
                          value={settings.heroSubtitle || ''}
                          onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Ảnh nền chính (Hero Background URL) hoặc Tải lên</label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={settings.heroBackground || ''}
                            onChange={(e) => setSettings({ ...settings, heroBackground: e.target.value })}
                            className="flex-1 px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                          />
                          <label className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container transition-all text-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm mr-1">upload_file</span> Chọn tệp
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setSettings({ ...settings, heroBackground: url }))} />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Video YouTube Recap (Embed URL)</label>
                        <input
                          type="url"
                          value={settings.youtubeVideoUrl || ''}
                          onChange={(e) => setSettings({ ...settings, youtubeVideoUrl: e.target.value })}
                          placeholder="https://www.youtube.com/embed/..."
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Dòng chữ bản quyền chân trang (Footer Text)</label>
                        <input
                          type="text"
                          value={settings.footerText || ''}
                          onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                        />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-container shadow-md transition-all text-xs flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">save</span>
                        Lưu Trang chủ & Hero
                      </button>
                    </div>
                  </form>

                  {/* Section 2: Closing Screen Form */}
                  <form onSubmit={(e) => handleUpdateSettings(e, 'Lời Kết')} className="space-y-4 border border-outline-variant/60 rounded-2xl p-6 bg-surface-container-lowest flex flex-col justify-between">
                    <div className="space-y-4">
                      <h3 className="font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-md">logout</span>
                        Trang Lời Kết (Closing Screen)
                      </h3>
                      
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Tiêu đề Lời kết</label>
                        <input
                          type="text"
                          value={settings.closingTitle || ''}
                          onChange={(e) => setSettings({ ...settings, closingTitle: e.target.value })}
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Tiêu đề phụ Lời kết</label>
                        <input
                          type="text"
                          value={settings.closingSubtitle || ''}
                          onChange={(e) => setSettings({ ...settings, closingSubtitle: e.target.value })}
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Ảnh nền Lời kết (URL) hoặc Tải lên</label>
                        <div className="flex gap-2">
                          <input
                            type="url"
                            value={settings.closingImage || ''}
                            onChange={(e) => setSettings({ ...settings, closingImage: e.target.value })}
                            className="flex-1 px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                          />
                          <label className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container transition-all text-sm flex items-center justify-center">
                            <span className="material-symbols-outlined text-sm mr-1">upload_file</span> Chọn tệp
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setSettings({ ...settings, closingImage: url }))} />
                          </label>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-on-surface-variant mb-1">Nội dung Lời kết</label>
                        <textarea
                          rows="3"
                          value={settings.closingContent || ''}
                          onChange={(e) => setSettings({ ...settings, closingContent: e.target.value })}
                          className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                        />
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold text-on-surface-variant mb-1">Mục tiêu TNV</label>
                          <input
                            type="number"
                            value={settings.closingVolTarget || ''}
                            onChange={(e) => setSettings({ ...settings, closingVolTarget: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-on-surface-variant mb-1">Mục tiêu Sĩ tử</label>
                          <input
                            type="number"
                            value={settings.closingStuTarget || ''}
                            onChange={(e) => setSettings({ ...settings, closingStuTarget: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-on-surface-variant mb-1">Mục tiêu Số ngày</label>
                          <input
                            type="number"
                            value={settings.closingDaysTarget || ''}
                            onChange={(e) => setSettings({ ...settings, closingDaysTarget: parseInt(e.target.value) || 0 })}
                            className="w-full px-3 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
                      <button
                        type="submit"
                        className="px-5 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-container shadow-md transition-all text-xs flex items-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">save</span>
                        Lưu Lời Kết
                      </button>
                    </div>
                  </form>
                </div>

                {/* Section 3: Letter Screen Form */}
                <form onSubmit={(e) => handleUpdateSettings(e, 'Thư Cảm Ơn')} className="border border-outline-variant/60 rounded-2xl p-6 bg-surface-container-lowest space-y-6">
                  <h3 className="font-bold text-primary border-b border-outline-variant pb-2 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-md">description</span>
                    Trang Thư Cảm Ơn Tập Thể
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Tiêu đề Thư cảm ơn</label>
                      <input
                        type="text"
                        value={settings.letterTitle || ''}
                        onChange={(e) => setSettings({ ...settings, letterTitle: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Phụ đề Thư cảm ơn</label>
                      <input
                        type="text"
                        value={settings.letterSubtitle || ''}
                        onChange={(e) => setSettings({ ...settings, letterSubtitle: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Ngày tháng viết thư</label>
                      <input
                        type="text"
                        value={settings.letterDate || ''}
                        onChange={(e) => setSettings({ ...settings, letterDate: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Đoạn văn mở đầu (Content Paragraph 1)</label>
                      <textarea
                        rows="3"
                        value={settings.letterContent1 || ''}
                        onChange={(e) => setSettings({ ...settings, letterContent1: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Đoạn văn thân bài (Content Paragraph 2)</label>
                      <textarea
                        rows="3"
                        value={settings.letterContent2 || ''}
                        onChange={(e) => setSettings({ ...settings, letterContent2: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Đoạn văn kết bài (Content Paragraph 3)</label>
                      <textarea
                        rows="4"
                        value={settings.letterContent3 || ''}
                        onChange={(e) => setSettings({ ...settings, letterContent3: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 border border-outline-variant rounded-xl">
                      <label className="block text-xs font-bold text-primary mb-1">Thông số Thống kê 1 (Ví dụ: 120K+)</label>
                      <input
                        type="text"
                        value={settings.letterStat1Val || ''}
                        onChange={(e) => setSettings({ ...settings, letterStat1Val: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl mb-2 text-sm bg-white"
                      />
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">Nhãn mô tả</label>
                      <input
                        type="text"
                        value={settings.letterStat1Lbl || ''}
                        onChange={(e) => setSettings({ ...settings, letterStat1Lbl: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl text-sm bg-white"
                      />
                    </div>
                    <div className="p-4 border border-outline-variant rounded-xl">
                      <label className="block text-xs font-bold text-secondary mb-1">Thông số Thống kê 2 (Ví dụ: 500+)</label>
                      <input
                        type="text"
                        value={settings.letterStat2Val || ''}
                        onChange={(e) => setSettings({ ...settings, letterStat2Val: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl mb-2 text-sm bg-white"
                      />
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">Nhãn mô tả</label>
                      <input
                        type="text"
                        value={settings.letterStat2Lbl || ''}
                        onChange={(e) => setSettings({ ...settings, letterStat2Lbl: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl text-sm bg-white"
                      />
                    </div>
                    <div className="p-4 border border-outline-variant rounded-xl">
                      <label className="block text-xs font-bold text-tertiary mb-1">Thông số Thống kê 3 (Ví dụ: 1.5M)</label>
                      <input
                        type="text"
                        value={settings.letterStat3Val || ''}
                        onChange={(e) => setSettings({ ...settings, letterStat3Val: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl mb-2 text-sm bg-white"
                      />
                      <label className="block text-[10px] font-bold text-on-surface-variant mb-1">Nhãn mô tả</label>
                      <input
                        type="text"
                        value={settings.letterStat3Lbl || ''}
                        onChange={(e) => setSettings({ ...settings, letterStat3Lbl: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Đường dẫn ảnh chữ ký (Signature URL) hoặc Tải lên</label>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          value={settings.letterSignature || ''}
                          onChange={(e) => setSettings({ ...settings, letterSignature: e.target.value })}
                          className="flex-1 px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                        />
                        <label className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container transition-all text-sm flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm mr-1">upload_file</span> Chọn tệp
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setSettings({ ...settings, letterSignature: url }))} />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Tên người ký thư</label>
                      <input
                        type="text"
                        value={settings.letterSignerName || ''}
                        onChange={(e) => setSettings({ ...settings, letterSignerName: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant mb-1">Chức vụ người ký</label>
                      <input
                        type="text"
                        value={settings.letterSignerRole || ''}
                        onChange={(e) => setSettings({ ...settings, letterSignerRole: e.target.value })}
                        className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-outline-variant/30 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-primary text-white rounded-xl font-bold hover:bg-primary-container shadow-md transition-all text-sm flex items-center gap-1.5"
                    >
                      <span className="material-symbols-outlined text-[18px]">save</span>
                      Lưu Thư Cảm Ơn
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

        {/* --- TAB 5: USERS --- */}
        {activeTab === 'users' && (
          <div className="bg-surface rounded-3xl p-6 shadow-sm border border-outline-variant/50">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-headline-md text-2xl font-bold text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">manage_accounts</span>
                Quản lý Tài Khoản
              </h2>
              <button
                onClick={() => setShowAddUserModal(true)}
                className="bg-primary text-on-primary px-4 py-2 rounded-full font-bold text-sm hover:bg-primary/90 transition-colors flex items-center gap-1 shadow-md"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                Thêm Thành Viên
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-variant/30 border-b border-outline-variant">
                    <th className="p-4 font-bold text-on-surface-variant text-sm w-16">ID</th>
                    <th className="p-4 font-bold text-on-surface-variant text-sm">Tài khoản</th>
                    <th className="p-4 font-bold text-on-surface-variant text-sm">Tên hiển thị (TNV)</th>
                    <th className="p-4 font-bold text-on-surface-variant text-sm">Vai trò</th>
                    <th className="p-4 font-bold text-on-surface-variant text-sm text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-b border-outline-variant/30 hover:bg-surface-variant/10 transition-colors">
                      <td className="p-4 text-sm font-medium">{user.id}</td>
                      <td className="p-4 text-sm font-bold">{user.username}</td>
                      <td className="p-4 text-sm">{user.volunteerName || '-'}</td>
                      <td className="p-4 text-sm">
                        <span className={`px-2 py-1 rounded-md text-xs font-bold ${user.role === 'ROLE_ADMIN' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'}`}>
                          {user.role === 'ROLE_ADMIN' ? 'Quản trị viên' : 'Thành viên'}
                        </span>
                      </td>
                      <td className="p-4 flex gap-2 justify-center">
                        <button
                          onClick={() => handleChangeRole(user.id, user.role === 'ROLE_ADMIN' ? 'ROLE_USER' : 'ROLE_ADMIN')}
                          className="bg-surface-variant text-on-surface px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-outline-variant transition-colors flex items-center gap-1"
                          title={user.role === 'ROLE_ADMIN' ? "Hạ quyền thành viên" : "Cấp quyền Admin"}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {user.role === 'ROLE_ADMIN' ? 'arrow_downward' : 'admin_panel_settings'}
                          </span>
                          Đổi quyền
                        </button>
                        <button
                          onClick={() => setResettingUser(user)}
                          className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-secondary/20 transition-colors flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">lock_reset</span>
                          Reset Pass
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan="5" className="p-8 text-center text-outline text-sm">Chưa có người dùng nào</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal 1: Edit Message */}
        {editingMsg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-outline-variant shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-lg font-bold text-primary">Chỉnh sửa Lời tri ân</h3>
                <button
                  onClick={() => setEditingMsg(null)}
                  className="p-1 hover:bg-surface-container rounded-full"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleUpdateMsg} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Tên người gửi</label>
                  <input
                    type="text"
                    required
                    value={editFormData.senderName}
                    onChange={(e) => setEditFormData({ ...editFormData, senderName: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Nội dung</label>
                  <textarea
                    required
                    rows="5"
                    value={editFormData.content}
                    onChange={(e) => setEditFormData({ ...editFormData, content: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all text-sm"
                >
                  Lưu thay đổi
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal 2: Edit Volunteer Profile */}
        {editingVol && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-outline-variant shadow-xl overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-lg font-bold text-primary">Sửa Hồ Sơ Tình Nguyện Viên</h3>
                <button
                  onClick={() => setEditingVol(null)}
                  className="p-1 hover:bg-surface-container rounded-full"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleUpdateVol} className="space-y-4 text-left">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1">Họ và tên</label>
                    <input
                      type="text"
                      required
                      value={editVolFormData.fullName}
                      onChange={(e) => setEditVolFormData({ ...editVolFormData, fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1">Chức vụ / Đội</label>
                    <input
                      type="text"
                      required
                      value={editVolFormData.roleName}
                      onChange={(e) => setEditVolFormData({ ...editVolFormData, roleName: e.target.value })}
                      className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Ảnh đại diện (URL) hoặc Tải lên</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={editVolFormData.avatarUrl}
                      onChange={(e) => setEditVolFormData({ ...editVolFormData, avatarUrl: e.target.value })}
                      className="flex-1 px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                    />
                    <label className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container transition-all text-sm flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm mr-1">upload_file</span> Chọn tệp
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setEditVolFormData({ ...editVolFormData, avatarUrl: url }))} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Ảnh bìa (URL) hoặc Tải lên</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={editVolFormData.coverUrl}
                      onChange={(e) => setEditVolFormData({ ...editVolFormData, coverUrl: e.target.value })}
                      className="flex-1 px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                    />
                    <label className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container transition-all text-sm flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm mr-1">upload_file</span> Chọn tệp
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setEditVolFormData({ ...editVolFormData, coverUrl: url }))} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Châm ngôn (Quote)</label>
                  <input
                    type="text"
                    value={editVolFormData.quote}
                    onChange={(e) => setEditVolFormData({ ...editVolFormData, quote: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Tiểu sử (Biography)</label>
                  <textarea
                    rows="3"
                    value={editVolFormData.bio}
                    onChange={(e) => setEditVolFormData({ ...editVolFormData, bio: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                  />
                </div>

                <div className="flex items-center gap-2 py-2">
                  <input
                    type="checkbox"
                    id="featured-checkbox"
                    checked={editVolFormData.featured}
                    onChange={(e) => setEditVolFormData({ ...editVolFormData, featured: e.target.checked })}
                    className="w-4 h-4 text-primary border-outline-variant rounded"
                  />
                  <label htmlFor="featured-checkbox" className="text-sm font-bold text-on-surface cursor-pointer">
                    Chọn làm Gương mặt tiêu biểu (Hiển thị trang chủ)
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all text-sm"
                >
                  Lưu thay đổi hồ sơ
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal 3: Edit Photo */}
        {editingPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-outline-variant shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-lg font-bold text-primary">Chỉnh sửa Hình ảnh</h3>
                <button
                  onClick={() => setEditingPhoto(null)}
                  className="p-1 hover:bg-surface-container rounded-full"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              <form onSubmit={handleUpdatePhoto} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Đường dẫn ảnh (URL) hoặc Tải lên</label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      required
                      value={editPhotoFormData.imageUrl}
                      onChange={(e) => setEditPhotoFormData({ ...editPhotoFormData, imageUrl: e.target.value })}
                      className="flex-1 px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                    />
                    <label className="cursor-pointer px-4 py-2 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container transition-all text-sm flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm mr-1">upload_file</span> Chọn tệp
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, (url) => setEditPhotoFormData({ ...editPhotoFormData, imageUrl: url }))} />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Tiêu đề (Không bắt buộc)</label>
                  <input
                    type="text"
                    value={editPhotoFormData.title}
                    onChange={(e) => setEditPhotoFormData({ ...editPhotoFormData, title: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1">Chi tiết (Không bắt buộc)</label>
                  <textarea
                    rows="3"
                    value={editPhotoFormData.detail}
                    onChange={(e) => setEditPhotoFormData({ ...editPhotoFormData, detail: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1">Thể loại</label>
                    <select
                      value={editPhotoFormData.category}
                      onChange={(e) => setEditPhotoFormData({ ...editPhotoFormData, category: e.target.value })}
                      className="w-full px-4 py-2 border border-outline-variant rounded-xl bg-white outline-none focus:ring-primary text-sm"
                    >
                      <option value="Tập huấn">Tập huấn</option>
                      <option value="Tiếp sức">Tiếp sức</option>
                      <option value="Gắn kết">Gắn kết</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant mb-1">Thứ tự hiển thị</label>
                    <input
                      type="number"
                      min="1"
                      value={editPhotoFormData.displayOrder}
                      onChange={(e) => setEditPhotoFormData({ ...editPhotoFormData, displayOrder: parseInt(e.target.value) || 1 })}
                      className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none text-sm bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all text-sm"
                >
                  Lưu thay đổi ảnh
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add User */}
        {showAddUserModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-outline-variant shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-lg font-bold text-primary">Thêm người dùng mới</h3>
                <button
                  onClick={() => setShowAddUserModal(false)}
                  className="p-1 hover:bg-surface-container rounded-full"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleCreateUser} className="space-y-4 text-left">
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Tên đăng nhập (Username) *</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={newUser.username}
                    onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Mật khẩu *</label>
                  <input
                    type="password"
                    required
                    className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Họ và Tên (Hiển thị) *</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={newUser.fullName}
                    onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Vai trò</label>
                  <select
                    className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={newUser.role}
                    onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                  >
                    <option value="ROLE_USER">Thành viên (Tình nguyện viên)</option>
                    <option value="ROLE_ADMIN">Quản trị viên (Admin)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all text-sm mt-4"
                >
                  Tạo tài khoản
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Reset Password */}
        {resettingUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl p-8 max-w-sm w-full border border-outline-variant shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-headline-md text-lg font-bold text-primary">Reset mật khẩu</h3>
                <button
                  onClick={() => setResettingUser(null)}
                  className="p-1 hover:bg-surface-container rounded-full"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              <form onSubmit={handleResetPassword} className="space-y-4 text-left">
                <div className="mb-2">
                  <p className="text-sm text-on-surface-variant">
                    Đặt lại mật khẩu cho tài khoản: <strong className="text-primary">{resettingUser.username}</strong>
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Mật khẩu mới *</label>
                  <input
                    type="text"
                    required
                    className="w-full p-3 bg-surface border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={resetPasswordForm.newPassword}
                    onChange={(e) => setResetPasswordForm({newPassword: e.target.value})}
                    placeholder="Nhập mật khẩu mới..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-secondary text-white rounded-xl font-bold hover:bg-secondary-container hover:shadow-lg transition-all text-sm mt-4"
                >
                  Xác nhận Reset
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
