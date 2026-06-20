import React from 'react';

const initialMembers = [
  {
    id: 1,
    name: 'Nguyễn Minh Anh',
    email: 'minhanh.ng@dauantiep_suc.vn',
    dept: 'Truyền thông',
    status: 'Đã ghi',
    lastUpdated: '2 giờ trước',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDmJB4DEFGjXILKv8R4xLiEp2Ku2bQdV_RNYQZBI8UWdHueD_tsvAtpznvsz4wuwvOchuMgAcTpCXsCP1tR5AS-bl-MCz3VfhSeo1UB85thdyMPaVdI51r_BM3fsMJaAS_8LWxa1r_PwzdZxVx1WmZsI4mFGNV37tZxcvRw0UnqCwEHFFZJvqkjbnfkodoLJX0YtmOiX1k4A8DA1nX7J8MjQq2ciSteXSmJ9vTOz1VQPOSLmg-7rZA',
    achievement: 'Thiết kế ấn phẩm truyền thông Tiếp sức 2026',
    memory: 'Chụp hình đêm nhạc tri ân',
    detailMsg: 'Minh Anh đã cống hiến hết mình, tạo ra những ấn phẩm truyền thông vô cùng ấn tượng giúp lan tỏa tình thần tình nguyện của cả đội đến công chúng.'
  },
  {
    id: 2,
    name: 'Trần Hoàng Nam',
    email: 'nam.tran@dauantiep_suc.vn',
    dept: 'Kỹ thuật',
    status: 'Chưa ghi',
    lastUpdated: '—',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBujOj9r3bTWYaw2Xw1Y1j67D36KHTBh5jVsZGEWH3C5YVIvYkzEOtOKI1SfzXIvKrZqTTBSck2CMOc5oLX5PX-Zw2-wcaRRYZyXbES07XbnDM5hxdPyIvXnLKOKBziK1EsIfpAMG9DVsitvQfTJBo2lnTd6IG-IMh4LB37pu6GD2Vb4pC2CHsfeRZixDVmbi-C0uqMIIvDGiWpNkF6glYIMzINKgVTPKEHY7g8-zJUxdnRdbPKXWFi',
    achievement: 'Xây dựng CMS Yearbook Tiếp sức 2026',
    memory: 'Trực đêm hệ thống ngày 26/03',
    detailMsg: 'Nam luôn là người đầu tiên có mặt khi hệ thống gặp sự cố và không bao giờ rời đi trước khi vấn đề được giải quyết triệt để. Tinh thần của em là chỗ dựa cho cả đội.'
  },
  {
    id: 3,
    name: 'Lê Phương Thảo',
    email: 'thao.le@dauantiep_suc.vn',
    dept: 'Nội dung',
    status: 'Đang soạn',
    lastUpdated: 'Hôm qua',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz0u8kVNaTfoyUNxbaaL7owBSuR7-GUJNH5JTqbMuiVhjAyefWz1yC8ye9nUHTyW3uLx0mOQhiyYrwsKN8eTWFvUg4P3ESEtX8HredaWgAjglCP0dGWvhhPn2hxpju1Ly2q3raN4nr3cCW6Fm0UvNZGY2TNI5s3m-U-w23HD8Z86FkXJ0xe_7aDyLj8nxp-bEmMH4dITjjS0fvc7F0FS7FK2nY-gWaECnlZmgfP8L0VUcV7RN5Nrik',
    achievement: 'Tổng hợp 100+ câu chuyện Tiếp sức',
    memory: 'Phỏng vấn phụ huynh sĩ tử',
    detailMsg: 'Thảo rất chủ động trong công tác thu thập tư liệu và viết bài, tạo ra những câu chuyện giàu giá trị nhân văn.'
  }
];

export default function AdminScreen() {
  const [members, setMembers] = React.useState(initialMembers);
  const [selectedMember, setSelectedMember] = React.useState(initialMembers[1]); // Default select Nam
  const [deptFilter, setDeptFilter] = React.useState('Tiểu ban: Tất cả');
  const [statusFilter, setStatusFilter] = React.useState('Trạng thái: Tất cả');
  
  // Message edit text
  const [wishMsg, setWishMsg] = React.useState(selectedMember ? selectedMember.detailMsg : '');

  React.useEffect(() => {
    if (selectedMember) {
      setWishMsg(selectedMember.detailMsg || '');
    }
  }, [selectedMember]);

  // Handle department filter
  const filteredMembers = members.filter((m) => {
    let matchesDept = true;
    if (deptFilter !== 'Tiểu ban: Tất cả') {
      const deptName = deptFilter.replace('Tiểu ban ', '');
      matchesDept = m.dept === deptName;
    }
    
    let matchesStatus = true;
    if (statusFilter !== 'Trạng thái: Tất cả') {
      if (statusFilter === 'Đã ghi lời chúc') {
        matchesStatus = m.status === 'Đã ghi';
      } else if (statusFilter === 'Chưa ghi lời chúc') {
        matchesStatus = m.status === 'Chưa ghi';
      } else if (statusFilter === 'Đang soạn thảo') {
        matchesStatus = m.status === 'Đang soạn';
      }
    }

    return matchesDept && matchesStatus;
  });

  const handleSaveDraft = () => {
    if (!selectedMember) return;
    const updated = members.map((m) => 
      m.id === selectedMember.id ? { ...m, status: 'Đang soạn', detailMsg: wishMsg, lastUpdated: 'Vừa xong' } : m
    );
    setMembers(updated);
    setSelectedMember({ ...selectedMember, status: 'Đang soạn', detailMsg: wishMsg });
    alert('Đã lưu bản nháp lời chúc!');
  };

  const handleSendWish = () => {
    if (!selectedMember) return;
    const updated = members.map((m) => 
      m.id === selectedMember.id ? { ...m, status: 'Đã ghi', detailMsg: wishMsg, lastUpdated: 'Vừa xong' } : m
    );
    setMembers(updated);
    setSelectedMember({ ...selectedMember, status: 'Đã ghi', detailMsg: wishMsg });
    alert('Đã duyệt gửi lời chúc vinh danh thành công!');
  };

  return (
    <div className="w-full text-on-surface font-body-md bg-surface-container-low min-h-screen flex flex-col pt-16">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.1);
          border-radius: 4px;
        }
        .glass-panel {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          border-left: 1px solid rgba(0, 136, 255, 0.1);
        }
      `}</style>

      {/* Admin Subheader Bar */}
      <header className="flex justify-between items-center bg-white px-8 py-4 border-b border-outline-variant shadow-sm shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-md">A</div>
          <div>
            <h2 className="font-headline-md text-lg font-bold text-on-surface">Admin Suite</h2>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold">Yearbook 2026</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="font-bold text-sm text-on-surface">Superuser</p>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Admin</p>
          </div>
          <img
            alt="Admin profile"
            className="w-10 h-10 rounded-full border-2 border-primary object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgWgyRWB_GD0Kv9C_-UJ54iNR8v_qHZ7z8t3CGsYchDxuy0i3faZZkyZrtSJMLKDy490r9E-GMySirOVXPoUiSNc7gGsxAqSA1M2ipvMZDq4rYoHXSLgPvkNn_XxA-KpA0jKyj2bJes2i5zExydleTU5iRf-1jufWH9wQ7QgdZlzSOSuxWIxtEwkCSGnipfhM_C7TbEDx_raQzIN_BoSDCyjiAufyjpWZNpVQMlJTtUsEhSPaOwbp3"
          />
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Table & List Section */}
        <section className="flex-1 flex flex-col p-8 overflow-y-auto custom-scrollbar">
          <header className="mb-8">
            <h2 className="font-headline-lg text-2xl md:text-3xl font-extrabold text-primary mb-2">Quản lý Thành viên &amp; Lời chúc</h2>
            <p className="font-body-lg text-sm text-on-surface-variant">Ghi nhận những đóng góp và gửi lời tri ân đến từng tình nguyện viên.</p>
          </header>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl border border-outline-variant hover:border-primary transition-all shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-primary p-3 bg-primary-fixed rounded-lg">groups</span>
                <span className="text-on-surface-variant text-xs font-bold">+12 tháng này</span>
              </div>
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Total Members</p>
              <h3 className="font-display-xl text-3xl font-extrabold text-on-surface">729</h3>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-outline-variant hover:border-primary transition-all shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-tertiary p-3 bg-tertiary-fixed rounded-lg">auto_awesome</span>
                <span className="text-tertiary font-bold text-xs">62% hoàn thành</span>
              </div>
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Messages Written</p>
              <h3 className="font-display-xl text-3xl font-extrabold text-on-surface">450 <span className="text-sm font-normal text-on-surface-variant">/ 729</span></h3>
              <div className="w-full bg-surface-container mt-4 h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '62%' }}></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl border border-outline-variant hover:border-primary transition-all shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <span className="material-symbols-outlined text-secondary p-3 bg-secondary-fixed rounded-lg">edit_note</span>
              </div>
              <p className="text-xs font-bold text-on-surface-variant uppercase mb-1">Drafts</p>
              <h3 className="font-display-xl text-3xl font-extrabold text-on-surface">12</h3>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6 bg-white p-4 rounded-xl border border-outline-variant items-center shadow-sm">
            <div className="flex-1 min-w-[200px]">
              <select
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="w-full border border-outline-variant rounded-lg font-body-md py-2 px-3 focus:ring-primary focus:border-primary outline-none bg-white text-sm"
              >
                <option value="Tiểu ban: Tất cả">Tiểu ban: Tất cả</option>
                <option value="Tiểu ban Nội dung">Tiểu ban Nội dung</option>
                <option value="Tiểu ban Kỹ thuật">Tiểu ban Kỹ thuật</option>
                <option value="Tiểu ban Hậu cần">Tiểu ban Hậu cần</option>
                <option value="Tiểu ban Truyền thông">Tiểu ban Truyền thông</option>
              </select>
            </div>
            <div className="flex-1 min-w-[200px]">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border border-outline-variant rounded-lg font-body-md py-2 px-3 focus:ring-primary focus:border-primary outline-none bg-white text-sm"
              >
                <option value="Trạng thái: Tất cả">Trạng thái: Tất cả</option>
                <option value="Đã ghi lời chúc">Đã ghi lời chúc</option>
                <option value="Chưa ghi lời chúc">Chưa ghi lời chúc</option>
                <option value="Đang soạn thảo">Đang soạn thảo</option>
              </select>
            </div>
          </div>

          {/* Member Table */}
          <div className="bg-white rounded-xl border border-outline-variant overflow-hidden shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-surface-container-low border-b border-outline-variant">
                <tr>
                  <th className="px-6 py-4 font-bold text-xs uppercase text-on-surface-variant">Member</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase text-on-surface-variant">Department</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase text-on-surface-variant">Status</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase text-on-surface-variant">Last Updated</th>
                  <th className="px-6 py-4 font-bold text-xs uppercase text-on-surface-variant text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className={`hover:bg-primary-fixed/20 transition-colors cursor-pointer ${
                      selectedMember && selectedMember.id === member.id ? 'bg-primary-fixed/40' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          alt={member.name}
                          className="w-10 h-10 rounded-full object-cover border border-outline-variant shrink-0"
                          src={member.avatar}
                        />
                        <div>
                          <p className="font-bold text-sm text-on-surface">{member.name}</p>
                          <p className="text-xs text-on-surface-variant">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant">{member.dept}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 w-fit ${
                        member.status === 'Đã ghi' 
                          ? 'bg-tertiary-container/20 text-tertiary' 
                          : member.status === 'Đang soạn'
                          ? 'bg-primary-container/20 text-primary'
                          : 'bg-surface-container-highest text-on-surface-variant'
                      }`}>
                        <span className="material-symbols-outlined text-[14px]">
                          {member.status === 'Đã ghi' ? 'check_circle' : member.status === 'Đang soạn' ? 'history_edu' : 'pending'}
                        </span>
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-on-surface-variant italic">{member.lastUpdated}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">
                          {member.status === 'Chưa ghi' ? 'add_comment' : 'edit'}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredMembers.length === 0 && (
              <div className="text-center py-10 text-on-surface-variant italic">
                Không tìm thấy thành viên phù hợp với bộ lọc.
              </div>
            )}
            
            <div className="p-4 border-t border-outline-variant flex justify-between items-center bg-surface-container-lowest text-xs text-on-surface-variant font-bold">
              <p>Hiển thị {filteredMembers.length} trong tổng số {members.length} thành viên</p>
              <div className="flex gap-2">
                <button className="p-2 rounded border border-outline-variant disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="p-2 rounded border border-outline-variant disabled:opacity-30" disabled>
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Selected Member Drawer (Right Side) */}
        {selectedMember && (
          <aside className="w-[450px] bg-white border-l border-outline-variant flex flex-col glass-panel shadow-2xl shrink-0 z-10">
            <div className="p-6 border-b border-outline-variant flex justify-between items-center">
              <h3 className="font-headline-md text-lg font-bold text-on-surface">Soạn lời chúc</h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
              {/* Member Summary */}
              <div className="flex items-center gap-4 bg-primary-fixed/20 p-4 rounded-xl border border-primary/20">
                <img
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                />
                <div>
                  <h4 className="font-headline-md text-lg font-bold text-primary">{selectedMember.name}</h4>
                  <p className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Tiểu ban {selectedMember.dept}</p>
                  <div className="flex gap-1 mt-2">
                    <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm text-tertiary" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="text-[10px] text-on-surface-variant ml-1 font-bold">Thành viên ưu tú</span>
                  </div>
                </div>
              </div>

              {/* Personalized Context */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined">lightbulb</span>
                  <h5 className="text-xs font-bold uppercase tracking-widest text-primary">Thông tin gợi ý</h5>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
                    <p className="text-[9px] text-on-surface-variant uppercase font-bold mb-1">Key Achievement</p>
                    <p className="text-xs font-bold text-on-surface">{selectedMember.achievement}</p>
                  </div>
                  <div className="bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
                    <p className="text-[9px] text-on-surface-variant uppercase font-bold mb-1">Specific Memory</p>
                    <p className="text-xs font-bold text-on-surface">{selectedMember.memory}</p>
                  </div>
                </div>
              </div>

              {/* Message Area */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Nội dung lời chúc vinh danh</label>
                <div className="border border-outline-variant rounded-xl overflow-hidden bg-white focus-within:border-primary transition-all shadow-sm">
                  <div className="flex items-center gap-1 p-2 border-b border-outline-variant bg-surface-container-low select-none">
                    <button className="p-1.5 hover:bg-surface-container-highest rounded"><span className="material-symbols-outlined text-lg">format_bold</span></button>
                    <button className="p-1.5 hover:bg-surface-container-highest rounded"><span className="material-symbols-outlined text-lg">format_italic</span></button>
                    <button className="p-1.5 hover:bg-surface-container-highest rounded"><span className="material-symbols-outlined text-lg">format_underlined</span></button>
                    <div className="w-px h-4 bg-outline-variant mx-1"></div>
                    <button className="p-1.5 hover:bg-surface-container-highest rounded"><span className="material-symbols-outlined text-lg">sentiment_satisfied</span></button>
                  </div>
                  <textarea
                    className="w-full h-48 p-4 border-none focus:ring-0 text-sm leading-relaxed placeholder-on-surface-variant/50 outline-none resize-none"
                    placeholder="Viết những lời chân thành dành cho thành viên..."
                    value={wishMsg}
                    onChange={(e) => setWishMsg(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-6 border-t border-outline-variant grid grid-cols-2 gap-4 bg-surface-container-lowest shrink-0">
              <button
                onClick={handleSaveDraft}
                className="py-3 px-4 border border-outline-variant rounded-lg font-bold text-sm text-on-surface hover:bg-surface-container transition-all active:scale-95"
              >
                Lưu bản nháp
              </button>
              <button
                onClick={handleSendWish}
                className="py-3 px-4 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-container transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-sm">send</span>
                Duyệt gửi
              </button>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
