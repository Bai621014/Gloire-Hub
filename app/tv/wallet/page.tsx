'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function WalletPage() {
  const [wallet, setWallet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const phone = localStorage.getItem('user_phone') || '237600000000';
    
    supabase.from('wallets').select('*').eq('user_phone', phone).single()
     .then(({ data }) => {
        if (!data) {
          supabase.from('wallets').insert({ user_phone: phone }).then(() => {
            setWallet({ gloire_balance: 100, cfa_balance: 0, auto_tithe: 0.10, auto_nation: 0.05, auto_saving: 0.20 });
            setLoading(false);
          });
        } else {
          setWallet(data);
          setLoading(false);
        }
      });
  }, []);

  if (loading) return <div className="bg-black min-h-screen text-white p-4">Chargement portefeuille...</div>;

  return (
    <div className="bg-gradient-to-b from-purple-900 to-black min-h-screen text-white p-4">
      <h1 className="text-2xl font-bold mb-6">💜 Portefeuille Royaume</h1>

      <div className="bg-purple-800 p-6 rounded-xl mb-6">
        <p className="text-sm opacity-80">Solde GloireCoin</p>
        <p className="text-4xl font-bold">{wallet?.gloire_balance || 0} GC</p>
        <p className="text-sm mt-2">≈ {(wallet?.gloire_balance || 0) * 100} FCFA</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-xl mb-4">
        <h3 className="font-bold mb-3">Répartition Automatique</h3>
        <p>Dîme: {(wallet?.auto_tithe || 0) * 100}% → Évangile 🙏🏿</p>
        <p>Nation: {(wallet?.auto_nation || 0) * 100}% → Tchad 🇹🇩</p>
        <p>Épargne: {(wallet?.auto_saving || 0) * 100}% → Toi 💎</p>
      </div>

      <button className="w-full bg-green-600 py-3 rounded-xl font-bold mb-3">
        Envoyer GloireCoin
      </button>
      
      <button className="w-full bg-blue-600 py-3 rounded-xl font-bold">
        Recharger en FCFA
      </button>
    </div>
  );
}
