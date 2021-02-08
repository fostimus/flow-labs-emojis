import Head from "next/head";
import { Octokit } from "@octokit/core";
import { useState, useEffect } from "react";

export default function Home() {
  const [emojis, setEmojis] = useState([]);

  useEffect(async () => {
    const octokit = new Octokit();
    const response = await octokit.request("GET /emojis");

    console.log(response);
  }, []);

  return (
    <>
      <Head>
        <title>Flow Labs Interview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1> Flow Labs frontend interview</h1>
      </main>
    </>
  );
}
