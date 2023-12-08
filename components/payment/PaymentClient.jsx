'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Box from '../shared/Box';
import { Button } from '../ui/button';
import { ArrowLeft, CalendarPlus, CreditCard } from 'lucide-react';
import Heading from '../shared/Heading';
import PayMethods from '@/components/payment/PayMethods';
import PayDetails from '@/components/payment/PayDetails';

export default function PaymentClient({
  currentUserActivityRegistrations,
  searchParams,
}) {
  const supabase = createClient();
  let clients = [];
  let price = 0;
  let activityId = '';
  let user = null;

  function addSecondsToCurrentTime(seconds) {
    const currentTime = new Date().getTime();
    const futureTime = currentTime + seconds * 1000;
    return new Date(futureTime);
  }

  const [currentTime, setCurrentTime] = useState(new Date());
  const [expireDate, setExpireDate] = useState(addSecondsToCurrentTime(60));
  const [payMethod, setPayMethod] = useState('dankort');
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (expireDate.getTime() < currentTime.getTime()) {
    localStorage.removeItem("currentClients");
    localStorage.removeItem("currentPrice");
    localStorage.removeItem("currentActivityId");
    localStorage.removeItem("currentUser");
    redirect("/");
  }

  if (typeof window !== 'undefined') {
    clients = JSON.parse(localStorage.getItem('currentClients'));
    price = localStorage.getItem('currentPrice');
    activityId = localStorage.getItem('currentActivityId');
    user = localStorage.getItem('currentUser');
  }

  async function makeReservation() {
    if (currentUserActivityRegistrations.includes(activityId)) {
      console.log('already registered');
    } else {
      const { error } = await supabase
        .from('registrations')
        .upsert({
          activity_id: activityId,
          user_id: user,
          dogs: clients[0].dogs,
          participants: clients.length,
          total_price: price,
          expireDate: expireDate,
        })
        .eq('activity_id', activityId);
      if (error) {
        console.log(error);
      }
    }
  }

  async function cancelReservation() {
    router.push(`/aktiviteter/${searchParams.activity_id}`);
    const { error } = await supabase
      .from('registrations')
      .delete()
      .eq('activity_id', activityId)
      .eq('user_id', user)
      .eq('isPayed', false);
    if (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    makeReservation();
  }, []);

  return (
    <div className='flex flex-col lg:flex-row gap-6'>
      <Box maxWidth={'lg:max-w-[866px] w-full'}>
        <div className="flex items-center gap-4 mb-3 flex-wrap">
          <Button onClick={cancelReservation}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Fortryd
          </Button>
          <Heading title={'Betaling'} icon={<CreditCard />} />
        </div>
        <Box className="mb-6">
          <PayMethods payMethod={payMethod} setPayMethod={setPayMethod} />
        </Box>

        <PayDetails payMethod={payMethod} totalPrice={price} userId={user} activityId={searchParams.activity_id} />
      </Box>
      <Box maxWidth={"lg:max-w-[526px] w-full"}>
        <Heading title={'Oversigt'} icon={<CalendarPlus />} />
      </Box>
    </div>
  );
}
