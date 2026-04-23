
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [compteur, setCompteur] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('gloire-compteur')
    if (saved) setCompteur(parseInt(saved))
  }, [])

  const handleClick = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3')
    audio.play()
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 500)
    const nouveauCompteur = compteur + 1
    setCompteur(nouveauCompteur)
    localStorage.setItem('gloire-compteur', nouveauCompteur.toString())
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-4 text-yellow-400 drop-shadow-lg">
          GLOIRE-HUB
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-purple-200">
          Pasteur Chris Oyakhilome
        </p>
        
        <div className="mb-8">
          <div className="text-6xl md:text-8xl font-bold mb-2 text-yellow-300">
            {compteur}
          </div>
          <p className="text-lg text-purple-300">Gloire à Dieu !!!</p>
        </div>

        <button
          onClick={handleClick}
          className={`bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-xl shadow-lg transition-all duration-200 ${
            isAnimating ? 'scale-95' : 'scale-100 hover:scale-105'
          }`}
        >
          ENTRER DANS LA GLOIRE
        </button>

        <Link 
          href="/live"
          className="block w-full max-w-xs mx-auto mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform hover:scale-105 text-center"
        >
          🔴 REGARDER LE LIVE
        </Link>

        <div className="mt-8 text-sm text-purple-400">
          <p>Appuie sur le bouton pour glorifier Dieu</p>
          <p className="mt-2">Chaque clic = 1 gloire rendue au Seigneur</p>
        </div>
      </div>
    </main>
  )
}
