import React from 'react';

const SplineBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-purple-900/30" />
      <iframe
        src='https://my.spline.design/chips-ddc8679ecfa68ba9902a1cc9d602a737/'
        frameBorder='0'
        width='100%'
        height='100%'
        title="3D Animation Background"
        className="w-full h-full object-cover"
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          mixBlendMode: 'screen',
          transform: 'scale(1.5)',
          minHeight: '100vh'
        }}
      />
    </div>
  );
};

export default SplineBackground; 