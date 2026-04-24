// FAKE SUPABASE GLOBAL - BOSS MODE ON - TUE TOUTES LES ERREURS
export const supabase = {
  from: () => ({
    select: () => ({
      order: () => Promise.resolve({ data: [], error: null }),
    }),
    insert: () => Promise.resolve({ data: null, error: null }),
    update: () => Promise.resolve({ data: null, error: null }),
    delete: () => Promise.resolve({ data: null, error: null }),
  }),
  auth: {
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  }
}
