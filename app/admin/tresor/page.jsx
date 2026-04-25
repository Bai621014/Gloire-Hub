'use client'
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function TresorPage() {
  const [totaux, setTotaux] = useState({ dime: 0, epargne: 0, nation: 0 });
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTotaux();
    fetchTransactions();
    const channel = supabase
      .channel('tresor-royal')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'tresor_royal' }, () => {
        fetchTotaux();
        fetchTransactions();
      })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const fetchTotaux = async () => {
    const { data } = await supabase.from('tresor_royal').select('type_transaction, montant_gloire');
    if (data) {
      const dime = data.filter(t => t.type_transaction === 'dime').reduce((sum, t) => sum + t.montant_gloire, 0);
      const epargne = data.filter(t => t.type_transaction === 'epargne').reduce((sum, t) => sum + t.montant_gloire, 0);
      const nation = data.filter(t => t.type_transaction === 'nation').reduce((sum, t) => sum + t.montant_gloire, 0);
      setTotaux({ dime, epargne, nation });
    }
  };

  const fetchTransactions = async () => {
    const { data } = await supabase.from('tresor_royal').select('*').order('created_at', { ascending: false }).limit(20);
    setTransactions(data || []);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">💎 Trésor Royal 5G</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-purple-900/50 p-6 rounded-lg border border-purple-500">
          <p className="text-sm text-purple-300">DÎME 10%</p>
          <p className="text-3xl font-bold text-purple-400">{totaux.dime.toFixed(2)}</p>
          <p className="text-xs text-gray-400">GloireCoin pour Dieu 🙏🏿</p>
        </div>
        <div className="bg-green-900/50 p-6 rounded-lg border border-green-500">
          <p className="text-sm text-green-300">ÉPARGNE 5%</p>
          <p className="text-3xl font-bold text-green-400">{totaux.epargne.toFixed(2)}</p>
          <p className="text-xs text-gray-400">GloireCoin Royaume 💰</p>
        </div>
        <div className="bg-blue-900/50 p-6 rounded-lg border border-blue-500">
          <p className="text-sm text-blue-300">NATION TCHAD 5%</p>
          <p className="text-3xl font-bold text-blue-400">{totaux.nation.toFixed(2)}</p>
          <p className="text-xs text-gray-400">GloireCoin pour le Tchad 🇹🇩</p>
        </div>
      </div>

      <h2 className="text-xl font-bold mb-4">📜 Dernières Transactions</h2>
      <div className="space-y-2">
        {transactions.map((t) => (
          <div key={t.id} className="bg-gray-900 p-3 rounded border border-gray-700 text-sm">
            <span className={`font-bold ${
              t.type_transaction === 'dime' ? 'text-purple-400' : 
              t.type_transaction === 'epargne' ? 'text-green-400' : 'text-blue-400'
            }`}>
              {t.type_transaction.toUpperCase()}
            </span>
            <span className="ml-2">{t.montant_gloire} GloireCoin</span>
            <span className="ml-2 text-gray-400">({t.user_phone})</span>
            <span className="float-right text-gray-500">{new Date(t.created_at).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
