import { useState, useRef } from 'hono/jsx';
import { LucideIcon } from "../islands/lucide-icon"
import type { IconNode } from "lucide"


interface Position {
  x: number;
  y: number;
}

interface SocialLink {
  url: string;
  icon: IconNode;
  label: string;
}

interface CardRef extends HTMLDivElement {
  getBoundingClientRect(): DOMRect;
}

interface CardProps {
  // 表面の設定
  frontImageUrl?: string;
  frontTitle?: string;
  frontDescription?: string;
  frontHasHolographic?: boolean;
  socialLinks?: SocialLink[];
  
  // 裏面の設定
  backImageUrl?: string;
  backHasHolographic?: boolean;
}

export default function HolographicCard({
  frontImageUrl = "https://placehold.jp/540x860.png",
  frontTitle = "カードタイトル",
  frontDescription = "カードの説明文がここに入ります。このカードは特別な効果を持っています。",
  frontHasHolographic = true,
  socialLinks = [],
  backImageUrl = "https://placehold.jp/540x860.png",
  backHasHolographic = false,
}: CardProps) {
  // カードの回転状態を管理するstate
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotation, setRotation] = useState<Position>({ x: 0, y: 0 });
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [glowPosition, setGlowPosition] = useState<Position>({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  
  const cardRef = useRef<CardRef>(null);
  
  // マウス位置や傾きを更新する関数
  const updateCardTransform = (normalizedX: number, normalizedY: number) => {
    const rotX = (normalizedY - 0.5) * 20;
    const rotY = (0.5 - normalizedX) * 20;
    const glowX = normalizedX * 100;
    const glowY = normalizedY * 100;
    
    setRotation({ x: rotX, y: rotY });
    setGlowPosition({ x: glowX, y: glowY });
    setPosition({ x: normalizedX, y: normalizedY });
  };
  
  const handleMouseMove = (e: MouseEvent) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - rect.left) / rect.width;
    const normalizedY = (e.clientY - rect.top) / rect.height;
    
    updateCardTransform(normalizedX, normalizedY);
  };
  
  // タッチデバイス用のハンドラー
  const handleTouchMove = (e: TouchEvent) => {
    if (!cardRef.current || e.touches.length < 1) return;
    
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const normalizedX = (touch.clientX - rect.left) / rect.width;
    const normalizedY = (touch.clientY - rect.top) / rect.height;
    
    updateCardTransform(normalizedX, normalizedY);
  };
  
  // カードのクリック/タップでフリップする
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick();
    }
  };
  
  // ホバーとマウスリーブのハンドラー
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    // ホバー解除時に回転をリセット
    setIsHovering(false);
    setRotation({ x: 0, y: 0 });
    setGlowPosition({ x: 50, y: 50 });
  };
  
  // ホログラフィック効果のスタイル生成
  const getHolographicStyle = () => {
    const { x, y } = position;
    const saturation = 80 + x * 20; // 80-100%
    const lightness = 60 + y * 20;  // 60-80%
    
    return {
      background: `
        radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, 
          rgba(255, 255, 255, 0.8) 0%, 
          rgba(255, 255, 255, 0) 50%),
        linear-gradient(45deg, 
          hsl(0, ${saturation}%, ${lightness}%) 0%, 
          hsl(60, ${saturation}%, ${lightness}%) 20%, 
          hsl(120, ${saturation}%, ${lightness}%) 40%, 
          hsl(180, ${saturation}%, ${lightness}%) 60%, 
          hsl(240, ${saturation}%, ${lightness}%) 80%, 
          hsl(300, ${saturation}%, ${lightness}%) 100%)
      `,
      opacity: isHovering ? 1 : 0.5,
    };
  };
  
  return (
      <button 
        ref={cardRef}
        type="button"
        className="relative w-sm aspect-[27/43] rounded-lg cursor-pointer perspective-[1000px] border-0 bg-transparent p-0"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onClick={handleCardClick}
        onKeyPress={handleKeyPress}
        aria-label="クリックしてカードを裏返す"
      >
        <div 
          className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d"
          style={{
            transform: `rotateX(${isHovering ? rotation.x : 0}deg) rotateY(${isHovering ? rotation.y : 0}deg) ${isFlipped ? 'rotateY(180deg)' : ''}`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s ease'
          }}
        >
          {/* カード前面 */}
          <div 
            className="absolute w-full h-full overflow-hidden p-4 flex flex-col justify-between rounded-xl"
            style={{
              backfaceVisibility: 'hidden',
              transformStyle: 'preserve-3d',
              transform: 'translateZ(1px)',
              boxShadow: isHovering ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' : '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* カードのメインイメージ */}
            <div className="absolute inset-0 z-10">
              <img 
                src={frontImageUrl}
                alt="カード前面の画像" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 上部の情報エリア */}
            <div className="w-full p-4 border border-gray-700 z-30">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-xl font-bold">{frontTitle}</h2>
                <div className="flex space-x-2">
                  {socialLinks.map((link, index) => (
                    <a 
                      key={index}
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-white hover:text-yellow-300"
                      aria-label={link.label}
                    >
                      <div className="w-6 h-6" >
                        <LucideIcon icon={link.icon} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* 下部の情報エリア */}
            <div className="w-full p-4 border border-gray-700 z-30">
              <div className="text-white">
                <p className="text-sm">{frontDescription}</p>
              </div>
            </div>
            
            {/* ホログラフィックオーバーレイ */}
            {frontHasHolographic && (
              <div 
                className="absolute inset-0 opacity-50 transition-opacity duration-300 z-20 mix-blend-overlay"
                style={getHolographicStyle()}
              />
            )}
          </div>
          
          {/* カード裏面 */}
          <div 
            className="absolute w-full h-full rounded-xl"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              boxShadow: isHovering ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' : '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="flex h-full items-center justify-center">
              <img 
                src={backImageUrl}
                alt="カード裏面の画像" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            {/* 裏面のホログラフィックオーバーレイ */}
            {backHasHolographic && (
              <div 
                className="absolute inset-0 opacity-30 transition-opacity duration-300 mix-blend-overlay"
                style={getHolographicStyle()}
              />
            )}
          </div>
        </div>
      </button>
  );
}