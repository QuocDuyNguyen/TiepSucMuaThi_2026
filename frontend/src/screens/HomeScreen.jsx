import React from 'react';

export default function HomeScreen({ onNavigate, onSelectMemberId }) {
  const [hearts, setHearts] = React.useState([]);
  const [featuredVolunteers, setFeaturedVolunteers] = React.useState([]);
  const [moments, setMoments] = React.useState([]);
  const [gratitudes, setGratitudes] = React.useState([]);
  const [settings, setSettings] = React.useState(null);
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  React.useEffect(() => {
    fetch(`http://localhost:8080/api/volunteers?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setFeaturedVolunteers(data.filter(v => v.featured)))
      .catch(err => console.error('Error fetching volunteers:', err));

    fetch(`http://localhost:8080/api/gallery?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setMoments(data))
      .catch(err => console.error('Error fetching gallery:', err));

    fetch(`http://localhost:8080/api/gratitudes?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setGratitudes(data.filter(g => g.approved)))
      .catch(err => console.error('Error fetching gratitudes:', err));

    fetch(`http://localhost:8080/api/settings?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : null)
      .then(data => setSettings(data))
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  // Generate floating hearts for the Closing section
  React.useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const left = Math.random() * 100;
      const size = 10 + Math.random() * 20;
      const duration = 3 + Math.random() * 3;
      
      setHearts((prev) => [...prev, { id, left, size, duration }]);
      
      // Clean up old hearts
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, duration * 1000);
    }, 400);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full text-on-surface font-body-md overflow-x-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Styles for animations */}
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 40px 60px 0 rgba(0, 136, 255, 0.08);
        }
        .hero-gradient {
          background: linear-gradient(to bottom, rgba(0, 91, 175, 0.7), rgba(0, 194, 255, 0.4));
        }
        .floating {
          animation: floating 6s ease-in-out infinite;
        }
        @keyframes floating {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .scroll-indicator-anim {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
        .masonry {
          column-count: 1;
          column-gap: 24px;
        }
        @media (min-width: 768px) { .masonry { column-count: 2; } }
        @media (min-width: 1024px) { .masonry { column-count: 3; } }
        .masonry-item {
          break-inside: avoid;
          margin-bottom: 24px;
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>

      {/* Section 1: Immersive Hero */}
      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover"
            alt="A large, emotional group of diverse young volunteers in blue uniforms cheering and laughing together"
            src={settings?.heroBackground || "https://lh3.googleusercontent.com/aida-public/AB6AXuC9D80ETRjuk8C-DlhTMq7YqgX_Phe6R6CiCGtKgH0GM5f0sB9xx67-yrG5_ejjCAaCeEAY0wcSTJA4q0vX1rPyPxfe0CO1rEGRubjd3H_y9Qz32uwPcEXinxju2eQV6b4Ni1MOyXu1SHoz_8q8wMdXb6bfyXPrkKA12Bs9Tup7wfotn7QA5RXvWinJPfQT72YHSJU1wMUpm4ndJrZFiR695wVXcMoMZRQM8Hs2KnNP-F8kxuUB4s25"}
          />
          <div className="absolute inset-0 hero-gradient"></div>
        </div>
        <div className="relative z-10 text-center text-white px-margin-mobile max-w-4xl">
          <h1 className="font-display-lg text-4xl md:text-6xl lg:text-[64px] font-extrabold mb-6 leading-tight drop-shadow-2xl">
            {settings?.heroTitle || "DẤU ÁN TIẾP SỨC 2026"}
          </h1>
          <p className="font-headline-md text-xl md:text-2xl font-normal mb-10 opacity-90 drop-shadow-md">
            {settings?.heroSubtitle || "Không chỉ là một chương trình, mà là một phần thanh xuân của chúng ta."}
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => onNavigate('/khoanh-khac')}
              className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-lg hover:shadow-primary/20 transition-all transform hover:scale-105"
            >
              Bắt đầu hành trình
            </button>
            <button
              onClick={() => onNavigate('/vinh-danh')}
              className="px-8 py-4 bg-surface-container-high text-on-surface rounded-xl font-bold hover:bg-surface-container-highest transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined">play_circle</span>
              Khám phá Hall of Fame
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 opacity-70">
          <span className="text-xs uppercase tracking-widest">Kéo để khám phá</span>
          <span className="material-symbols-outlined scroll-indicator-anim">expand_more</span>
        </div>
        {/* Floating Particles & Rays Decoration */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-secondary-container/20 rounded-full blur-3xl floating"></div>
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-primary-container/20 rounded-full blur-3xl floating" style={{ animationDelay: '2s' }}></div>
      </header>

      {/* Section 2: Opening Story */}
      <section className="py-section-gap px-margin-desktop bg-surface max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
          <div className="md:col-span-7 pr-0 md:pr-16">
            <span className="text-primary font-bold tracking-widest uppercase text-[12px] mb-4 block">Câu chuyện mở đầu</span>
            <h2 className="font-display-lg text-3xl md:text-headline-lg text-on-surface mb-8 italic leading-snug">
              "Có những mùa hè sẽ qua đi, nhưng những con người tuyệt vời sẽ luôn được nhớ đến."
            </h2>
            <div className="space-y-6 text-on-surface-variant font-body-lg text-lg">
              <p>Mùa hè năm 2026 không chỉ đánh dấu một cột mốc thời gian, mà là nơi những trái tim rực cháy khát vọng cống hiến hội ngộ. Chúng ta đã cùng nhau đi qua những ngày nắng gắt, những cơn mưa bất chợt của mùa thi, mang theo nụ cười và niềm tin tiếp sức cho hàng ngàn sĩ tử.</p>
              <p>Cuốn kỷ yếu số này là nơi lưu giữ từng hơi thở, từng giọt mồ hôi và những cái ôm siết chặt. Hãy cùng chúng tôi lật lại từng trang ký ức đầy tự hào này.</p>
            </div>
          </div>
          <div className="md:col-span-5 relative mt-12 md:mt-0">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 aspect-[3/4]">
              <img
                className="w-full h-full object-cover"
                alt="Two volunteers helping a student"
                src="https://res.cloudinary.com/ly6xwuwk/image/upload/v1783850195/KHG07408_furqmw.jpg"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-tertiary-fixed rounded-3xl -z-10 opacity-30 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Section 3: Impact in Numbers */}
      <section className="py-section-gap px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">Những Con Số Tự Hào</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">Sức mạnh của sự đoàn kết được đo bằng những dấu ấn cụ thể mà chúng ta đã cùng nhau tạo nên.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
            <div className="glass-card p-10 rounded-[40px] text-center hover:-translate-y-2 transition-all duration-300">
              <span className="text-primary material-symbols-outlined text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
              <div className="text-display-lg font-bold text-tertiary mb-2">120+</div>
              <div className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Tình Nguyện Viên</div>
            </div>
            <div className="glass-card p-10 rounded-[40px] text-center hover:-translate-y-2 transition-all duration-300">
              <span className="text-primary material-symbols-outlined text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
              <div className="text-display-lg font-bold text-tertiary mb-2">5000+</div>
              <div className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Thí Sinh Được Hỗ Trợ</div>
            </div>
            <div className="glass-card p-10 rounded-[40px] text-center hover:-translate-y-2 transition-all duration-300">
              <span className="text-primary material-symbols-outlined text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
              <div className="text-display-lg font-bold text-tertiary mb-2">15</div>
              <div className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Điểm Thi Toàn Thành</div>
            </div>
            <div className="glass-card p-10 rounded-[40px] text-center hover:-translate-y-2 transition-all duration-300">
              <span className="text-primary material-symbols-outlined text-5xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>event</span>
              <div className="text-display-lg font-bold text-tertiary mb-2">30+</div>
              <div className="text-label-sm font-bold uppercase tracking-wider text-on-surface-variant">Ngày Đồng Hành</div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Video Recap */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover brightness-[0.4]"
            alt="Sunset team view"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE6iUilauxNR7ErQGQVjX6UcV0KRLmZKhNW76otn--_jPbUh9J8S4SvTM8fgHVHEFog1ayNDU50lG8aPNnozAlTs_7Jeg-HJSybD8ZnavhYHUYpeZg-YV3lo6hNcEFDXaxvE5AnKCMDWgrtVKK97K5hfqmQDRs-gJ47lEBAM5gOPSh8_3kIq3l_EJwJZQz5R2B_uxSaj2gx2AL1Zm5F-hrMVqDeU63Iq3HGsk8yyPp6uEeaM_D02XX"
          />
        </div>
        <div className="relative z-10 text-center text-white">
          <h2 className="font-headline-lg text-3xl md:text-4xl mb-8">Một Mùa Hè Đáng Nhớ</h2>
          <button
            onClick={() => setIsVideoOpen(true)}
            className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:scale-110 transition-transform group mx-auto"
          >
            <span className="material-symbols-outlined text-5xl group-hover:text-tertiary-fixed transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>play_arrow</span>
          </button>
          <p className="mt-8 font-body-lg text-lg max-w-xl mx-auto opacity-80 px-margin-mobile">Xem lại phim tài liệu ngắn về hành trình Tiếp Sức Mùa Thi 2026</p>
        </div>

        {/* Video Player Modal */}
        {isVideoOpen && settings?.youtubeVideoUrl && (
          <div
            onClick={() => setIsVideoOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-pointer"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-50"
                title="Đóng video"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <iframe
                className="w-full h-full"
                src={settings.youtubeVideoUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </section>

      {/* Section 5: Hall of Fame Preview */}
      <section className="py-section-gap px-margin-desktop bg-surface max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <span className="text-primary font-bold uppercase text-[12px] mb-4 block">Hall of Fame</span>
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface">Những Gương Mặt Tiêu Biểu</h2>
          </div>
          <button
            onClick={() => onNavigate('/vinh-danh')}
            className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all pb-2 border-b border-primary"
          >
            Xem Toàn Bộ Hall of Fame <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {featuredVolunteers.map((v) => (
            <div
              key={v.id}
              onClick={() => {
                if (onSelectMemberId) onSelectMemberId(v.id);
                onNavigate('/ho-so-thanh-vien');
              }}
              className="glass-card rounded-[40px] overflow-hidden group hover:-translate-y-4 transition-all duration-500 cursor-pointer border border-transparent hover:border-primary/30"
            >
              <div className="h-80 overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  alt={v.fullName}
                  src={v.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400&q=80'}
                />
              </div>
              <div className="p-8">
                <h3 className="font-headline-md text-xl font-bold text-on-surface mb-1">{v.fullName}</h3>
                <p className="text-primary font-bold text-[12px] uppercase mb-4">{v.roleName || 'Tình nguyện viên'}</p>
                <p className="text-on-surface-variant italic">"{v.quote || 'Dưới bóng cờ xanh, chúng tôi cống hiến hết mình!'}"</p>
              </div>
            </div>
          ))}
          {featuredVolunteers.length === 0 && (
            <div className="col-span-3 text-center py-8 text-on-surface-variant italic bg-surface-container rounded-3xl">
              Chưa có gương mặt tiêu biểu nào được chọn.
            </div>
          )}
        </div>
      </section>

      {/* Section 6: Memorable Moments */}
      <section className="py-section-gap px-margin-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-display-lg text-3xl md:text-4xl text-on-surface mb-16 text-center">Khoảnh Khắc Đáng Nhớ</h2>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            <div className="md:col-span-8 group relative overflow-hidden rounded-[3rem] aspect-[16/9]">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt="Moments cheer"
                src={moments[0]?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuDyV_JECAdM74cHTH0oUZOw7yTsPYzY1TmpKuvVJ1rgv893BchXZHZRVGiDPZYCq8rPLiQnh06JWoRUdIL8pwK8q17KL25zQ6_sQO2SZruN8OKaU_1-K5FlY-AUnZYQCqcLzyeF9WhvqxKtSGIlDS1-5XMHzWLTJ5ToTfzFT6xJT7P35dP3HPSorTmi919VTB9exXYkPgV-855qiEq72fQ5O78A0KDRAPrtronljibYplhayxpmOR2K"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-6 md:p-12 flex items-end">
                <div className="text-white">
                  <span className="text-[12px] font-bold uppercase tracking-widest mb-2 block">Chiến dịch TSMT 2026</span>
                  <h3 className="text-2xl font-bold">{moments[0]?.category || "Kỷ niệm đong đầy cảm xúc"}</h3>
                </div>
              </div>
            </div>
            <div className="md:col-span-4 grid grid-rows-2 gap-gutter">
              <div className="group relative overflow-hidden rounded-[2rem]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Training workshop"
                  src={moments[1]?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuClsAb8jFtKX4iZxZdh414fcB_EMVjVERkg7YUANt6BGqBJr-SNAuVkuiajiBlXAXMZ8L2_7L5SsmAHfqFSYQy1mDZUxK4_2pANGI73btyqo6RaRPqUxC0rBHnxQ0pURy6ZTzDP_JJq7tGwY5_pa5x_JvBzJxzZOflg0q06eCz5ibqmoTBdvTSElY8G6p3krfWOUXXEB0Calh7ZzFTpJKW93m4p94W3savMUoiijJg8a9s4SQ43LTIq"}
                />
              </div>
              <div className="group relative overflow-hidden rounded-[2rem]">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt="Lunch break"
                  src={moments[2]?.imageUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuCCbMoz86BAfVnmPGo48D6OeUqId5slAiY2kUoR5OjWPDtPqEw0fzZKuxqlzPZqBxndwhVH1RwqMtn3_gvYTSJApxj-gLnGGPS8Bb9-oUPETzW7eLdsIGeCvDMhNI61XKa8yNm7VkFI02NAFCVzJWG7wbNKXFScfagnkNWaSiqQAlkHJ_Ktc-zGu74qAKpUOEADsmUhkEonrGRvnRSnZSy7-91Dvz9hvzcQmb7DHf-ttLb-5q1nVyi3"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Letter from the Leader */}
      <section className="py-section-gap px-margin-desktop bg-surface">
        <div className="max-w-4xl mx-auto glass-card rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <span className="material-symbols-outlined text-[120px]">format_quote</span>
          </div>
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-primary/20 shrink-0">
              <img
                className="w-full h-full object-cover"
                alt="Nguyen Minh Hoang"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuByrXU8y-b1cElnr7Jkcx1nnGhJ31sHZWoyCqgnJlQUJX4Tqt3WQzR6zTheHi5yfNmbBP_9U40soEaeet2m8NtECeZQuvgjXvCatxdgJQIr_I_qXS4M2F738Tftei34McvbPE1GXUl0P5hgnZs-xyQnOnzXa1SMfQ7-9-07IPEQmqNk_PWX4WsYQ6uMLjkt3oi3X_iFU0kLnW9nTMqNCOeLLrrn6bYviJCclwldZanPFO7oE_tHk1QI"
              />
            </div>
            <div>
              <h2 className="font-headline-lg text-3xl font-bold text-on-surface mb-6">Thư Gửi Những Người Đồng Hành</h2>
              <div className="font-body-lg text-on-surface-variant space-y-6 leading-relaxed">
                <p>"Thân gửi các bạn tình nguyện viên - những 'ngọn lửa xanh' nhiệt huyết của mùa hè 2026. Nhìn lại hành trình vừa qua, tôi không khỏi tự hào về những gì chúng ta đã cùng nhau kiến tạo. Mỗi nụ cười của sĩ tử, mỗi cái gật đầu cảm ơn của phụ huynh chính là minh chứng rõ nét nhất cho giá trị mà các bạn đã mang lại."</p>
                <p>"Cảm ơn các bạn vì đã chọn cống hiến, chọn yêu thương và chọn trở thành một phần đẹp nhất trong thanh xuân của Tiếp Sức Mùa Thi."</p>
              </div>
              <div className="mt-10">
                <div className="font-headline-md text-primary font-handwritten text-4xl">Nguyễn Minh Hoàng</div>
                <p className="text-[12px] font-bold uppercase tracking-widest text-on-surface-variant">Trưởng Ban Tổ Chức Chiến dịch Tiếp Sức Mùa Thi 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Gratitude Wall */}
      <section className="py-section-gap px-margin-desktop bg-surface-container-low overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4">Lời Tri Ân Từ Trái Tim</h2>
            <p className="text-on-surface-variant">Những dòng tin nhắn vụn vặt nhưng đong đầy cảm xúc.</p>
          </div>
          <div className="masonry">
            {gratitudes.slice(0, 6).map((g, index) => {
              const isAlternate = index === 1;
              return (
                <div
                  key={g.id}
                  className={`masonry-item glass-card p-8 rounded-3xl ${
                    isAlternate
                      ? 'bg-primary-container text-on-primary-container border-none'
                      : 'text-on-surface'
                  }`}
                >
                  <p className="mb-6 font-medium italic">"{g.content}"</p>
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        isAlternate ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'
                      }`}
                    >
                      {(g.senderName || 'K').charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className={`text-xs font-bold block ${isAlternate ? 'text-on-primary-container' : 'text-on-surface-variant'}`}>
                        {g.senderName}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {g.verified ? 'Tình nguyện viên' : 'Sĩ tử / Phụ huynh'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
            {gratitudes.length === 0 && (
              <div className="col-span-full text-center py-8 text-on-surface-variant italic bg-surface-container rounded-3xl">
                Chưa có lời tri ân nào được viết.
              </div>
            )}
          </div>
          <div className="mt-12 text-center">
            <button
              onClick={() => onNavigate('/biet-on')}
              className="px-8 py-3 bg-primary text-white rounded-full font-bold shadow-lg hover:scale-105 transition-all"
            >
              Khám Phá Wall of Gratitude
            </button>
          </div>
        </div>
      </section>

      {/* Section 9: Digital Memory Book (Scrapbook Style) */}
      <section className="py-section-gap px-margin-desktop bg-surface overflow-hidden">
        <div className="max-w-container-max mx-auto relative">
          <h2 className="font-display-lg text-3xl md:text-4xl text-on-surface mb-16 text-center">Cuốn Sổ Lưu Bút Số</h2>
          <div className="relative h-[600px] w-full max-w-5xl mx-auto flex items-center justify-center">
            {/* Polaroid 1 */}
            <div className="absolute top-10 left-10 w-64 p-4 bg-white shadow-xl rotate-[-6deg] hover:rotate-0 transition-transform duration-500 z-20">
              <img
                className="w-full aspect-square object-cover mb-4"
                alt="First day memories"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC_rzEyrMxENtGlAEQyBT1h0JZVJRhZ-O2nYqBgr3NHgiZad89UiaQbHZA6r5Qhbi3qJ74yvwpM9GPWoxCBUeyf7NSFosvBKK6P6bi1LWFfVVkdOImb2IMrS-4ww69_4yecrXMhYCeWN5B6T8tL1ChZDaDwSwGnP1v-xPhfPoMnuYrLDtl95_hs306aFVFgXr81-lLkvIOiq1ZjTxbys-DXeBKyRaA45t6nZOapB-r3lrPhlOFE6_3b"
              />
              <p className="font-body-md text-on-surface-variant text-center font-handwritten text-2xl">Ngày đầu ra quân</p>
            </div>
            {/* Polaroid 2 */}
            <div className="absolute bottom-10 right-20 w-72 p-4 bg-white shadow-xl rotate-[4deg] hover:rotate-0 transition-transform duration-500 z-10">
              <img
                className="w-full aspect-square object-cover mb-4"
                alt="Quick lunch memories"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1nLIBGwunTD5_2vjcpEVTmFzDeaAHkVQbQDrQTwGZCCozYc5pSY2cBHW8XK-D3iPr3k9DprNVfSqdgKWqjEUd6PLApxKk5XMjW7Ocs6CJmMNVpveZpLZI_B0VqyvKi7zWsaFcFeRX-9UVmyZAaK4mASK_3tr9ZNMvcM2q1EDzMX73sg0zl4rG_YF_x77gISGBEAofxlyAvmuOl8e_PcQcNp1_OGzsve1KwN5vw6vEHv_EZhLkEKNK"
              />
              <p className="font-body-md text-on-surface-variant text-center font-handwritten text-2xl">Bữa trưa vội vã mà vui</p>
            </div>
            {/* Sticky Note */}
            <div className="absolute top-1/4 right-1/4 w-48 p-6 bg-tertiary-fixed text-on-tertiary-fixed shadow-md rotate-[10deg] hover:rotate-0 transition-transform duration-300 z-30">
              <p className="font-body-md italic leading-tight text-on-tertiary-fixed-variant">"Đừng quên lịch họp tối nay lúc 20:00 nhé cả nhà!"</p>
              <div className="mt-4 text-right font-bold text-xs">- Leader</div>
            </div>
            {/* Journal Entry */}
            <div className="w-full max-w-lg glass-card p-12 rounded-lg shadow-2xl relative z-0 opacity-50">
              <div className="h-2 w-24 bg-primary/20 rounded-full mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-surface-dim rounded"></div>
                <div className="h-4 w-5/6 bg-surface-dim rounded"></div>
                <div className="h-4 w-4/5 bg-surface-dim rounded"></div>
                <div className="h-4 w-full bg-surface-dim rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 10: Journey Timeline */}
      <section className="py-section-gap px-margin-mobile md:px-margin-desktop bg-surface-container-low">
        <div className="max-w-container-max mx-auto">
          <h2 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-20 text-center">Hành Trình Rực Rỡ</h2>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-primary-container to-transparent opacity-30"></div>
            
            {/* Step 1 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 items-center pl-10 md:pl-0">
              {/* Dot */}
              <div className="absolute left-[-2.1rem] md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-primary border-4 border-surface shadow-lg z-10"></div>
              
              {/* Text */}
              <div className="md:text-right pr-0 md:pr-12">
                <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">Tuyển thành viên</h3>
                <p className="text-on-surface-variant">Tháng 5/2026: Khởi động chiến dịch với hơn 1000 hồ sơ đăng ký từ các bạn sinh viên nhiệt huyết.</p>
              </div>
              
              {/* Image */}
              <div className="pl-0 md:pl-12">
                <div className="rounded-3xl overflow-hidden shadow-xl aspect-video">
                  <img
                    className="w-full h-full object-cover"
                    alt="Recruitment meeting"
                    src="https://res.cloudinary.com/ly6xwuwk/image/upload/v1783851291/706527028_122179729316932841_2409221610944694654_n_rxxdj3.jpg"
                  />
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 items-center pl-10 md:pl-0">
              {/* Dot */}
              <div className="absolute left-[-2.1rem] md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-primary border-4 border-surface shadow-lg z-10"></div>
              
              {/* Image */}
              <div className="order-2 md:order-1 pr-0 md:pr-12">
                <div className="rounded-3xl overflow-hidden shadow-xl aspect-video">
                  <img
                    className="w-full h-full object-cover"
                    alt="Training workshop"
                    src="https://res.cloudinary.com/ly6xwuwk/image/upload/v1783851291/706629290_122179729034932841_5156132463535501969_n_pdwg2n.jpg"
                  />
                </div>
              </div>
              
              {/* Text */}
              <div className="order-1 md:order-2 pl-0 md:pl-12">
                <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">Tập huấn kỹ năng</h3>
                <p className="text-on-surface-variant">Trang bị kiến thức về sơ cấp cứu, kỹ năng giao tiếp và xử lý tình huống khẩn cấp tại điểm thi.</p>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center pl-10 md:pl-0">
              {/* Dot */}
              <div className="absolute left-[-2.1rem] md:left-1/2 md:-translate-x-1/2 top-4 md:top-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full bg-primary border-4 border-surface shadow-lg z-10"></div>
              
              {/* Text */}
              <div className="md:text-right pr-0 md:pr-12">
                <h3 className="font-headline-md text-xl font-bold text-on-surface mb-2">Tiếp sức mùa thi</h3>
                <p className="text-on-surface-variant">Tháng 6/2026: Những ngày cao điểm tại 15 điểm thi, đồng hành cùng sĩ tử vượt qua kỳ thi quan trọng.</p>
              </div>
              
              {/* Image */}
              <div className="pl-0 md:pl-12">
                <div className="rounded-3xl overflow-hidden shadow-xl aspect-video">
                  <img
                    className="w-full h-full object-cover"
                    alt="Active volunteer support"
                    src="https://res.cloudinary.com/ly6xwuwk/image/upload/v1783851290/722934899_1995752054644137_7844524882289143136_n_kw5hs0.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 11: Gallery Preview */}
      <section className="py-section-gap px-margin-desktop bg-surface max-w-container-max mx-auto">
        <div className="flex items-center justify-between mb-16">
          <h2 className="font-headline-lg text-3xl font-bold text-on-surface">Kho Lưu Trữ Hình Ảnh</h2>
          <button
            onClick={() => onNavigate('/khoanh-khac')}
            className="bg-surface-container-high text-on-surface-variant px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all"
          >
            Xem Toàn Bộ
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {moments.slice(0, 8).map((photo) => (
            <div key={photo.id} className="rounded-2xl overflow-hidden h-64 shadow-md hover:scale-[1.02] transition-transform">
              <img
                className="w-full h-full object-cover"
                alt={photo.category || "Photo"}
                src={photo.imageUrl}
              />
            </div>
          ))}
          {moments.length === 0 && (
            <div className="col-span-4 text-center py-8 text-on-surface-variant italic bg-surface-container rounded-3xl">
              Chưa có hình ảnh nào trong kho lưu trữ.
            </div>
          )}
        </div>
      </section>

      {/* Section 12: Emotional Closing */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover brightness-[0.5]"
            alt="Closing sunset view"
            src="https://res.cloudinary.com/ly6xwuwk/image/upload/v1783852062/711170847_122180337554932841_4257595840174138025_n_bfrp2i.jpg"
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]"></div>
        </div>
        <div className="relative z-10 text-center text-white px-margin-mobile">
          <h2 className="font-display-lg text-4xl md:text-6xl lg:text-[64px] font-extrabold mb-8 drop-shadow-lg">Xin cảm ơn vì đã tạo nên một mùa hè đáng nhớ.</h2>
          <div className="max-w-2xl mx-auto">
            <p className="font-headline-md text-xl md:text-2xl italic mb-12 opacity-90 leading-relaxed text-secondary-fixed">
              "Có những cuộc gặp gỡ chỉ kéo dài vài ngày, nhưng để lại ký ức cho cả tuổi trẻ."
            </p>
            <div className="flex justify-center gap-12 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">2026</div>
                <div className="text-xs font-bold uppercase opacity-70">Năm khởi hành</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-1">Mãi mãi</div>
                <div className="text-xs font-bold uppercase opacity-70">Thời gian lưu giữ</div>
              </div>
            </div>
          </div>
          {/* Floating Heart Particles */}
          <div className="absolute inset-0 pointer-events-none" id="heart-container">
            {hearts.map((h) => (
              <span
                key={h.id}
                className="material-symbols-outlined absolute text-white opacity-0 select-none pointer-events-none"
                style={{
                  fontSize: `${h.size}px`,
                  left: `${h.left}%`,
                  bottom: '0%',
                  animation: `${h.duration}s linear 0s 1 normal forwards running floatUp`,
                  fontVariationSettings: "'FILL' 1",
                }}
              >
                favorite
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
