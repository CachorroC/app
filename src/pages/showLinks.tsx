import { useState } from "react";
import Layout from "../components/layout";
import { intLink } from "../types/link.interface";
type Props = {
  links: [intLink];
};

export async function getServerSideProps() {
  try {
    let response = await fetch("http://localhost:3000/api/getLinks");
    let links = await response.json();

    return {
      props: { links: JSON.parse(JSON.stringify(links)) },
    };
  } catch (e) {
    console.error(e);
  }
}
export default function Links(props: Props) {
  const [links, setLinks] = useState(props.links);

  const handleDeleteLink = async (linkId: string) => {
    try {
      let response = await fetch(
        "http://localhost:3000/api/delLink?id=" + linkId,
        {
          method: "POST",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
        }
      );
      response = await response.json();
      window.location.reload();
    } catch (error) {
      console.log("An error occurred while deleting ", error);
    }
  };
  return (
    <Layout>
      <div className="links-body">
        <h1 className="links-body-heading">Top 20 Added Links</h1>
        {links.length > 0 ? (
          <ul className="links-list">
            {links.map((link, index) => {
              return (
                <li key={index} className="link-item">
                  <div className="link-item-details">
                    <h2>{link.name}</h2>

                    <p>{link.url}</p>
                  </div>
                  <div className="link-item-actions">
                    <a href={`/links/${link._id}`}>Edit</a>
                    <button
                      onClick={() =>
                        handleDeleteLink(link._id as unknown as string)
                      }
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <h2 className="links-body-heading">Ooops! No links added so far</h2>
        )}
      </div>
      <style jsx>
        {`
          .links-body {
            width: 400px;
            margin: 10px auto;
          }
          .links-body-heading {
            font-family: sans-serif;
          }
          .links-list {
            list-style-type: none;
            display: block;
          }
          .link-item {
            width: 100%;
            padding: 10px;
            border: 1px solid #d5d5d5;
          }
          .link-item-actions {
            display: flex;
            justify-content: space-between;
          }
          .link-item-actions a {
            text-decoration: none;
          }
        `}
      </style>
    </Layout>
  );
}
