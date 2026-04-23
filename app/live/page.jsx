export default function Live() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '10px'
    }}>
      <iframe 
        width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/live_stream?channel=UChS0sdIUQPEsyUOj6y_GUTg&autoplay=1" 
        title="Pasteur Chris Live"
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowFullScreen
        style={{ maxWidth: '560px', borderRadius: '10px' }}
      />
    </div>
  );
}
