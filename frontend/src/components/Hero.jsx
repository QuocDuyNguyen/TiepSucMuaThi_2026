import React from 'react';

export default function Hero() {
  return (
    <section className="hero-section" id="top">
      <div className="hero-media" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1800&q=85"
          alt=""
        />
      </div>
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">Tiếp Sức Mùa Thi 2026</p>
        <h1>Dấu ấn áo xanh trong mùa thi của hy vọng</h1>
        <p className="hero-copy">
          Lưu giữ khoảnh khắc, lời tri ân và những câu chuyện đẹp của đội hình
          tình nguyện đã đồng hành cùng thí sinh trên từng điểm thi.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#moments">
            Xem khoảnh khắc
          </a>
          <a className="button secondary" href="#gratitude">
            Đọc lời cảm ơn
          </a>
        </div>
      </div>
      <div className="hero-card glass-card">
        <span className="card-kicker">Dấu ấn nổi bật</span>
        <strong>42 điểm thi</strong>
        <p>Được phủ sóng bởi các đội hình tiếp sức, hậu cần và phản ứng nhanh.</p>
      </div>
    </section>
  );
}
