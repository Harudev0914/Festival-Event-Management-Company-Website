import * as React from "react";

// 1. Base Typography Components
export * from "./Navbar";
export * from "./BookingForm";
export * from "./MenuManager";
export * from "./FloatingContact";
export * from "./AnimatedCounter";
export * from "./CountdownTimer";
export * from "./BannerCarousel";
export * from "./CustomCursor";
export const Heading = ({ children, level = 1, className = "" }: { children: React.ReactNode; level?: 1|2|3|4; className?: string }) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const sizes = {
    1: "text-4xl md:text-6xl font-bold tracking-tighter font-display text-white",
    2: "text-3xl md:text-4xl font-bold tracking-tight font-display text-white",
    3: "text-xl md:text-2xl font-semibold text-white",
    4: "text-lg font-medium text-zinc-300",
  };
  return <Tag className={`${sizes[level]} ${className}`}>{children}</Tag>;
};

export const Text = ({ children, className = "", variant = "body" }: { children: React.ReactNode; className?: string; variant?: "body" | "muted" | "small" }) => {
  const styles = {
    body: "text-zinc-300 leading-relaxed",
    muted: "text-zinc-500",
    small: "text-sm text-zinc-400",
  };
  return <p className={`${styles[variant]} ${className}`}>{children}</p>;
};

// 2. High-Impact Button
export const Button = ({ 
  children, 
  onClick, 
  variant = "primary",
  fullWidth = false,
  className = ""
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: "primary" | "secondary" | "outline" | "ghost";
  fullWidth?: boolean;
  className?: string;
}) => {
  const baseStyles = "px-6 py-3 rounded-full font-medium transition-all active:scale-95 flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-primary text-white hover:bg-opacity-90 shadow-[0_0_20px_rgba(139,92,246,0.3)]",
    secondary: "bg-secondary text-white hover:bg-muted",
    outline: "border border-zinc-700 text-white hover:bg-zinc-800",
    ghost: "text-zinc-400 hover:text-white hover:bg-zinc-800",
  };
  
  return (
    <button 
      onClick={onClick} 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </button>
  );
};

// 3. Dark Themed Card (for Events/Equipment)
export const Card = ({ title, subtitle, imageUrl, price, children }: { 
  title: string; 
  subtitle?: string; 
  imageUrl?: string; 
  price?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="bg-secondary rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-colors group">
      {imageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <Heading level={3}>{title}</Heading>
            {subtitle && <Text variant="muted">{subtitle}</Text>}
          </div>
          {price && <div className="text-primary font-bold text-xl">{price}</div>}
        </div>
        {children}
      </div>
    </div>
  );
};
