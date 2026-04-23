'use client'
import { useState } from 'react'

export default function Live() {
  const [activeTab, setActiveTab] = useState('chris')
  const [searchUrl, setSearchUrl] = useState('')
  const [embedLink, setEmbedLink] = useState('')

  const videos = {
    chris: {
      title: 'Pasteur Chris Live',
      id: 'UChS0sdIUQPEsyUOj6y_GUTg',
      type: 'channel'
    },
    idriss: {
      title: 'Idriss du Tchad',
      id: 'PLx0sYbCqOb8TBPRdmBHs5Iftvv9TPboYG',
      type: 'playlist'
    },
    gospel: {
      title: 'Louanges & Enseignements',
      id: 'PL5909A44EBA5E3E63',
      type: 'playlist'
    }
  }

  // Fonction pour convertir lien en embed
  const handleSearch = () => {
    let finalUrl = ''
    if (searchUrl.includes('youtube.com') || searchUrl.includes('youtu.be')) {
      const videoId = searchUrl.split('v=')[1]?.split('&')[0] || searchUrl.split('/').pop()
      finalUrl = `https://www.youtube.com/embed/${videoId}`
    } else if (searchUrl.includes('facebook.com')) {
      finalUrl = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(searchUrl)}`
    } else if (searchUrl.includes('tiktok.com')) {
      // TikTok bloque l'embed direct, on ouvre dans nouvel onglet
      window.open(searchUrl, '_blank')
      return
    } else {
      alert('Colle un lien YouTube ou Facebook valide Boss')
      return
    }
    setEmbedLink(finalUrl)
    setActiveTab('search')
  }

  const current = videos[activeTab]
  const defaultEmbed = current?.type === 'channel'
  ? `https://www.youtube.com/embed/live_stream?channel=${current.id}`
   : `https://www.youtube.com/embed/videoseries?list=${current?.id}`

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '15px' }}>
      <h1 style={{ textAlign: 'center', color: '#fbbf24', marginBottom: '15px' }}>
        GLOIRE-HUB TV 📺🔍
      </h1>

      {/* BARRE DE RECHERCHE */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          placeholder="Colle un lien YouTube, Facebook..."
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '8px',
            border: '1px solid #374151',
            background: '#1f2937',
            color: 'white'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            background: '#dc2626',
            color: 'white',
            border: 'none',
            padding: '0 15px',
            borderRadius: '8px',
            fontWeight: 'bold'
          }}
        >
          GO
        </button>
      </div>

      {/* MENU ONGLET */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '15px', overflowX: 'auto' }}>
        {Object.keys(videos).map(key => (
          <button
            key={key}
            onClick={() => {setActiveTab(key); setEmbedLink('')}}
            style={{
              padding: '8px 12px',
              background: activeTab === key &&!embedLink? '#dc2626' : '#374151',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontSize: '12px',
              whiteSpace: 'nowrap'
            }}
          >
            {videos[key].title}
          </button>
        ))}
        {embedLink && (
          <button style={{ padding: '8px 12px', background: '#dc2626', border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px' }}>
            Résultat
          </button>
        )}
      </div>

      {/* LECTEUR */}
      <iframe
        width="100%"
        height="250"
        src={embedLink || defaultEmbed}
        title="Gloire-Hub Player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: '10px', marginBottom: '15px' }}
      />

      {/* BOUTON TÉLÉCHARGER */}
      <div style={{ textAlign: 'center' }}>
        <a
          href={embedLink || defaultEmbed}
          target="_blank"
          style={{
            display: 'inline-block',
            background: '#16a34a',
            color: 'white',
            padding: '12px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          ⬇️ Ouvrir / Télécharger
        </a>
        <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '8px' }}>
          Pour télécharger : utilise le bouton + un site comme savefrom.net
        </p>
      </div>
    </div>
  );
      }
