import Box from './Box';

export default function Modal({ setActive, children, maxWidth }) {
  return (
    <>
      <div className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none">
        <Box maxWidth={`${maxWidth} w-full pointer-events-auto mx-6`}>
          {children}
        </Box>
      </div>
      <div
        onClick={() => setActive(false)}
        className="fixed inset-0 bg-black/20 z-50"
      />
    </>
  );
}
