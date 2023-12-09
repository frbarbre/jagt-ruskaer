import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Link from 'next/link';

export default async function ActivityPage({ params }) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const routes = ['jagt', 'flugtskydning', 'hundetraening', 'riffelskydning'];

  const category =
    params.activity === 'hundetraening' ? 'hundetræning' : params.activity;

  if (!routes.includes(params.activity)) {
    return (
      <div className="mx-auto w-max flex gap-4 mt-8 flex-col items-center">
        <p className="text-[28px] font-semibold">Siden findes ikke😥</p>
        <Link href="/">
          <Button>Til forsiden</Button>
        </Link>
      </div>
    );
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data, error } = await supabase
    .from('messages')
    .select('*, author:profiles(*)')
    .eq('category', category)
    .order('created_at', { ascending: false });
  if (error) {
    console.log(error);
  }
  console.log(data);

  async function insertMessage(FormData) {
    'use server';
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const user_id = FormData.get('user_id');

    const { error } = await supabase
      .from('messages')
      .delete()
      .eq('id', '504645a1-6c31-4c9f-8658-6e5d0fb09cc2');
    if (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Activity page</h1>
      <p>Activity id: {params.activity}</p>
      <form action={insertMessage}>
        <input type="hidden" name="user_id" value={session?.user?.id} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
