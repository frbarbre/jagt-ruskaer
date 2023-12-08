export default function Heading({ icon, title, isTiny, isMedium, className }) {
  return (
    <div className={`flex gap-2 items-center ${className}`}>
      <span>{icon}</span>
      <h2
        className={`capitalize font-semibold ${
          isTiny
            ? "text-[10px] font-semibold"
            : isMedium
            ? "text-[12px] font-medium"
            : "text-[20px] font-semibold"
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
