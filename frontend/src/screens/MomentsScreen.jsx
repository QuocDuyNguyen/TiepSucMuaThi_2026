import React from 'react';


export default function MomentsScreen({ onNavigate }) {
  const defaultTopMoments = [
    { id: 'top-1', title: 'Nụ cười trước cổng trường', detail: 'Một lời chúc bình tĩnh được gửi đi ngay trước lúc thí sinh bước vào phòng thi.', imageUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80' },
    { id: 'top-2', title: 'Đội hình áo xanh trực chốt', detail: 'Các ca trực nối tiếp nhau từ sáng sớm để giữ nhịp hỗ trợ ổn định tại điểm thi.', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80' },
    { id: 'top-3', title: 'Chai nước mát nghĩa tình', detail: 'Nước mát, bản đồ phòng thi và khu vực nghỉ chân được chuẩn bị chu đáo.', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' }
  ];

  const defaultPolaroids = [
    { id: 'pol-1', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80', title: 'Điểm thi THPT Nguyễn Du', detail: '-rotate-2' },
    { id: 'pol-2', imageUrl: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=800&q=80', title: 'Điểm thi THPT Gia Định', detail: 'rotate-3' },
    { id: 'pol-3', imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80', title: 'Điểm thi THPT Trưng Vương', detail: '-rotate-1' },
    { id: 'pol-4', imageUrl: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80', title: 'Điểm thi THCS Lê Lợi', detail: 'rotate-2' }
  ];

  const [galleryPhotos, setGalleryPhotos] = React.useState([]);
  const isAdmin = localStorage.getItem('userRole') === 'ROLE_ADMIN';
  const token = localStorage.getItem('token');
  
  const [isEditTopModalOpen, setIsEditTopModalOpen] = React.useState(false);
  const [editTopData, setEditTopData] = React.useState(null);

  const [isEditPolaroidModalOpen, setIsEditPolaroidModalOpen] = React.useState(false);
  const [editPolaroidData, setEditPolaroidData] = React.useState(null);

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

  const handleSaveGalleryItem = async (e, data, category) => {
    e.preventDefault();
    const isNew = String(data.id).startsWith('top-') || String(data.id).startsWith('pol-') || !data.id;
    const method = isNew ? 'POST' : 'PUT';
    const url = isNew ? 'http://localhost:8080/api/gallery' : `http://localhost:8080/api/gallery/${data.id}`;
    
    const payload = { ...data, category };
    if (isNew) {
      delete payload.id;
    }

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('Lỗi lưu dữ liệu');
      const savedData = await res.json();
      
      if (isNew) {
        setGalleryPhotos([...galleryPhotos, savedData]);
      } else {
        setGalleryPhotos(galleryPhotos.map(p => p.id === savedData.id ? savedData : p));
      }
      setIsEditTopModalOpen(false);
      setIsEditPolaroidModalOpen(false);
      alert('Đã lưu thành công!');
    } catch (err) {
      alert('Lỗi: ' + err.message);
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (String(id).startsWith('top-') || String(id).startsWith('pol-')) return;
    if (!window.confirm('Bạn có chắc muốn xóa ảnh này?')) return;
    try {
      const res = await fetch(`http://localhost:8080/api/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Không thể xóa');
      setGalleryPhotos(galleryPhotos.filter(p => p.id !== id));
      setIsEditPolaroidModalOpen(false);
      setIsEditTopModalOpen(false);
    } catch (err) {
      alert('Lỗi xóa: ' + err.message);
    }
  };

  const [selectedCategory, setSelectedCategory] = React.useState('Tất cả');
  const [loading, setLoading] = React.useState(true);
  
  const [activeTopIndex, setActiveTopIndex] = React.useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState(false);
  const [newMoment, setNewMoment] = React.useState({ title: '', category: 'Tập huấn', image: '', detail: '' });
  
  const wallRef = React.useRef(null);
  const [isDown, setIsDown] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [scrollLeft, setScrollLeft] = React.useState(0);

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - wallRef.current.offsetLeft);
    setScrollLeft(wallRef.current.scrollLeft);
  };
  const handleMouseLeave = () => {
    setIsDown(false);
  };
  const handleMouseUp = () => {
    setIsDown(false);
  };
  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - wallRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    wallRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMoment.title || !newMoment.detail) return;
    
    const token = localStorage.getItem('token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    fetch('http://localhost:8080/api/gallery', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        title: newMoment.title,
        detail: newMoment.detail,
        category: newMoment.category,
        imageUrl: newMoment.image || 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80',
        displayOrder: galleryPhotos.length + 1
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Không thể lưu khoảnh khắc');
        return res.json();
      })
      .then((data) => {
        alert('Gửi khoảnh khắc thành công!');
        setGalleryPhotos([data, ...galleryPhotos]);
        setIsSubmitModalOpen(false);
        setNewMoment({ title: '', category: 'Tập huấn', image: '', detail: '' });
      })
      .catch(err => {
        alert('Lỗi: ' + err.message);
      });
  };

  // Gọi API lấy ảnh thư viện
  React.useEffect(() => {
    fetch('http://localhost:8080/api/gallery')
      .then((res) => {
        if (!res.ok) throw new Error('Không thể tải ảnh thư viện');
        return res.json();
      })
      .then((data) => {
        setGalleryPhotos(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Lỗi API lấy thư viện ảnh:', err);
        setLoading(false);
      });
  }, []);
  // Lọc ảnh theo category
  const filteredPhotos = galleryPhotos.filter(photo => {
    if (photo.category === 'Top Moment' || photo.category === 'Polaroid') return false;
    if (selectedCategory === 'Tất cả') return true;
    return photo.category === selectedCategory;
  });



  const dbTopMoments = galleryPhotos.filter(p => p.category === 'Top Moment').sort((a,b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  const dbPolaroids = galleryPhotos.filter(p => p.category === 'Polaroid').sort((a,b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  const topMoments = defaultTopMoments.map((defItem, idx) => {
    const found = dbTopMoments.find(p => p.displayOrder === idx + 1);
    return found || defItem;
  });
  const activePolaroids = dbPolaroids.length > 0 ? dbPolaroids : defaultPolaroids;

  return (
    <div className="w-full text-on-surface font-body-md overflow-x-hidden selection:bg-primary/20">
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 40px 60px 0 rgba(0, 136, 255, 0.08);
        }
        .hero-gradient {
          background: linear-gradient(to bottom, rgba(255,255,255,0), rgba(244, 250, 253, 1));
        }
        .rotate-x-hover {
          transition: transform 0.3s ease;
        }
        .rotate-x-hover:hover {
          transform: rotateY(5deg) rotateX(2deg) scale(1.02);
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center justify-center overflow-hidden px-margin-mobile md:px-margin-desktop py-20 bg-surface-container-low">
        <div className="max-w-4xl text-center space-y-8 z-10 pt-16">
          <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full font-label-sm text-label-sm uppercase tracking-widest">
            Khoảnh Khắc Đáng Nhớ
          </span>
          <h1 className="font-display-lg text-4xl md:text-6xl lg:text-[72px] font-extrabold text-on-surface tracking-tighter leading-tight">
            Nơi Những <span className="text-primary italic">Kỷ Niệm</span> Hóa Thành <span className="text-secondary">Sức Mạch</span>
          </h1>
          <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto italic">
            "Tuổi trẻ không chỉ là những con số, mà là những khoảnh khắc chúng ta cùng nhau cháy hết mình dưới nắng gắt để thắp sáng ước mơ cho người khác."
          </p>
          <div className="pt-4">
            <span className="material-symbols-outlined text-primary text-4xl animate-bounce">expand_more</span>
          </div>
        </div>
      </section>

      {/* Gallery Categories & Masonry */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="space-y-4">
            <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Khám Phá Theo Chủ Đề</h2>
            <p className="font-body-md text-on-surface-variant">Hành trình 2026 được dệt nên từ những mảng màu khác biệt.</p>
          </div>
          <div className="flex gap-2 p-2 bg-surface-container rounded-full overflow-x-auto whitespace-nowrap glass-card max-w-full">
            {['Tất cả', 'Tập huấn', 'Tiếp sức', 'Gắn kết'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-body-md font-bold transition-all ${
                  selectedCategory === cat ? 'bg-primary text-white' : 'text-on-surface-variant hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPhotos.map((moment) => (
            <div
              key={moment.id}
              className={`group relative overflow-hidden rounded-3xl glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_40px_80px_rgba(0,136,255,0.15)] ${
                moment.isTall ? 'lg:row-span-2' : ''
              }`}
            >
              <div className={`${moment.isTall ? 'h-[500px] lg:h-[700px]' : 'aspect-[4/5]'} overflow-hidden`}>
                <img
                  alt={moment.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  src={moment.imageUrl}
                />
              </div>
              <div className="p-8 space-y-3 bg-white/90 backdrop-blur-md">
                <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-wider">
                  {moment.category}
                </span>
                <h3 className="font-headline-md text-xl font-bold">{moment.title}</h3>
                <p className="font-body-md text-sm text-on-surface-variant">{moment.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Top Moments Section */}
      <section className="bg-surface-container-low py-section-gap relative overflow-hidden">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="text-center mb-20 space-y-4">
            <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Top 3 Khoảnh Khắc Truyền Cảm Hứng</h2>
            <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">Những câu chuyện được bình chọn nhiều nhất bởi cộng đồng tiếp sức.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 rounded-3xl overflow-hidden glass-card p-4">
              <div className="relative rounded-2xl overflow-hidden aspect-video">
                <img
                  alt="Top Moment"
                  className="w-full h-full object-cover transition-all duration-700"
                  src={topMoments[activeTopIndex]?.imageUrl}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <button className="bg-white/20 backdrop-blur-md text-white p-4 rounded-full hover:bg-white/40 transition-all">
                    <span className="material-symbols-outlined text-4xl">play_circle</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 space-y-8">
              {topMoments.map((item, idx) => (
                <div
                  key={item.id}
                  onClick={() => setActiveTopIndex(idx)}
                  className={`flex items-start gap-6 group cursor-pointer transition-all duration-300 ${
                    activeTopIndex === idx ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <span className={`font-display-lg text-[48px] font-extrabold transition-colors ${
                    activeTopIndex === idx ? 'text-primary' : 'text-primary/20 group-hover:text-primary'
                  }`}>{idx + 1}</span>
                  <div className="space-y-2 flex-1">
                    <h4 className="font-headline-md text-lg font-bold">{item.title}</h4>
                    <p className="font-body-md text-sm text-on-surface-variant">{item.detail}</p>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditTopData({ ...item, displayOrder: item.displayOrder || idx + 1 });
                        setIsEditTopModalOpen(true);
                      }}
                      className="ml-auto bg-primary/10 hover:bg-primary/20 text-primary p-2 rounded-full transition-colors flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-sm">edit</span>
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => onNavigate('/biet-on')}
                className="bg-primary text-white px-8 py-4 rounded-full font-body-md font-bold hover:scale-105 transition-transform"
              >
                Xem Tất Cả Câu Chuyện
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Wall of Photos (Physical Board Style) */}
      <section className="py-section-gap overflow-hidden bg-surface">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop text-center mb-16">
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface mb-4">Bức Tường Kỷ Niệm</h2>
          <p className="font-body-md text-on-surface-variant">Kéo/cuộn để khám phá những khoảnh khắc được gửi về từ khắp mọi miền tổ quốc.</p>
        </div>
        <div
          ref={wallRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="relative h-[400px] overflow-x-auto cursor-grab active:cursor-grabbing overflow-y-hidden perspective-1000 no-scrollbar select-none"
        >
          <div className="absolute flex gap-8 items-center px-24 py-10" style={{ width: '1800px' }}>
            {activePolaroids.map((p, idx) => (
              <div
                key={p.id || idx}
                className={`relative w-64 h-80 bg-white p-3 shadow-xl ${p.detail || 'rotate-0'} rotate-x-hover flex-shrink-0 border border-outline-variant`}
              >
                <img
                  className="w-full h-60 object-cover grayscale hover:grayscale-0 transition-all pointer-events-none"
                  alt={p.title}
                  src={p.imageUrl}
                />
                <div className="pt-4 text-center font-body-md italic text-on-surface-variant text-xs">{p.title}</div>
                {isAdmin && (
                  <button
                    onClick={() => {
                      setEditPolaroidData({ ...p, displayOrder: p.displayOrder || idx + 1 });
                      setIsEditPolaroidModalOpen(true);
                    }}
                    className="absolute top-4 right-4 bg-white/80 backdrop-blur text-primary p-2 rounded-full shadow-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-xs">edit</span>
                  </button>
                )}
              </div>
            ))}
            {isAdmin && (
              <div
                onClick={() => {
                  setEditPolaroidData({ title: '', detail: 'rotate-0', imageUrl: '', displayOrder: activePolaroids.length + 1 });
                  setIsEditPolaroidModalOpen(true);
                }}
                className="w-64 h-80 flex items-center justify-center border-2 border-dashed border-primary/50 bg-white/50 cursor-pointer rounded-xl hover:bg-white transition-colors flex-shrink-0"
              >
                <div className="flex flex-col items-center text-primary">
                  <span className="material-symbols-outlined text-4xl">add_photo_alternate</span>
                  <span className="font-bold mt-2">Thêm kỷ niệm</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12 text-center">
          <button
            onClick={() => setIsSubmitModalOpen(true)}
            className="bg-surface border-2 border-primary text-primary px-8 py-3 rounded-full font-body-md font-bold hover:bg-primary hover:text-white transition-all shadow-md"
          >
            Gửi Khoảnh Khắc Của Bạn
          </button>
        </div>
      </section>

      {/* Submit Moment Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full glass-card border border-white/40">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-primary">Gửi Khoảnh Khắc Của Bạn</h3>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Tiêu đề khoảnh khắc</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Bữa cơm ấm áp lúc tan trực"
                  value={newMoment.title}
                  onChange={(e) => setNewMoment({ ...newMoment, title: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Chủ đề</label>
                <select
                  value={newMoment.category}
                  onChange={(e) => setNewMoment({ ...newMoment, category: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary focus:border-primary outline-none bg-white"
                >
                  <option value="Tập huấn">Tập huấn</option>
                  <option value="Tiếp sức">Tiếp sức</option>
                  <option value="Gắn kết">Gắn kết</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Đường dẫn hình ảnh (Không bắt buộc)</label>
                <input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={newMoment.image}
                  onChange={(e) => setNewMoment({ ...newMoment, image: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Câu chuyện / Chi tiết</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Chia sẻ câu chuyện đáng nhớ của bạn..."
                  value={newMoment.detail}
                  onChange={(e) => setNewMoment({ ...newMoment, detail: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary focus:border-primary outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all"
              >
                Gửi câu chuyện
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
        <div className="relative bg-primary-container rounded-[40px] p-12 md:p-24 overflow-hidden text-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary mix-blend-overlay opacity-30"></div>
          <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-primary-container font-extrabold">Đừng Để Kỷ Niệm Ngủ Quên</h2>
            <p className="font-body-lg text-lg text-on-primary-container/80">Tham gia cùng chúng tôi để viết tiếp những trang sử rực rỡ nhất của tuổi trẻ. Mỗi hành động nhỏ, một khoảnh khắc lớn.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <button
                onClick={() => onNavigate('/so-luu-but')}
                className="bg-white text-primary px-10 py-4 rounded-full font-body-md font-bold hover:scale-105 transition-transform shadow-xl"
              >
                Đăng Ký Tình Nguyện
              </button>
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 rounded-full font-body-md font-bold hover:bg-white/20 transition-all">
                Tải App Kỷ Niệm
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Edit Top Moment Modal */}
      {isEditTopModalOpen && editTopData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full glass-card border border-white/40 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-primary">Sửa Top Khoảnh Khắc</h3>
              <button onClick={() => setIsEditTopModalOpen(false)} className="p-1 hover:bg-surface-container rounded-full"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={(e) => handleSaveGalleryItem(e, editTopData, 'Top Moment')} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Tiêu đề</label>
                <input required type="text" value={editTopData.title} onChange={e => setEditTopData({...editTopData, title: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Mô tả chi tiết</label>
                <textarea required rows="3" value={editTopData.detail} onChange={e => setEditTopData({...editTopData, detail: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Hình ảnh (Đường dẫn hoặc tải lên)</label>
                {editTopData.imageUrl && <img src={editTopData.imageUrl} alt="preview" className="w-full h-32 object-cover rounded-xl mb-2" />}
                <div className="flex gap-2 items-center">
                  <input 
                    type="url" 
                    placeholder="https://..." 
                    value={editTopData.imageUrl || ''} 
                    onChange={e => setEditTopData({...editTopData, imageUrl: e.target.value})} 
                    className="flex-1 px-4 py-2 border rounded-xl"
                  />
                  <label className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-sm inline-block hover:bg-primary/20 whitespace-nowrap">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, url => setEditTopData({...editTopData, imageUrl: url}))} />
                    Tải ảnh lên
                  </label>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <button type="button" onClick={() => setIsEditTopModalOpen(false)} className="flex-1 py-3 bg-surface border text-on-surface rounded-xl font-bold">Hủy</button>
                <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Polaroid Modal */}
      {isEditPolaroidModalOpen && editPolaroidData && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full glass-card border border-white/40 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-primary">{editPolaroidData.id && !String(editPolaroidData.id).startsWith('pol-') ? 'Sửa Kỷ Niệm' : 'Thêm Kỷ Niệm'}</h3>
              <button onClick={() => setIsEditPolaroidModalOpen(false)} className="p-1 hover:bg-surface-container rounded-full"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={(e) => handleSaveGalleryItem(e, editPolaroidData, 'Polaroid')} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Địa điểm (Tiêu đề)</label>
                <input required type="text" value={editPolaroidData.title} onChange={e => setEditPolaroidData({...editPolaroidData, title: e.target.value})} className="w-full px-4 py-2 border rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Góc xoay (rotate-X hoặc -rotate-X)</label>
                <input required type="text" value={editPolaroidData.detail} onChange={e => setEditPolaroidData({...editPolaroidData, detail: e.target.value})} className="w-full px-4 py-2 border rounded-xl" placeholder="vd: rotate-2, -rotate-3" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Hình ảnh (Đường dẫn hoặc tải lên)</label>
                {editPolaroidData.imageUrl && <img src={editPolaroidData.imageUrl} alt="preview" className="w-full h-32 object-cover rounded-xl mb-2" />}
                <div className="flex gap-2 items-center">
                  <input 
                    type="url" 
                    placeholder="https://..." 
                    value={editPolaroidData.imageUrl || ''} 
                    onChange={e => setEditPolaroidData({...editPolaroidData, imageUrl: e.target.value})} 
                    className="flex-1 px-4 py-2 border rounded-xl"
                  />
                  <label className="cursor-pointer bg-primary/10 text-primary px-4 py-2 rounded-xl font-bold text-sm inline-block hover:bg-primary/20 whitespace-nowrap">
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, url => setEditPolaroidData({...editPolaroidData, imageUrl: url}))} />
                    Tải ảnh lên
                  </label>
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                {editPolaroidData.id && !String(editPolaroidData.id).startsWith('pol-') && (
                  <button type="button" onClick={() => handleDeleteGalleryItem(editPolaroidData.id)} className="px-4 bg-error/10 text-error rounded-xl font-bold hover:bg-error/20"><span className="material-symbols-outlined">delete</span></button>
                )}
                <button type="button" onClick={() => setIsEditPolaroidModalOpen(false)} className="flex-1 py-3 bg-surface border text-on-surface rounded-xl font-bold">Hủy</button>
                <button type="submit" className="flex-1 py-3 bg-primary text-white rounded-xl font-bold">Lưu thay đổi</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
