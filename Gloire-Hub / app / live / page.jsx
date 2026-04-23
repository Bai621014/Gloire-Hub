'use client'

export default function LivePage() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <a href="/" className="absolute top-4 left-4 bg-gray-800 px-4 py-2 rounded-lg hover:bg-gray-700">
        ← Retour
      </a>
      
      <div className="w-full max-w-4xl mt-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-red-500">
          🔴 LIVE PASTEUR CHRIS
        </h1>
        
        <div className="aspect-video w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl border-2 border-red-600">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/live_stream?channel=UCeDtr1HoZb7tWOVuRz8JwNg"
            title="Live Pasteur Chris Oyakhilome"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <a href="https://www.youtube.com/@PastorChrisLive" target="_blank" className="block text-center mt-6 text-yellow-400 hover:text-yellow-300 text-lg">
          Ouvrir sur YouTube →
        </a>
      </div>
    </main>
  )
}
