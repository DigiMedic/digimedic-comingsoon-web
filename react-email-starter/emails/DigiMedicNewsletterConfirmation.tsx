import {
    Body,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
  } from "@react-email/components";
  import * as React from "react";
  
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";
  
  export const DigiMedicNewsletterConfirmation = () => (
    <Html>
      <Head>
        <title>DigiMedic Newsletter Confirmation</title>
      </Head>
      <Preview>Vítejte v komunitě DigiMedic - potvrzení odběru novinek</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerContainer}>
            <Img
              src={`${baseUrl}/static/logo-long.png`}
              width="200"
              alt="DigiMedic Logo"
              style={headerLogo}
            />
          </Section>
          <Section style={box}>
            <Text style={heading}>Vítejte v komunitě DigiMedic!</Text>
            <Text style={paragraph}>
              Děkujeme, že jste se přihlásili k odběru našeho newsletteru. Jsme rádi, že se zajímáte o digitální budoucnost českého zdravotnictví.
            </Text>
            <Text style={heading2}>Co můžete očekávat:</Text>
            <Text style={paragraph}>
              • Nejnovější trendy v digitálním zdravotnictví<br />
              • Aktualizace o našich projektech a službách<br />
              • Tipy pro efektivní využití technologií ve zdravotnictví<br />
              • Pozvánky na webináře a odborné akce
            </Text>
            <Hr style={hr} />
            <Text style={paragraph}>
              Pokud máte jakékoliv dotazy ohledně našich služeb nebo potřebujete pomoc, neváhejte nás kontaktovat na{" "}
              <Link style={anchor} href="mailto:info@digimedic.cz">
                info@digimedic.cz
              </Link>.
            </Text>
            <Text style={signatureContainer}>
              <Img
                src={`${baseUrl}/static/FAVICON.png`}
                width="32"
                height="32"
                alt="DigiMedic Favicon"
                style={signatureFavicon}
              />
              <span style={signatureText}>Tým DigiMedic</span>
            </Text>
            <Hr style={hr} />
            <Text style={footer}>
              DigiMedic, a.s., Technologická 1, 110 00 Praha 1
            </Text>
            <Text style={footer}>
              Pokud si již nepřejete dostávat naše emaily, můžete se{" "}
              <Link style={anchor} href="https://www.digimedic.cz/unsubscribe">
                odhlásit zde
              </Link>.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
  
  export default DigiMedicNewsletterConfirmation;
  
  const main = {
    backgroundColor: "#E7F5F8",
    fontFamily: "Raleway, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  };
  
  const container = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "0 0 48px",
    marginBottom: "64px",
  };
  
  const headerContainer = {
    backgroundColor: "#ffffff",
    padding: "20px 0",
  };
  
  const headerLogo = {
    margin: "0 auto",
    display: "block",
  };
  
  const box = {
    padding: "0 48px",
  };
  
  const hr = {
    borderColor: "#A8D4E1",
    margin: "20px 0",
  };
  
  const heading = {
    color: "#1B4D6A",
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "'Space Mono', monospace",
    textAlign: "center" as const,
    margin: "30px 0",
  };
  
  const heading2 = {
    color: "#1B4D6A",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "'Space Mono', monospace",
    margin: "20px 0 10px",
  };
  
  const paragraph = {
    color: "#5B8A9A",
    fontSize: "16px",
    lineHeight: "24px",
    textAlign: "left" as const,
  };
  
  const anchor = {
    color: "#5BA2C2",
  };
  
  const signatureContainer = {
    display: "flex",
    alignItems: "center",
    marginTop: "20px",
  };
  
  const signatureFavicon = {
    marginRight: "8px",
  };
  
  const signatureText = {
    color: "#1B4D6A",
    fontSize: "16px",
    fontWeight: "bold",
  };
  
  const footer = {
    color: "#5BA2C2",
    fontSize: "12px",
    lineHeight: "16px",
    textAlign: "center" as const,
    margin: "8px 0",
  };