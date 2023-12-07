import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className="h-[100svh] w-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-3 -translate-y-[92px] md:-translate-y-[108px] ">
        <Loader2 className="animate-spin" />
        <p>Indlæser</p>
      </div>
    </div>
  );
}
