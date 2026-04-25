'use client'
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminDashboard() {
  const [demandes, setDemandes] = useState([]);
  const [mode, setMode] = useState('manual');
  const ADMIN_PHONE = "+23563123519";

  useEffect(() => {
    loadDemandes();
    const channel = supabase
      .channel('gloire_to_data')
      .on('postgres_changes', {event: 'INSERT', schema: 'public', table: 'gloire_to_data'}, 
        payload => {
          setDemandes(prev => [payload.new, ...prev]);
          if (Notification.permission === 'granted') {
            new Notification('Nouvelle demande 5G !', {
              body: `${payload.new.mb_requested}MB pour ${payload.new.user_phone}`
            });
          }
        })
      .subscribe();
    return () => supabase.removeChannel(channel);
  }, []);

  const loadDemandes = async () => {
    const { data } = await supabase
      .from('gloire_to_data')
      .select('*')
      .order('created_at', {ascending: false});
    setDemandes(data || []);
  };

  const handleManualSend = async (id, phone, mb, operator) => {
    const confirm = window.confirm(`Boss, tu as envoyé ${mb}MB à ${phone} via ${operator} avec *176# ?`);
    if (!confirm) return;
    await supabase.from('gloire_to_data')
      .update({status: 'completed', admin_phone: ADMIN_PHONE})
      .eq('id', id);
    loadDemandes();
    alert('Marqué envoyé Boss ! Notification 5G partie 🙏🏿');
  };

  return (
    <div className="p-4 max-w-4xl mx-auto bg-black min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">👑 Dashboard Admin 5G</h1>
      
      <div className="mb-6 flex gap-4">
        <button onClick={() => setMode('manual')} 
          className={`p-3 rounded font-bold ${mode==='manual' ? 'bg-blue-600' : 'bg-gray-700'}`}>
          Mode Manuel 👨🏿‍💼
        </button>
        <button onClick={() => setMode('auto')} 
          className={`p-3 rounded font-bold ${mode==='auto' ? 'bg-green-600' : 'bg-gray-700'}`}>
          Mode Auto 5G ⚡ Bientôt
        </button>
      </div>

      <div className="space-y-3">
        {demandes.length === 0 && <p className="text-gray-500">Aucune demande 5G pour l'instant Boss</p>}
        {demandes.map((d) => (
          <div key={d.id} className="p-4 border-2 border-gray-700 rounded-lg bg-gray-900">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-xl text-yellow-400">{d.mb_requested}MB - {d.operator.toUpperCase()}</p>
                <p className="text-white font-bold">{d.user_phone}</p>
                <p className="text-sm text-gray-400">{d.gloire_spent} GloireCoin ≈ {d.fcfa_value} FCFA</p>
                <p className="text-xs text-gray-500">{new Date(d.created_at).toLocaleString('fr-FR')}</p>
              </div>
              <div>
                {d.status === 'pending' && (
                  <button onClick={() => handleManualSend(d.id, d.user_phone, d.mb_requested, d.operator)}
                    className="bg-green-600 p-3 rounded-lg font-bold">
                    J'ai envoyé ✅
                  </button>
                )}
                {d.status === 'completed' && (
                  <span className="text-green-400 font-bold text-lg">✅ Envoyé 5G</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
