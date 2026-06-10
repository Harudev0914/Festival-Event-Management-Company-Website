"use client";

import * as React from "react";
import { Heading, Text, Button } from "./index";

export const MenuManager = ({ 
  initialConfig, 
  onSave 
}: { 
  initialConfig: Record<string, boolean>; 
  onSave: (config: Record<string, boolean>) => void 
}) => {
  const [config, setConfig] = React.useState(initialConfig);

  const menuLabels: Record<string, string> = {
    about: "소개",
    howToUse: "이용방법",
    rental: "렌탈",
    construction: "시공",
    portfolio: "포트폴리오",
    magazine: "매거진"
  };

  const handleToggle = (key: string) => {
    setConfig(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="bg-secondary p-8 rounded-3xl border border-border space-y-8 max-w-3xl mx-auto">
      <div>
        <Heading level={2}>메뉴 가시성 관리</Heading>
        <Text variant="muted">클라이언트 화면에 노출할 메뉴를 선택해 주세요.</Text>
      </div>

      <div className="space-y-4">
        {Object.keys(menuLabels).map((key) => (
          <div key={key} className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-border">
            <div>
              <span className="text-white font-medium text-lg">{menuLabels[key]}</span>
              <p className="text-zinc-500 text-sm">메뉴 활성화 시 사용자 화면에 노출됩니다.</p>
            </div>
            
            {/* Toggle Switch UI */}
            <button
              onClick={() => handleToggle(key)}
              className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                config[key] ? 'bg-primary' : 'bg-zinc-700'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                  config[key] ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" onClick={() => setConfig(initialConfig)}>초기화</Button>
        <Button variant="primary" onClick={() => onSave(config)}>설정 저장하기</Button>
      </div>
    </div>
  );
};
