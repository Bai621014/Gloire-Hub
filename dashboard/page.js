'use client'
import Link from 'next/link'

export default function Dashboard() {
  return (
    <main style={{
      textAlign: 'center', 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
      color: 'white', 
      padding: '40px',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{fontSize: '45px', textShadow: '0 0 15px #fff'}}>
        🙏 BIENVENUE DANS LA GLOIRE BOSS 🙏
      </h1>
      
      <p style={{fontSize: '22px', margin: '30px 0'}}>
        Tu as transformé 30s de scroll en 30 ans de destinée
      </p>
      
      <div style={{
        background: 'rgba(255,255,255,0.1)', 
        padding: '20px', 
        borderRadius: '20px',
        margin: '30px auto',
        maxWidth: '500px'
      }}>
        <h2>🎉 Prophétie du jour :</h2>
        <p style={{fontSize: '18px'}}>
          "Celui qui entre dans la Gloire avec foi, ressort avec des templates prophétiques prêts à poster"
        </p>
      </div>

      <Link href="/" style={{
        display: 'inline-block',
        padding: '15px 30px', 
        fontSize: '18px', 
        backgroundColor: '#FFD700',
        color: '#000',
        textDecoration: 'none',
        borderRadius: '50px',
        fontWeight: 'bold',
        marginTop: '20px'
      }}>
        ← Retour à l'accueil
      </Link>
    </main>
  )
          }
