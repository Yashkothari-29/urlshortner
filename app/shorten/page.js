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
      setGenerated("");
      
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

      setGenerated(result.shortUrl);
      setUrl("");
      setShortUrl("");
    } catch (err) {
      setError(err.message);
      console.error("Error generating URL:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="flex flex-col gap-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Generate Your Short URL
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter a long URL and your preferred short URL text to generate a shortened link.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-gray-700">
                Long URL
              </label>
              <input
                id="url"
                value={url}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                type="text"
                placeholder="https://example.com/very/long/url"
                onChange={(e) => setUrl(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="shortUrl" className="block text-sm font-medium text-gray-700">
                Custom Short URL
              </label>
              <input
                id="shortUrl"
                value={shortUrl}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                type="text"
                placeholder="my-custom-url"
                onChange={(e) => setShortUrl(e.target.value)}
                disabled={loading}
              />
              <p className="mt-1 text-xs text-gray-500">
                Only letters, numbers, and hyphens are allowed
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              onClick={generate}
              disabled={loading}
              className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Generating..." : "Generate Short URL"}
            </button>
          </div>

          {generated && (
            <div className="mt-6 bg-gray-50 rounded-lg p-4">
              <h2 className="text-sm font-medium text-gray-900">Your Shortened URL</h2>
              <div className="mt-2 flex items-center gap-2">
                <code className="flex-1 block w-full p-2 text-sm bg-gray-100 rounded break-all">
                  <Link href={generated} target="_blank" className="text-purple-600 hover:text-purple-800">
                    {generated}
                  </Link>
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(generated);
                    alert("Copied to clipboard!");
                  }}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shorten;
