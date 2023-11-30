export default function Heading({ icon, title, isTiny }) {
  return (
    <div className="flex gap-2 items-center">
      <span>{icon}</span>
      <h2
        className={`capitalize font-semibold ${
          isTiny ? 'text-[10px]' : 'text-[20px]'
        }`}
      >
        {title}
      </h2>
    </div>
  );
}
