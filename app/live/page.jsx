'use client'
import { useState, useEffect } from 'react'

// FAKE SUPABASE BOSS - BYPASS POUR DEPLOY
const supabase = {
  from: (table) => ({
    select: (columns) => ({
      order: (col, options) => Promise.resolve({
        data: [],
        error: null
      }),
    }),
    insert: (data) => Promise.resolve({
      data: null,
      error: null
    }),
  }),
}

export default function Live() {
  const [activeTab, setActiveTab] = useState('chris')
  const [searchUrl, setSearchUrl] = useState('')
  const [embedLink, setEmbedLink] = useState('')
  const [userVideos, setUserVideos] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ titre: '', lien: '', whatsapp: '' })

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
      title: 'Louanges',
      id: 'PL5909A44EBA5E3E63',
      type: 'playlist'
    },
    pubs: {
      title: 'Pubs du Tchad 🇹🇩',
      type: 'custom'
    }
  }

  // Charger les vidéos des users
  useEffect(() => {
    fetchVideos()
  }, [])

  async function fetchVideos() {
    const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false })
    setUserVideos(data || [])
  }

  // Ajouter une vidéo
  async function addVideo(e) {
    e.preventDefault()
    if (!formData.titre ||!formData.lien) return alert('Titre + Lien obligatoires Boss')

    await supabase.from('videos').insert([formData])
    setFormData({ titre: '', lien: '', whatsapp: '' })
    setShowForm(false)
    fetchVideos()
    alert('Vidéo ajoutée Boss!!! 🙏')
  }

  // Recherche
  const handleSearch = () => {
    if (!searchUrl) return
    if (searchUrl.includes('youtube.com/watch?v=') || searchUrl.includes('youtu.be/')) {
      const videoId = searchUrl.split('v=')[1]?.split('&')[0] || searchUrl.split('/').pop()
      setEmbedLink(`https://www.youtube.com/embed/${videoId}`)
      setActiveTab('search')
    } else if (searchUrl.includes('facebook.com')) {
      setEmbedLink(`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(searchUrl)}`)
      setActiveTab('search')
    } else {
      window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchUrl)}`, '_blank')
      setSearchUrl('')
    }
  }

  // Convertir lien YouTube en embed
  const getYouTubeEmbed = (url) => {
    const videoId = url.split('v=')[1]?.split('&')[0] || url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}`
  }

  const current = videos[activeTab]
  const defaultEmbed = current?.type === 'channel'
? `https://www.youtube.com/embed/live_stream?channel=${current.id}`
   : current?.type === 'playlist'? `https://www.youtube.com/embed/videoseries?list=${current?.id}` : ''

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '15px' }}>
      <h1 style={{ textAlign: 'center', color: '#fbbf24', marginBottom: '15px' }}>
        GLOIRE-HUB TV 📺🔍
      </h1>

      {/* BARRE RECHERCHE + BOUTON AJOUTER */}
      <div style={{ marginBottom: '15px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Rechercher ou coller lien YouTube..."
          value={searchUrl}
          onChange={(e) => setSearchUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          style={{ flex: 1, minWidth: '200px', padding: '12px', borderRadius: '10px', border: '1px solid #374151', background: '#1f2937', color: 'white' }}
        />
        <button onClick={handleSearch} style={{ background: '#dc2626', color: 'white', border: 'none', padding: '0 15px', borderRadius: '10px', fontWeight: 'bold' }}>
          GO
        </button>
        <button onClick={() => setShowForm(!showForm)} style={{ background: '#16a34a', color: 'white', border: 'none', padding: '0 15px', borderRadius: '10px', fontWeight: 'bold' }}>
          + Ajouter Pub
        </button>
      </div>

      {/* FORMULAIRE AJOUT VIDÉO BOSS */}
      {showForm && (
        <form onSubmit={addVideo} style={{ background: '#1f2937', padding: '15px', borderRadius: '10px', marginBottom: '15px' }}>
          <h3 style={{ marginTop: 0, color: '#fbbf24' }}>Ajouter ta Vidéo/Pub Boss 🙏</h3>
          <input placeholder="Titre: Vente iPhone 13" value={formData.titre} onChange={(e) => setFormData({...formData, titre: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '8px', borderRadius: '6px', border: 'none' }} />
          <input placeholder="Lien YouTube ou Facebook" value={formData.lien} onChange={(e) => setFormData({...formData, lien: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '8px', borderRadius: '6px', border: 'none' }} />
          <input placeholder="WhatsApp: +235..." value={formData.whatsapp} onChange={(e) => setFormData({...formData, whatsapp: e.target.value})} style={{ width: '100%', padding: '10px', marginBottom: '8px', borderRadius: '6px', border: 'none' }} />
          <button type="submit" style={{ background: '#dc2626', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '6px', fontWeight: 'bold', width: '100%' }}>
            Publier sur Gloire-Hub
          </button>
        </form>
      )}

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
      </div>

      {/* SI ONGLET PUBS → AFFICHER LES VIDÉOS DES USERS */}
      {activeTab === 'pubs'? (
        <div style={{ display: 'grid', gap: '15px' }}>
          {userVideos.length === 0 && <p style={{ textAlign: 'center', color: '#9ca3af' }}>Aucune pub encore. Sois le premier Boss!</p>}
          {userVideos.map(video => (
            <div key={video.id} style={{ background: '#1f2937', padding: '10px', borderRadius: '10px' }}>
              <h4 style={{ margin: '0 0 8px 0', color: '#fbbf24' }}>{video.titre}</h4>
              <iframe width="100%" height="200" src={getYouTubeEmbed(video.lien)} style={{ borderRadius: '8px' }} allowFullScreen />
              {video.whatsapp && (
                <a href={`https://wa.me/${video.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" style={{ display: 'inline-block', background: '#16a34a', color: 'white', padding: '8px 12px', borderRadius: '6px', textDecoration: 'none', marginTop: '8px', fontSize: '14px' }}>
                  📱 Contacter WhatsApp
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* LECTEUR NORMAL */}
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
        </>
      )}
    </div>
  );
}
