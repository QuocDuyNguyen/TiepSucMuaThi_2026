import React from 'react';
import { timeline } from '../data/content.js';

export default function Timeline() {
  return (
    <section className="section timeline-section">
      <div className="section-heading narrow">
        <p className="eyebrow">Hành trình</p>
        <h2>Từ ngày khởi động đến lời hẹn 2027</h2>
      </div>
      <div className="timeline">
        {timeline.map((item) => (
          <article className="timeline-item" key={item.title}>
            <div className="timeline-date">{item.date}</div>
            <div className="timeline-content glass-card">
              <h3>{item.title}</h3>
              <p>{item.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
