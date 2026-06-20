import React from 'react';
import { moments } from '../data/content.js';

export default function MomentGallery() {
  return (
    <section className="section moments-section" id="moments">
      <div className="section-heading">
        <p className="eyebrow">Moment Gallery</p>
        <h2>Khoảnh khắc kỷ niệm 2026</h2>
        <p>
          Không khí tại điểm thi, nụ cười tình nguyện viên và những chi tiết nhỏ
          làm nên một mùa tiếp sức đáng nhớ.
        </p>
      </div>
      <div className="masonry-grid">
        {moments.map((moment, index) => (
          <article className={`moment-card span-${(index % 3) + 1}`} key={moment.title}>
            <img src={moment.image} alt={moment.title} />
            <div className="moment-caption">
              <span>{moment.category}</span>
              <h3>{moment.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
