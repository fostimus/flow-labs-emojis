import Head from "next/head";
import { Octokit } from "@octokit/core";
import { useState, useEffect } from "react";

export default function Home() {
  const [emojis, setEmojis] = useState([]);

  useEffect(async () => {
    const octokit = new Octokit();
    const response = await octokit.request("GET /emojis");

    setEmojis(Object.entries(response.data));
  }, []);

  return (
    <>
      <Head>
        <title>Flow Labs Interview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1> Flow Labs frontend interview</h1>
        <div>
          {emojis.map(emoji => (
            <div>
              <h3>{emoji[0]}</h3>
              <img src={emoji[1]} alt="" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
