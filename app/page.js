   'use client'
import { useEffect, useState } from 'react'

export default function Home() {
  const [clicked, setClicked] = useState(false)
  const [visites, setVisites] = useState(0)
  
  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/gloire-hub/ames')
      .then(res => res.json())
      .then(data => setVisites(data.value))
      .catch(() => setVisites(1))
  }, [])
  
  const playAlleluia = () => {
    setClicked(true)
    const audio = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_2b1b4b7b3e.mp3')
    audio.volume = 0.5
    audio.play()
    setTimeout(() => window.location.href = '/dashboard', 1000)
  }

  return (
    <main style={{
      textAlign: 'center', minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white', padding: '20px', fontFamily: 'sans-serif'
    }}>
      <h1 style={{
        fontSize: '50px', marginTop: '50px',
        animation: 'glow 2s ease-in-out infinite alternate',
        textShadow: '0 0 20px #fff'
      }}>GLOIRE HUB</h1>
      
      <p style={{fontSize: '18px', opacity: 0.9}}>
        🙏 Déjà {visites} âmes touchées par la Gloire
      </p>
      
      <p style={{fontSize: '20px', marginBottom: '40px'}}>
        Transformez 30s de scroll en 30 ans de destinée
      </p>
      
      <button 
        onClick={playAlleluia}
        style={{
          padding: '20px 40px', fontSize: '22px', 
          backgroundColor: clicked ? '#00ff00' : '#FFD700',
          color: '#000', border: 'none', borderRadius: '50px',
          cursor: 'pointer', fontWeight: 'bold',
          transform: clicked ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.3s ease',
          boxShadow: clicked ? '0 0 30px #00ff00' : '0 10px 30px rgba(0,0,0,0.3)',
          animation: clicked ? 'none' : 'pulse 1.5s infinite'
        }}
      >
        {clicked ? '🙏 ALLÉLUIA !!! 🙏' : 'ENTRER DANS LA GLOIRE'}
      </button>

      <style jsx>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes glow {
          from { text-shadow: 0 0 10px #fff, 0 0 20px #fff; }
          to { text-shadow: 0 0 20px #fff, 0 0 30px #FFD700; }
        }
      `}</style>
    </main>
  )
  }
