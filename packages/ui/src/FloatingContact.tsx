"use client";

import * as React from "react";

export const FloatingContact = () => {
  return (
    <a
      href="https://pf.kakao.com/_YOUR_CHANNEL_ID" // 카카오톡 채널 링크로 변경 필요
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.5)] overflow-hidden hover:scale-110 transition-transform duration-300"
    >
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDmlmBoGk4Jy5Xzri2P3Os-BtZEBDulGqg_g&s" 
        alt="KakaoTalk Channel"
        className="w-full h-full object-cover"
      />
    </a>
  );
};
