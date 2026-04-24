'use client';
import { useEffect, useState } from 'react';

export default function WalletPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setWallet({ 
      gloire_balance: 100, 
      cfa_balance: 0, 
      auto_tithe: 0.10, 
      auto_nation: 0.05, 
      auto_saving: 0.20 
    });
  }, []);

  const handleRecharge = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sterling/pay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1000 }) // 1000 FCFA = 10 GC
      });
      const data = await res.json();
      
      if (data.success) {
        alert(`Sterling Bank prêt! Réf: ${data.reference}\n10 GC = 1000 FCFA`);
        window.location.href = data.payment_url;
      } else {
        alert('Erreur Sterling Bank');
      }
    } catch (error) {
      alert('Erreur connexion Sterling');
    }
    setLoading(false);
  };

  if (!wallet) {
    return (
      <div className="bg-black min-h-screen text-white p-4">
        <p>Chargement portefeuille...</p>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-purple-900 to-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-6">💜 Portefeuille Royaume</h1>

      <div className="bg-purple-800 p-6 rounded-xl mb-6">
        <p className="text-sm opacity-80">Solde GloireCoin</p>
        <p className="text-4xl font-bold">{wallet.gloire_balance} GC</p>
        <p className="text-sm mt-2">≈ {wallet.gloire_balance * 100} FCFA</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl mb-4">
        <h3 className="font-bold mb-3">Répartition Automatique</h3>
        <p>Dîme: {wallet.auto_tithe * 100}% → Évangile 🙏🏿</p>
        <p>Nation: {wallet.auto_nation * 100}% → Tchad 🇹🇩</p>
        <p>Épargne: {wallet.auto_saving * 100}% → Toi 💎</p>
      </div>

      <button className="w-full bg-green-600 py-3 rounded-xl font-bold mb-3">
        Envoyer GloireCoin
      </button>
      
      <button 
        onClick={handleRecharge}
        disabled={loading}
        className="w-full bg-blue-600 py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Connexion Sterling...' : 'Recharger en FCFA 🇳🇬'}
      </button>
    </div>
  );
}
