import React from 'react';
import { volunteers } from '../data/volunteers.js';

export default function MemberWallScreen({ onNavigate, onSelectMemberId }) {
  const [volunteersList, setVolunteersList] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedDept, setSelectedDept] = React.useState('Tất cả');
  const [loading, setLoading] = React.useState(true);
    
    // Department mapping logic
   React.useEffect(() => {
    fetch(`http://localhost:8080/api/volunteers?t=${Date.now()}`)
    .then((res)=> {
      if(!res.ok) throw new Error('Không thể tải danh sach chiến sĩ.');
      return res.json();
    })
    .then((data) => {
      setVolunteersList(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error('Lỗi API lấy thành viên:', err);
      setLoading(false);
    });
  }, []);
    const filteredVolunteers = volunteersList.filter((v) => {
    const nameToSearch = v.fullName || '';
    const roleToSearch = v.roleName || '';
    const matchesSearch = nameToSearch.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          roleToSearch.toLowerCase().includes(searchQuery.toLowerCase());
  
    let matchesDept = false;
    const roleLower = roleToSearch.toLowerCase();
    
    if (selectedDept === 'Tất cả') {
      matchesDept = true;
    } else if (selectedDept === 'Đội Hậu cần') {
      matchesDept = roleLower.includes('hậu cần');
    } else if (selectedDept === 'Đội Truyền thông') {
      matchesDept = roleLower.includes('truyền thông');
    } else if (selectedDept === 'Đội Điều phối') {
      matchesDept = roleLower.includes('điều phối') || 
                    roleLower.includes('tiếp sức') || 
                    roleLower.includes('kỹ thuật') || 
                    roleLower.includes('trưởng ban') || 
                    roleLower.includes('tổng chỉ huy');
    }
    return matchesSearch && matchesDept;
  });

  return (
    <div className="w-full text-on-surface font-body-md overflow-x-hidden pt-24 pb-section-gap">
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 40px 60px 0 rgba(0, 136, 255, 0.08);
        }
        .gradient-text {
          background: linear-gradient(90deg, #005baf 0%, #00d084 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .masonry-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 640px) {
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

      {/* Hero Header */}
      <header className="text-center mb-16 space-y-4 pt-8 max-w-container-max mx-auto px-margin-mobile">
        <h1 className="font-display-lg text-3xl md:text-5xl font-extrabold gradient-text">
          Bức Tường Vinh Danh - Tiếp Sức Mùa Thi 2026
        </h1>
        <p className="font-body-lg text-lg text-on-surface-variant max-w-2xl mx-auto leading-relaxed">
          Mỗi gương mặt là một mảnh ghép tạo nên hành trình ý nghĩa. Cảm ơn sự nỗ lực không mệt mỏi của các chiến sĩ áo xanh.
        </p>
      </header>

      {/* Search & Filters */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop mb-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline">search</span>
          <input
            type="text"
            placeholder="Tìm kiếm chiến sĩ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-full border border-outline-variant bg-white/50 backdrop-blur-md focus:ring-2 focus:ring-primary focus:border-transparent outline-none shadow-sm text-sm"
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {['Tất cả', 'Đội Hậu cần', 'Đội Truyền thông', 'Đội Điều phối'].map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-5 py-2 rounded-full font-bold whitespace-nowrap text-sm transition-all ${
                selectedDept === dept ? 'bg-primary text-white' : 'glass-card text-on-surface-variant'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>
      </div>

      {/* Volunteer Grid */}
      <main className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="masonry-grid">
          {filteredVolunteers.map((vol) => (
            <div
              key={vol.id}
              onClick={() => {
                onSelectMemberId(vol.id);
                onNavigate('/ho-so-thanh-vien');
              }}
              className="glass-card p-6 rounded-3xl cursor-pointer group border border-white/50"
            >
              <div className="aspect-square rounded-2xl overflow-hidden mb-4 relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  alt={vol.fullName}
                  src={vol.avatarUrl || 'https://res.cloudinary.com/demo/image/upload/d_avatar.png/avatar.png'}
                />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="material-symbols-outlined text-white text-4xl bg-primary/80 p-3 rounded-full shadow-lg">visibility</span>
                </div>
              </div>
              <h3 className="font-headline-md text-lg font-bold text-on-surface mb-1">{vol.fullName}</h3>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{vol.roleName}</p>
            </div>
          ))}
        </div>

        {filteredVolunteers.length === 0 && (
          <div className="text-center py-20 text-on-surface-variant italic">
            Không tìm thấy chiến sĩ nào khớp với tìm kiếm của bạn.
          </div>
        )}
      </main>


    </div>
  );
}
