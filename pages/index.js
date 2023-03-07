import { Button, Card, CardBody, Container, Heading, Link, Spinner, Text, Textarea, VStack } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react';

export default function Home() {
  const [text, setText] = useState('');
  const [translations, setTranslations] = useState([]);
  const [thinking, setThinking] = useState(false);

  async function translate() {
    setThinking(true);
    let res = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    let json = await res.json();

    setTranslations([json.text, ...translations]);
    setThinking(false);
  }

  return (
    <>
      <Head>
        <title>Pirate Translate</title>
        <meta name="description" content="Convert any text to pirate speak with ChatGPT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🏴‍☠️</text></svg>"></link>
      </Head>
      <main>
        <VStack mt={5}>
          <Container textAlign='center'>
            <Heading>🏴‍☠️ Pirate Translate</Heading>
            <Text>Convert any text to pirate speak</Text>
          </Container>
          <Container textAlign='center'>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder='Text to be translated'></Textarea>
            <Button disabled={!thinking} onClick={translate} mt={3}>{!thinking ? ('Translate') : (<Spinner />)}</Button>
          </Container>
          <Container textAlign='center'>
            <VStack>
              {translations.map((translation, index) => (
                <Card key={index}>
                  <CardBody>
                    <Text>{translation}</Text>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </Container>
        </VStack>
        <Container textAlign='right' pb={2} position='fixed' bottom={0} right={0}>
          <Text>Powered with <Link isExternal href='https://chat.openai.com/'>ChatGPT</Link> | <Link isExternal href='https://github.com/tgb20/pirate-translate'>Github</Link></Text>
        </Container>
      </main>
    </>
  )
}
