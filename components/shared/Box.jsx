export default function Box({ children, maxWidth, className }) {
  return (
    <div
      className={`bg-white shadow-shad rounded-md p-5 border border-zinc-200 ${maxWidth} ${className}`}
    >
      {children}
    </div>
  );
}
