import React from 'react';
import { members } from '../data/content.js';

export default function MemberWall() {
  return (
    <section className="section members-section" id="members">
      <div className="section-heading">
        <p className="eyebrow">Volunteer Profiles</p>
        <h2>Bức tường vinh danh thành viên</h2>
        <p>
          Những gương mặt đại diện cho tinh thần tận tâm, chủ động và tử tế của
          chiến dịch năm nay.
        </p>
      </div>
      <div className="members-grid">
        {members.map((member) => (
          <article className="member-card glass-card" key={member.name}>
            <div className="avatar">{member.initials}</div>
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
