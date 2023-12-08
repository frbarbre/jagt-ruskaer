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
} from '@react-email/components';
import * as React from 'react';

export const OrderConfirmation = ({
  title = 'Hej Bubber',
  subtitle = 'Du er hermed tilmeldt aktiviteten “Fællesjagt Karup Øst”.',
  message = 'Hej alle, \n\n Mandag tager vi på fællesjagt ved Flyvestation Karup Vest, hvor der skal nakkes en hjort. \n\n Det er den årlige!',
  image = 'https://rujagt.dk/2023/20231203karupvest/album/slides/karupvest20231203001.jpg',
}) => {
  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
            format: 'woff2',
          }}
          fontWeight={500}
          fontStyle="normal"
        />
        <Font
          fontFamily="Inter"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/inter/v13/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
            format: 'woff2',
          }}
          fontWeight={600}
          fontStyle="normal"
        />
        <Preview>{title}</Preview>
      </Head>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-8 mx-auto p-[20px] w-[465px]">
            <Section>
              <Text className="font-medium text-2xl mt-0">{title}</Text>
              {subtitle && (
                <Text className="font-regular text-lg text-gray-800">
                  {subtitle}
                </Text>
              )}
              <Container className="border border-solid border-[#eaeaea] rounded my-8 mx-auto p-[20px] w-full">
                <Row className="mb-5">
                  <Column className="w-8 ">
                    <Img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXNjcm9sbC10ZXh0Ij48cGF0aCBkPSJNOCAyMWgxMmEyIDIgMCAwIDAgMi0ydi0ySDEwdjJhMiAyIDAgMSAxLTQgMFY1YTIgMiAwIDEgMC00IDB2M2g0Ii8+PHBhdGggZD0iTTE5IDE3VjVhMiAyIDAgMCAwLTItMkg0Ii8+PHBhdGggZD0iTTE1IDhoLTUiLz48cGF0aCBkPSJNMTUgMTJoLTUiLz48L3N2Zz4=" />
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
                        src={image}
                      />
                    </Column>
                    <Column>
                      <Row>
                        <Text className="font-semibold text-sm text-gray-800 m-0">
                          Fællesjagt Karup Øst
                        </Text>
                      </Row>
                      <Row>
                        <Column className="w-5">
                          <Img
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNhbGVuZGFyLWRheXMiPjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgeD0iMyIgeT0iNCIgcng9IjIiIHJ5PSIyIi8+PGxpbmUgeDE9IjE2IiB4Mj0iMTYiIHkxPSIyIiB5Mj0iNiIvPjxsaW5lIHgxPSI4IiB4Mj0iOCIgeTE9IjIiIHkyPSI2Ii8+PGxpbmUgeDE9IjMiIHgyPSIyMSIgeTE9IjEwIiB5Mj0iMTAiLz48cGF0aCBkPSJNOCAxNGguMDEiLz48cGF0aCBkPSJNMTIgMTRoLjAxIi8+PHBhdGggZD0iTTE2IDE0aC4wMSIvPjxwYXRoIGQ9Ik04IDE4aC4wMSIvPjxwYXRoIGQ9Ik0xMiAxOGguMDEiLz48cGF0aCBkPSJNMTYgMThoLjAxIi8+PC9zdmc+"
                            alt="Calendar"
                            className="w-4"
                          />
                        </Column>
                        <Column>
                          <Text className="text-xs text-gray-500 mx-0 my-2">
                            Lørdag d. 25. november
                          </Text>
                        </Column>
                      </Row>
                      <Row>
                        <Column className="w-5">
                          <Img
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNsb2NrIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIvPjxwb2x5bGluZSBwb2ludHM9IjEyIDYgMTIgMTIgMTYgMTQiLz48L3N2Zz4="
                            alt="Clock"
                            className="w-4"
                          />
                        </Column>
                        <Column>
                          <Text className="text-xs text-gray-500 m-0">
                            12:00 - 15:00
                          </Text>
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                </Container>
                <Text className="p-0 m-0 font-semibold text-xs text-gray-800">
                  Mine tilmeldte deltagere
                </Text>
                <Container className="border border-solid border-[#eaeaea] rounded my-5 mx-auto p-[20px] w-full">
                  <Row>
                    <Column className="w-10 pr-4">
                      <Img
                        alt="Vercel"
                        className="mx-auto rounded-full w-full h-10 object-cover"
                        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhUYGBgYHBwYGhwYGBoYGBgYGhgaGRgaGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQhJCs0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0PzQ/NDQ0MTExNP/AABEIANQA7QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAEAQIDBQYABwj/xAA7EAACAQIEBAQEBAUEAQUAAAABAgADEQQSITEFQVFhBiJxgTKRobETUsHRB0Ji4fAVcpLxFCMkM4LC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIxEAAgICAwEAAgMBAAAAAAAAAAECESExAxJBBCJREzJhcf/aAAwDAQACEQMRAD8AitEks6eceuREmNkxWN/CgAyLeOyTvwoANigxwSdlgAmaJmjskX8OKgGXhZHlg2UwlR5IUJgxMNwggQWFJVCWvChkVU6mB/8AnWNjtIcbjApZwdNvnf8AYyiq0azgvfKvKNRF2NA+NQn4bjrLapUX8EkdNpjcBizTGVwCDOrcXcXQDymDiCZDjayuRlX/AC8ucFUSigYjUzL4ckOTLShiDqWFxbT2jcRpl3gK61GuRYX0l5jHCqBMZh8Z/NsAYXxPihdRa4tJccgtFs+KUG0lz85Q4DE3XzjXrLNHa2m0GgLXBneNpHze8XBHymNw480QDcS3mkeaPxI80jjAfmnZhGTrRBRxaMNSdljWpwAVqgEQVxGvTjRSlASisI4VRIPw49KcAJg8dnEjyzrRWBJnEXMJEFhOGpbMQco+RI5QSsTaSsZmjcRilRQCd4mNxVMNzXqDYW9JScQ4srqyLYtuNLaX1IPpNY8bvJnLkVYL9MRTJspB9OWuunTvG48qRowDa5T3mTxZcgFWy6A/7SBqAfr7x5xLkLme9pp0SMlNstHFNQRbofsRDapXKgygghrrytYD2tM0ccLHNc/mIFmUfm7gdpJhOM5WZG8wANr2uRvoeY1uI+qF2YRxjhzUk1ANtQR6kAfSZp67XvNxgcbTrZlfQHQX5chf5zPYzhuV20AUXI6ad5m40axlaKynV57S98L0zWLgi4HOZ6pTudBNn4Bp2Vza2pkNpI1jszXE2FGoyW0voJJg8UjKQ2hO0sfE2FR3Yj4tJSJROYDLztHigdpliosyJe9zb25TUphrC46ShNICpTAGsO4vxN6Y8qEi3KS8hoip41xUyb3NpcjEKhAY2JmU8NYlquIuRpvLPxm4V11sYnHNDwy5dw5uJ2WAcKfyDWG5pIxwWdljc07NAQ2LaJFjAY060WdaACARZ06ACzol4hMAHhdJMlvw3PNbHU6KGIUkfO9+0VV8kreIVwL0wCbi7HYKRrbvyNpfGvyMuX+tGe4zjLElTc7qW8253sdBsbX6iB4JbPd1uWAvckXvY/tLCvwk1GzNoosVXa9tgB6WljguGkEMRdtBb02v6aTockjKMGwWthWy+VbKTexGuota/OA18McwsGGhA9ed+s21LhbNq5A52Ekfhy6WG3+GT3NVxIwScPe+mhHUbnofWEHhhuDlF7aruCOg/SbKvggfTWCvhQLdonMf8KMylFlbMCeguP5iNj2ltVpfiU7Fdeev+d4TXpA68/8ANCOcTDJzAAsDmHUdRBSUkTKDjlGPQtTfVbjofWbXwg+ZHa1t5T+IsGcqup2Nj+8ufCKEUD7zLkVGkHZUcWp5mdxpa8CwFIsgPO5194QHNR3Qmygm/eG4WiCjKh22k6RSywJ62Wuocct5dh0qAjQzJ42o2c5txpHcLxYUlQbsx0jaEnkv/D+CVa7ZdhKzxwpasov1l/wDCFHuTe+sofFNB2xNxsIovI2EcDwjhbsTLu0FwD+QXhRMlstjsml4yHKoyXgMEQhINicYqDzGTEzM+KX0t3lRjbGlZbDjCdR84v8AqydfrMEI7WadUWom7HFk6iO/1ROswXvEzHqYdEDib3/Uk6x9LFhzZAWP9OsyPBuEVcQ4VQ2W/mbUACercN4UlBAqLaw1PM9yYOBk5UVyJ5RmB79ZVU0NRy2gC9ObE3b5aD2l1xN7Ansf2EFwNIKtoL8Vgiu0shOGwig5rXbqd4ZTpAco2gt4ZSSCVmjaQ1RpECdoYlMRzL2jonsVjUYFiadpc1TpoJWVtdYmiosrHEEa4sykgg8obUFyYE9jcGCwXLKJa6fiIwPS9/8AO9vnF8PVlXDEE2IG3O8XAJyvprf5aSi4ijpUcXAvqBsLQmrRjDDaKzAu7V33K5jLB8Z+G3l56WgAxRTYWkRrgm53kvJa0WOLyulyLE7wXhfDmL505SelWVxl5+kgXEvRew0HSPIaybHw67lyG5QHErfEvcaStwPGmRiQJM3FFN2JF5nWSkrLZMOAdJIYLwzFK97G8bWx6B8t9YdWFGgpr5JWVF1MtaZ8gPaZ/FY1QxF4hJEjGZLxHUuwE1TmY/xAfPNYjjsqgkUx1JGc5VBJ6CavgnhFnIaptvlH/wCjLLlNRKThXBauIPkFlvbMdvQdZu+CeBaSWZ7ue+ij2mhwHDlQAADQWFthLZL7RpWcs+VvRHhsGiAKqgDsLR1eiLGTBbSHENKoyUm2ZXi6cu4/WNpCE8bp2GaQ4fYGZyRvBhVJofSaA0lh1KIpsJpP2nObxA4G8iesAdJZn6I6G0rqyQrE49UGup7QWlULi+Qj20ktFp0B1EldUTUy0xHl3/wwGqkRaZFhKmXMO2kp/FtM5kcXsQQ3roR9Ly1c5T94Jxm7oVXVrrYc7WI+0d4Ia/IzFOiz662jnA0BGsfVSonlZSt+vP0kCLqCTJGFYGplqA8hJeMYlGcEdNfnFwqA35tGIyhirjUwH4DUaxHwj1g2ILNsOsOw+FUMddLSSji6dO5Op2tzh6VCwvwcCMwIPPf0lfxA/wDuwO4/WXnhzFCo7sBYaj6Sm4rpiGPOwj9HbPRkI/DFj/L+k8r43WP472J3m04FWZgcx0A69pieMr/67+v6SePbsaj+jb1WlO3AKmIcN8Kg721PoJqcNgLnUXP0l7hMIFG0qKMJSrRU8H8PU6drKL/X5zQUaQHKSBRHWlpGTk2NUR+e0jd/lITWjJqwoVO8hqP0OkFrYtUHmI9JR4rjFzoYxqJYcXAKG3LQmCU/hHYQilUDUyp3t9f+4xcKy00Y/wAwv3O4/SS1gqMqdE1F5LifxbXUWHpKutimpgZVzudFUfc9BK7Gf+e75VZmQgG6OKappc6WJbU/SEYlN1kukx1mCPcE6C4teGVqqAXlQ2EYfG7Na1sxuwbn7QjEv5O9omaRVlZRql3Z2UlF+FRpmN92PIR/GeNYmgqMAiK6kqoR6jDUBQbEWJv7QrAG2lhYnb9YaXYaBEPck/aNSS2TKLemUNDiNd0VqlG+bml7jlcodbQqjTuGtfTqDeH1FY7m198otp0uTeNDgLYf2tJbT0WotLJXYhBaDU0NyygFraX+/wB4ZVbcQPDGzjN7EdOhHykotL0ZjMA1TDVGZizp51va4/MPS32mQwQGfzHQT0WsmRKyg3DU2I/4kfrPNqQK6nnGEtmm4Iq5mIFzy+Uq8e5FVgy6naH8Dx6U7k+0q+J4vPWzgbmT6JaFoobmU1ceY+suWxSoIDiCGF1HrLRUC48JYgIrki+v6QPidQmqXy2DaSXA1QtIZRrzhNVC9ttJN5FJZEwOKKDQm5kPEeFs5DDneSioVb4bmHU8HVqjMTl6CRdMqF0eiYfC2hIj7TmsJ0JHA3Y0iRVa1pHiMSBvKfGY8CA0gyvib89BKnF8W3CW7k6AeplVj+JWUsSQo+p6DqZmcXxRqnlUFE6XuSepMKNIxstcZxlLm7M5/p0W/ruYNguMOG/+NWU6ZRpp19e8rkpiEUgy7WlotwVGxZ1VVemxKNoQd0bmpH685qGq/iYam67C6sNBZg1zrv8AzTynDYt6bs3xBtGU7MNftPQ/BWKFWlXpKd1Dgcww3FvYfKVRzzXWmSmiASV0v11vGnDu/wDOQOeUAX9+UcupEsUdUFza8xydCaSwVdTChFtt9ye/WNFK6WtIsTiS2ZyCRewA1OnQc4JT8SogK2YH+pSPuIJDujqVQo5FtO8saPEQ3xKLXtcaWPeZbECrXfytlUnXLuR0vyEvcGuRQm4535nneDjQ9ly1FCLg/OVWJoWjBXKG2pT6r/aT1KmYXEVBdFRiDrG06TObAXk+IpEm0k4G4zsCdQb2P3iouMvSesDkJbkhU/eeccRfKbW3nonGqwtkQjM+novM/K8yuPoolVVfUWN5K3Q29MrsBTVqd/5v7xuMpBbGxMOxOHpg56bWvuBtJg6FOTMBtvrGZ1+VlXXoh00j+H4QEFRqTv8AadhyzFhaw6Q2nUFMaDX0iNLrBX1GyXS20J4VSZ3uDYAbdTB3rZ9WGsSlinRvIPfl84MSjKTDsfmR+sAr8crXsDa3SSpXLN52uxlbisO5Ym0OqNONUe7swGsrcVjAOcGxvEb6SjxWKPWanAok+Nx3eUWP4gqaubn8vP36RMdiwi33c/CDqB3MF4Lw44h87m+vOBolStgSYeriGvY25DZVHYTScL8GliC5P2mjw+FRLAAS1oVNRKic8+Z1+OCzwvhLCogUUl2GpFyfUxMR4Pwzi34YHppNCmw9BHqJvSOTvL9mC4n/AA6Qi9FyD+V9QfQ8oJ4a4e2EbzqVdnsw6IFy78wS5PsJ6TKfj+GzKrWva4PoYmsGkZtumzLYimEdh0Yj6wXiFewAG50HvzhvEUJbNzIB9SBY/UQRqVyrgX0I9CZjKNM64SIlGgHIbRWSlfzqCOYMoOO8Sq0SB+C9mNswF1F+pGwlzw4UUKNWY1Ha5CjUaDUZemo3h1Lcl/0dUxlJBZFHsJU43Hlbko4ANj5Tppf7TRVuIqFZaNJFDHUsBfbcKv6mUuIr4lyQxpWve+Qg6ixsL9/pBoqLl4it4bxtatT8NAzPr5SpFhzJPKaFaeVB7j5SDhOCWmWcAB31Y21P7DtDMe9k9/vJf+CdrYMtO7rzvr9JR8cV0u6A3DEHW1he809KnZ17Kf2EpOO41KZcvbKb6b3O4A67xUFspOF3BNV2+ZvA+JV1cl9+kp8Rjy+ZQbLfS3MQyg4WmAdRIUadnRhpUV+FzM9hzh3D634dUhtbwpMRSSxVbmQYhwz5gNYMtJtj8S7FyEIF4mMruMoAuecgFI3zE2iVseq6DUxD6P0PwpzG7CS8QxwK5Atu8zlbEvuCRIVxLNuY+l5En1lX7LH8MXuDcjpEbGNNZ/D/AAKOrlhc5rfSaPE+FqTG+UfKV0xZlyfXGEurQFiGVRpAaIztc/CPr2kKU3qOFB336AdTLRkCAIuw58yeZjdI53/hQ4jhbOzFjoWv/b6y74HhgmgnESfh/wAUlStildUWdVtYRh21EDqnWEYc6iXeTFxwegUz5R6D7R6yOgfKvoPtJBOlaOQdEIizoDKfjuFugYD4d/8AaZm6ZyE/lb7zcuoIIOoOkxfEsOUdkO26ntykSRtxTrAPiEDCBUcKoOw36Qum+tjFZFBuZkzsi34OzC2iiCV6YOwhi2OwEHxKkbEQLjdg9BesZinzZE/rHyBuftHs+UEmVtLFqCXY/De3vBImToIx+PCMRfp/1MxxdhVZEZC+d1WwJBzMQLgjpeObFGo7OdFBuO5H6S88HcNL1DiHHlS6pfm7fG3sNPUnpHCHaVETl1jZhPFXh5sJVABJpuLox681PcSqp4lhpPb/ABBwtMRRek43+E2uUbkw7zCN/Dl7XSupPRkI+oJms+F3gOH6Y1l0ZIYztFXHnkIXxPw7iaF/xKTWH8yedPmNve0qaVtZg4NbR2x5O2mPqYlm0vICNYo3itvELL2T1B5TIKEIqfDB6POJaLl/dHpP8M/hf/d+k3JMw/8ADEeR/wDf+k2zTRLB5XPnkZjuG1UKeT/7X+I/vJry/wCH8GRLi3pI63DkBJINueW9wes25fkd/iyOP6VqRRkyXB/FLX/RlcXR79b/AOXkH+k1ENyLr1XX6TB8E47RsuaEsJnVt5NQOokFXeT4Y6yPQej0Oh8K+g+0kEjo/CvoPtJBOvw4hZ06dADjPPvH3ETRqo1rplGYe51B6zXcTxxXRTrzmZ4hjyQWY5vWxAtfltLjByEpqLKj/wAgMAym+gIPUEXH0MlXGKdDpAcNU/GTN/MNNBYc7Cw7QWvmBsVJmE49XTO3jlatF02LUDQj1vA8TxVE0zg+mplDiEXmGHz/AFldUqbhV95CRq5MseJ8aLC2w6c/eUwqPVOW9l5x9PBltTtLnhnDmdglNffkB1Yx7wgSxb0OwPDGqFaaaDTMfyrzM3vD8OqBUQWVAAP3PcxMDw5aKZV1J+Jjux/aEYAeYzt4eLqrezz+fm7ypaOxNO7fWR4ekPMwN8x9hbS30MJxBtt8TeVf39omHoZECjl9ep+c1ejBMidBzEDq8FoPfPQptfclF1+ktgJwFpDSZSk1pmO4l4Awj/Appt1Q2H/E3EyPFP4d10N6Tq69G8jftPW3EYUHORLii/DeP0zj6fP/ABDCPSJWohRujDf0Ox9oDSM+hcTg6bizojjoyhvvMx4g8DUaqXoolFxqCq5Ubsyj7zCXztLB2R+1Sa7KgD+GC/8ApOf6z9ps2lF4H4O+GpslTLmzE+U3BHYy+qDaZOLWGYSkpzbQVk6RGTW/zk6LpOy6z0zgK6rhddLht1Yb+h6iE4aqSLMNRv0PcSaqml+mvtznBNcw/wCxC8AQ1KXMfKA1qYLgWsbbgdDrp7y1ewseRNj2PWCYtcro3e3zBmb44y2aKckX1DiNPKPNytseWkmXH0z/ADj6iUeHogXHcn5m8l/D1kviQdi9Wup2YfOMq4gAHzC9tPWU20bVqWF5P8QdiPHOfiPOZbxNiAiFes1mIS4F+Uw/jjRkHW5+U3gvCGdST8KjS00YB2b+puvzAli+qhxylvg8KlXDoCAUKKoPUZRv0lXRolGak4+H4T+ZeRH2nLzx9Oz55+Ey4ZXW7ajpKfH4GnmCIoXrDEqmmSp2O3aR4WgatQlfMR/xHcmcyt4R12llguG4OXbKg05nkB1mwwHD0oJlUanc8yYuDpimMlhe1zbn3j1JLdhO3i4euXs8/n53N0tDXa5tH4Yasdh/l4i07mTZL3UbD4u56fa83k1VHKjl8zBu2nYfuY7LrOQeb2kiSShsY5kxNoPUMQxREKiLbacg+UB2JkEatrGSHTWc6eXvGhWB1vuLyLJfnt16co6iuc3PS3yjjRv2tpG4RexKTWgxWi3gdPEX9oQlQGMRMIymLadNPblFVo1j5r9fuIBYtWnmBHUQTGXNO53Ug/I2MNUyJ1Fyp2Yf9xIGLQa4B9jCFGsDwmgsfQ+ohq7wYRGMI3INt5Id45BJLGuk878XgvWC6+VfqT/aejOZgvFFO2IYjchftNeLZMtFp4YY0aJW+cDzEDkeYEj49xEkI6I2bOoysADkZgpN/U/SGcEwuRF76mJxagHDIVJBABYaMoJtdT1BsbdpM4KTaCEnF2RVMLnXzIwPMEG/vpLLgWFFOmRYjzE6i3IW/WWHC8aCoVmuwABJFrxeKu4IyJn01176TlhxdZHTyc3aIPiUFswHmGvtzEfgqYfzA6aEdwZFRWodXyp6eYx2Bw+RMoF12UdB37c/edL1RyrZO/JV+I8/yr1/aSBAosIqJbuTuftFqSCgd9x62+cIAtB6+g9x95NUbSUBCzR2Sw7zlXnHgXiAjfYRwGkRBr6Ry/rGDO3PpEfa0egjUFyYCK5fK5He/sf7iGvRvrBselmU9dIZR+ERtiMwmNU6XIPQ6EQuliesY34LixAI5dvQ8pXV1CGyPccg37zi4fsjyYeGdnL8rjrJoaVaPL39dx6zPpjCujDKe+0sKOKB5ztUkzlcKLhHBFxG4lfLcfy6/LeVYxDI1wLo2voeYllSrBhcSmvSBpHnB5MP7iE0m0HbSBscoA/Kw+R0H3hAbXsfvE0NDy2snSCVN4TSOkhlHOdZkvE9G9YHqF+5/tNWu8o/EdO7of8AN5fE8ikWGGS1Newk7ICAfb25xaSWUDtH0RpaEmJIVEAWwEVXNrfWIi3jsQQiMeg+vKZ+l+EKDMe36f3hMZQSygSS0bEkcBGGPbaNiAgxI2kji5iVxpJEGl4xPZ1tLSJDY2k0hxA2MYHNpmMbR23jaxuF7k/aTILCOqQrtnOd4tMaRrHQd5KNIhgnEFuoPQxaB39ZJiUuJDTO/rGtCPPeB1SyC5vCMX8QnTp4UD3JBNFzcA6g9dY+qMh8pInTp6Xz6PP5tljwusSdYdWGQgrpfedOnbHRxy2TtqNY+tvOnRoRLzHpCHnTpky0IvKV/Gh5l/znOnRw2KWiwSIu86dB7AnTaRV9QL/mH2v9506QtlMlnCdOjAWpGidOgAjbTsPtOnQ8ExzRlX4Z06C2IH5L6yczp0tiQ1Pjk06dJYxlXaQLziTpUdCP/9k="
                      />
                    </Column>
                    <Column>
                      <Row>
                        <Text className="font-semibold text-sm text-gray-800 m-0">
                          Bubber for Helvede
                        </Text>
                      </Row>
                      <Row>
                        <Column>
                          <Text className="text-sm mx-0 my-2">
                            +45 12 34 56 78
                          </Text>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <Text className="text-xs text-gray-500 m-0">
                            bubberforhelvede@gmail.com
                          </Text>
                        </Column>
                      </Row>
                    </Column>
                    <Column>
                      <Row className='mb-2'>
                        <Column
                          align="right"
                          className="font-semibold text-sm text-gray-800 m-0 text-right"
                        >
                          1
                        </Column>
                        <Column align="right" className="w-7">
                          <Img
                            alt="Vercel"
                            className="h-6 w-6"
                            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRvZyI+PHBhdGggZD0iTTEwIDUuMTcyQzEwIDMuNzgyIDguNDIzIDIuNjc5IDYuNSAzYy0yLjgyMy40Ny00LjExMyA2LjAwNi00IDcgLjA4LjcwMyAxLjcyNSAxLjcyMiAzLjY1NiAxIDEuMjYxLS40NzIgMS45Ni0xLjQ1IDIuMzQ0LTIuNSIvPjxwYXRoIGQ9Ik0xNC4yNjcgNS4xNzJjMC0xLjM5IDEuNTc3LTIuNDkzIDMuNS0yLjE3MiAyLjgyMy40NyA0LjExMyA2LjAwNiA0IDctLjA4LjcwMy0xLjcyNSAxLjcyMi0zLjY1NiAxLTEuMjYxLS40NzItMS44NTUtMS40NS0yLjIzOS0yLjUiLz48cGF0aCBkPSJNOCAxNHYuNSIvPjxwYXRoIGQ9Ik0xNiAxNHYuNSIvPjxwYXRoIGQ9Ik0xMS4yNSAxNi4yNWgxLjVMMTIgMTdsLS43NS0uNzVaIi8+PHBhdGggZD0iTTQuNDIgMTEuMjQ3QTEzLjE1MiAxMy4xNTIgMCAwIDAgNCAxNC41NTZDNCAxOC43MjggNy41ODIgMjEgMTIgMjFzOC0yLjI3MiA4LTYuNDQ0YzAtMS4wNjEtLjE2Mi0yLjItLjQ5My0zLjMwOW0tOS4yNDMtNi4wODJBOC44MDEgOC44MDEgMCAwIDEgMTIgNWMuNzggMCAxLjUuMTA4IDIuMTYxLjMwNiIvPjwvc3ZnPg=="
                          />
                        </Column>
                      </Row>
                      <Row>
                        <Column className="text-sm font-semibold mx-0 my-2 text-right">
                          500,00 dkk
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                </Container>
                <Container className="border border-solid border-[#eaeaea] rounded my-5 mx-auto p-[20px] w-full">
                  <Row>
                    <Column className="w-10 pr-4">
                      <Img
                        alt="Vercel"
                        className="mx-auto rounded-full w-full h-10 object-cover"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMRfN2UgON1ttatSAujmbiiibEY_s7B4RJSHOSZP553Z12_ppv7tlKLRkpMseDr3fEfRo&usqp=CAU"
                      />
                    </Column>
                    <Column>
                      <Row>
                        <Text className="font-semibold text-sm text-gray-800 m-0">
                          Paprika Steen
                        </Text>
                      </Row>
                      <Row>
                        <Column>
                          <Text className="text-sm mx-0 my-2">
                            +45 12 34 56 78
                          </Text>
                        </Column>
                      </Row>
                      <Row>
                        <Column>
                          <Text className="text-xs text-gray-500 m-0">
                            paprikasteen@gmail.com
                          </Text>
                        </Column>
                      </Row>
                    </Column>
                    <Column>
                      <Row>
                        <Column>
                          <Text className="text-sm font-semibold mx-0 my-2 text-right">
                            500,00 dkk
                          </Text>
                        </Column>
                      </Row>
                    </Column>
                  </Row>
                </Container>
                <Text className="p-0 m-0 font-medium text-sm text-gray-500">
                  Total
                </Text>
                <Text className="font-semibold text-xl m-0">1000,00 dkk</Text>
              </Container>
              <Text className="font-regular whitespace-pre-line text-center italic text-black">
                {'De bedste hilsner'}
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
