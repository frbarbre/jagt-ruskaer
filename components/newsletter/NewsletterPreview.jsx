import Box from "../shared/Box";
import Heading from "../shared/Heading";
import { View, Mailbox } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";

export default function NewsletterPreview({ image, title, subtitle, message }) {
  return (
    <div className="flex flex-col gap-5">
      <Heading title={"Forhåndsvisning"} icon={<View />} />
      <section>
        <Box>
          <Heading title={"Nyhedsbrev"} icon={<Mailbox />} />
          {image ? (
            <img
              className="w-full h-[250px] object-cover mt-5 rounded-md"
              src={image}
              alt="Nyhedsbrev"
            />
          ) : (
            <Skeleton className={"mt-5 h-[250px] w-full"} />
          )}
          {title !== "" ? (
            <h2 className="mt-5 font-semibold text-[24px]">{title}</h2>
          ) : (
            <Skeleton className={"mt-5 h-[36px] w-2/3"} />
          )}
          {subtitle !== "" ? (
            <h3 className="mt-5 opacity-70 text-[18px]">{subtitle}</h3>
          ) : (
            <Skeleton className={"mt-5 h-[27px] w-1/2"} />
          )}
          <Separator className="my-4" />
          {message !== "" ? (
            <p className="mt-5 text-[14px] whitespace-pre-line">{message}</p>
          ) : (
            <>
              {Array.from(Array(4).keys()).map((i) => (
                <Skeleton
                  key={i}
                  className={`mt-2 h-[21px] ${
                    i === 0 ? "w-1/4 mb-5" : i === 3 ? "w-1/4 mt-5" : "w-full"
                  }`}
                />
              ))}
            </>
          )}
          <p className="mt-6 text-center italic text-[14px]">
            De bedste hilsner
          </p>
          <img
            src="/logo.png"
            alt="ruskaer logo"
            className="w-[80px] my-6 mx-auto"
          />
        </Box>
      </section>
    </div>
  );
}
