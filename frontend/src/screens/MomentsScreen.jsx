import React from 'react';

const initialMoments = [
  {
    id: 1,
    title: 'Những Bước Chân Đầu Tiên',
    category: 'Tập huấn',
    detail: 'Khoảnh khắc các chiến sĩ nhận nhiệm vụ, sẵn sàng cho một mùa hè rực rỡ.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC67B-uVE4240J-9_koxgjvZuyXXEaUQjTKNjFTaWTDlSKmjW2JRode60v4Iie-fCndtHbGKOtEg8Z_i6pl5jB43R3fZjlTkRzMLZZL6np3DCQxXpSba2189eYhJRtubSkQrh3Hu0cjR45g8wEY0QdjwHnmYYY88_W1e9Ms3IhLQ80k4EAcxZlSBhWCNIRXx8I4xq4tElaGIhHsi3C78hk5lYeKyikH2ipWAlaBMBcz9uZZbLxBorJF',
  },
  {
    id: 2,
    title: 'Nụ Cười Sĩ Tử',
    category: 'Tiếp sức',
    detail: 'Sự động viên nhỏ bé nhưng mang lại sức mạnh tinh thần lớn lao trong phòng thi.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBhZfcKx9mga_ixAd2dYaqbyqGnLkwxMQWyRtJpRWUw8-7GB935zya8RQz5omI3OxdJd5pOh9oCKijCfsuDSk8EMdxFjVPijqCSszRdXVys4Q7_IvRmOqhZoszjNecXj97tB7x1qdB4uWAUD1X18mWyBC_v67cEm5eAMKT45XxbKBMG2SrQFCBlqFVyBfEHO7mS6vJd5Nc-ukRrQNqClKghxQ1lxn29s6-JIaCSD7ArUxYwl2VDbaAg',
    isTall: true,
  },
  {
    id: 3,
    title: 'Đồng Đội Là Nhà',
    category: 'Gắn kết',
    detail: 'Vượt qua mệt mỏi, chúng tôi tìm thấy nhau trong những tiếng cười giòn giã.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1TQnCh-7hOgoY8WwWmpwKREd47dPNHuzSpciivOPvOP5AWUt2AD7ZNdEDgfaufsFEBy7I0zNL1AaLyaChdhTAwgcZvG6QwQVl7yYdNyRZ35W4ObO5CfFxAP3JWPT2xv5dr6ruyS_XgonPXo8tQeunOQ-MMiND4xBv_MpZEJtx1mGbTi6gfCsORXSo9aBYvdwlG7rBp2YaS7zkGNnL7j7lEMbhobtBfkM_4u3p2XsI_u6H0kg_f4Vs',
  },
  {
    id: 4,
    title: 'Hoàng Hôn Tình Nguyện',
    category: 'Tiếp sức',
    detail: 'Kết thúc một ngày dài bằng sự mãn nguyện khi đã giúp đỡ được ai đó.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZf_j_Qom74FvNaCkZWQjyT0d2nvU16PVf_xVV0ecUW_nUKP9Bt1SPGIBgDIMmt1vAH0M1zFwM3qSHEyEMIsKUBXP5kRVgZlBm5eCFNOLJk_sxAC8od0nazukltc1ClOcZv1lzkkykSKG1Mj4_VgFReiXDJ1sIRW9aJZrdsUBt692_b-8-Ad175ziYdRW1903DwytqVUpvH-Iv-2ILS1hSd_cIMv0M1s7B6rkbVF3pGVDGtS2GGHpK',
  },
];

const topMoments = [
  {
    id: '01',
    title: 'Cơn Mưa Thắt Chặt Tình Thân',
    detail: 'Dù mưa xối xả, các chiến sĩ vẫn kiên cường bám trụ tại điểm thi để hỗ trợ từng bạn học sinh.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBIhL6W6fwed1bM0NNvd0Kr7XVKKQal5lI5ZLM3tR77knLMS90oO4QTxp9d2h6V67bxCTIx6b1U2dvRdi2ZX5C-E2JgSb-_IaAIEXJexmDFK6qojE_aKGY7ZmX9Z_KUsOo8xm-qEqbbu-O4XvODBCOzHaAhTSwe-6P9wO-FeSJYiIXQC5ZKkBdORJnOucqAE2YDJhBn_gxKx_MN4mwImY9QTNdOrwvxFhafF0DZvlmLlNAzYgLPbPdM',
  },
  {
    id: '02',
    title: 'Chuyến Xe 0 Đồng Cuối Cùng',
    detail: 'Hành trình đưa thí sinh có hoàn cảnh khó khăn vượt hơn 50km để kịp giờ thi.',
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '03',
    title: 'Lời Chúc Viết Vội',
    detail: 'Hàng ngàn tấm thiệp đầy ắp yêu thương được trao tận tay sĩ tử trước khi vào cổng trường.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
  },
];

const polaroids = [
  { location: 'Hà Nội, 06/2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAp22JjKo8tcySXJjYYxYx9rpzWuzyNfYbYNL8jMt5wDITdRP8Z48-qgRMeQETgwL45v68f1JQZ6_cyLzUjuBmy1Pz5oBG-FVt5FSFkd4ZSy9-UEC3vTP8FTcd8l6Y4nYN4X0-ZoDLwarVmx3aywmdM5aH-DcNTpUFg3VPdHzVXukWHihzyYR8eg7o7M6RZYx-dkkUPIujb6VyFr5uSWY9IRde-BeIWY39nUceY0YjW8_ImDpbcnMR', rotation: 'rotate-3' },
  { location: 'TP.HCM, 06/2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBylKF-he7M_kTHg6jAgt0O50cT7ddQ0JQkWoy01-aRcSIDRZ0grRoOGgv10OatUJlmpDlC6Z1buF5_VHycnhIeiSRAyZKHlDJ-b7R6NaTjFTznj8VYaCfc3jlTU5vLEChKKsEgKavVYTSVTFSc4cMvW0x8fiFEM4sqNzJObWcTIXUVNKKp-AIzaExCiCT8FqaLdoVtoOpIHqXImqMOhmQPrb0xoLlsmlaD4_e7wvtCwxMaCp3e7Jfg', rotation: '-rotate-6', margin: 'mt-20' },
  { location: 'Đà Nẵng, 06/2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8YGw-Y_mMBi8G8iTxkIftz5NfMEb-3gmPAZ7QR1ZTAJ_GvT8XlZJ1sKrlbdH3opXGsqjHe8Y0XgxMbC0jPZ36RBMNQyi07dWGC7UOmV5ORnsXBkndU7j9SKcVgGWXOYnHFxBO1gUW90JKSpBq5XtK69x9mViZkAltJjEnWY86hSCKECTczeSOjGH9WDbcxxH-dQ0v40mgKHLIDzgP5HLseO0UZ4_JXK53WDTgCpBm7d4cR3WO95kK', rotation: 'rotate-12' },
  { location: 'Cần Thơ, 06/2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9B-ttqv5DP4a5oY3dJcYg1NHHuAzO06mI8wX2xivr94TUcxwLGf5sRp4Y1oYnjr7zxRcFXrlB15iKrM-MIRNETPLx_4x0SQW3sRw-yU3atocb32X4wWjMXK0vdg5BpxFWWkB-vPNSxYUujrDF4_7CSI3scXUlpJ1R36Ek2tWfXs0CXkRsdJ5Ud3m6KV0Ghim6fBpM1nS550hXcz1s1AY4PklYuPeiVKVTNVw9_Tc61wp7vs7pjbn-', rotation: '-rotate-2', margin: 'mt-10' },
  { location: 'Huế, 06/2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDBscUiq4p7IQ_gM4tix7Pk_Rb6ekL0QTMrRwADCdAIe-HnzPBQ7KPTx_5SNID5eAeK9Bsx4sKQrXxxGRHR0h4zdj1AWAGMelPnePPvBYC6MUmdQYw-3nyoKI09AowvGBJqM61D6zOz29ICE9Ph7wvWyJdImibEB72FUTjal2896bK-DPNwUyHQe1pEH9rygNyJik7HXh8wZlX2-QBMDZ2RvEbvISDMb15yF3msc3ifamK75QHeZFwM', rotation: 'rotate-6' },
  { location: 'Hải Phòng, 06/2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuClJJ804HibV871enK2cC4YcxZQd2ByYfnxm0E6WUbTiq6ENPY8Kc-Zh_RAXJb37Eb2moVnWnEZGCatbvqtIgKbRMUyl9yq4oZ5D0Iyqpqi_cYXIICthmew9wPZ_upo2ZadOC30WEjLjaV6aRDGMt0CzLSpB14QpjEkLOA6llckwmFHHrFlQwCaXb4iG1BgXEoA5Va9cG1Iur0AgOwPK8lsa6UIJtrBahmPmQgEP_vgKtOu7BDVUnn-', rotation: '-rotate-12', margin: 'mt-20' }
];

export default function MomentsScreen({ onNavigate }) {
  const [selectedCategory, setSelectedCategory] = React.useState('Tất cả');
  const [activeTopIndex, setActiveTopIndex] = React.useState(0);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = React.useState(false);
  
  // Custom moment contribution form
  const [newMoment, setNewMoment] = React.useState({ title: '', category: 'Tiếp sức', detail: '', image: '' });
  const [momentsList, setMomentsList] = React.useState(initialMoments);

  // Photo wall drag ref
  const wallRef = React.useRef(null);
  const dragRef = React.useRef({ isDown: false, startX: 0, scrollLeft: 0 });

  const handleMouseDown = (e) => {
    dragRef.current.isDown = true;
    dragRef.current.startX = e.pageX - wallRef.current.offsetLeft;
    dragRef.current.scrollLeft = wallRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    dragRef.current.isDown = false;
  };

  const handleMouseUp = () => {
    dragRef.current.isDown = false;
  };

  const handleMouseMove = (e) => {
    if (!dragRef.current.isDown) return;
    e.preventDefault();
    const x = e.pageX - wallRef.current.offsetLeft;
    const walk = (x - dragRef.current.startX) * 1.5;
    wallRef.current.scrollLeft = dragRef.current.scrollLeft - walk;
  };

  const filteredMoments = momentsList.filter((m) => 
    selectedCategory === 'Tất cả' || m.category === selectedCategory
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newMoment.title || !newMoment.detail) return;
    
    const imagePlaceholder = newMoment.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80';
    const momentToAdd = {
      id: Date.now(),
      title: newMoment.title,
      category: newMoment.category,
      detail: newMoment.detail,
      image: imagePlaceholder,
    };
    
    setMomentsList([momentToAdd, ...momentsList]);
    setNewMoment({ title: '', category: 'Tiếp sức', detail: '', image: '' });
    setIsSubmitModalOpen(false);
    alert('Cảm ơn bạn đã đóng góp khoảnh khắc ý nghĩa này!');
  };

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
          {filteredMoments.map((moment) => (
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
                  src={moment.image}
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
                  src={topMoments[activeTopIndex].image}
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
                  }`}>{item.id}</span>
                  <div className="space-y-2">
                    <h4 className="font-headline-md text-lg font-bold">{item.title}</h4>
                    <p className="font-body-md text-sm text-on-surface-variant">{item.detail}</p>
                  </div>
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
            {polaroids.map((p, idx) => (
              <div
                key={idx}
                className={`w-64 h-80 bg-white p-3 shadow-xl ${p.rotation} ${p.margin || ''} rotate-x-hover flex-shrink-0 border border-outline-variant`}
              >
                <img
                  className="w-full h-60 object-cover grayscale hover:grayscale-0 transition-all pointer-events-none"
                  alt={p.location}
                  src={p.image}
                />
                <div className="pt-4 text-center font-body-md italic text-on-surface-variant text-xs">{p.location}</div>
              </div>
            ))}
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
    </div>
  );
}
