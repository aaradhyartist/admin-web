import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-gray-900">404</h1>

        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg hover:bg-black text-white text-sm font-medium bg-[#31b8c6] transition"
          >
            Go Home
          </Link>

          {/* <Link
            to="/contact"
            className="px-6 py-2 bg-slate-100  rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Contact Support
          </Link> */}
        </div>
      </div>
    </div>
  );
}
