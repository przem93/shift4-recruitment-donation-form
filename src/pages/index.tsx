import Head from "next/head";
import { Work_Sans } from "next/font/google";

const workSans = Work_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Home() {
  return <>
    <Head>
      <title>Donation Form</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={workSans.className}>
    </main>
  </>
}