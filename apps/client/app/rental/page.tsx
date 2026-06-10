import { BookingForm } from "@repo/ui";

export default function RentalPage() {
  return (
    <div className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold font-display text-white">Rental Service</h1>
          <p className="text-zinc-400 text-lg">최고의 사운드를 위한 프리미엄 장비 렌탈</p>
        </div>
        
        <BookingForm type="rental" />
      </div>
    </div>
  );
}
