'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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
    supabase.from('live_channels').select('*').then(({ data }) => {
      if (data) {
        setChannels(data);
        setSelected(data.find(c => c.name.includes('Loveworld')) || data[0]);
      }
    });
  }, []);

  return (
    <div className="bg-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-4">📺 GloireHub TV + Radio</h1>

      <div className="mb-4">
        <button
          onClick={() => setAudioOnly(!audioOnly)}
          className="bg-purple-600 px-4 py-2 rounded-full"
        >
          {audioOnly? '🎥 Mode Vidéo' : '🎧 Mode Audio Sans Écran'}
        </button>
      </div>

      {selected && (
        <div className="mb-6">
          <h2 className="text-xl mb-2">{selected.name} {selected.is_official && '✅'}</h2>
          {audioOnly? (
            <audio controls autoPlay src={selected.audio_url} className="w-full" />
          ) : (
            <video controls autoPlay src={selected.stream_url} className="w-full rounded-lg" />
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
                {c.name} {c.is_official && '✅'}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
    }
