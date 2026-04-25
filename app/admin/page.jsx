'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AdminPosteCommande() {
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);

  const chargerDemandes = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('demandes_mb')
      .select('*')
      .eq('statut', 'en_attente')
      .order('created_at', { ascending: false });
    setDemandes(data || []);
    setLoading(false);
  };

  useEffect(() => { chargerDemandes() }, []);

  const validerDemande = async (id, montant, email) => {
    await supabase.from('demandes_mb').update({ statut: 'valide' }).eq('id', id);
    await supabase.rpc('ajouter_solde_mb', { user_email: email, montant: montant });
    chargerDemandes();
    alert(`✅ ${montant} MB validés pour ${email}`);
  };

  const refuserDemande = async (id) => {
    await supabase.from('demandes_mb').update({ statut: 'refuse' }).eq('id', id);
    chargerDemandes();
    alert('❌ Demande refusée');
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <h1 className="text-3xl font-bold mb-6 text-yellow-400">👑 Poste de Commande Admin 5G</h1>
      
      {loading ? <p>Chargement des demandes...</p> : 
        demandes.length === 0 ? <p className="text-gray-400">Aucune demande en attente</p> :
        demandes.map((d) => (
          <div key={d.id} className="bg-gray-900 p-4 rounded-lg mb-4 border border-yellow-600">
            <p><strong>Email:</strong> {d.email}</p>
            <p><strong>Montant:</strong> {d.montant} MB</p>
            <p><strong>Référence:</strong> {d.reference_paiement}</p>
            <p><strong>Date:</strong> {new Date(d.created_at).toLocaleString()}</p>
            <div className="flex gap-2 mt-3">
              <button 
                onClick={() => validerDemande(d.id, d.montant, d.email)}
                className="bg-green-600 px-4 py-2 rounded font-bold">
                ✅ Valider
              </button>
              <button 
                onClick={() => refuserDemande(d.id)}
                className="bg-red-600 px-4 py-2 rounded font-bold">
                ❌ Refuser
              </button>
            </div>
          </div>
        ))
      }
    </div>
  );
          }
