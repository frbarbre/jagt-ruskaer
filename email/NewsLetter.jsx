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
} from '@react-email/components';
import * as React from 'react';

export const Newsletter = ({
  title = 'Brænd Bubber!',
  subtitle = 'Bubber brænder!',
  message = 'Bubber brænder rigtig meget!',
  image = 'https://image.herognu.dk/115561.webp?imageId=115561&width=2116&height=1894&format=webp',
}) => {
  return (
    <Html>
      <Head />
      <Preview>{title}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={image}
                width="400"
                height="370"
                alt="Vercel"
                className="my-0 mx-auto"
              />
              <Text>Titel: {title}</Text>
              <Text>Undertitel: {subtitle}</Text>
              <Text>Besked: {message}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default Newsletter;
