import React from 'react';

const initialEntries = [
  {
    id: 1,
    type: 'polaroid',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQcEBOCqSddiQ5l8C7DeoiNoPCsvPHNb4cyxDYsh7yRuk3kIQvmvKkyrFFwNnTsU_pQPPIRhjrtBuULL6_AG7CwHhFbgiWYkpIoWHQa__fP-ZV4XMNzV7MWZo1Xw4_gEh3EBGtjnrqa5FkfKACweekayQvcLCuQZfadCd4mf5mN4OzgQ1UPshothxny1H7M-cXV1qmg_4lQu9dprjdc2wHZb7og9ELajhoSmOFKreMQY090oetA5km',
    text: 'Dưới cái nắng 39 độ, nụ cười của các bạn vẫn là điều rực rỡ nhất! 💙 - Team Quận 1',
    date: '12 Tháng 7, 2026',
    rotation: '-rotate-2',
    span: 'md:col-span-1 md:row-span-2',
    rawName: 'Team Quận 1',
    rawMessage: 'Dưới cái nắng 39 độ, nụ cười của các bạn vẫn là điều rực rỡ nhất! 💙',
    rawImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQcEBOCqSddiQ5l8C7DeoiNoPCsvPHNb4cyxDYsh7yRuk3kIQvmvKkyrFFwNnTsU_pQPPIRhjrtBuULL6_AG7CwHhFbgiWYkpIoWHQa__fP-ZV4XMNzV7MWZo1Xw4_gEh3EBGtjnrqa5FkfKACweekayQvcLCuQZfadCd4mf5mN4OzgQ1UPshothxny1H7M-cXV1qmg_4lQu9dprjdc2wHZb7og9ELajhoSmOFKreMQY090oetA5km',
  },
  {
    id: 2,
    type: 'sticky',
    bg: 'bg-tertiary-fixed text-on-tertiary-container',
    text: '"Em cảm ơn anh chị đội nắng đưa em đi tìm phòng thi. Nếu không có mọi người, chắc em đã bỏ cuộc vì quá áp lực rồi. Yêu cả nhà mình!"',
    author: 'Minh Anh, THPT Lê Hồng Phong',
    span: 'md:col-span-1',
    rawName: 'Minh Anh',
    rawRole: 'Sĩ tử THPT',
    rawMessage: 'Em cảm ơn anh chị đội nắng đưa em đi tìm phòng thi. Nếu không có mọi người, chắc em đã bỏ cuộc vì quá áp lực rồi. Yêu cả nhà mình!',
  },
  {
    id: 3,
    type: 'leader',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4tpcEQeVWnWsTr3M6uEn2VV6Kx2Up-DRYyERuqGN9iFTsPfci-fiiF5SijzuyXqAYm6RmddBCaFnyZf_FllWnW4XZQsrxs5v4NP2_uFQZOmSn2Y5vioebSey_Ob1EQG8GrMggDIWabGigXJBQST2MMbSKlVzg8qCyi-U4IydsrqqdnSMndnYPW5CjIlJXWlrYEOZvRyxf_QjTFpFRVYMCODmpx9xoCj9_cRTdq_d9FOR940mIb7YV',
    name: 'Anh Hoàng Nam',
    role: 'Ban Chỉ Đạo Trung Ương',
    text: '"Nhìn các em lăn xả, tôi thấy lại hình ảnh của chính mình 15 năm trước. Tiếp Sức Mùa Thi không chỉ là một chiến dịch, đó là nơi nuôi dưỡng những trái tim biết sống vì cộng đồng."',
    span: 'md:col-span-1',
    rawName: 'Anh Hoàng Nam',
    rawRole: 'Ban Chỉ Đạo Trung Ương',
    rawMessage: 'Nhìn các em lăn xả, tôi thấy lại hình ảnh của chính mình 15 năm trước. Tiếp Sức Mùa Thi không chỉ là một chiến dịch, đó là nơi nuôi dưỡng những trái tim biết sống vì cộng đồng.',
  },
  {
    id: 4,
    type: 'polaroid',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMfLiKiUQoAR-RlyIZXf_A7Iz8Mjz6dJld8zBiA_ZGjehag8d496N8xJQGgoj9nD1kZbjdpRcHLl435ewKc_5pz2BXHC8_FJqJ4HPllVCOa1TxfsBs7QRMFZS_5cVo03F816WQ38o-3QjScD5Uy7deQpZBN1R7_zmAtFwMqzS0KNO8Eg5RA2lA7jSAxJqZ8drFY1d99g2rurnD-JcW2TkYe-cW-lKBNBfCYyMrvgdrRzNVB2OiuO9W',
    text: 'Chút nước mát giữa giờ nghỉ. Cố lên nhé các chiến binh! ✨',
    date: '10 Tháng 7, 2026',
    rotation: 'rotate-3',
    span: 'md:col-span-1 md:row-span-2',
    rawName: 'Chiến binh Tiếp sức',
    rawMessage: 'Chút nước mát giữa giờ nghỉ. Cố lên nhé các chiến binh! ✨',
    rawImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMfLiKiUQoAR-RlyIZXf_A7Iz8Mjz6dJld8zBiA_ZGjehag8d496N8xJQGgoj9nD1kZbjdpRcHLl435ewKc_5pz2BXHC8_FJqJ4HPllVCOa1TxfsBs7QRMFZS_5cVo03F816WQ38o-3QjScD5Uy7deQpZBN1R7_zmAtFwMqzS0KNO8Eg5RA2lA7jSAxJqZ8drFY1d99g2rurnD-JcW2TkYe-cW-lKBNBfCYyMrvgdrRzNVB2OiuO9W',
  },
  {
    id: 5,
    type: 'autographs',
    title: 'Chữ Ký Tình Bạn 2026',
    items: [
      'Mãi là anh em nhé! - Đức "Gầy"',
      'Hẹn gặp lại ở giảng đường đại học! - Thùy Linh',
      'TSMT 2026 - Kỷ niệm đẹp nhất thanh xuân.',
    ],
    span: 'md:col-span-1',
  },
  {
    id: 6,
    type: 'stat',
    value: '24,500+',
    label: 'Chuyến xe miễn phí',
    text: '"Những con số không chỉ là thống kê, đó là từng quãng đường chúng tôi đồng hành cùng ước mơ của các em."',
    span: 'md:col-span-1',
  }
];

export default function GuestbookScreen({ onNavigate }) {
  const [entries, setEntries] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [isFormOpen, setIsFormOpen] = React.useState(false);
  const [editingEntryId, setEditingEntryId] = React.useState(null);
  const [zoomedEntry, setZoomedEntry] = React.useState(null);

  const getAutographItems = (entry) => {
    if (entry.items) return entry.items;
    if (entry.itemsJson) {
      try {
        return JSON.parse(entry.itemsJson);
      } catch (e) {
        return [];
      }
    }
    return [];
  };

  const isOwner = (entry) => {
    const role = localStorage.getItem('userRole');
    if (role === 'ROLE_ADMIN') return true;

    if (!entry.creatorRole) return false;

    if (entry.creatorRole === 'ROLE_USER') {
      const currentUserId = localStorage.getItem('userId');
      return role === 'ROLE_USER' && String(entry.creatorUser?.id || entry.creatorUserId) === String(currentUserId);
    }

    if (entry.creatorRole === 'ROLE_GUEST') {
      const guestSessionId = localStorage.getItem('guest_session_id');
      return entry.creatorGuestUuid && entry.creatorGuestUuid === guestSessionId;
    }

    return false;
  };

  const loadEntries = () => {
    setLoading(true);
    fetch('http://localhost:8080/api/guestbook')
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          // Seed initial mock entries on empty database
          const seedPromises = initialEntries.map(entry => {
            return fetch('http://localhost:8080/api/guestbook', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
              },
              body: JSON.stringify({
                type: entry.type,
                bg: entry.bg,
                rotation: entry.rotation,
                span: entry.span,
                text: entry.text,
                author: entry.author,
                imageUrl: entry.image,
                dateStr: entry.date,
                rawName: entry.rawName,
                rawRole: entry.rawRole,
                rawMessage: entry.rawMessage,
                rawImage: entry.rawImage,
                title: entry.title,
                itemsJson: entry.items ? JSON.stringify(entry.items) : null,
                statValue: entry.value,
                statLabel: entry.label,
                avatar: entry.avatar,
                name: entry.name,
                role: entry.role,
                creatorRole: null
              })
            });
          });
          Promise.all(seedPromises)
            .then(() => {
              fetch('http://localhost:8080/api/guestbook')
                .then(res => res.json())
                .then(newData => {
                  setEntries(newData);
                  setLoading(false);
                });
            });
        } else {
          setEntries(data);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error loading guestbook:', err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    loadEntries();
  }, []);
  
  const [formData, setFormData] = React.useState({
    name: '',
    role: 'Sĩ tử THPT',
    message: '',
    type: 'sticky', // sticky or polaroid
    image: '',
  });

  const handleDeleteEntry = (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa lưu bút này không?')) return;
    
    fetch(`http://localhost:8080/api/guestbook/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Không có quyền xóa hoặc lưu bút không tồn tại');
        return res.json();
      })
      .then(() => {
        alert('Xóa lưu bút thành công!');
        loadEntries();
      })
      .catch(err => alert('Lỗi: ' + err.message));
  };

  const handleEditEntry = (entry) => {
    setEditingEntryId(entry.id);
    setFormData({
      name: entry.rawName || '',
      role: entry.rawRole || 'Sĩ tử THPT',
      message: entry.rawMessage || '',
      type: entry.type === 'polaroid' ? 'polaroid' : 'sticky',
      image: entry.rawImage || '',
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    if (editingEntryId) {
      const payload = {
        type: formData.type,
        text: formData.type === 'sticky' ? `"${formData.message}"` : `${formData.message} - ${formData.name}`,
        author: formData.type === 'sticky' ? `${formData.name}, ${formData.role}` : null,
        imageUrl: formData.type === 'polaroid' ? (formData.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80') : null,
        rawName: formData.name,
        rawRole: formData.role,
        rawMessage: formData.message,
        rawImage: formData.image
      };

      fetch(`http://localhost:8080/api/guestbook/${editingEntryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      })
        .then(res => {
          if (!res.ok) throw new Error('Lỗi chỉnh sửa lưu bút');
          return res.json();
        })
        .then(() => {
          setEditingEntryId(null);
          setIsFormOpen(false);
          setFormData({ name: '', role: 'Sĩ tử THPT', message: '', type: 'sticky', image: '' });
          loadEntries();
        })
        .catch(err => alert('Lỗi: ' + err.message));
    } else {
      const payload = {
        type: formData.type,
        bg: formData.type === 'sticky' ? 'bg-primary-container text-on-primary-container' : null,
        rotation: formData.type === 'polaroid' ? (Math.random() > 0.5 ? 'rotate-2' : '-rotate-2') : null,
        span: 'md:col-span-1',
        text: formData.type === 'sticky' ? `"${formData.message}"` : `${formData.message} - ${formData.name}`,
        author: formData.type === 'sticky' ? `${formData.name}, ${formData.role}` : null,
        imageUrl: formData.type === 'polaroid' ? (formData.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80') : null,
        dateStr: formData.type === 'polaroid' ? 'Hôm nay' : null,
        rawName: formData.name,
        rawRole: formData.role,
        rawMessage: formData.message,
        rawImage: formData.image
      };

      fetch('http://localhost:8080/api/guestbook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      })
        .then(res => {
          if (!res.ok) throw new Error('Lỗi gửi lưu bút');
          return res.json();
        })
        .then(() => {
          setIsFormOpen(false);
          setFormData({ name: '', role: 'Sĩ tử THPT', message: '', type: 'sticky', image: '' });
          loadEntries();
        })
        .catch(err => alert('Lỗi: ' + err.message));
    }
  };

  return (
    <div className="w-full text-on-surface font-body-md overflow-x-hidden pt-24 pb-section-gap bg-surface-container-lowest">
      <style>{`
        .glass-blur {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 40px 60px 0 rgba(0, 136, 255, 0.08);
        }
        .polaroid {
          background: white;
          padding: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          transition: transform 0.3s ease;
        }
        .polaroid:hover {
          transform: rotate(0deg) scale(1.02);
          z-index: 10;
        }
        .sticky-note {
          box-shadow: 5px 10px 20px rgba(0,0,0,0.05);
          transform: rotate(1deg);
          transition: transform 0.3s ease;
        }
        .sticky-note:hover {
          transform: rotate(0deg) scale(1.02);
        }
        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-zoom-in {
          animation: zoomIn 0.25s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>

      {/* Hero Header */}
      <header className="px-margin-desktop max-w-container-max mx-auto text-center mb-16 relative pt-8">
        <div className="absolute -top-12 left-1/4 animate-bounce opacity-10 select-none">
          <span className="material-symbols-outlined text-primary text-[120px]">brush</span>
        </div>
        <h1 className="font-display-lg text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-primary">Sổ Lưu Bút Tiếp Sức 2026</h1>
        <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto italic">
          Nơi lưu giữ những mảnh ký ức ngọt ngào, những lời cảm ơn chân thành và ngọn lửa nhiệt huyết của tuổi trẻ Việt Nam trong mùa thi đầy kỉ niệm.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <span className="px-4 py-2 bg-secondary-container text-on-secondary-container rounded-full font-label-sm text-xs font-bold uppercase">#SharedMemories</span>
          <span className="px-4 py-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-full font-label-sm text-xs font-bold uppercase">#GroupReflections</span>
        </div>
      </header>

      {/* Grid Scrapbook Content */}
      {loading ? (
        <div className="text-center py-20 text-on-surface-variant italic flex flex-col items-center gap-2">
          <span className="material-symbols-outlined animate-spin text-4xl text-primary">sync</span>
          Đang tải sổ lưu bút tiếp sức từ hệ thống...
        </div>
      ) : (
        <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 [column-fill:_balance]">
            
            {/* Interactive "Add Note" Card */}
            <div
              onClick={() => { setEditingEntryId(null); setIsFormOpen(true); }}
              className="inline-block w-full break-inside-avoid glass-blur border-dashed border-2 border-primary/30 p-8 rounded-3xl flex flex-col items-center justify-center text-center group cursor-pointer hover:bg-white/50 transition-all min-h-[220px] mb-8"
            >
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                <span className="material-symbols-outlined text-primary text-3xl">edit_note</span>
              </div>
              <h4 className="font-headline-md text-lg font-bold text-primary mb-2">Để lại lời nhắn</h4>
              <p className="font-body-md text-sm text-on-surface-variant">Viết tiếp những trang lưu bút cho mùa hè rực rỡ này.</p>
            </div>

            {entries.map((entry) => {
              if (entry.type === 'polaroid') {
                return (
                  <div key={entry.id} onClick={() => setZoomedEntry(entry)} className={`inline-block w-full break-inside-avoid polaroid ${entry.rotation} ${entry.span || ''} mb-8 relative group/card cursor-zoom-in hover:scale-[1.02] transition-transform`}>
                    {isOwner(entry) && (
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditEntry(entry); }}
                          className="p-1 bg-black/60 hover:bg-primary text-white rounded-full transition-colors"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-xs !text-[14px]">edit</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry.id); }}
                          className="p-1 bg-black/60 hover:bg-red-600 text-white rounded-full transition-colors"
                          title="Xóa lưu bút"
                        >
                          <span className="material-symbols-outlined text-xs !text-[14px]">delete</span>
                        </button>
                      </div>
                    )}
                    <img
                      className="w-full h-auto object-cover mb-4 rounded-sm"
                      alt="scrapbook memory"
                      src={entry.imageUrl || entry.image}
                    />
                    <p className="font-handwritten text-2xl text-on-surface-variant leading-tight">
                      {entry.text}
                    </p>
                    <div className="mt-4 text-right">
                      <span className="font-label-sm text-xs font-bold text-primary">{entry.dateStr || entry.date}</span>
                    </div>
                  </div>
                );
              }
              
              if (entry.type === 'sticky') {
                return (
                  <div key={entry.id} onClick={() => setZoomedEntry(entry)} className={`inline-block w-full break-inside-avoid sticky-note ${entry.bg || 'bg-primary-container text-on-primary-container'} p-8 rounded-sm ${entry.span || ''} mb-8 relative group/card cursor-zoom-in hover:scale-[1.02] transition-transform`}>
                    {isOwner(entry) && (
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditEntry(entry); }}
                          className="p-1 bg-black/10 hover:bg-primary hover:text-white text-current rounded-full transition-colors"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-xs !text-[14px]">edit</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry.id); }}
                          className="p-1 bg-black/10 hover:bg-red-600 hover:text-white text-current rounded-full transition-colors"
                          title="Xóa lưu bút"
                        >
                          <span className="material-symbols-outlined text-xs !text-[14px]">delete</span>
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-2 mb-4 opacity-80">
                      <span className="material-symbols-outlined">push_pin</span>
                      <span className="text-xs font-bold uppercase tracking-widest">Lời nhắn</span>
                    </div>
                    <p className="font-handwritten text-2xl leading-relaxed">
                      {entry.text}
                    </p>
                    <div className="mt-6 border-t border-current/10 pt-4 font-body-md font-bold text-sm">
                      — {entry.author}
                    </div>
                  </div>
                );
              }

              if (entry.type === 'leader') {
                return (
                  <div key={entry.id} onClick={() => setZoomedEntry(entry)} className={`inline-block w-full break-inside-avoid glass-blur p-8 rounded-3xl ${entry.span || ''} border border-white/40 shadow-lg mb-8 relative group/card cursor-zoom-in hover:scale-[1.02] transition-transform`}>
                    {isOwner(entry) && (
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleEditEntry(entry); }}
                          className="p-1 bg-black/10 hover:bg-primary hover:text-white text-on-surface-variant rounded-full transition-colors"
                          title="Chỉnh sửa"
                        >
                          <span className="material-symbols-outlined text-xs !text-[14px]">edit</span>
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry.id); }}
                          className="p-1 bg-black/10 hover:bg-red-600 hover:text-white text-on-surface-variant rounded-full transition-colors"
                          title="Xóa lưu bút"
                        >
                          <span className="material-symbols-outlined text-xs !text-[14px]">delete</span>
                        </button>
                      </div>
                    )}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-full border-2 border-primary overflow-hidden shrink-0">
                        <img className="w-full h-full object-cover" alt={entry.name} src={entry.avatar} />
                      </div>
                      <div>
                        <h4 className="font-headline-md text-md font-bold text-primary">{entry.name}</h4>
                        <p className="text-xs text-on-surface-variant font-bold">{entry.role}</p>
                      </div>
                    </div>
                    <p className="font-body-md text-sm text-on-surface italic mb-4">
                      {entry.text}
                    </p>
                    <div className="flex justify-end text-primary-container">
                      <span className="material-symbols-outlined text-4xl">history_edu</span>
                    </div>
                  </div>
                );
              }

              if (entry.type === 'autographs') {
                return (
                  <div key={entry.id} onClick={() => setZoomedEntry(entry)} className={`inline-block w-full break-inside-avoid bg-primary-container p-8 rounded-[40px] text-on-primary-container ${entry.span || ''} mb-8 relative group/card cursor-zoom-in hover:scale-[1.02] transition-transform`}>
                    {isOwner(entry) && (
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry.id); }}
                          className="p-1 bg-black/10 hover:bg-red-600 hover:text-white text-on-primary-container rounded-full transition-colors"
                          title="Xóa lưu bút"
                        >
                          <span className="material-symbols-outlined text-xs !text-[14px]">delete</span>
                        </button>
                      </div>
                    )}
                    <h3 className="font-headline-md text-lg font-bold mb-6 flex items-center gap-2">
                      <span className="material-symbols-outlined">border_color</span>
                      {entry.title}
                    </h3>
                    <div className="space-y-6">
                      {getAutographItems(entry).map((item, idx) => (
                        <div key={idx} className="border-b border-on-primary-container/20 pb-2">
                          <p className="font-handwritten text-2xl">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }

              if (entry.type === 'stat') {
                return (
                  <div key={entry.id} onClick={() => setZoomedEntry(entry)} className={`inline-block w-full break-inside-avoid bg-white p-8 rounded-3xl shadow-sm border border-outline-variant ${entry.span || ''} mb-8 relative group/card cursor-zoom-in hover:scale-[1.02] transition-transform`}>
                    {isOwner(entry) && (
                      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover/card:opacity-100 transition-opacity z-10">
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDeleteEntry(entry.id); }}
                          className="p-1 bg-black/10 hover:bg-red-600 hover:text-white text-on-surface-variant/70 rounded-full transition-colors"
                          title="Xóa lưu bút"
                        >
                          <span className="material-symbols-outlined text-xs !text-[14px]">delete</span>
                        </button>
                      </div>
                    )}
                    <div className="text-primary font-display-lg text-4xl font-extrabold mb-2 tabular-nums">{entry.statValue || entry.value}</div>
                    <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-6">{entry.statLabel || entry.label}</p>
                    <hr className="mb-6 border-outline-variant" />
                    <p className="font-body-md text-sm text-on-surface italic leading-relaxed">
                      {entry.text}
                    </p>
                  </div>
                );
              }

              return null;
            })}
          </div>
        </div>
      )}

      {/* Write Note Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full glass-blur border border-white/40">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-primary">
                {editingEntryId ? 'Chỉnh sửa lời nhắn lưu bút' : 'Để lại lời nhắn lưu bút'}
              </h3>
              <button
                onClick={() => {
                  setIsFormOpen(false);
                  setEditingEntryId(null);
                  setFormData({ name: '', role: 'Sĩ tử THPT', message: '', type: 'sticky', image: '' });
                }}
                className="p-1 hover:bg-surface-container rounded-full"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Loại lời nhắn</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={formData.type === 'sticky'}
                      onChange={() => setFormData({ ...formData, type: 'sticky' })}
                      className="text-primary focus:ring-primary"
                    />
                    Mẩu giấy nhớ (Sticky Note)
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="type"
                      checked={formData.type === 'polaroid'}
                      onChange={() => setFormData({ ...formData, type: 'polaroid' })}
                      className="text-primary focus:ring-primary"
                    />
                    Ảnh Polaroid
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Tên của bạn</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Khánh Ly"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none"
                />
              </div>

              {formData.type === 'sticky' ? (
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Vai trò</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant rounded-xl bg-white outline-none focus:ring-primary"
                  >
                    <option value="Sĩ tử THPT">Sĩ tử THPT</option>
                    <option value="Tình nguyện viên">Tình nguyện viên</option>
                    <option value="Phụ huynh">Phụ huynh</option>
                    <option value="Cựu thành viên">Cựu thành viên</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-bold text-on-surface-variant mb-1">Đường dẫn ảnh (Polaroid)</label>
                  <input
                    type="url"
                    placeholder="https://example.com/memory.jpg"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Lời nhắn của bạn</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Viết những suy nghĩ của bạn..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all"
              >
                Ghi lưu bút
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Card Zoom Modal */}
      {zoomedEntry && (
        <div
          onClick={() => setZoomedEntry(null)}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl w-full flex justify-center items-center">
            <button
              onClick={() => setZoomedEntry(null)}
              className="absolute -top-12 right-0 md:right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-50"
              title="Đóng"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            {zoomedEntry.type === 'polaroid' && (
              <div className="polaroid max-w-lg w-full scale-100 mx-auto bg-white p-6 rounded-lg shadow-2xl border border-outline-variant/20 animate-zoom-in cursor-default text-left" onClick={(e) => e.stopPropagation()}>
                <img src={zoomedEntry.imageUrl || zoomedEntry.image} alt="scrapbook memory" className="w-full h-auto max-h-[55vh] object-contain rounded-md mb-6" />
                <p className="font-handwritten text-3xl text-on-surface-variant leading-tight mb-4">
                  {zoomedEntry.text}
                </p>
                <div className="text-right text-sm font-bold text-primary">
                  {zoomedEntry.dateStr || zoomedEntry.date}
                </div>
              </div>
            )}

            {zoomedEntry.type === 'sticky' && (
              <div className={`sticky-note ${zoomedEntry.bg || 'bg-primary-container text-on-primary-container'} max-w-md w-full scale-100 mx-auto p-10 rounded-lg shadow-2xl border border-current/10 animate-zoom-in cursor-default text-left`} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-2 mb-6 opacity-80">
                  <span className="material-symbols-outlined text-2xl">push_pin</span>
                  <span className="text-sm font-bold uppercase tracking-widest">Lời nhắn</span>
                </div>
                <p className="font-handwritten text-3xl leading-relaxed">
                  {zoomedEntry.text}
                </p>
                <div className="mt-8 border-t border-current/20 pt-6 font-body-lg font-bold text-md text-right">
                  — {zoomedEntry.author}
                </div>
              </div>
            )}

            {zoomedEntry.type === 'leader' && (
              <div className="glass-blur max-w-xl w-full scale-100 mx-auto p-10 rounded-[32px] border border-white/60 shadow-2xl animate-zoom-in cursor-default bg-white text-left" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-20 h-20 rounded-full border-2 border-primary overflow-hidden shrink-0">
                    <img className="w-full h-full object-cover" alt={zoomedEntry.name} src={zoomedEntry.avatar} />
                  </div>
                  <div>
                    <h4 className="font-headline-lg text-lg font-bold text-primary">{zoomedEntry.name}</h4>
                    <p className="text-sm text-on-surface-variant font-bold">{zoomedEntry.role}</p>
                  </div>
                </div>
                <p className="font-body-lg text-md text-on-surface italic mb-6 leading-relaxed">
                  {zoomedEntry.text}
                </p>
                <div className="flex justify-end text-primary-container">
                  <span className="material-symbols-outlined text-5xl">history_edu</span>
                </div>
              </div>
            )}

            {zoomedEntry.type === 'autographs' && (
              <div className="bg-primary-container text-on-primary-container max-w-md w-full scale-100 mx-auto p-10 rounded-[48px] shadow-2xl animate-zoom-in cursor-default text-left" onClick={(e) => e.stopPropagation()}>
                <h3 className="font-headline-lg text-xl font-bold mb-8 flex items-center gap-3">
                  <span className="material-symbols-outlined text-2xl">border_color</span>
                  {zoomedEntry.title}
                </h3>
                <div className="space-y-6">
                  {getAutographItems(zoomedEntry).map((item, idx) => (
                    <div key={idx} className="border-b border-on-primary-container/20 pb-3">
                      <p className="font-handwritten text-3xl">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {zoomedEntry.type === 'stat' && (
              <div className="bg-white max-w-md w-full scale-100 mx-auto p-10 rounded-[32px] shadow-2xl border border-outline-variant animate-zoom-in cursor-default text-left" onClick={(e) => e.stopPropagation()}>
                <div className="text-primary font-display-lg text-5xl font-extrabold mb-4 tabular-nums text-center">{zoomedEntry.statValue || zoomedEntry.value}</div>
                <p className="text-sm font-bold uppercase tracking-widest text-on-surface-variant mb-8 text-center">{zoomedEntry.statLabel || zoomedEntry.label}</p>
                <hr className="mb-8 border-outline-variant" />
                <p className="font-body-lg text-md text-on-surface italic leading-relaxed text-center">
                  {zoomedEntry.text}
                </p>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
