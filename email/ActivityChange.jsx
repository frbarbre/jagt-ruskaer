import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
  Font,
} from "@react-email/components";

import * as React from "react";

export const Newsletter = ({
  title = "Fællesjagt Flyvestation Karup Vest 18. dec 2023",
  subtitle = "Klik her for at se aktiviteten",
  image = "https://rujagt.dk/2023/20231203karupvest/album/slides/karupvest20231203001.jpg",
}) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
            format: "woff2",
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2",
            format: "woff2",
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Preview>{title}</Preview>
      </Head>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-8 mx-auto p-[20px] w-[465px]">
            <Row className="mb-5">
              <Column align="left" className="w-8 ">
                <Img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLXBsdXMiPjxwYXRoIGQ9Ik0yMSAxM1Y2YTIgMiAwIDAgMC0yLTJINWEyIDIgMCAwIDAtMiAydjE0YTIgMiAwIDAgMCAyIDJoOCIvPjxsaW5lIHgxPSIxNiIgeDI9IjE2IiB5MT0iMiIgeTI9IjYiLz48bGluZSB4MT0iOCIgeDI9IjgiIHkxPSIyIiB5Mj0iNiIvPjxsaW5lIHgxPSIzIiB4Mj0iMjEiIHkxPSIxMCIgeTI9IjEwIi8+PGxpbmUgeDE9IjE5IiB4Mj0iMTkiIHkxPSIxNiIgeTI9IjIyIi8+PGxpbmUgeDE9IjE2IiB4Mj0iMjIiIHkxPSIxOSIgeTI9IjE5Ii8+PC9zdmc+" />
              </Column>
              <Column
                align="left"
                className="p-0 m-0 font-medium text-xl text-gray-800"
              >
                Aktivitet opdateret
              </Column>
            </Row>
            <Section>
              {image && (
                <Img
                  src={image}
                  width="400"
                  height="370"
                  alt="Vercel"
                  className="mx-auto rounded w-full h-[250px] object-cover"
                />
              )}
              <Text className="font-medium text-2xl pt-3">{title}</Text>
              {subtitle && (
                <a className="block w-max text-gray-800" href="">
                  <Text className="font-regular text-lg">
                    {subtitle}
                  </Text>
                </a>
              )}
              <Hr className="my-2 border-[#eaeaea]" />
              <Text className="font-regular whitespace-pre-line pt-8 text-center italic text-black">
                {"De bedste hilsner"}
              </Text>
              <Img
                src="https://rujagt.dk/wp-content/uploads/2016/11/cropped-Rusk%C3%A6rJagtforening_Logo-1.png"
                width="80"
                alt="Logo"
                className="mx-auto pt-4 pb-6"
              />
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Newsletter;
