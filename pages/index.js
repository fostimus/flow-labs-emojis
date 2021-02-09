import Head from "next/head";
import { Octokit } from "@octokit/core";
import { useState, useEffect } from "react";
import { Pagination } from "react-bootstrap";

export default function Home() {
  const [emojis, setEmojis] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [numberPages, setNumberPages] = useState(0);
  const [pageControlSize, setPageControlSize] = useState(5);

  const [displayedEmojis, setDisplayedEmojis] = useState([]);

  const [filterValue, setFilterValue] = useState("");

  useEffect(async () => {
    const octokit = new Octokit();
    const response = await octokit.request("GET /emojis");

    const returnedEmojis = Object.entries(response.data);

    setEmojis(returnedEmojis);
    setDisplayedEmojis(returnedEmojis.slice(0, pageSize));
    setNumberPages(Math.ceil(returnedEmojis.length / pageSize));
  }, []);

  const clickPage = number => {
    console.log(number);
    setCurrentPage(number);
    setDisplayedEmojis(
      emojis.slice((number - 1) * pageSize),
      number * pageSize
    );
  };

  const paginate = index => {
    const controlLimit = index + pageControlSize;

    const limit = controlLimit >= numberPages ? numberPages : controlLimit;

    const pageControls = [];
    while (index < limit) {
      const control = (
        <Pagination.Item
          active={index === currentPage ? true : false}
          onClick={() => clickPage(index)}
        >
          {index}
        </Pagination.Item>

        //<Pagination.Ellipsis />
      );

      pageControls.push(control);
      index++;
    }

    return pageControls;
  };

  const filter = e => {
    e.preventDefault();

    //if filter value is specified, search that. if not, return initial emojis
    setDisplayedEmojis(
      filterValue
        ? emojis.filter(emoji => emoji[0].startsWith(filterValue))
        : emojis.slice(0, page.size)
    );
  };

  const tableStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "80px"
  };

  console.log(displayedEmojis);

  return (
    <>
      <Head>
        <title>Flow Labs Interview</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <h1 className="text-center"> Flow Labs frontend interview</h1>

        <form className="text-center" action="">
          <label htmlFor="">Filter By Name:</label>
          <input onChange={e => setFilterValue(e.target.value)} type="text" />

          <button onClick={filter}>Filter</button>
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

            {paginate(1)}

            <Pagination.Next />
            <Pagination.Last />
          </Pagination>
        </div>
      </main>
    </>
  );
}
