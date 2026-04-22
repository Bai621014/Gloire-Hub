'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [compteur, setCompteur] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('gloireHubCompteur')
    if (saved) setCompteur(parseInt(saved))
  }, [])

  const handleClick = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/273/273-preview.mp3')
    audio.play()
    const nouveauCompteur = compteur + 1
    setCompteur(nouveauCompteur)
    localStorage.setItem('gloireHubCompteur', nouveauCompteur.toString())
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 300)
    setTimeout(() => window.location.href = '/dashboard', 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white">
      <div className="absolute top-6 left-6 bg-black/30 px-4 py-2 rounded-full">
        🙏 Déjà {compteur} âmes touchées
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <h1 className="text-5xl md:text-7xl font-black mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          GLOIRE HUB
        </h1>
        <p className="text-xl mb-12 text-gray-300">
          Chaque mot une parole de la vie divine
        </p>
        <button
          onClick={handleClick}
          className={`bg-gradient-to-r from-yellow-500 to-orange-600 px-12 py-6 rounded-2xl text-2xl font-bold shadow-2xl transition-all ${
            isAnimating ? 'scale-95 bg-orange-700' : 'hover:scale-105'
          }`}
        >
          ENTRER DANS LA GLOIRE
        </button>
        <div className="mt-8 text-sm text-gray-400">V1 PAROLE DIVINE - N'Djamena 🇹🇩</div>
      </div>
    </div>
  )
    }
