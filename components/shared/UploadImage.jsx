// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

'use client';

import { UploadButton } from '@uploadthing/react';
import { motion as m } from 'framer-motion';

// This component is used to upload the image for the onboarding process, it uses the UploadThing library
export default function UploadImage({
  image,
  images,
  setImages,
  loading,
  setLoading,
  setError,
  setIsDeleting,
}) {
  return (
    <div className="flex justify-center mt-[48px] mb-[24px]">
      <div
        style={{
          backgroundImage: `url("${images[0]?.url || image}")`,
        }}
        className="relative w-[151px] aspect-square bg-cover bg-no-repeat bg-center bg-light-purple rounded-md"
      >
        {!loading && (
          <>
            {(image === '' || !image) && images.length === 0 ? (
              <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center flex-col gap-[8px] pointer-events-none">
                <img
                  src="/image.png"
                  alt="upload-image"
                  width={32.5}
                  height={27.5}
                />
                <p className="text-white font-semibold text-[14px] tracking-[0.8px]">
                  +Upload Billede
                </p>
              </div>
            ) : (
              <div className="absolute inset-0 bg-black/20 rounded-md flex items-center justify-center flex-col gap-[8px] pointer-events-none">
                <img
                  src="/image.png"
                  alt="upload-image"
                  width={32.5}
                  height={27.5}
                />
                <p className="text-white font-semibold text-[14px] tracking-[0.8px]">
                  Skift Billede
                </p>
              </div>
            )}
          </>
        )}
        {loading && (
          <m.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{
              rotate: 0,
            }}
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,
              duration: 0.5,
              mass: 0.3,
            }}
          >
            <img
              src={'/loading-icon.png'}
              alt="loading-icon"
              width={40}
              height={40}
            />
          </m.div>
        )}
        <UploadButton
          appearance={{
            button: {
              opacity: 0,
              position: 'absolute',
              inset: 0,
              backgroundColor: 'red',
              width: '100%',
              height: '100%',
            },
            allowedContent: {
              opacity: 0,
            },
          }}
          endpoint="media"
          onUploadProgress={() => {
            setLoading(true);
            setError({ message: '', isActive: false });
          }}
          onClientUploadComplete={(res) => {
            setLoading(false);
            if (res) {
              setImages(res);
              setIsDeleting(false);
            }
          }}
          onUploadError={(error) => {
            // Do something with the error.
            setLoading(false);
            setError({
              message: 'Billede må ikke være større end 4 MB',
              isActive: true,
            });
          }}
        />
      </div>
    </div>
  );
}
