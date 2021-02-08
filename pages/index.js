import Head from "next/head";
import { Octokit } from "@octokit/core";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function Home() {
  const [emojis, setEmojis] = useState([]);
  const [page, setPage] = useState({ size: 10, number: 0, controlSize: 5 });
  const [displayedEmojis, setDisplayedEmojis] = useState([]);

  const [filterValue, setFilterValue] = useState("");

  useEffect(async () => {
    const octokit = new Octokit();
    const response = await octokit.request("GET /emojis");

    const returnedEmojis = Object.entries(response.data);

    setEmojis(returnedEmojis);
    setDisplayedEmojis(returnedEmojis.slice(0, page.size));
    setPage({
      size: page.size,
      number: Math.ceil(returnedEmojis.length / page.size),
      controlSize: page.controlSize
    });
  }, []);

  const tableStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "80px"
  };

  const filter = e => {
    e.preventDefault();

    //do something with filterValue
  };

  return (
    <>
      <Head>
        <title>Flow Labs Interview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1> Flow Labs frontend interview</h1>

        <form action="">
          <label htmlFor="">Filter By Name:</label>
          <input onChange={e => setFilterValue(e.target.value)} type="text" />

          <button onClick={}>Filter</button>
        </form>

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
          <Pagination
            style={{
              display: "inline-flex",
              justifyContent: "center",
              width: "100%"
            }}
          >
            <Pagination.First />
            <Pagination.Prev />

            {/* todo: add in pagination logic*/}

            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
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
