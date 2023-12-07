'use client';

import { createClient } from '@/utils/supabase/client';

export default function Payment() {
  const supabase = createClient();
  let clients = [];
  let price = 0;
  let activityId = '';
  let user = null;

  if (typeof window !== 'undefined') {
    clients = JSON.parse(localStorage.getItem('currentClients'));
    price = localStorage.getItem('currentPrice');
    activityId = localStorage.getItem('currentActivityId');
    user = localStorage.getItem('currentUser');
  }

  async function onSubmit() {
    const { error } = await supabase.from('registrations').insert({
      activity_id: activityId,
      user_id: user,
      dogs: clients[0].dogs,
      participants: clients.length,
      total_price: price,
    });
    if (error) {
      console.log(error);
    } else {
      localStorage.removeItem('currentClients');
      localStorage.removeItem('currentPrice');
      localStorage.removeItem('currentActivityId');
      localStorage.removeItem('currentUser');
    }
  }

  return (
    <div>
      <h1 onClick={onSubmit}>Payment</h1>
    </div>
  );
}
