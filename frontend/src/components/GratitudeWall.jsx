import React from 'react';
import { gratitudeNotes } from '../data/content.js';

export default function GratitudeWall() {
  return (
    <section className="section gratitude-section" id="gratitude">
      <div className="section-heading narrow">
        <p className="eyebrow">Bức tường biết ơn</p>
        <h2>Lời cảm ơn được giữ lại</h2>
      </div>
      <div className="gratitude-grid">
        {gratitudeNotes.map((note) => (
          <article className="gratitude-card glass-card" key={note.author}>
            <p>{note.message}</p>
            <strong>{note.author}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
