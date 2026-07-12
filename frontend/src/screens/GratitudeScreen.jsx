import React from 'react';

export default function GratitudeScreen({ onNavigate }) {
  const [volunteers, setVolunteers] = React.useState([]);
  const [allGratitudes, setAllGratitudes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    volunteerId: '',
    senderName: '',
    senderCode: '', 
    type: 'student', 
    content: '',
  });
  const [editingNoteId, setEditingNoteId] = React.useState(null);

  const isOwner = (msg) => {
    const role = localStorage.getItem('userRole');
    if (role === 'ROLE_ADMIN') return true;

    if (role === 'ROLE_USER') {
      const currentUserId = localStorage.getItem('userId');
      return msg.senderUser && String(msg.senderUser.id) === String(currentUserId);
    }

    const guestSessionId = localStorage.getItem('guest_session_id');
    return msg.guestSessionId && msg.guestSessionId === guestSessionId;
  };

  const handleEditClick = (note) => {
    setEditingNoteId(note.id);
    setFormData({
      volunteerId: note.volunteer ? note.volunteer.id : '',
      senderName: note.senderName,
      senderCode: note.senderCode || '',
      type: note.verified ? 'volunteer' : 'student',
      content: note.content
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lời nhắn này?')) return;
    fetch(`http://localhost:8080/api/gratitudes/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể xóa tin nhắn');
        return res.json();
      })
      .then(() => {
        alert('Xóa lời nhắn thành công!');
        loadData();
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  const loadData = () => {
    setLoading(true);
    const fetchGratitudes = fetch('http://localhost:8080/api/gratitudes')
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);
    const fetchVols = fetch('http://localhost:8080/api/volunteers')
      .then(res => res.ok ? res.json() : [])
      .catch(() => []);

    Promise.all([fetchGratitudes, fetchVols])
      .then(([gratitudeData, volData]) => {
        setAllGratitudes(Array.isArray(gratitudeData) ? gratitudeData : []);
        setVolunteers(Array.isArray(volData) ? volData : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Lỗi khi tải dữ liệu tri ân:', err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const isLoggedIn = !!localStorage.getItem('token') && localStorage.getItem('userRole') !== 'ROLE_GUEST';

  React.useEffect(() => {
    if (isModalOpen && !editingNoteId && isLoggedIn) {
      setFormData(prev => ({
        ...prev,
        senderName: localStorage.getItem('username') || '',
        type: 'volunteer',
        senderCode: ''
      }));
    }
  }, [isModalOpen, editingNoteId, isLoggedIn]);


  const volNotes = allGratitudes.filter(n => n.verified === true);
  const stuNotes = allGratitudes.filter(n => n.verified === false);

  const getInitials = (name) => {
    if (!name) return 'TN';
    return name.slice(0, 2).toUpperCase();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.volunteerId || !formData.senderName || !formData.content) return;

    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const payload = {
      volunteerId: Number(formData.volunteerId),
      senderName: formData.senderName,
      senderCode: formData.senderCode || null,
      content: formData.content
    };

    if (editingNoteId) {
      fetch(`http://localhost:8080/api/gratitudes/${editingNoteId}`, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify(payload),
      })
        .then(res => {
          if (!res.ok) throw new Error('Không thể chỉnh sửa lời nhắn');
          return res.json();
        })
        .then(() => {
          alert('Cập nhật lời nhắn thành công!');
          setIsModalOpen(false);
          setEditingNoteId(null);
          setFormData({ volunteerId: '', senderName: '', senderCode: '', type: 'student', content: '' });
          loadData(); 
        })
        .catch(err => {
          alert('Lỗi: ' + err.message);
        });
    } else {
      fetch('http://localhost:8080/api/gratitudes', {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
      })
        .then(res => {
          if (!res.ok) throw new Error('Không thể gửi tin nhắn');
          return res.json();
        })
        .then(() => {
          alert('Gửi lời nhắn thành công!');
          setIsModalOpen(false);
          setFormData({ volunteerId: '', senderName: '', senderCode: '', type: 'student', content: '' });
          loadData(); 
        })
        .catch(err => {
          alert('Lỗi: ' + err.message);
        });
    }
  };

  return (
    <div className="w-full text-on-surface font-body-md overflow-x-hidden pt-24 pb-section-gap">
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 40px 60px 0 rgba(0, 136, 255, 0.08);
        }
        .masonry-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 768px) { .masonry-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (min-width: 1024px) { .masonry-grid { grid-template-columns: repeat(3, 1fr); } }
      `}</style>

      {/* Header */}
      <header className="text-center mb-16 space-y-4 pt-8 max-w-container-max mx-auto px-margin-mobile">
        <h1 className="font-display-lg text-3xl md:text-5xl font-extrabold text-primary">
          Bức Tường Tri Ân
        </h1>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Nơi lưu giữ những lời cảm ơn ấm áp từ thí sinh, phụ huynh và những lời chúc thân thương gửi cho nhau của các tình nguyện viên.
        </p>
      </header>

      {loading ? (
        <div className="text-center py-20 text-on-surface-variant italic">Đang tải bức tường tri ân...</div>
      ) : (
        <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop space-y-24">
          
          {/* Section 1: Volunteers to Members */}
          <section>
            <div className="flex items-center gap-4 mb-12">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
              <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-primary">Lời Chúc Từ Đồng Đội</h2>
            </div>
            
            <div className="masonry-grid">
              {volNotes.map((note) => (
                <div key={note.id} className="group h-full">
                  <div className="glass-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between h-full bg-emerald-50/20 border border-white/50">
                    {isOwner(note) && (
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={() => handleEditClick(note)}
                          className="p-1 bg-black/60 hover:bg-primary text-white rounded-full transition-colors"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-xs !text-[12px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="p-1 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-xs !text-[12px]">delete</span>
                        </button>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 text-primary/10 pointer-events-none select-none">
                      <span className="material-symbols-outlined text-6xl">format_quote</span>
                    </div>
                    <p className="font-body-md text-on-surface-variant mb-6 italic leading-relaxed">
                      "{note.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shrink-0 bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {getInitials(note.senderName)}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-sm">
                          {note.senderName} 
                          <span className="ml-2 text-[8px] bg-emerald-100 text-emerald-800 px-1 rounded-full uppercase">Đồng đội</span>
                        </h4>
                        <p className="text-xs text-on-surface-variant font-bold">Gửi đến: {note.volunteer?.fullName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Students to Volunteers */}
          <section>
            <div className="flex items-center gap-4 mb-12">
              <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-tertiary">Những Lời Cảm Ơn Từ Sĩ Tử &amp; Phụ Huynh</h2>
            </div>
            
            <div className="masonry-grid">
              {stuNotes.map((note) => (
                <div key={note.id} className="group h-full">
                  <div className="glass-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between h-full bg-yellow-50/20 border border-white/50">
                    {isOwner(note) && (
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        <button
                          onClick={() => handleEditClick(note)}
                          className="p-1 bg-black/60 hover:bg-primary text-white rounded-full transition-colors"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-xs !text-[12px]">edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="p-1 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors"
                          title="Xóa"
                        >
                          <span className="material-symbols-outlined text-xs !text-[12px]">delete</span>
                        </button>
                      </div>
                    )}
                    <div className="absolute top-4 right-4 text-tertiary/10 pointer-events-none select-none">
                      <span className="material-symbols-outlined text-6xl">format_quote</span>
                    </div>
                    <p className="font-body-md text-on-surface-variant mb-6 italic leading-relaxed">
                      "{note.content}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-tertiary shrink-0 bg-tertiary/10 flex items-center justify-center font-bold text-tertiary">
                        {getInitials(note.senderName)}
                      </div>
                      <div>
                        <h4 className="font-bold text-tertiary text-sm">{note.senderName}</h4>
                        <p className="text-xs text-on-surface-variant font-bold">Tri ân chiến sĩ: {note.volunteer?.fullName}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Write Button Floating */}
          <div className="text-center pt-8">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 bg-primary text-white rounded-full font-bold hover:bg-primary-container shadow-lg flex items-center gap-2 mx-auto"
            >
              <span className="material-symbols-outlined">edit_square</span>
              Viết Lời Cảm Ơn / Lời Chúc
            </button>
          </div>
        </main>
      )}

      {/* Write Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full glass-card border border-white/40">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-primary">
                {editingNoteId ? 'Cập Nhật Lời Tri Ân / Chúc Mừng' : 'Gửi Lời Tri Ân / Chúc Mừng'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingNoteId(null);
                  setFormData({ volunteerId: '', senderName: '', senderCode: '', type: 'student', content: '' });
                }}
                className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              {!isLoggedIn && (
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Tôi là</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-sm font-medium cursor-not-allowed opacity-60">
                      <input
                        type="radio"
                        disabled
                        checked={formData.type === 'volunteer'}
                        className="text-primary cursor-not-allowed"
                      />
                      <span className="flex items-center gap-1">
                        Tình nguyện viên <span className="material-symbols-outlined text-[16px]">lock</span>
                      </span>
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                      <input
                        type="radio"
                        checked={formData.type === 'student'}
                        onChange={() => setFormData({ ...formData, type: 'student' })}
                        className="text-primary"
                      />
                      Sĩ tử / Phụ huynh
                    </label>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Gửi đến chiến sĩ</label>
                <select
                  required
                  value={formData.volunteerId}
                  onChange={(e) => setFormData({ ...formData, volunteerId: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none"
                >
                  <option value="">-- Chọn tình nguyện viên --</option>
                  {volunteers.map(v => (
                    <option key={v.id} value={v.id}>{v.fullName} ({v.roleName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Tên của bạn</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Minh Hằng"
                  value={formData.senderName}
                  onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Nội dung</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Viết những dòng tri ân ý nghĩa..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all"
              >
                Gửi đi
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}