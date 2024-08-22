'use client'
import styles from "./page.module.css";
import Form from "@/app/components/Form/Form";
import Page from "@/app/pages/DataFetcher/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <Form />
        <Page />
    </main>
  );
}
