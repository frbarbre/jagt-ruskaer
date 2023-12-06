import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '../ui/separator';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export default async function Footer() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  return (
    <footer className="bg-zinc-900 px-6 md:px-28">
      <div className="max-w-[404px] md:max-w-[1320px] mx-auto flex md:justify-between py-[48px] flex-col md:flex-row md:text-left text-center gap-11">
        <section className="text-white order-3 md:order-first">
          <img
            className="w-[84px] h-[60px] mb-[12px] mx-auto"
            src="/logo-inverted.png"
            alt="Logo"
          />
          <p className="text-zinc-300 text-xs">Ruskærvej 21b</p>
          <p className="text-zinc-300 text-xs">7441 Bording</p>
          <p className="text-zinc-300 text-xs">Danmark</p>
          <a
            className="block w-max mx-auto md:inline"
            href="https://www.facebook.com/groups/508135962702065"
            target="_blank"
          >
            <img
              className="w-[20px] h-[20px] mt-[12px]"
              src="/facebook-white.png"
              alt="Facebook"
            />
          </a>
        </section>
        <section className="text-white order-1 md:order-2">
          <h5 className="mb-[4px] font-semibold">Nyhedsbrev</h5>
          <p className="text-zinc-300 text-xs">
            Tilmeld dig vores nyhedsbrev for at holde dig opdateret om
            foreningen.
          </p>
          <Separator className="my-[16px] bg-zinc-300" />
          <div className="flex items-center space-x-2 justify-center md:justify-start">
            {session ? (
              <>
                <Checkbox id="terms" className="bg-white" />
                <label
                  htmlFor="terms"
                  className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs"
                >
                  Tilmeld nyhedsbrev
                </label>
              </>
            ) : (
              <p className='text-s'>Du bedes logge ind for at modtage nyhedsbrev</p>
            )}
          </div>
        </section>
        <section className="text-white order-2">
          <h5 className="font-semibold">Information</h5>
          <Separator className="my-[8px] bg-zinc-300" />
          <p className="text-xs">Privatlivspolitik</p>
          <p className="my-[12px] text-xs">Sponsorer</p>
          <p className="my-[12px] text-xs">Vedtægter og regnskaber</p>
          <p className="text-xs">Frivillig med fordele</p>
        </section>
      </div>
    </footer>
  );
}
