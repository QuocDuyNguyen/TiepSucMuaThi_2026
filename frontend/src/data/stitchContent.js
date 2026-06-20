export const routes = [
  { path: '/', label: 'Trang chủ', shortLabel: 'Home' },
  { path: '/khoanh-khac', label: 'Khoảnh khắc', shortLabel: 'Moments' },
  { path: '/thu-cam-on', label: 'Thư cảm ơn', shortLabel: 'Letter' },
  { path: '/loi-ket', label: 'Lời kết 2027', shortLabel: 'Finale' },
  { path: '/so-luu-but', label: 'Sổ lưu bút', shortLabel: 'Guestbook' },
  { path: '/biet-on', label: 'Tường biết ơn', shortLabel: 'Thanks' },
  { path: '/vinh-danh', label: 'Vinh danh', shortLabel: 'Members' },
];

export const stitchScreens = [
  { path: '/', title: 'Trang Chủ - Dấu Ấn Tiếp Sức 2026', stitchId: '9f292433a0af42938a6aa04be2de4165', height: 23420, components: ['Hero', 'Impact counters', 'Timeline', 'Featured moments', 'Gratitude preview', 'Member preview', 'CTA'] },
  { path: '/khoanh-khac', title: 'Khoảnh Khắc Kỷ Niệm 2026', stitchId: '11fd0406e3064088a85873e0a3b5465e', height: 11554, components: ['Editorial hero', 'Masonry gallery', 'Moment stories', 'Timeline highlights'] },
  { path: '/thu-cam-on', title: 'Thư Cảm Ơn Từ Ban Tổ Chức', stitchId: '3bccfffdb4224ac0b2eb43918a436d77', height: 6052, components: ['Formal letter', 'Signature card', 'Commitment cards', 'Supporter strip'] },
  { path: '/loi-ket', title: 'Lời Kết Trọn Vẹn - Hẹn Gặp Lại 2027', stitchId: '6fb961a5127d4aeaa5a2b7f8869b1627', height: 4362, components: ['Final hero', 'Recap numbers', 'Closing quote', '2027 CTA'] },
  { path: '/so-luu-but', title: 'Sổ Lưu Bút Tiếp Sức 2026', stitchId: '760df6c987ac432b83be3471eac3e66c', height: 8258, components: ['Guestbook hero', 'Entry form', 'Message wall', 'Prompt chips'] },
  { path: '/biet-on', title: 'Bức Tường Biết Ơn 2026', stitchId: '2f8aca2c014a497db885f2d98029ff55', height: 5234, components: ['Gratitude hero', 'Thank-you cards', 'Category chips', 'Featured note'] },
  { path: '/ho-so-thanh-vien', title: 'Hồ Sơ Thành Viên - Kỷ Niệm & Tri Ân', stitchId: 'd5cf868196b740edbf4e8f18cfaaa173', height: 7226, components: ['Profile hero', 'Contribution stats', 'Memory gallery', 'Personal timeline'] },
  { path: '/vinh-danh', title: 'Bức Tường Vinh Danh Thành Viên 2026', stitchId: 'e08fddf9c92f44a9a5837c0c3c8a6bb0', height: 4004, components: ['Member wall', 'Role filters', 'Spotlight member', 'Team grid'] },
];

export const impactStats = [
  { value: '1.250+', label: 'thí sinh được hỗ trợ', tone: 'blue' },
  { value: '180', label: 'tình nguyện viên trực chiến', tone: 'green' },
  { value: '42', label: 'điểm thi đồng hành', tone: 'gold' },
  { value: '18.600', label: 'chai nước và suất ăn', tone: 'blue' },
];

export const timeline = [
  { date: '03.06', title: 'Khởi động chiến dịch', detail: 'Tập huấn đội hình, phân bổ điểm thi và chuẩn hóa quy trình hỗ trợ thí sinh.' },
  { date: '24.06', title: 'Ngày cao điểm đầu tiên', detail: 'Các đội hình bắt đầu trực tại cổng trường, điểm giữ đồ và khu vực tư vấn.' },
  { date: '26.06', title: 'Tiếp sức trọn vẹn', detail: 'Lan tỏa tinh thần bình tĩnh, an toàn và tận tâm trong từng lượt hỗ trợ.' },
  { date: '30.06', title: 'Gửi lời cảm ơn', detail: 'Tổng hợp câu chuyện, hình ảnh và lời nhắn để lưu lại trong kỷ yếu số.' },
];

export const moments = [
  { title: 'Nụ cười trước giờ thi', category: 'Cổng trường', story: 'Một lời chúc bình tĩnh được gửi đi ngay trước lúc thí sinh bước vào phòng thi.', image: 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Đội hình áo xanh', category: 'Tình nguyện', story: 'Các ca trực nối tiếp nhau từ sáng sớm để giữ nhịp hỗ trợ ổn định tại điểm thi.', image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Góc tiếp nước', category: 'Hậu cần', story: 'Nước mát, bản đồ phòng thi và khu vực nghỉ chân được chuẩn bị trước giờ cao điểm.', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Những lời chúc nhỏ', category: 'Lưu bút', story: 'Các mẩu giấy chúc thi tốt trở thành kỷ niệm dịu dàng của mùa tiếp sức.', image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Phụ huynh an tâm', category: 'Đồng hành', story: 'Đội hình hướng dẫn khu vực chờ giúp phụ huynh theo dõi lịch thi rõ ràng hơn.', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Kết ca dưới nắng', category: 'Sau giờ thi', story: 'Những cái bắt tay và lời cảm ơn khép lại một buổi trực đáng nhớ.', image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80' },
];

export const gratitudeNotes = [
  { author: 'Ban Tổ Chức', role: 'Điều phối chiến dịch', message: 'Cảm ơn từng bạn tình nguyện viên đã chọn đứng dưới nắng để đổi lấy sự an tâm cho thí sinh.', tag: 'Tình nguyện viên' },
  { author: 'Phụ huynh thí sinh', role: 'Điểm thi THPT Nguyễn Du', message: 'Một chai nước, một lời chỉ đường và một nụ cười đã giúp gia đình tôi thấy nhẹ lòng hơn rất nhiều.', tag: 'Phụ huynh' },
  { author: 'Thí sinh 12A4', role: 'Môn Ngữ văn', message: 'Em sẽ nhớ mãi màu áo xanh ở cổng trường sáng hôm đó. Cảm ơn anh chị đã tiếp thêm tự tin.', tag: 'Thí sinh' },
  { author: 'Đội hậu cần', role: 'Kho nước và vật phẩm', message: 'Cảm ơn các điểm trực đã phối hợp nhịp nhàng để không bạn nào thiếu nước, áo mưa hay thông tin.', tag: 'Hậu cần' },
  { author: 'Cựu tình nguyện viên', role: 'Tiếp sức 2024', message: 'Nhìn thế hệ mới tiếp tục giữ ngọn lửa này, mình thấy mùa thi vẫn luôn có rất nhiều điều đẹp.', tag: 'Cựu thành viên' },
  { author: 'Giáo viên trực điểm', role: 'Hội đồng thi số 08', message: 'Sự chủ động của các bạn giúp khu vực cổng trường trật tự, an toàn và thân thiện hơn.', tag: 'Nhà trường' },
];

export const members = [
  { name: 'Minh Anh', role: 'Đội trưởng điều phối', initials: 'MA', hours: 42, point: 'THPT Nguyễn Du' },
  { name: 'Quang Huy', role: 'Phụ trách hậu cần', initials: 'QH', hours: 38, point: 'Kho trung tâm' },
  { name: 'Lan Chi', role: 'Truyền thông chiến dịch', initials: 'LC', hours: 35, point: 'Media team' },
  { name: 'Gia Bảo', role: 'Hỗ trợ thí sinh', initials: 'GB', hours: 31, point: 'THPT Gia Định' },
  { name: 'Thu Ngân', role: 'Điểm thi số 04', initials: 'TN', hours: 29, point: 'THCS Lê Lợi' },
  { name: 'Hoàng Nam', role: 'Đội phản ứng nhanh', initials: 'HN', hours: 40, point: 'Khu vực 2' },
  { name: 'Bảo Trâm', role: 'Chăm sóc phụ huynh', initials: 'BT', hours: 28, point: 'THPT Trưng Vương' },
  { name: 'Đức Phúc', role: 'An toàn giao thông', initials: 'ĐP', hours: 33, point: 'Nút giao số 5' },
];

export const guestbookEntries = [
  { name: 'Hà My', message: 'Hẹn gặp lại trong một mùa thi thật bình an và nhiều hy vọng.', time: '09:12' },
  { name: 'Đội hình 04', message: 'Tuổi trẻ đẹp nhất khi được đứng cạnh nhau để làm điều có ích.', time: '10:45' },
  { name: 'Anh Khoa', message: 'Mỗi điểm thi là một câu chuyện, mỗi tình nguyện viên là một dấu sáng.', time: '14:20' },
  { name: 'Mai Phương', message: 'Cảm ơn vì đã biến những ngày nắng nhất thành những ngày đáng nhớ nhất.', time: '17:05' },
];

export const adminRows = [
  { name: 'Minh Anh', role: 'Đội trưởng', status: 'Đã duyệt', wishes: 18 },
  { name: 'Quang Huy', role: 'Hậu cần', status: 'Đã duyệt', wishes: 12 },
  { name: 'Lan Chi', role: 'Truyền thông', status: 'Chờ cập nhật', wishes: 9 },
  { name: 'Gia Bảo', role: 'Hỗ trợ', status: 'Cần kiểm tra', wishes: 7 },
];
