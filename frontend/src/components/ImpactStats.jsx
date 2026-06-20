import React from 'react';
import { impactStats } from '../data/content.js';

export default function ImpactStats() {
  return (
    <section className="section impact-section" id="impact">
      <div className="section-heading">
        <p className="eyebrow">Numbers of Impact</p>
        <h2>Những con số biết nói</h2>
        <p>
          Tổng hợp nhanh các dấu mốc nổi bật trong hành trình Tiếp Sức Mùa Thi
          2026.
        </p>
      </div>
      <div className="stats-grid">
        {impactStats.map((stat) => (
          <article className={`stat-card glass-card tone-${stat.tone}`} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
