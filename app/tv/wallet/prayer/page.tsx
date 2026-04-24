'use client';
import { useState } from 'react';

export default function CallRoom() {
  const [roomType, setRoomType] = useState<'video' | 'audio' | 'prayer'>('prayer');

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-6">🙏🏿 Prière Room</h1>

      <div className="grid grid-cols-3 gap-2 mb-6">
        <button 
          onClick={() => setRoomType('prayer')} 
          className={`p-3 rounded text-sm ${roomType==='prayer'?'bg-purple-600':'bg-gray-800'}`}
        >
          Prière 1000
        </button>
        <button 
          onClick={() => setRoomType('audio')} 
          className={`p-3 rounded text-sm ${roomType==='audio'?'bg-purple-600':'bg-gray-800'}`}
        >
          Audio Groupe
        </button>
        <button 
          onClick={() => setRoomType('video')} 
          className={`p-3 rounded text-sm ${roomType==='video'?'bg-purple-600':'bg-gray-800'}`}
        >
          Vidéo 10
        </button>
      </div>

      <div className="bg-gray-800 p-6 rounded-xl text-center">
        {roomType === 'prayer' && <>
          <h2 className="text-xl mb-4">🔥 Appel Prophétique Audio</h2>
          <p className="mb-4">1 Pasteur → 1000 Fidèles en audio seul</p>
          <p className="text-green-400 text-sm mb-2">0 Lag • 5Mo/heure • Mode 2G ✅</p>
          <p className="text-yellow-400 text-xs mb-4">Parfait pour le Tchad rural</p>
          <button className="bg-purple-600 px-6 py-3 rounded-full mt-4 w-full">
            Rejoindre la Prière Live
          </button>
        </>}

        {roomType === 'audio' && <>
          <h2 className="text-xl mb-4">🎙️ Conférence Audio</h2>
          <p className="mb-2">Jusqu'à 50 personnes • Qualité voix HD</p>
          <p className="text-green-400 text-sm mb-4">Consomme 10x moins que WhatsApp</p>
          <button className="bg-blue-600 px-6 py-3 rounded-full mt-4 w-full">
            Créer Salle Audio
          </button>
        </>}

        {roomType === 'video' && <>
          <h2 className="text-xl mb-4">📹 Appel Vidéo</h2>
          <p className="mb-2">Jusqu'à 10 personnes • 480p pour économiser</p>
          <p className="text-green-400 text-sm mb-4">Optimisé connexion lente</p>
          <button className="bg-red-600 px-6 py-3 rounded-full mt-4 w-full">
            Démarrer Vidéo
          </button>
        </>}
      </div>

      <div className="mt-6 bg-purple-900 p-4 rounded-xl">
        <h3 className="font-bold mb-2">💜 Verset du Jour</h3>
        <p className="text-sm italic">
          "Là où deux ou trois sont assemblés en mon nom, je suis au milieu d'eux." - Matthieu 18:20
        </p>
      </div>
    </div>
  );
}
