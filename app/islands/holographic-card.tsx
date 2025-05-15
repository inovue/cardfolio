import { useState, useRef, useEffect } from 'hono/jsx';

interface Position {
  x: number;
  y: number;
}

interface CardRef extends HTMLDivElement {
  getBoundingClientRect(): DOMRect;
}

export default function HolographicCard() {
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
          className="relative w-full h-full transition-transform duration-500 transform-style-preserve-3d overflow-hidden"
          style={{
            transform: `rotateX(${isHovering ? rotation.x : 0}deg) rotateY(${isHovering ? rotation.y : 0}deg) ${isFlipped ? 'rotateY(180deg)' : ''}`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.5s ease'
          }}
        >
          {/* カード前面 */}
          <div 
            className="absolute w-full h-full overflow-hidden backface-hidden p-4 flex flex-col justify-between"
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
                src="https://placehold.jp/540x860.png" 
                alt="カード前面の画像" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* 上部の情報エリア */}
            <div className="w-full p-4 border border-gray-700 z-30">
              <div className="flex justify-between items-center">
                <h2 className="text-white text-xl font-bold">カードタイトル</h2>
                <div className="flex space-x-2">
                  <a 
                    href="https://twitter.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-white hover:text-yellow-300"
                    aria-label="Twitterで共有"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img">
                      <title>Twitter</title>
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* 下部の情報エリア */}
            <div className="w-full p-4 border border-gray-700 z-30">
              <div className="text-white">
                <p className="text-sm">カードの説明文がここに入ります。このカードは特別な効果を持っています。</p>
              </div>
            </div>
            
            {/* ホログラフィックオーバーレイ */}
            <div 
              className="absolute inset-0 opacity-50 transition-opacity duration-300 z-20 mix-blend-overlay"
              style={getHolographicStyle()}
            />
          </div>
          
          {/* カード裏面 */}
          <div 
            className="absolute w-full h-full rounded-xl border-2 border-yellow-300 bg-red-600 backface-hidden"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(1px)',
              boxShadow: isHovering ? '0 25px 50px -12px rgba(0, 0, 0, 0.6)' : '0 10px 15px -3px rgba(0, 0, 0, 0.3)'
            }}
          >
            <div className="flex h-full items-center justify-center">
              <img 
                src="https://placehold.jp/540x860.png" 
                alt="カード裏面の画像" 
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            
            {/* 裏面のホログラフィックオーバーレイ */}
            <div 
              className="absolute inset-0 opacity-30 transition-opacity duration-300 mix-blend-overlay"
              style={getHolographicStyle()}
            />
          </div>
        </div>
      </button>
  );
}