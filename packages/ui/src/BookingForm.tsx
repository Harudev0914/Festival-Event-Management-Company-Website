"use client";

import * as React from "react";
import { Heading, Text, Button } from "./index";

export const BookingForm = ({ type }: { type: 'rental' | 'event' }) => {
  return (
    <div className="bg-secondary p-8 rounded-3xl border border-border space-y-6 max-w-2xl mx-auto">
      <Heading level={2}>{type === 'rental' ? '장비 렌탈 예약' : 'DJ 행사 의뢰'}</Heading>
      <Text variant="muted">상세 정보를 입력해 주시면 담당자가 확인 후 연락드립니다.</Text>
      
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">성함</label>
            <input className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="홍길동" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-400">연락처</label>
            <input className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="010-0000-0000" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">이메일</label>
          <input className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" placeholder="example@email.com" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">날짜 및 시간</label>
          <input type="datetime-local" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-400">추가 요청사항</label>
          <textarea className="w-full bg-background border border-border rounded-xl px-4 py-3 h-32 focus:border-primary outline-none transition-all" placeholder="원하시는 서비스 내용을 적어주세요." />
        </div>

        <Button fullWidth variant="primary" className="mt-4 py-4 text-lg">
          {type === 'rental' ? '렌탈 예약하기' : '행사 의뢰하기'}
        </Button>
      </form>
    </div>
  );
};
