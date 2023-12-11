export default function Box({
  children,
  maxWidth,
  className,
  padding,
  isOuterBox,
}) {
  return (
    <div
      className={`bg-white rounded-md ${
        isOuterBox ? "" : padding || "p-5"
      }  border-zinc-200 ${maxWidth} ${className} ${
        isOuterBox
          ? "p-0 sm:p-5 sm:shadow-shad sm:border"
          : "border shadow-shad "
      } `}
    >
      {children}
    </div>
  );
}
