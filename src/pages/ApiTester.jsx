import { useState } from "react";

export default function ApiTester() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState("");
  const [token, setToken] = useState(""); // New token field
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    setLoading(true);

    try {
      // Parse user headers if provided
      let customHeaders = {};
      if (headers) {
        try {
          customHeaders = JSON.parse(headers);
        } catch (err) {
          alert("Headers must be valid JSON");
          setLoading(false);
          return;
        }
      }

      // Add Authorization token if provided
      if (token) {
        customHeaders["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(url, {
        method,
        headers: customHeaders,
        body: method !== "GET" ? body : undefined,
      });

      const data = await res.json().catch(() => "No JSON response");
      setResponse({ status: res.status, data });
    } catch (err) {
      setResponse({ error: err.message });
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">API Tester</h1>

      <input
        type="text"
        placeholder="API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <div className="flex gap-3 mb-3">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>DELETE</option>
          <option>PATCH</option>
        </select>

        <button
          onClick={sendRequest}
          className="px-5 py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>

      <input
        type="text"
        placeholder="Authorization Token (optional)"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        placeholder='Additional Headers as JSON: {"Content-Type":"application/json"}'
        value={headers}
        onChange={(e) => setHeaders(e.target.value)}
        className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        rows={3}
      />

      {method !== "GET" && (
        <textarea
          placeholder="Request body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-3 border rounded mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}
        />
      )}

      <div className="bg-white p-4 rounded border overflow-auto max-h-96">
        <h2 className="font-semibold mb-2">Response:</h2>
        <pre className="text-sm text-gray-700 whitespace-pre-wrap">
          {JSON.stringify(response, null, 2)}
        </pre>
      </div>
    </div>
  );
}
