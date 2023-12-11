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

export const OrderConfirmation = ({
  name = "Bubber",
  activity = {
    created_at: "2023-11-30T16:58:06.293921+00:00",
    title: "Skyd efter Bubber",
    date: "2024-01-17",
    category: "riffelskydning",
    timeFrom: "19:00:00",
    timeTo: "21:15:00",
    participants: 12,
    dogs: 4,
    price: 10000,
    location: "Jægervej 12, 4700 Næstved, Danmark",
    description: "Vi nedlægger den københavnske vildt, og steger det over bål",
    image:
      "https://veffssiiyvoftgcnzkvy.supabase.co/storage/v1/object/public/images/1701876130102bubber.jpg",
    id: "8451bcbb-ceb4-40ca-b94d-e556fbbddbb4",
    place_id: "ChIJi9h6uCu8UkYRP_PVdZJYQOo",
  },
  clients = [
    {
      avatar:
        "https://utfs.io/f/5eb08b0a-965f-467a-b344-b01bb11dce1d-m68346.png",
      discount: false,
      dogs: 3,
      email: "fr.barbre@gmail.com",
      firstName: "Frederik",
      isGuest: false,
      lastName: "Barbré",
      phone: "42591939",
      price: 10000,
    },
    {
      avatar: null,
      discount: true,
      dogs: 0,
      email: "jesper@gmail.com",
      firstName: "Jellybean",
      isGuest: true,
      lastName: "Fisker",
      phone: "12345678",
      price: 5000,
    },
  ],
  price = 15000,
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

  let timeFrom =
    activity.timeFrom.split(":")[0] + ":" + activity.timeFrom.split(":")[1];

  let timeTo = null;

  if (activity.timeTo) {
    timeTo =
      activity.timeTo.split(":")[0] + ":" + activity.timeTo.split(":")[1];
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
        <Preview>Ordrebekræftelse for {activity.title}</Preview>
      </Head>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans text-black">
          <Container className="border border-solid border-[#eaeaea] rounded my-8 mx-auto p-[20px] w-[542px]">
            <Section>
              <Text className="font-medium text-2xl mt-0">Hej {name}</Text>
              <Text className="font-regular text-lg text-gray-800">
                Du er hermed tilmeldt aktiviteten "{activity.title}".
              </Text>
              <Container className="border border-solid border-[#eaeaea] rounded my-8 mx-auto p-[20px] w-full">
                <Row className="mb-5">
                  <Column className="w-8 ">
                    <Img src="https://veffssiiyvoftgcnzkvy.supabase.co/storage/v1/object/public/images/1702049677816scroll-text.png" />
                  </Column>
                  <Column className="p-0 m-0 font-medium text-xl text-gray-800">
                    Kvittering
                  </Column>
                </Row>
                <Container className="border border-solid border-[#eaeaea] rounded my-5 mx-auto p-[20px] w-full">
                  <Row>
                    <Column className="w-20 pr-4">
                      <Img
                        alt="Vercel"
                        className="mx-auto rounded w-full h-20 object-cover"
                        src={activity.image}
                      />
                    </Column>
                    <Column>
                      <Row>
                        <Text className="font-semibold text-sm text-gray-800 m-0">
                          {activity.title}
                        </Text>
                      </Row>
                      <Row>
                        <Column className="w-5">
                          <Img
                            src="https://veffssiiyvoftgcnzkvy.supabase.co/storage/v1/object/public/images/1702049671397calendar-days.png"
                            alt="Calendar"
                            className="w-4"
                          />
                        </Column>
                        <Column>
                          <Text className="text-xs text-gray-500 mx-0 my-2">
                            {formatDate(activity.date)}
                          </Text>
                        </Column>
                      </Row>
                      <Row>
                        <Column className="w-5">
                          <Img
                            src="https://veffssiiyvoftgcnzkvy.supabase.co/storage/v1/object/public/images/1702049665496clock.png"
                            alt="Clock"
                            className="w-4"
                          />
                        </Column>
                        <Column>
                          <Text className="text-xs text-gray-500 m-0">
                            {timeFrom}
                            {timeTo && " - " + timeTo}
                          </Text>
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                </Container>
                <Text className="p-0 m-0 font-semibold text-xs text-gray-800">
                  Mine tilmeldte deltagere
                </Text>
                {clients.map((client) => {
                  const formattedPhone = client.phone.replace(
                    /(\d{2})(\d{2})(\d{2})(\d{2})/,
                    "$1 $2 $3 $4"
                  );
                  return (
                    <Container
                      className="border border-solid border-[#eaeaea] rounded my-5 mx-auto p-[20px] w-full"
                      key={client.email}
                    >
                      <Row>
                        <Column className="w-10 pr-4">
                          {client.avatar ? (
                            <Img
                              alt="Vercel"
                              className="mx-auto rounded-full w-full h-10 object-cover"
                              src={client.avatar}
                            />
                          ) : (
                            <Row className="w-10 h-10 rounded-full bg-[#f4f4f4]">
                              <Column align="center">
                                {client.firstName[0]}
                                {client.lastName[0]}
                              </Column>
                            </Row>
                          )}
                        </Column>
                        <Column>
                          <Row>
                            <Text className="font-semibold text-sm text-gray-800 m-0">
                              {client.firstName} {client.lastName}
                            </Text>
                          </Row>
                          <Row>
                            <Column>
                              <Text className="text-sm mx-0 my-2">
                                +45 {formattedPhone}
                              </Text>
                            </Column>
                          </Row>
                          <Row>
                            <Column>
                              <Text className="text-xs text-gray-500 m-0">
                                {client.email}
                              </Text>
                            </Column>
                          </Row>
                        </Column>
                        <Column>
                          {client.dogs !== 0 && (
                            <Row className="mb-2">
                              <Column
                                align="right"
                                className="font-semibold text-sm text-gray-800 m-0 text-right"
                              >
                                {client.dogs}
                              </Column>
                              <Column align="right" className="w-7">
                                <Img
                                  alt="Vercel"
                                  className="h-6 w-6"
                                  src="https://veffssiiyvoftgcnzkvy.supabase.co/storage/v1/object/public/images/1702049674492dog.png"
                                />
                              </Column>
                            </Row>
                          )}
                          <Row>
                            <Column className="text-sm font-semibold mx-0 my-2 text-right">
                              {client.price},00 dkk
                            </Column>
                          </Row>
                        </Column>
                      </Row>
                    </Container>
                  );
                })}
                <Text className="p-0 m-0 font-medium text-sm text-gray-500">
                  Total
                </Text>
                <Text className="font-semibold text-xl m-0">
                  {price},00 dkk
                </Text>
              </Container>
              <Text className="font-regular whitespace-pre-line text-center italic text-black">
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

export default OrderConfirmation;
