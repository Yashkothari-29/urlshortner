"use client";
import React, { useState } from "react";
import Link from "next/link";

const Shorten = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [generated, setGenerated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    try {
      setLoading(true);
      setError("");
      
      if (!url || !shortUrl) {
        setError("Please fill in all fields");
        return;
      }

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          shorturl: shortUrl,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to generate URL");
      }

      setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shortUrl}`);
      setUrl("");
      setShortUrl("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg bg-black my-16 p-9 rounded-lg flex flex-col gap-4">
      <h1 className="font-bold text-2xl text-white">
        Generate Your Short URL
      </h1>
      <div className="flex flex-col gap-4">
        <input
          value={url}
          className="px-4 py-2 focus:outline-purple-500 rounded-lg"
          type="text"
          placeholder="Enter Your URL"
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
        <input
          value={shortUrl}
          className="px-4 py-2 focus:outline-purple-500 rounded-lg"
          type="text"
          placeholder="Enter Your preferred Short URL text"
          onChange={(e) => setShortUrl(e.target.value)}
          disabled={loading}
        />
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        <button
          onClick={generate}
          disabled={loading}
          className={`bg-white font-bold text-black rounded-2xl my-3 p-2 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
        >
          {loading ? "Generating..." : "GENERATE"}
        </button>
        {generated && (
          <div className="mt-4">
            <span className="font-bold text-lg text-white">Your Link:</span>
            <div className="flex items-center gap-2 mt-2">
              <code className="text-white bg-gray-800 p-2 rounded flex-1 break-all">
                <Link target="_blank" href={generated} className="hover:text-purple-300">
                  {generated}
                </Link>
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generated);
                  alert("Copied to clipboard!");
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shorten;
