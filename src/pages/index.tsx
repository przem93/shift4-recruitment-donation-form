import clsx from "clsx";
import Head from "next/head";
import Image from "next/image";
import { Work_Sans } from "next/font/google";

import { DonationForm } from "@/features/donation-form/DonationForm";
import { Main } from "@/components/Main";
import { PlaceSurface } from "@/components/PlaceSurface";
import { Header } from "@/components/Header";

import LogoImage from '@/assets/Logo.svg'

import styles from '@/styles/HomePage.module.css'

const workSans = Work_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export default function Home() {
  return <>
    <Head>
      <title>Donation Form</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <PlaceSurface className={clsx(styles.HomePage, workSans.className)} color="SkyBlue">
      <Header className={styles.Header} logo={
        <Image alt="Donation form logo" src={LogoImage} />
      } />
      <Main>
        <DonationForm />
      </Main>
    </PlaceSurface>
  </>
}
