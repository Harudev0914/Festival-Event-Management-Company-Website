"use client";

import * as React from "react";
import { Heading, Text, Button } from "./index";

const AVAILABLE_PACKAGES = [
  { id: 'standard', name: 'Standard' },
  { id: 'premium', name: 'Premium' },
  { id: 'custom', name: 'Custom' },
];

export const BookingForm = ({ type }: { type: 'rental' | 'event' }) => {
  const [selectedPackage, setSelectedPackage] = React.useState('standard');
  const [requests, setRequests] = React.useState('');
  const maxChars = 500;

  return (
    <div className="bg-secondary p-8 rounded-3xl border border-border space-y-6 max-w-2xl mx-auto">
      <Heading level={2}>{type === 'rental' ? '장비 렌탈 예약' : 'DJ 행사 의뢰'}</Heading>
      <Text variant="muted">상세 정보를 입력해 주시면 담당자가 확인 후 연락드립니다.</Text>
      
      <form className="space-y-4">
        {/* Package Selection */}
        <div>
          <label className="block text-sm font-bold text-zinc-400 mb-4">3. 상품 선택</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {AVAILABLE_PACKAGES.map((pkg) => (
              <button
                key={pkg.id}
                type="button"
                onClick={() => setSelectedPackage(pkg.id)}
                className={`p-4 border-b-2 text-left transition ${
                  selectedPackage === pkg.id
                    ? 'border-[#c84d4b] text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                {pkg.name}
              </button>
            ))}
          </div>
          <Text className="mt-2 text-xs">선택된 패키지: <span className="font-bold text-[#c84d4b] uppercase">{selectedPackage}</span></Text>
        </div>

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
          <div className="flex justify-between">
            <label className="text-sm font-medium text-zinc-400">추가 요청사항</label>
            <span className="text-xs text-zinc-500">{requests.length}/{maxChars}자</span>
          </div>
          <textarea 
            className="w-full bg-background border border-border rounded-xl px-4 py-3 h-32 focus:border-primary outline-none transition-all" 
            placeholder="원하시는 서비스 내용을 적어주세요."
            value={requests}
            onChange={(e) => setRequests(e.target.value.slice(0, maxChars))}
            maxLength={maxChars}
          />
        </div>

        <Button fullWidth variant="primary" className="mt-4 py-4 text-lg">
          {type === 'rental' ? '렌탈 예약하기' : '행사 의뢰하기'}
        </Button>
      </form>
    </div>
  );
};
