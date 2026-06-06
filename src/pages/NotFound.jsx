import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white/5">
      <div className="text-center max-w-md">
        <h1 className="text-7xl font-bold text-white">404</h1>

        <p className="mt-4 text-lg text-slate-300">
          Sorry, the page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/"
            className="px-6 py-2 rounded-lg hover:bg-black text-white text-sm font-medium bg-[#DC2626] transition"
          >
            Go Home
          </Link>

          {/* <Link
            to="/contact"
            className="px-6 py-2 bg-white/10  rounded-lg border border-white/10 text-sm font-medium text-slate-200 hover:bg-white/10 transition"
          >
            Contact Support
          </Link> */}
        </div>
      </div>
    </div>
  );
}
