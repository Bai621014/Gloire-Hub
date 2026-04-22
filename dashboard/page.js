  'use client'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <main style={{
      textAlign: 'center', minHeight: '100vh',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      color: 'white', padding: '40px', fontFamily: 'sans-serif'
    }}>
      <h1 style={{fontSize: '45px', textShadow: '0 0 15px #fff'}}>
        🙏 BIENVENUE DANS LA GLOIRE BOSS 🙏
      </h1>
      <p style={{fontSize: '22px', margin: '30px 0'}}>
        Tu as transformé 30s de scroll en 30 ans de destinée
      </p>
      <Link href="/" style={{
        display: 'inline-block', padding: '15px 30px', fontSize: '18px', 
        backgroundColor: '#FFD700', color: '#000', textDecoration: 'none',
        borderRadius: '50px', fontWeight: 'bold', marginTop: '20px'
      }}>
        ← Retour à l'accueil
      </Link>
    </main>
  )
}
