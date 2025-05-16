import { useState, useRef } from 'hono/jsx';


interface Position {
  x: number;
  y: number;
}

interface SocialLink {
  url: string;
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
        className="relative w-[calc(100dvw-2rem)] max-w-sm aspect-[27/43] rounded-lg perspective-[1000px] border-0 bg-transparent p-0"
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
            className="absolute w-full h-full overflow-hidden p-8 flex flex-col justify-between rounded-xl"
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
            
            {/* Social Links */}
            <div class="flex flex-col gap-2 absolute top-[5.5rem] right-[2rem] z-30 opacity-90">
              {socialLinks.map((link) => (
                <a 
                  href={link.url} 
                  key={`social-link-${link.url}`} 
                  className="btn btn-circle btn-neutral p-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512" aria-label={link.label || "Social link"}>
                    <title>{link.label || "Social link"}</title>
                    <path fill="currentColor" d="M389.2 48h70.6L305.6 224.2L487 464H345L233.7 318.6L106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9zm-24.8 373.8h39.1L151.1 88h-42z" />
                  </svg>
                </a>
              ))}
            </div>
            
            {/* 上部の情報エリア */}
            <div className="w-full border-2 border-gray-800/70 z-30 bg-black/50 px-4 py-1 rounded-lg">
              <h2 className="text-white text-lg tracking-tight font-bold">{frontTitle}</h2>                
            </div>

            
            {/* 下部の情報エリア */}
            <div className="w-full border-2 border-gray-800/70 z-30 text-white whitespace-pre-wrap break-words text-left bg-black/50 p-4 rounded-lg leading-tight text-sm sm:text-base">
                {frontDescription}
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