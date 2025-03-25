"use client";
import React, { useState } from "react";
import Link from "next/link";

const Shorten = () => {
  // this function code is directly taken from the postman api javascript-FETCH
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");

  const generate = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      url: url,
      shorturl: shortUrl,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("/api/generate", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setUrl("")
        setShortUrl("")
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`)
        console.log(result);
        alert(result.message);
      })
      .catch((error) => console.error(error));
  };
  //   const handleChange = (e) => {
  //     setUrl(e.target.value)
  //     // Handle input change here if needed
  //   };

  return (
    <div className="mx-auto max-w-lg bg-black my-16 p-9 rounded-lg flex flex-col gap-4 ">
      <h1 className="font-bold text-2xl text-white ">
        Generate Your Short URL
      </h1>
      <div className=" flex flex-col gap-4">
        <input
          value={url}
          className="px-4 py-2 focus:outline-purple-500 rounded-lg"
          type="text"
          placeholder="Enter Your URL"
          onChange={(e) => {
            setUrl(e.target.value);
          }}
        />
        <input
          value={shortUrl}
          className="px-4 py-2 focus:outline-purple-500 rounded-lg"
          type="text"
          placeholder="Enter Your preferred Short URL text"
          onChange={(e) => {
            setShortUrl(e.target.value);
          }}
        />
        <button
          onClick={generate}
          className="bg-white font-bold text-black rounded-2xl my-3 p-2 "
        >
          GENERATE
        </button>
        {generated && <><span className="font-bold text-lg text-white"> Your Link :</span> <code className="text-white"><Link target= "_blank" href={generated}>{generated}</Link>
          </code></>}
      </div>
    </div>
  );
};

export default Shorten;
