'use client'
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ExchangePage() {
  const [rates, setRates] = useState([]);
  const [selected, setSelected] = useState(null);
  const [operator, setOperator] = useState('airtel');
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(false);
  const userPhone = "+23563123519"; // TEST BOSS - Remplace après

  useEffect(() => {
    loadRates();
    loadBalance();
  }, []);

  const loadRates = async () => {
    const { data } = await supabase.from('gloire_rates').select('*').order('mb_amount');
    setRates(data || []);
  };

  const loadBalance = async () => {
    const { data } = await supabase
      .from('wallets')
      .select('gloire_balance')
      .eq('user_phone', userPhone)
      .single();
    setBalance(data?.gloire_balance || 0);
  };

  const handleExchange = async () => {
    if (!selected) return alert('Choisis un forfait Boss');
    if (balance < selected.gloire_cost) return alert('GloireCoin insuffisant 😭');

    setLoading(true);
    const { error } = await supabase.from('gloire_to_data').insert({
      user_phone: userPhone,
      operator: operator,
      mb_requested: selected.mb_amount,
      gloire_spent: selected.gloire_cost,
      fcfa_value: selected.fcfa_cost
    });

    setLoading(false);
    if (error) return alert('Erreur: ' + error.message);
    
    alert(`Succès Boss ! ${selected.mb_amount}MB en cours d'envoi. Capture WhatsApp dans 5min 🙏🏿`);
    loadBalance();
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-black min-h-screen text-white">
      <h1 className="text-2xl font-bold mb-4">📱 GloireCoin → Internet</h1>
      <p className="mb-4">Solde: <span className="font-bold text-yellow-400">{balance} GloireCoin</span></p>

      <div className="mb-4">
        <label className="block mb-2">Opérateur:</label>
        <select value={operator} onChange={(e) => setOperator(e.target.value)} 
          className="w-full p-3 border rounded bg-gray-800 text-white">
          <option value="airtel">Airtel Tchad</option>
          <option value="moov">Moov Africa</option>
        </select>
      </div>

      <div className="space-y-3 mb-6">
        {rates.map((rate) => (
          <div key={rate.mb_amount} onClick={() => setSelected(rate)} 
            className={`p-4 border-2 rounded cursor-pointer ${
              selected?.mb_amount === rate.mb_amount ? 'border-yellow-400 bg-gray-800' : 'border-gray-700'
            }`}>
            <div className="flex justify-between">
              <span className="font-bold text-lg">{rate.mb_amount} MB</span>
              <span className="text-yellow-400 font-bold">{rate.gloire_cost} GloireCoin</span>
            </div>
            <p className="text-sm text-gray-400">≈ {rate.fcfa_cost} FCFA</p>
          </div>
        ))}
      </div>

      <button onClick={handleExchange} disabled={loading || !selected}
        className="w-full bg-green-600 text-white p-4 rounded-lg font-bold text-lg disabled:bg-gray-600">
        {loading ? 'Traitement...' : 'Échanger Maintenant 🙏🏿'}
      </button>

      <p className="text-xs mt-4 text-center text-gray-500">
        GloireCoin débité instant. Admin envoie MB + capture WhatsApp
      </p>
    </div>
  );
      }
