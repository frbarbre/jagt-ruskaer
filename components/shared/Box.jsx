export default function Box({ children, maxWidth }) {
  return <div className={`bg-white shadow-shad rounded-md p-5 border border-zinc-200 ${maxWidth}`}>{children}</div>;
}
