'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function SubmitFooter() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timer = setTimeout(() => {
      setIsSubmitted(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [isSubmitted]);

  return (
    <>
      <Button
        className={`bg-white text-black hover:bg-zinc-300 w-max ${
          isSubmitted && 'opacity-70'
        }`}
        type="submit"
        onClick={() => setIsSubmitted(!isSubmitted)}
      >
        {isSubmitted ? 'Succes!' : 'Bekræft'}
      </Button>
    </>
  );
}
