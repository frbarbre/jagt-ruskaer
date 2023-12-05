"use client"
 
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "../ui/separator";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 ">
      <div className="max-w-[1320px] mx-auto flex justify-between py-[48px]">
        <section className="text-white">
          <img className="w-[84px] h-[60px] mb-[12px]" src="/logo-inverted.png" alt="Logo" />
          <p className="text-slate-300 text-xs">Ruskærvej 21b</p>
          <p className="text-slate-300 text-xs">7441 Bording</p>
          <p className="text-slate-300 text-xs">Danmark</p>
          <img className="w-[20px] h-[20px] mt-[12px]" src="/facebook-white.png" alt="Facebook" />
        </section>
        <section className="text-white w-[384px]">
          <h5 className="mb-[4px] font-semibold">Nyhedsbrev</h5>
          <p className="text-slate-300 text-xs">Tilmeld dig vores nyhedsbrev for at holde dig opdateret om foreningen.</p>
          <Separator className="my-[16px]" />
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" className="bg-white"/>
            <label
              htmlFor="terms"
              className="leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs"
            >
              Tilmeld nyhedsbrev
            </label>
          </div>
        </section>
        <section className="text-white">
          <h5 className="font-semibold">Information</h5>
          <Separator className="my-[8px]" />
          <p className="text-xs">Privatlivspolitik</p>
          <p className="my-[12px] text-xs">Sponsorer</p>
          <p className="my-[12px] text-xs">Vedtægter og regnskaber</p>
          <p className="text-xs">Frivillig med fordele</p>
        </section>
      </div>
    </footer>
  );
}
