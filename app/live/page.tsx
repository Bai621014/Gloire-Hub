"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Radio } from "lucide-react"

export default function LivePage() {
  const [isLive, setIsLive] = useState(true)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        
        <Link href="/" className="inline-flex items-center gap-2 text-yellow-400 mb-8 hover:text-yellow-300">
          <ArrowLeft size={20} />
          Retour à l'accueil
        </Link>

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Radio className="text-red-500 animate-pulse" size={32} />
            <h1 className="text-4xl md:text-6xl font-bold text-yellow-400">
              LIVE GLOIRE
            </h1>
          </div>
          <p className="text-xl text-purple-200">
            Enseignements de Pasteur Chris Oyakhilome en direct
          </p>
        </div>

        {isLive ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-red-600 text-white px-4 py-2 rounded-t-lg inline-flex items-center gap-2 animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full"></div>
              EN DIRECT MAINTENANT
            </div>
            
            <div className="aspect-video bg-black rounded-b-lg overflow-hidden border-4 border-yellow-400">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/live_stream?channel=UCLcR9Lq6Z-w0_Rr4P-e9_2g&autoplay=1" 
                title="Pasteur Chris Live" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            <div className="mt-6 text-center">
              <p className="text-lg text-purple-200 mb-4">
                🔥 Reçois la parole qui transforme les vies 🔥
              </p>
              <a 
                href="https://www.youtube.com/@PastorChrisLive" 
                target="_blank"
                className="inline-block bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-bold"
              >
                S'abonner sur YouTube
              </a>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto text-center bg-black/30 p-8 rounded-xl border border-yellow-400">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Pas de direct pour l'instant
            </h2>
            <p className="text-purple-200 mb-6">
              Le prochain culte commence bientôt. En attendant, regarde les rediffusions :
            </p>
            <a 
              href="https://www.youtube.com/@PastorChrisLive" 
              target="_blank"
              className="inline-block bg-yellow-500 hover:bg-yellow-600 text-black px-6 py-3 rounded-full font-bold"
            >
              Voir les vidéos
            </a>
          </div>
        )}

      </div>
    </div>
  )
                }
