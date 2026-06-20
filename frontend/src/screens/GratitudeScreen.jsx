import React from 'react';

const initialVolunteerNotes = [
  {
    id: 101,
    author: 'Minh Anh',
    role: 'Đội Tiếp Sức ĐH Bách Khoa',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBRkNjgRXFxxwMg9lGD4vyN7iyzgq2Uu1vzYPfSqxWnkWBUc5tqqmp7-s0gfkeDivNG2IW_CsVZMfLo6lSSkh8gVKUePYwBnHpMyYiBBNzKjpLvrOxS2YixUToxqBkgS3ZrJiPIQ36Y2Vl_NvrPFmTKV8N2Ar478sS2hovpNMY3SqlR-GMtwDdBROeCzVE7-et9iT5Du1z-SPpcCsIB_J413QxuIFz931csmzES5c9uiPjiUlAjDivh',
    message: '"Gửi anh Đội trưởng, cảm ơn anh đã luôn thức khuya dậy sớm điều phối công việc cho cả nhóm. Những lúc mệt mỏi nhất, nụ cười của anh chính là động lực để tụi em tiếp tục bám trụ điểm thi dưới cái nắng 40 độ."',
    hearts: 124,
    time: '2 giờ trước'
  },
  {
    id: 102,
    author: 'Hoàng Long',
    role: 'Tổ Phản Ứng Nhanh Quận 1',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS7kvd05GkgWF9qOoHeyXDHel5GUJws5tNOaXndF4IaZk024S9kUaqujeWbnw1mdBJwpkLRgyFDXf3fQzLWc-dEnPqdnhU9XvDoUsa818xEpmu6dduYk9gWw2p6YaPzxSatIbTTxreTfLWNPagsn8Dnlavr1g5Rkqo3XvR7Jm1EIZwIPvA5qMZ8IhvGRMfR2G0WpfCsE6_5CHFr0A987a4wlYUzL9uaOpTRprNiPeXlcQwXslI2UGq',
    message: '"Cảm ơn đồng đội của tui - Những người chưa từng quen biết nhưng đã cùng nhau chia nhau ổ bánh mì, ngụm nước dưới chân cầu vượt. Mùa thi năm nay thật đẹp vì có mọi người."',
    hearts: 89,
    time: '5 giờ trước',
    border: 'border-l-4 border-l-tertiary'
  },
  {
    id: 103,
    author: 'Khánh Linh',
    role: 'Đội Hậu Cần Cụm Thi Số 3',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWBUNh5ApfHnca670L9UoXE_3p16EStGoT7zhmbGDLdLYfHMypE9J4BToQVZprwhW26Tzbi9WY3KCe6hcKyw4HzoD2OrDBjBO7TvNsmZgo1vP3nrEfupmY3DYpbWuB9rF0ITke-isSxlPvQ_DCQ8z_5RA2y1IM8e2e49iS1xemWF7uzjhUGGIHrfC6YzCEA_XomBLhL0Ne372a-fOxXb_a8drxfnvKo6jbHYNnxG4VP58z2uZ6IO6I',
    message: '"Cảm ơn các bạn trong đội hậu cần, những người âm thầm chuẩn bị từng chai nước, từng suất cơm. Sự chuẩn bị chu đáo của các bạn chính là nền tảng để đội tiền tuyến hoàn thành xuất sắc nhiệm vụ."',
    hearts: 215,
    time: '1 ngày trước',
    bg: 'bg-gradient-to-br from-primary-fixed/30 to-surface'
  }
];

const initialStudentNotes = [
  {
    id: 201,
    author: 'Nguyễn Nam',
    role: 'Sĩ tử trường THPT Chu Văn An',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBft87ZGDB0NHY8oFPGbpXs0iNdhYgw2gg3LWTlS0QVJv7xwAv-Avqr-cE-JwA19cbRHv5g-1AepnL5dkCBWcWsz_uQ9Zf3iQPaBS0eYR3ZLhzTIxQ14uM8Jtj85KV2rFSLB8tJUeos-cdnxhIwoWqHPLbS4Wc6IQmIVxs5ku3p0v2QM-NR8zr5O00zPtlKIfjPaBlz2ELxpbi-Py46g9TKRNPvQ8RDnk8kyt2Kmcql84VRKV7fWUXw',
    message: '"Con cảm ơn các anh chị đã giúp con tìm lại giấy tờ bị rơi ngay sát giờ thi. Nếu không có các anh chị, chắc con đã lỡ mất kỳ thi quan trọng nhất đời mình. Con hứa sẽ cố gắng thi thật tốt!"',
    hearts: 342,
    time: '2 ngày trước'
  }
];

export default function GratitudeScreen({ onNavigate }) {
  const [volNotes, setVolNotes] = React.useState(initialVolunteerNotes);
  const [stuNotes, setStuNotes] = React.useState(initialStudentNotes);
  
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    author: '',
    role: '',
    type: 'volunteer', // volunteer or student
    message: '',
  });

  const handleHeartClick = (id, type) => {
    if (type === 'volunteer') {
      setVolNotes(volNotes.map((n) => n.id === id ? { ...n, hearts: n.hearts + 1 } : n));
    } else {
      setStuNotes(stuNotes.map((n) => n.id === id ? { ...n, hearts: n.hearts + 1 } : n));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.author || !formData.message) return;

    const noteToAdd = {
      id: Date.now(),
      author: formData.author,
      role: formData.role || (formData.type === 'volunteer' ? 'Tình nguyện viên' : 'Sĩ tử THPT'),
      avatar: '',
      message: `"${formData.message}"`,
      hearts: 1,
      time: 'Vừa xong'
    };

    if (formData.type === 'volunteer') {
      setVolNotes([noteToAdd, ...volNotes]);
    } else {
      setStuNotes([noteToAdd, ...stuNotes]);
    }

    setIsModalOpen(false);
    setFormData({ author: '', role: '', type: 'volunteer', message: '' });
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
        @media (min-width: 768px) {
          .masonry-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (min-width: 1024px) {
          .masonry-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      `}</style>

      {/* Hero Section */}
      <header className="relative pt-12 pb-20 px-margin-mobile md:px-margin-desktop overflow-hidden text-center bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <h1 className="font-display-lg text-4xl md:text-6xl font-extrabold text-primary mb-6 animate-fade-in">Wall of Gratitude</h1>
          <p className="font-body-lg text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
            Nơi những câu chuyện tử tế được lưu giữ. Mỗi lời cảm ơn là một ngọn nến thắp sáng hành trình của các sĩ tử và sự cống hiến thầm lặng của các chiến sĩ tình nguyện.
          </p>
          <div className="flex flex-wrap justify-center gap-12 mt-8">
            <div className="text-center">
              <span className="block font-headline-lg text-4xl font-extrabold text-tertiary tabular-nums">12,482</span>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Lời Tri Ân</span>
            </div>
            <div className="text-center">
              <span className="block font-headline-lg text-4xl font-extrabold text-primary tabular-nums">85.3K</span>
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface-variant">Trái Tim Ấm Áp</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-container-max mx-auto pb-section-gap px-margin-mobile md:px-margin-desktop mt-16">
        
        {/* Section 1: Volunteers to Members/Leaders */}
        <section className="mb-section-gap">
          <div className="flex items-center gap-4 mb-12">
            <span className="material-symbols-outlined text-secondary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>volunteer_activism</span>
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-secondary">Lời Tri Ân Từ Tình Nguyện Viên</h2>
          </div>
          
          <div className="masonry-grid">
            {volNotes.map((note) => (
              <div key={note.id} className="group h-full">
                <div className={`glass-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between h-full border border-white/50 ${note.border || ''} ${note.bg || ''}`}>
                  <div className="absolute top-4 right-4 text-secondary/10 pointer-events-none select-none">
                    <span className="material-symbols-outlined text-6xl">format_quote</span>
                  </div>
                  <div>
                    <p className="font-body-md text-on-surface-variant mb-6 italic leading-relaxed">
                      {note.message}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary shrink-0 bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {note.avatar ? (
                          <img alt={note.author} src={note.avatar} className="w-full h-full object-cover" />
                        ) : (
                          note.author.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-primary text-sm">{note.author}</h4>
                        <p className="text-xs text-on-surface-variant font-bold">{note.role}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs">
                      <button
                        onClick={() => handleHeartClick(note.id, 'volunteer')}
                        className="flex items-center gap-2 text-error hover:scale-110 transition-transform active:scale-95 font-bold"
                      >
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        <span>{note.hearts}</span>
                      </button>
                      <span className="text-outline">{note.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="glass-card mb-section-gap p-12 rounded-[3rem] text-center border-2 border-dashed border-primary/30 max-w-4xl mx-auto">
          <h3 className="font-headline-lg text-2xl font-bold text-primary mb-4">Gửi Lời Tri Ân Của Bạn</h3>
          <p className="text-body-lg text-on-surface-variant mb-8 max-w-xl mx-auto">
            Một lời nhắn nhỏ có thể tiếp thêm nguồn năng lượng khổng lồ. Hãy chia sẻ cảm xúc của bạn tại đây.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white px-10 py-4 rounded-full font-bold text-md hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-lg"
          >
            <span className="material-symbols-outlined">edit_square</span>
            Viết Lời Cảm Ơn
          </button>
        </section>

        {/* Section 2: Students to Volunteers */}
        <section>
          <div className="flex items-center gap-4 mb-12">
            <span className="material-symbols-outlined text-tertiary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-tertiary">Những Lời Cảm Ơn Từ Sĩ Tử</h2>
          </div>
          
          <div className="masonry-grid">
            {stuNotes.map((note) => (
              <div key={note.id} className="group h-full">
                <div className="glass-card p-8 rounded-3xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden flex flex-col justify-between h-full bg-yellow-50/50 border border-white/50">
                  <div className="absolute top-4 right-4 text-tertiary/10 pointer-events-none select-none">
                    <span className="material-symbols-outlined text-6xl">format_quote</span>
                  </div>
                  <div>
                    <p className="font-body-md text-on-surface-variant mb-6 italic leading-relaxed">
                      {note.message}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-tertiary shrink-0 bg-tertiary/10 flex items-center justify-center font-bold text-tertiary">
                        {note.avatar ? (
                          <img alt={note.author} src={note.avatar} className="w-full h-full object-cover" />
                        ) : (
                          note.author.slice(0, 2).toUpperCase()
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-tertiary text-sm">{note.author}</h4>
                        <p className="text-xs text-on-surface-variant font-bold">{note.role}</p>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-outline-variant/30 flex justify-between items-center text-xs">
                      <button
                        onClick={() => handleHeartClick(note.id, 'student')}
                        className="flex items-center gap-2 text-error hover:scale-110 transition-transform active:scale-95 font-bold"
                      >
                        <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                        <span>{note.hearts}</span>
                      </button>
                      <span className="text-outline">{note.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* Write Note Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full glass-card border border-white/40">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-md text-xl font-bold text-primary">Gửi Lời Tri Ân Của Bạn</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-surface-container rounded-full text-on-surface-variant">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Tôi là</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="roleType"
                      checked={formData.type === 'volunteer'}
                      onChange={() => setFormData({ ...formData, type: 'volunteer' })}
                      className="text-primary focus:ring-primary"
                    />
                    Tình nguyện viên
                  </label>
                  <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
                    <input
                      type="radio"
                      name="roleType"
                      checked={formData.type === 'student'}
                      onChange={() => setFormData({ ...formData, type: 'student' })}
                      className="text-primary focus:ring-primary"
                    />
                    Sĩ tử / Phụ huynh
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Họ tên của bạn</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Minh Hằng"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Đội hình / Trường học (Ví dụ: Đội Tiếp Sức ĐH Ngoại Thương hoặc THPT Phan Đình Phùng)</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Đội Tiếp Sức ĐH Y Dược"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-on-surface-variant mb-1">Nội dung tri ân</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Viết những lời cảm ơn chân thành từ trái tim..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-outline-variant rounded-xl focus:ring-primary outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-container hover:shadow-lg transition-all"
              >
                Gửi lời tri ân
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
