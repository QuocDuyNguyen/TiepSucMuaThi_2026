import React from 'react';

export default function ClosingScreen({ onNavigate }) {
  const [hearts, setHearts] = React.useState([]);
  const [stats, setStats] = React.useState({ volunteers: 0, students: 0, days: 0 });
  const [settings, setSettings] = React.useState(null);

  // Fetch site settings
  React.useEffect(() => {
    fetch('http://localhost:8080/api/settings')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setSettings(data);
      })
      .catch(err => console.error('Error fetching settings:', err));
  }, []);

  // Floating hearts animation
  React.useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now() + Math.random();
      const left = Math.random() * 100;
      const size = 15 + Math.random() * 20;
      const duration = 4 + Math.random() * 3;

      setHearts((prev) => [...prev, { id, left, size, duration }]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, duration * 1000);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Simple number counters animation on load
  React.useEffect(() => {
    let volTarget = settings?.closingVolTarget || 15000;
    let stuTarget = settings?.closingStuTarget || 1200000;
    let daysTarget = settings?.closingDaysTarget || 45;

    let duration = 2000;
    let steps = 50;
    let stepTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setStats({
        volunteers: Math.floor((volTarget / steps) * step),
        students: Math.floor((stuTarget / steps) * step),
        days: Math.floor((daysTarget / steps) * step),
      });

      if (step >= steps) {
        clearInterval(timer);
        setStats({ volunteers: volTarget, students: stuTarget, days: daysTarget });
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [settings]);

  const handleShare = () => {
    alert('Đã sao chép liên kết chia sẻ của Lời Kết 2026!');
  };

  return (
    <div className="w-full text-on-surface font-body-md overflow-x-hidden text-center">
      <style>{`
        .hero-gradient-overlay {
          background: linear-gradient(to bottom, rgba(0, 20, 42, 0.8), rgba(0, 91, 175, 0.4) 60%, rgba(244, 250, 253, 1) 95%);
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 40px 60px 0 rgba(0, 136, 255, 0.08);
        }
        .glow-badge {
          box-shadow: 0 10px 30px -5px rgba(0, 136, 255, 0.2);
          transition: all 0.3s ease;
        }
        .glow-badge:hover {
          box-shadow: 0 20px 40px -5px rgba(0, 136, 255, 0.4);
          transform: translateY(-5px);
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) scale(0.8) rotate(360deg);
            opacity: 0;
          }
        }
        .stagger-in {
          animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>

      {/* Main Immersive Canvas */}
      <main className="relative min-h-screen w-full flex flex-col items-center justify-center pt-24 overflow-hidden">
        
        {/* Full-screen Background Photo */}
        <div className="absolute inset-0 z-0">
          <img
            alt="Closing Cover Background"
            className="w-full h-full object-cover"
            src={settings?.closingImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuCwHmpsBSzonDzh6ZuduA5bTWcQXAF6jWvEt4xQZgFmd3xcTmcmpd3XfZx3E8qAierETbfa8hIyV-Wr6t_8gPSmgZHnzEtq87YjWxehPdRkHPXu-AJZ85ppNhmIDzDrDjbkT_SbrbAXxU4I7UJOJjSqr2VfoMawDNwUcN3n7ZD0BLum7xOdAH44UTuSmuJaLR0oFo87I5qLERz0R5Y-Wt-7HOU1IBy9YPIq-VCbExFwQEFwHoE4S4wu"}
          />
          <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px] hero-gradient-overlay"></div>
        </div>

        {/* Floating Hearts Layer */}
        <div className="fixed inset-0 pointer-events-none z-10" id="heart-container">
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

        {/* Content Shell */}
        <div className="relative z-20 w-full max-w-container-max px-margin-mobile md:px-margin-desktop text-center flex flex-col items-center gap-12 py-16">
          
          {/* Headline Section */}
          <div className="max-w-4xl stagger-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="font-display-lg text-4xl md:text-6xl lg:text-[64px] font-extrabold text-white mb-6 drop-shadow-xl">
              {settings?.closingTitle || "Xin Cảm Ơn Vì Đã Cùng Nhau Viết Nên Thanh Xuân"}
            </h1>
            <p className="font-body-lg text-lg md:text-xl text-white/90 max-w-2xl mx-auto italic">
              {settings?.closingSubtitle || "\"Có những mùa hè không bao giờ kết thúc, bởi tinh thần Tiếp Sức Mùa Thi sẽ mãi cháy rực trong tim mỗi chúng ta.\""}
            </p>
          </div>

          {/* Impact Metrics (Glowing Badges) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl stagger-in" style={{ animationDelay: '0.4s' }}>
            <div className="glass-panel rounded-3xl p-8 flex flex-col items-center glow-badge">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">volunteer_activism</span>
              <div className="font-headline-lg text-3xl md:text-4xl font-bold text-primary tabular-nums">
                {stats.volunteers.toLocaleString()}+
              </div>
              <div className="font-label-sm text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">Tình nguyện viên</div>
            </div>
            
            <div className="glass-panel rounded-3xl p-8 flex flex-col items-center glow-badge">
              <span className="material-symbols-outlined text-secondary text-4xl mb-2">school</span>
              <div className="font-headline-lg text-3xl md:text-4xl font-bold text-secondary tabular-nums">
                {stats.students.toLocaleString()}+
              </div>
              <div className="font-label-sm text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">Thí sinh được hỗ trợ</div>
            </div>

            <div className="glass-panel rounded-3xl p-8 flex flex-col items-center glow-badge">
              <span className="material-symbols-outlined text-tertiary text-4xl mb-2">calendar_today</span>
              <div className="font-headline-lg text-3xl md:text-4xl font-bold text-tertiary tabular-nums">
                {stats.days}
              </div>
              <div className="font-label-sm text-xs font-bold text-on-surface-variant uppercase tracking-widest mt-1">Ngày đêm đồng hành</div>
            </div>
          </div>

          {/* Social Sharing & Spirit Section */}
          <div className="flex flex-col items-center gap-6 stagger-in" style={{ animationDelay: '0.6s' }}>
            <h3 className="font-headline-md text-xl font-bold text-white">Lan tỏa tinh thần Tiếp Sức</h3>
            <div className="flex gap-4">
              <button
                onClick={handleShare}
                className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95 group"
              >
                <span className="material-symbols-outlined">share</span>
              </button>
              
              <button
                onClick={() => onNavigate('/so-luu-but')}
                className="px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full font-bold flex items-center gap-3 shadow-xl hover:shadow-primary/40 transition-all active:scale-95 hover:scale-105"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                Kể Câu Chuyện Của Bạn
              </button>
              
              <button
                onClick={() => alert('Đang chuẩn bị file tải ảnh kỷ yếu chất lượng cao...')}
                className="w-14 h-14 rounded-full glass-panel flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all shadow-lg active:scale-95"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12 animate-bounce opacity-60 text-white">
            <span className="material-symbols-outlined text-3xl">keyboard_double_arrow_down</span>
          </div>
        </div>
      </main>

      {/* Detailed Closing Section (White Background) */}
      <section className="bg-surface relative z-30 py-section-gap text-left">
        <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <span className="font-label-sm text-xs font-bold text-primary uppercase tracking-[0.2em] block">Hành trình 2026</span>
              <h2 className="font-headline-lg text-3xl md:text-4xl font-extrabold text-on-surface">Mỗi nụ cười là một cột mốc, mỗi nỗ lực là một niềm tin.</h2>
              <p className="font-body-lg text-lg text-on-surface-variant leading-relaxed">
                {settings?.closingContent || "Chiến dịch Tiếp Sức Mùa Thi 2026 khép lại không chỉ bằng những con số, mà bằng những cái ôm, những lời cảm ơn nghẹn ngào và sự trưởng thành của hàng vạn bạn trẻ. Chúng ta đã cùng nhau vượt qua cái nắng oi ả, những cơn mưa bất chợt để mang lại niềm an tâm nhất cho các sĩ tử."}
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('/')}
                  className="text-primary font-bold flex items-center gap-2 group hover:gap-4 transition-all"
                >
                  Quay lại Trang chủ để xem dòng thời gian hành trình
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden h-64 shadow-xl translate-y-8 border border-outline-variant">
                <img
                  alt="Student Success Moment"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  src={new URL("../assets/KHG06194.JPG", import.meta.url).href}
                />
              </div>
              <div className="rounded-3xl overflow-hidden h-64 shadow-xl border border-outline-variant">
                <img
                  alt="Volunteers High Five"
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  src={new URL("../assets/KHG05877.jpg", import.meta.url).href}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
