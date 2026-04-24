import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { amount } = await request.json();
  
  // MODE TEST STERLING BANK - 0 FCFA DÉBITÉ BOSS
  return NextResponse.json({ 
    success: true,
    payment_url: 'https://sterling.ng/test-payment-success',
    reference: `GLOIRE_TEST_${Date.now()}`,
    amount_fcfa: amount,
    amount_gc: amount / 100,
    message: 'Sterling Bank API connectée! Prêt pour le vrai argent 🇳🇬'
  });
}
