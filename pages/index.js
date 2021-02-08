import Head from "next/head";
import { Octokit } from "@octokit/core";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function Home() {
  const [emojis, setEmojis] = useState([]);
  const [page, setPage] = useState({ size: 10, number: 0 });
  const [displayedEmojis, setDisplayedEmojis] = useState([]);

  useEffect(async () => {
    const octokit = new Octokit();
    const response = await octokit.request("GET /emojis");

    const returnedEmojis = Object.entries(response.data);

    setEmojis(returnedEmojis);
    setDisplayedEmojis(returnedEmojis.slice(0, page.size));
    setPage({
      size: page.size,
      number: Math.ceil(returnedEmojis.length / page.size)
    });
  }, []);

  const tableStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "80px"
  };

  return (
    <>
      <Head>
        <title>Flow Labs Interview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1> Flow Labs frontend interview</h1>

        <Pagination>
          <Pagination.First />
          <Pagination.Prev />

          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
        <div style={{ width: "400px", margin: "0 auto" }}>
          <div style={tableStyle}>
            <h3>Name</h3>
            <h3>Emoji</h3>
          </div>

          {displayedEmojis.map(emoji => (
            <div style={tableStyle}>
              <h4>{emoji[0]}</h4>
              <img src={emoji[1]} alt="" />
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

/*
<Pagination.Item>{1}</Pagination.Item>
<Pagination.Ellipsis />

<Pagination.Item>{10}</Pagination.Item>
<Pagination.Item>{11}</Pagination.Item>
<Pagination.Item active>{12}</Pagination.Item>
<Pagination.Item>{13}</Pagination.Item>
<Pagination.Item disabled>{14}</Pagination.Item>

<Pagination.Ellipsis />
<Pagination.Item>{20}</Pagination.Item>
*/
