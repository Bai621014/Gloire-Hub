'use client';
import { useEffect, useState } from 'react';

type Channel = {
  id: number;
  name: string;
  type: string;
  stream_url: string;
  audio_url: string;
  is_official: boolean;
  country: string;
};

export default function LiveTVPage() {
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selected, setSelected] = useState<Channel | null>(null);
  const [audioOnly, setAudioOnly] = useState(false);

  useEffect(() => {
    // VERSION OFFLINE - CHAINES MOCK BOSS!!!
    const mockChannels: Channel[] = [
      {
        id: 1,
        name: 'Loveworld TV ✅',
        type: 'evangile',
        stream_url: 'https://example.com/loveworld.m3u8',
        audio_url: 'https://example.com/loveworld.mp3',
        is_official: true,
        country: 'NG'
      },
      {
        id: 2,
        name: 'GloireHub Radio',
        type: 'local',
        stream_url: 'https://example.com/gloire.m3u8',
        audio_url: 'https://example.com/gloire.mp3',
        is_official: true,
        country: 'TD'
      },
      {
        id: 3,
        name: 'BBC World',
        type: 'international',
        stream_url: 'https://example.com/bbc.m3u8',
        audio_url: 'https://example.com/bbc.mp3',
        is_official: false,
        country: 'UK'
      },
      {
        id: 4,
        name: 'ONRTV Tchad',
        type: 'gouvernement',
        stream_url: 'https://example.com/onrtv.m3u8',
        audio_url: 'https://example.com/onrtv.mp3',
        is_official: true,
        country: 'TD'
      }
    ];

    setChannels(mockChannels);
    setSelected(mockChannels[0]);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-4">📺 GloireHub TV + Radio</h1>

      <div className="mb-4 flex gap-3">
        <button
          onClick={() => setAudioOnly(!audioOnly)}
          className="bg-purple-600 px-4 py-2 rounded-full font-bold"
        >
          {audioOnly? '🎥 Mode Vidéo' : '🎧 Mode Audio Sans Écran'}
        </button>
        <a href="/tv/wallet" className="bg-green-600 px-4 py-2 rounded-full font-bold">
          💜 100 GC
        </a>
      </div>

      {selected && (
        <div className="mb-6 bg-gray-900 p-4 rounded-xl">
          <h2 className="text-xl mb-2">{selected.name}</h2>
          {audioOnly? (
            <audio controls src={selected.audio_url} className="w-full" />
          ) : (
            <video controls src={selected.stream_url} className="w-full rounded-lg bg-black h-48" poster="https://placehold.co/640x360/000000/FFFFFF?text=GloireHub+TV" />
          )}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {['evangile', 'international', 'local', 'gouvernement'].map(type => (
          <div key={type}>
            <h3 className="font-bold mb-2 capitalize">{type}</h3>
            {channels.filter(c => c.type === type).map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`block w-full text-left p-2 mb-1 rounded ${selected?.id === c.id? 'bg-purple-600' : 'bg-gray-800'}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
