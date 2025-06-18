import React from 'react';

const ingredientsData = [
  { emoji: '🍅', top: '15%', left: '20%', animationClass: '[animation:float1_10s_infinite_ease-in-out]' },
  { emoji: '🧀', top: '25%', left: '70%', animationClass: '[animation:float2_8s_infinite_ease-in-out]' },
  { emoji: '🧅', top: '65%', left: '10%', animationClass: '[animation:float3_12s_infinite_ease-in-out]' },
  { emoji: '🥩', top: '70%', left: '80%', animationClass: '[animation:float1_9s_infinite_ease-in-out]' },
  { emoji: '🌿', top: '45%', left: '45%', animationClass: '[animation:float2_11s_infinite_ease-in-out]' },
  { emoji: '🌶️', top: '80%', left: '55%', animationClass: '[animation:float3_7s_infinite_ease-in-out]' },
];

const FloatingIngredients = () => {
  return (
    <div className="relative aspect-video rounded-xl bg-teal-500/10 dark:bg-zinc-800/50 shadow-2xl overflow-hidden border border-white/5 backdrop-blur-sm">
      <div className="absolute inset-0">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-9xl opacity-10 dark:opacity-20 transform-gpu">🍲</div>
        </div>
        
        {ingredientsData.map((item, index) => (
          <span 
            key={index}
            className={`absolute text-4xl transform-gpu ${item.animationClass}`}
            style={{ 
              top: item.top, 
              left: item.left, 
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>
    </div>
  );
};

export default FloatingIngredients;