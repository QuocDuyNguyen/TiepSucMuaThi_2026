import React from 'react';

export default function LetterScreen({ onNavigate }) {
  return (
    <div className="w-full bg-surface text-on-surface font-body-md overflow-x-hidden pt-24 pb-section-gap">
      <style>{`
        .glass-panel {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow: 0 40px 60px 0 rgba(0, 136, 255, 0.08);
        }
        .paper-texture {
          background-image: radial-gradient(circle at 100% 150%, #f4fafd 24%, #eef5f7 24%, #eef5f7 28%, #f4fafd 28%, #f4fafd 36%, #eef5f7 36%, #eef5f7 40%, #f4fafd 40%);
          background-size: 20px 20px;
        }
        .drop-cap::first-letter {
          font-family: 'Be Vietnam Pro', sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          float: left;
          line-height: 0.85;
          padding-right: 8px;
          color: #005baf;
        }
      `}</style>

      {/* Letter Container */}
      <div className="max-w-[900px] mx-auto px-margin-mobile md:px-0">
        
        {/* Letterhead */}
        <header className="text-center mb-20 space-y-6">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-primary text-5xl">volunteer_activism</span>
            </div>
          </div>
          <h2 className="font-display-lg text-4xl md:text-5xl font-extrabold text-primary">Thư Cảm Ơn Tập Thể</h2>
          <div className="flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-outline-variant"></span>
            <p className="font-label-sm text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant">Ban Tổ Chức Chiến Dịch Tiếp Sức Mùa Thi 2026</p>
            <span className="h-px w-12 bg-outline-variant"></span>
          </div>
          <p className="font-body-md text-sm italic text-on-surface-variant">Hà Nội, ngày 15 tháng 07 năm 2026</p>
        </header>

        {/* Letter Content */}
        <article className="glass-panel rounded-[2rem] p-10 md:p-20 relative overflow-hidden border border-white/60 shadow-xl">
          <div className="absolute top-0 right-0 p-8 opacity-10 select-none">
            <span className="material-symbols-outlined text-[120px] text-secondary">format_quote</span>
          </div>
          <div className="space-y-8 relative z-10 text-on-surface text-lg leading-relaxed">
            <p className="drop-cap">
              Thân gửi tất cả các bạn tình nguyện viên, những "người hùng thầm lặng" của mùa hè rực rỡ năm nay. Khi những tiếng trống trường cuối cùng đã lắng lại và cánh cửa đại học đang dần mở ra cho hàng triệu thí sinh, chúng tôi - Ban Tổ Chức - mới thực sự có một khoảng lặng để viết những dòng tri ân sâu sắc nhất gửi đến các bạn.
            </p>
            <p>
              Suốt chặng đường vừa qua, chúng ta đã cùng nhau vượt qua cái nóng oi ả của mùa hè, những cơn mưa rào bất chợt, và cả những áp lực vô hình từ trách nhiệm. Các bạn đã không quản ngại gian khó, có mặt tại mọi điểm trường từ sáng sớm tinh sương đến khi phố xá đã lên đèn.
            </p>

            {/* Impact Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
              <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl text-center border border-white shadow-sm">
                <h4 className="font-display-lg text-4xl font-extrabold text-primary mb-1">120K+</h4>
                <p className="font-label-sm text-xs text-on-surface-variant font-bold">Thí sinh được hỗ trợ</p>
              </div>
              <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl text-center border border-white shadow-sm">
                <h4 className="font-display-lg text-4xl font-extrabold text-secondary mb-1">500+</h4>
                <p className="font-label-sm text-xs text-on-surface-variant font-bold">Điểm thi an toàn</p>
              </div>
              <div className="p-6 bg-white/60 backdrop-blur-md rounded-2xl text-center border border-white shadow-sm">
                <h4 className="font-display-lg text-4xl font-extrabold text-tertiary mb-1">1.5M</h4>
                <p className="font-label-sm text-xs text-on-surface-variant font-bold">Bữa ăn &amp; nước uống</p>
              </div>
            </div>

            <p>
              Giá trị của các bạn không chỉ nằm ở những con số ấn tượng phía trên, mà còn ở nụ cười khích lệ dành cho những thí sinh đang lo lắng, ở sự chu đáo khi hướng dẫn phụ huynh chỗ nghỉ ngơi, hay cái nắm tay tiếp thêm động lực cho các sĩ tử bước vào phòng thi. Đó là những khoảnh khắc đẹp nhất của tuổi trẻ - một tuổi trẻ cống hiến và tràn đầy lòng nhân ái.
            </p>
            <p>
              Thay mặt Ban Tổ Chức và Trung ương Đoàn TNCS Hồ Chí Minh, tôi xin gửi lời cảm ơn chân thành và niềm tự hào lớn lao đến từng cá nhân đã góp phần làm nên thành công của "Tiếp Sức Mùa Thi 2026". Chúc các bạn luôn giữ vững ngọn lửa nhiệt huyết này trong mọi hành trình sắp tới của cuộc đời.
            </p>
          </div>

          {/* Signature Section */}
          <footer className="mt-20 flex flex-col items-end text-right">
            <div className="space-y-4">
              <p className="font-body-md text-sm font-semibold text-on-surface-variant">Trân trọng,</p>
              <div className="py-4 select-none">
                <img
                  alt="Signature"
                  className="h-16 ml-auto mix-blend-multiply opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm4TGg2nwCSvz2tbfn6uTTZd96PpdwTv8kfW7zERoQkVTTtvjiof--MpYX2Uu0sOAeCmWXinNCVc3raF7meTFvpOZIEB2OvLBv0lNJ1iOaqUGKIDnn5rrNOTlwin0qO_AkMFdtwReeCXC5bfJt-7q0Kb_VRE-bDEymUb31qswEVdUvRpBybXd43xahXeHRHuLII3hAlmecYcCEaauTmfmpiT8yUWaUK39ERmFgcNOI1k2X2s1Z5Om4"
                />
              </div>
              <div>
                <p className="font-headline-md text-xl font-bold text-primary">Nguyễn Minh Hoàng</p>
                <p className="text-xs text-on-surface-variant">Trưởng Ban Tổ Chức Chương Trình</p>
                <p className="text-xs text-on-surface-variant">Trung ương Đoàn TNCS Hồ Chí Minh</p>
              </div>
            </div>
          </footer>
        </article>

        {/* Personal Notes Section */}
        <section className="mt-section-gap space-y-12">
          <div className="text-center">
            <h3 className="font-headline-lg text-3xl font-bold text-on-surface">Lời Nhắn Nhủ Từ Trái Tim</h3>
            <p className="font-body-md text-on-surface-variant max-w-xl mx-auto mt-4">
              Những lời cảm ơn riêng biệt dành cho từng tiểu ban đã cùng nhau tạo nên kỳ tích.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Message Card 1 */}
            <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border border-white/60">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-secondary text-3xl">directions_bus</span>
                <h4 className="font-headline-md text-lg font-bold text-on-surface">Tiểu ban Giao thông</h4>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                "Cảm ơn các bạn đã không ngại nắng bụi, túc trực tại các nút giao thông để đảm bảo không một thí sinh nào bị muộn giờ thi. Sự kỷ luật của các bạn là xương sống của chương trình."
              </p>
            </div>
            {/* Message Card 2 */}
            <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border border-white/60">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">restaurant_menu</span>
                <h4 className="font-headline-md text-lg font-bold text-on-surface">Tiểu ban Hậu cần</h4>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                "Những suất cơm nóng hổi và chai nước mát giữa trưa nắng là nguồn năng lượng quý giá. Sự tận tụy của các bạn đã chăm sóc tốt nhất cho sức khỏe của toàn đội ngũ."
              </p>
            </div>
            {/* Message Card 3 */}
            <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border border-white/60">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-tertiary text-3xl">campaign</span>
                <h4 className="font-headline-md text-lg font-bold text-on-surface">Tiểu ban Truyền thông</h4>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                "Cảm ơn những đôi mắt tinh tường đằng sau ống kính. Các bạn đã lưu giữ những khoảnh khắc xúc động nhất, giúp lan tỏa tinh thần tình nguyện đến hàng triệu trái tim."
              </p>
            </div>
            {/* Message Card 4 */}
            <div className="glass-panel p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 border border-white/60">
              <div className="flex items-center gap-4 mb-6">
                <span className="material-symbols-outlined text-error text-3xl">medical_services</span>
                <h4 className="font-headline-md text-lg font-bold text-on-surface">Tiểu ban Y tế</h4>
              </div>
              <p className="font-body-md text-sm text-on-surface-variant leading-relaxed">
                "Sự có mặt kịp thời và chuyên nghiệp của các bạn đã mang lại sự an tâm tuyệt đối cho thí sinh và phụ huynh trong suốt những ngày thi căng thẳng."
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
