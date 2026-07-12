import React from 'react';

export default function MemberProfileScreen({ onNavigate, selectedMemberId }) {
  const [member, setMember] = React.useState(null);
  const [gratitudes, setGratitudes] = React.useState([]);
  const [memories, setMemories] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  
  React.useEffect(() => {
    setLoading(true);

    const fetchMemberDetails = fetch(`http://localhost:8080/api/volunteers?t=${Date.now()}`)
    .then(res => {
      if(!res.ok) throw new Error('Không thể tải danh sách.');
      return res.json();
    })
    .then(list =>{
      const found = list.find( v => v.id == selectedMemberId);
      if(!found) throw new Error('Không tìm thấy thành viên.');
      setMember(found);
    });

    const fetchMemories = fetch(`http://localhost:8080/api/volunteers/${selectedMemberId}/memories?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setMemories(Array.isArray(data) ? data : []));

    const fetchGratitudes = fetch(`http://localhost:8080/api/volunteers/${selectedMemberId}/gratitudes?t=${Date.now()}`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setGratitudes(Array.isArray(data) ? data : []));
    Promise.all([fetchMemberDetails, fetchMemories, fetchGratitudes])
      .then(() => setLoading(false))
      .catch((err) => {
        console.error('Lỗi khi tải thông tin chi tiết thành viên:', err);
        setLoading(false);
      });
  }, [selectedMemberId]);

  const teammateMessages = gratitudes.filter(g => g.verified === true);
  const studentGratitudes = gratitudes.filter(g => g.verified === false);
  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    if (parts.length >= 2) {
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };
  if (loading || !member) {
    return (
      <div className="w-full text-center py-40 text-on-surface-variant italic">
        Đang tải thông tin hồ sơ chiến sĩ...
      </div>
    );
  }

    return (
    <div className="w-full text-on-surface font-body-md overflow-x-hidden pt-24 pb-section-gap">
      <style>{`
        .glass-effect {
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
      `}</style>

      {/* Back Button */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-4">
        <button
          onClick={() => onNavigate('/vinh-danh')}
          className="flex items-center gap-2 text-primary font-bold hover:text-primary-container transition-all group"
        >
          <span className="material-symbols-outlined transition-transform group-hover:-translate-x-1">arrow_back</span>
          Quay lại Bức Tường Vinh Danh
        </button>
      </div>

      {/* Hero Profile Section */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap mt-8">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="relative group shrink-0">
            <div className="w-64 h-64 rounded-full overflow-hidden ring-4 ring-primary ring-offset-4 ring-offset-surface">
              <img
                alt={`${member.fullName} Profile`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={member.avatarUrl || 'https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png'}
              />
            </div>
            <div className="absolute -bottom-4 right-4 bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg uppercase">
              VOLUNTEER 2026
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary">{member.fullName}</h1>
            <p className="font-headline-md text-lg md:text-xl text-on-surface-variant">{member.roleName || 'Tình nguyện viên'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <div className="glass-effect px-6 py-4 rounded-2xl text-center min-w-[120px] shadow-sm">
                <span className="block font-headline-md text-2xl font-bold text-primary">{member.displayOrder * 12 + 24}</span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Giờ Tình Nguyện</span>
              </div>
              <div className="glass-effect px-6 py-4 rounded-2xl text-center min-w-[120px] shadow-sm">
                <span className="block font-headline-md text-2xl font-bold text-secondary">2</span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Chiến dịch</span>
              </div>
              <div className="glass-effect px-6 py-4 rounded-2xl text-center min-w-[120px] shadow-sm">
                <span className="block font-headline-md text-2xl font-bold text-tertiary">150+</span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Thí sinh hỗ trợ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lời Nhắn Từ Đồng Đội */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto mb-section-gap">
        <div className="text-center mb-10">
          <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-primary">Lời Nhắn Từ Đồng Đội</h2>
          <p className="text-sm text-on-surface-variant mt-2">Những lời nhắn gửi thân thương từ các chiến sĩ Tiếp Sức Mùa Thi 2026</p>
        </div>

        {teammateMessages.length === 0 ? (
          <div className="text-center py-12 glass-effect rounded-3xl border border-white/60 text-on-surface-variant italic max-w-3xl mx-auto">
            Chưa có lời nhắn nào từ đồng đội gửi đến chiến sĩ này. Hãy là người đầu tiên viết lời chúc nhé!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {teammateMessages.map((msg) => (
              <div key={msg.id} className="glass-effect p-8 rounded-3xl relative border border-white/60 shadow-sm flex flex-col justify-between">
                <span className="material-symbols-outlined text-primary/10 absolute top-4 right-6 text-4xl select-none">format_quote</span>
                <p className="font-body-lg text-sm md:text-base mb-6 text-on-surface-variant leading-relaxed italic">
                  "{msg.content}"
                </p>
                <div className="flex items-center gap-3 border-t border-outline-variant/20 pt-4 mt-auto">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                    {getInitials(msg.senderName)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-xs truncate">{msg.senderName}</p>
                      {msg.senderVerified && (
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-200/50 text-[8px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider scale-95 shrink-0">
                          Đồng đội
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-outline mt-0.5">
                      {new Date(msg.createdAt).toLocaleDateString('vi-VN')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lời Cảm Ơn Gửi Đến Tình Nguyện Viên */}
      {studentGratitudes.length > 0 && (
        <section className="bg-surface-container-low py-section-gap mb-section-gap">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-center mb-16 text-primary">Lời Tri Ân từ Thí Sinh &amp; Phụ Huynh</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {studentGratitudes.map((letter) => (
                <div key={letter.id} className="glass-effect p-10 rounded-3xl relative border border-white/60">
                  <span className="material-symbols-outlined text-primary-container absolute top-6 right-8 opacity-20 text-4xl select-none">format_quote</span>
                  <p className="font-body-lg text-md md:text-lg mb-8 italic text-on-surface-variant leading-relaxed">
                    "{letter.content}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {getInitials(letter.senderName)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{letter.senderName}</p>
                      <p className="text-[10px] text-outline font-bold uppercase">Sĩ tử/Phụ huynh</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Khoảnh Khắc Đáng Nhớ */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-section-gap">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-3xl font-bold mb-4">Khoảnh Khắc Đáng Nhớ</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-8">
          {memories.map((photo) => (
            <div key={photo.id} className="break-inside-avoid">
              <div className="polaroid">
                <img
                  alt={photo.title}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                  src={photo.imageUrl || 'https://placehold.co/600x400?text=TSMT'}
                />
                <p className="mt-6 font-handwritten text-2xl text-on-surface-variant text-center">{photo.title}</p>
              </div>
            </div>
          ))}

          {/* Quote Card tĩnh */}
          <div className="break-inside-avoid bg-primary-container p-8 rounded-3xl text-on-primary-container shadow-md">
            <p className="text-2xl font-bold leading-tight mb-4">"Không chỉ là hỗ trợ thi, đây là nơi chúng tôi tìm thấy phiên bản tốt nhất của chính mình."</p>
            <p className="text-sm font-bold text-on-primary-container/85">— Nhật ký {member.fullName}</p>
          </div>
        </div>
      </section>
    </div>
  );
}