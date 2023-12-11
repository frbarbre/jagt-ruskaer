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

export const ActivityChange = ({
  title = "Fællesjagt Flyvestation Karup Vest",
  date = "2024-01-17",
  image = "https://rujagt.dk/2023/20231203karupvest/album/slides/karupvest20231203001.jpg",
  link = "https://ruskaer.frederikbarbre.dk/aktiviteter/468a6072-77da-4f94-857f-4e04daebf9da",
}) => {
  function formatDate(dateString) {
    const date = new Date(dateString);
    let formattedDate = date.toLocaleString("da-DK", {
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    let words = formattedDate.split(" ");
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1) + " d.";
    words[2] = words[2].charAt(0).toUpperCase() + words[2].slice(1);
    return words.join(" ");
  }

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
        <Body className="bg-white my-auto mx-auto font-sans text-black">
          <Container className="border border-solid border-[#eaeaea] rounded my-8 mx-auto p-[20px] w-[465px]">
            <Row className="mb-5">
              <Column align="left" className="w-8 ">
                <Img src="https://veffssiiyvoftgcnzkvy.supabase.co/storage/v1/object/public/images/1702297982364calendar-plus.png" />
              </Column>
              <Column
                align="left"
                className="p-0 m-0 font-medium text-xl text-gray-800"
              >
                Aktivitet opdateret
              </Column>
            </Row>
            <Section>
              <Img
                src={image}
                width="400"
                height="370"
                alt="Vercel"
                className="mx-auto rounded w-full h-[250px] object-cover"
              />

              <Text className="font-medium text-2xl pt-3">{title}</Text>
              <Row>
                <Column className="w-6">
                  <Img
                    src="https://veffssiiyvoftgcnzkvy.supabase.co/storage/v1/object/public/images/1702049671397calendar-days.png"
                    alt="Calendar"
                    className="w-4"
                  />
                </Column>
                <Column align="left">{formatDate(date)}</Column>
              </Row>
              <Text>Der er sket en ændring i en aktivitet du er tilmeldt</Text>
              <a
                className="block w-max text-gray-800"
                href={link}
                target="_blank"
              >
                <Text className="font-regular text-lg">
                  Klik her for at se aktiviteten
                </Text>
              </a>

              <Hr className="my-2 border-[#eaeaea]" />
              <Text className="font-regular whitespace-pre-line pt-8 text-center italic text-black">
                De bedste hilsner
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

export default ActivityChange;
