import React from 'react';
import { Reveal } from '../Reveal';
import { MaskText } from '../MaskText';
import { project } from '../../data/project';

const notes = [
{
  title: 'TRIẾT LÝ',
  body: 'Không gian được kiến tạo quanh sự tĩnh tại: ít chi tiết hơn, nhiều ánh sáng và khoảng thở hơn.'
},
{
  title: 'RIÊNG TƯ',
  body: 'Lối tiếp cận, thang máy và không gian sinh hoạt được tổ chức để bảo vệ sự riêng tư của chủ nhân.'
},
{
  title: 'VỊ THẾ',
  body: `Toạ lạc tại ${project.location} — kết nối trọn vẹn nhưng tách biệt khỏi sự ồn ào.`
},
{
  title: 'GIÁ TRỊ',
  body: 'Vật liệu, kiến trúc và số lượng giới hạn tạo nên giá trị được giữ gìn theo thời gian.'
}];


export function Introduction() {
  return (
    <section id="introduction" className="bg-ink px-4 py-24 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-[1400px]">
        <Reveal>
          <p className="eyebrow text-champagne">The property experience</p>
        </Reveal>

        <MaskText
          text="KHÔNG CHỈ LÀ MỘT NƠI Ở. ĐÓ LÀ TUYÊN NGÔN VỀ PHONG CÁCH SỐNG."
          className="display mt-8 max-w-[18ch] text-[clamp(36px,6vw,90px)] text-warmwhite" />
        

        <div className="mt-20 grid gap-x-8 gap-y-12 border-t border-white/10 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          {notes.map((note, index) =>
          <Reveal key={note.title} delay={index * 0.06} className="flex h-full flex-col">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">{note.title}</p>
              <p className="mt-4 text-[15px] leading-relaxed text-white/70">{note.body}</p>
            </Reveal>
          )}
        </div>
      </div>
    </section>);

}