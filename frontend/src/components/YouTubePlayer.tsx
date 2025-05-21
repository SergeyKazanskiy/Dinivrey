import React from 'react';


type Props = {
  videoId: string;
  width?: string;
  height?: string;
};

const YouTubePlayer: React.FC<Props> = ({ videoId, width = '100%', height = '360px' }) => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, marginBottom: 10 }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width,
          height: '100%',
        }}
      />
    </div>
  );
};

export default YouTubePlayer;
