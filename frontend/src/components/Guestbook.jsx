import React from 'react';
import { guestbookEntries } from '../data/content.js';

export default function Guestbook() {
  return (
    <section className="section guestbook-section" id="guestbook">
      <div className="guestbook-panel glass-card">
        <div>
          <p className="eyebrow">Sổ lưu bút</p>
          <h2>Gửi một lời chúc cho mùa thi</h2>
          <p>
            Khu vực này đã sẵn sàng để nối API Java backend ở giai đoạn sau.
            Hiện tại form giữ trạng thái giao diện FE.
          </p>
          <div className="entry-list">
            {guestbookEntries.map((entry) => (
              <span key={entry}>{entry}</span>
            ))}
          </div>
        </div>
        <form className="guestbook-form">
          <label>
            Họ tên
            <input type="text" placeholder="Nguyễn Văn A" />
          </label>
          <label>
            Lời chúc
            <textarea placeholder="Viết lời nhắn của bạn..." rows="5" />
          </label>
          <button className="button primary" type="button">
            Gửi lời chúc
          </button>
        </form>
      </div>
    </section>
  );
}
