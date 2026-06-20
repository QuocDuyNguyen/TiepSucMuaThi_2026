import React from 'react';
import { volunteers } from '../data/volunteers.js';

export default function MemberProfileScreen({ onNavigate, selectedMemberId }) {
  const member = volunteers.find((v) => v.id === selectedMemberId) || volunteers[0];

  const getInitials = (fullName) => {
    if (!fullName) return '';
    const parts = fullName.split(' ');
    if (parts.length >= 2) {
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  };

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
        .journal-paper {
          position: relative;
          background: linear-gradient(rgba(0, 0, 0, 0) 95%, rgba(0, 136, 255, 0.15) 95%);
          background-size: 100% 2rem;
          line-height: 2rem;
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
                alt={`${member.name} Profile`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                src={member.image}
              />
            </div>
            <div className="absolute -bottom-4 right-4 bg-secondary text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg uppercase">
              VOLUNTEER 2026
            </div>
          </div>
          <div className="flex-1 text-center md:text-left space-y-4">
            <h1 className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary">{member.name}</h1>
            <p className="font-headline-md text-lg md:text-xl text-on-surface-variant">{member.role}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <div className="glass-effect px-6 py-4 rounded-2xl text-center min-w-[120px] shadow-sm">
                <span className="block font-headline-md text-2xl font-bold text-primary">{member.hours}</span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Giờ Tình Nguyện</span>
              </div>
              <div className="glass-effect px-6 py-4 rounded-2xl text-center min-w-[120px] shadow-sm">
                <span className="block font-headline-md text-2xl font-bold text-secondary">{member.campaigns}</span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Chiến dịch</span>
              </div>
              <div className="glass-effect px-6 py-4 rounded-2xl text-center min-w-[120px] shadow-sm">
                <span className="block font-headline-md text-2xl font-bold text-tertiary">{member.assisted}</span>
                <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">Thí sinh hỗ trợ</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lời Nhắn Từ Leader (Featured Letter Card) */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto mb-section-gap">
        <div className="relative bg-[#fffdfa] p-12 md:p-16 rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-orange-100 rotate-1">
          <div className="absolute -top-10 -right-10 w-32 h-32 text-primary opacity-10 select-none">
            <span className="material-symbols-outlined text-[120px]">format_quote</span>
          </div>
          <div className="flex items-center gap-6 mb-12">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white shrink-0">
              <img
                alt="Leader Avatar"
                className="w-full h-full object-cover"
                src={member.leaderAvatar}
              />
            </div>
            <div>
              <h3 className="font-headline-md text-xl font-bold text-on-surface">Lời Nhắn Từ Ban Chỉ Huy</h3>
              <p className="text-sm text-on-surface-variant italic">{member.leaderName} - {member.leaderTitle}</p>
            </div>
          </div>
          <div className="space-y-6 font-body-lg text-md md:text-lg text-on-surface leading-relaxed journal-paper">
            {member.leaderMessage.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-12 text-right">
            <p className="font-handwritten text-4xl text-primary mb-2">{member.leaderSignatureText}</p>
            <p className="font-bold text-on-surface text-sm">{member.leaderName}</p>
          </div>
        </div>
      </section>

      {/* Lời Cảm Ơn Gửi Đến Leader / Đồng đội */}
      {member.gratitudeLetters && member.gratitudeLetters.length > 0 && (
        <section className="bg-surface-container-low py-section-gap mb-section-gap">
          <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-bold text-center mb-16 text-primary">Lời Nhắn Gửi &amp; Tri Ân</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {member.gratitudeLetters.map((letter, idx) => (
                <div key={idx} className="glass-effect p-10 rounded-3xl relative border border-white/60">
                  <span className="material-symbols-outlined text-primary-container absolute top-6 right-8 opacity-20 text-4xl select-none">format_quote</span>
                  <p className="font-body-lg text-md md:text-lg mb-8 italic text-on-surface-variant leading-relaxed">
                    "{letter.text}"
                  </p>
                  <div className="flex items-center gap-4 border-t border-outline-variant/30 pt-6">
                    <div className="w-12 h-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary font-bold text-sm shrink-0">
                      {getInitials(letter.sender)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{letter.sender}</p>
                      <p className="text-[10px] text-outline font-bold uppercase">{letter.relation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Khoảnh Khắc Đáng Nhớ (Masonry Journal Style) */}
      <section className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-section-gap">
        <div className="text-center mb-16">
          <h2 className="font-headline-lg text-3xl font-bold mb-4">Khoảnh Khắc Đáng Nhớ</h2>
          <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-gutter space-y-8">
          
          {/* Polaroid Photos */}
          {member.polaroids && member.polaroids.map((photo, idx) => (
            <div key={idx} className="break-inside-avoid">
              <div className={`polaroid ${photo.rotateClass || ''}`}>
                <img
                  alt={photo.caption}
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700 pointer-events-none"
                  src={photo.src}
                />
                <p className="mt-6 font-handwritten text-2xl text-on-surface-variant text-center">{photo.caption}</p>
              </div>
            </div>
          ))}

          {/* Journal Entry */}
          {member.journal && (
            <div className="break-inside-avoid glass-effect p-8 rounded-3xl border border-white/60">
              <div className="flex items-center gap-2 mb-4 text-primary">
                <span className="material-symbols-outlined">edit_note</span>
                <span className="font-bold">Nhật ký trực chiến</span>
              </div>
              <p className="text-on-surface-variant text-sm leading-relaxed">
                {member.journal.text}
              </p>
              <p className="mt-4 text-[10px] text-outline font-bold">{member.journal.date}</p>
            </div>
          )}

          {/* Quote Card */}
          <div className="break-inside-avoid bg-primary-container p-8 rounded-3xl text-on-primary-container shadow-md">
            <p className="text-2xl font-bold leading-tight mb-4">"Không chỉ là hỗ trợ thi, đây là nơi chúng tôi tìm thấy phiên bản tốt nhất của chính mình."</p>
            <p className="text-sm font-bold text-on-primary-container/85">— Nhật ký {member.name}</p>
          </div>

        </div>
      </section>
    </div>
  );
}
