import React from "react";
import "isomorphic-fetch";

import Head from "next/head";
import Link from "next/link";
export default class App extends React.Component {
  static async getInitialProps({ query }) {
    let page = 1;
    if (query.page != undefined && parseInt(query.page)) {
      page = query.page;
    }
    const res = await fetch(
      `https://api.pokemontcg.io/v1/cards?page=${page}&pageSize=12`
    );
    const data = await res.json();
    return data;
  }
  render() {
    return (
      <div className="container">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="stylesheet"
            href="//cdn.bootcss.com/spectre.css/0.1.29/spectre.min.css"
          />
          <link
            rel="stylesheet"
            href="/home/trung/program language/ani-nextjs/pages/main.css"
          />
        </Head>
        <div className="columns">
          {this.props.cards.map((card, i) => (
            <div class="col-md-3" className="col-md-3" key={i}>
              <div style={{ margin: 10 }}>
                <Link href={`/cards?id=${card.id}`}>
                  {
                    <a>
                      <img src={card.imageUrl} className="img-responsive" />
                    </a>
                  }
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="divider"></div>
        <div className="container">
          <div className="float-right">
            <ul className="pagination">
              <li className="page-item">
                <Link href={`/?page=1`}>1</Link>
              </li>
              <li className="page-item">
                <Link href={`/?page=2`}>2</Link>
              </li>
              <li className="page-item">
                <Link href={`/?page=3`}>3</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
