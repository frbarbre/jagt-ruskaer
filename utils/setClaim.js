export async function setClaim({ router, supabase, uid, claim, value }) {
  // Runs set_claim function from SupaBase, which sets a claim for a user
  const { data, error } = await supabase.rpc('set_claim', {
    uid,
    claim,
    value,
  });
  console.log(error ?? data);
  // Updates the user's isSuperAdmin value in the database
  if (claim === 'claims_admin') {
    await supabase
      .from('profiles')
      .update({ isSuperAdmin: value })
      .eq('id', uid);
  }
  if (claim === 'userrole') {
    await supabase.from('profiles').update({ role: value }).eq('id', uid);
  }
  // Refreshes the page
  router.refresh();
  return { data, error };
}
