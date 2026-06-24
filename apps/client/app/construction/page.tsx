'use client';
import { useState, useEffect } from "react";
import { CheckCircle2, ChevronDown } from "lucide-react";

interface Question {
  _id: string;
  order: number;
  title: string;
  type: 'radio' | 'dropdown' | 'checkbox' | 'text';
  options: string[];
  isRequired: boolean;
}

export default function ConstructionPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/construction/questions')
      .then(res => res.json())
      .then(data => setQuestions(data.sort((a: Question, b: Question) => a.order - b.order)))
      .catch(err => console.error('Failed to fetch questions:', err));
  }, []);

  const updateAnswer = (questionId: string, val: string | string[]) => {
    setError(null);
    setAnswers(prev => ({ ...prev, [questionId]: val }));
  };

  const validateStep = (): boolean => {
    const q = questions[step];
    if (!q) return true;
    const answer = answers[q._id];
    return !q.isRequired || (Array.isArray(answer) ? answer.length > 0 : !!answer);
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setError(null);
      if (step < questions.length - 1) setStep(prev => prev + 1);
      else handleSubmit();
    } else {
      setError("필수 항목을 선택하거나 입력해주세요.");
    }
  };
  
  const handlePrevStep = () => { setError(null); if (step > 0) setStep(prev => prev - 1); };

  const handleSubmit = async () => {
    // Map internal answers to the structure expected by the backend
    const submissionData = {
      contactName: answers['contactName'],
      contactPhone: answers['contactPhone'],
      contactEmail: answers['contactEmail'],
      contactCompany: answers['contactCompany'],
      additionalNotes: answers['additionalNotes'],
      answers: {
        operatingStatus: answers[questions.find(q => q.title.includes('운영 상태'))?._id || 'none'],
        region: answers[questions.find(q => q.title.includes('지역'))?._id || 'none'],
        spaceType: answers[questions.find(q => q.title.includes('공간'))?._id || 'none'],
        spaceSize: answers[questions.find(q => q.title.includes('규모'))?._id || 'none'],
        ceilingHeight: answers[questions.find(q => q.title.includes('높이'))?._id || 'none'],
        musicPurposes: answers[questions.find(q => q.title.includes('목적'))?._id || 'none'] || [],
        desiredSound: answers[questions.find(q => q.title.includes('사운드'))?._id || 'none'],
        desiredEquipment: answers[questions.find(q => q.title.includes('장비'))?._id || 'none'] || [],
        equipmentStatus: answers[questions.find(q => q.title.includes('보유'))?._id || 'none'],
        interiorStage: answers[questions.find(q => q.title.includes('인테리어'))?._id || 'none'],
        preferredSchedule: answers[questions.find(q => q.title.includes('일정'))?._id || 'none'],
        budget: answers[questions.find(q => q.title.includes('예산'))?._id || 'none'],
      },
      attachedFiles: [] 
    };

    try {
      const response = await fetch('/api/construction/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error('Submission failed');
      
      setSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setError("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const renderQuestion = () => {
    const q = questions[step];
    if (!q) return null;

    const val = answers[q._id];

    switch(q.type) {
      case 'radio':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map(opt => (
              <button key={opt} type="button" onClick={() => updateAnswer(q._id, opt)} className={`p-4 text-left border rounded-sm ${val === opt ? 'border-[#c84d4b] bg-[#c84d4b]/10' : 'border-zinc-800 bg-zinc-900/50'}`}>
                {opt}
              </button>
            ))}
          </div>
        );
      case 'dropdown':
        return (
          <div className="relative">
            <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full bg-zinc-900 border border-zinc-700 p-4 flex justify-between rounded-sm">
              {val || "선택해 주세요"} <ChevronDown />
            </button>
            {dropdownOpen && (
              <div className="absolute z-10 w-full mt-2 bg-zinc-900 border border-zinc-700 p-2 grid grid-cols-2 gap-2">
                {q.options.map(opt => (
                  <button key={opt} type="button" onClick={() => {updateAnswer(q._id, opt); setDropdownOpen(false)}} className={`p-3 text-sm ${val === opt ? 'bg-[#c84d4b]' : ''}`}>{opt}</button>
                ))}
              </div>
            )}
          </div>
        );
      case 'checkbox':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {q.options.map(opt => {
              const isSelected = val?.includes(opt);
              return (
                <button key={opt} type="button" onClick={() => {
                  const current = val || [];
                  updateAnswer(q._id, isSelected ? current.filter((s: string) => s !== opt) : [...current, opt]);
                }} className={`p-4 text-left border rounded-sm ${isSelected ? 'border-[#c84d4b] bg-[#c84d4b]/10' : 'border-zinc-800'}`}>
                  {opt}
                </button>
              );
            })}
          </div>
        );
      case 'text':
        return <textarea className="w-full bg-zinc-900 border border-zinc-800 p-4 h-32" value={val || ''} onChange={e => updateAnswer(q._id, e.target.value)} />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <div className="max-w-4xl mx-auto bg-[#121212] p-8 border border-zinc-800 space-y-8 mt-10">
        {!submitted ? (
          <>
            <div className="h-1 bg-zinc-900"><div className="h-full bg-[#c84d4b] transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }}/></div>
            {questions[step] && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">{step + 1}. {questions[step].title}</h2>
                    {renderQuestion()}
                </div>
            )}
            {error && <p className="text-[#c84d4b] text-sm font-bold text-center">{error}</p>}
            <div className="flex justify-between pt-8 border-t border-zinc-800">
              <button type="button" onClick={handlePrevStep} disabled={step === 0} className="px-6 py-3 bg-zinc-900 border border-zinc-800 disabled:opacity-50">이전</button>
              <button type="button" onClick={handleNextStep} className="px-6 py-3 bg-[#c84d4b]">{step === questions.length - 1 ? "상담 신청하기" : "다음"}</button>
            </div>
          </>
        ) : (
          <div className="text-center py-20"><CheckCircle2 size={64} className="mx-auto text-[#c84d4b] mb-4" /><h2 className="text-2xl font-bold">신청 완료</h2></div>
        )}
      </div>
    </div>
  );
}
