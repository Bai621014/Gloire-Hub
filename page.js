'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [counter, setCounter] = useState(0)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('gloireCounter')
    if (saved) setCounter(parseInt(saved))
  }, [])

  const playAlleluia = () => {
    const audio = new Audio('https://www.soundjay.com/human/alleluia-chorus-01.mp3')
    audio.play()
    setIsClicked(true)
    const newCount = counter + 1
    setCounter(newCount)
    localStorage.setItem('gloireCounter', newCount.toString())
    setTimeout(() => setIsClicked(false), 300)
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', padding: '20px',
      fontFamily: 'sans-serif', textAlign: 'center'
    }}>
      <div style={{fontSize: '20px', marginBottom: '30px', opacity: 0.9}}>
        🙏 Déjà {counter} âmes touchées
      </div>
      <h1 style={{fontSize: '60px', fontWeight: 'bold', marginBottom: '20px',
        textShadow: '0 0 20px rgba(255,255,255,0.5)'}}>GLOIRE HUB</h1>
      <p style={{fontSize: '24px', marginBottom: '50px', opacity: 0.95}}>
        Chaque mot une parole de la vie divine
      </p>
      <div style={{fontSize: '18px', marginBottom: '50px', opacity: 0.8}}>
        V1 PAROLE DIVINE - N'Djamena 🇹🇩
      </div>
      <Link href="/dashboard" onClick={playAlleluia}>
        <button style={{
          padding: '25px 50px', fontSize: '24px', fontWeight: 'bold',
          backgroundColor: isClicked ? '#FFA500' : '#FFD700',
          color: '#000', border: 'none', borderRadius: '50px',
          cursor: 'pointer', transform: isClicked ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.2s', boxShadow: '0 10px 30px rgba(255,215,0,0.4)'
        }}>
          ENTRER DANS LA GLOIRE
        </button>
      </Link>
    </main>
  )
  }
