export default function Box({ children, maxWidth, className, padding }) {
  return (
    <div
      className={`bg-white shadow-shad rounded-md ${
        padding || "p-5"
      } border border-zinc-200 ${maxWidth} ${className}`}
    >
      {children}
    </div>
  );
}
