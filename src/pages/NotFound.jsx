import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-white bg-bajrang-brand">
      {/* Error Code */}
      <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-bajrang-accent drop-shadow-lg">
        404
      </h1>

      {/* Error Message */}
      <h2 className="mb-3 text-3xl font-bold md:text-4xl">
        Oops! Page Not Found
      </h2>
      <p className="max-w-xl mb-8 text-lg text-center text-bajrang-surfaceAlt md:text-xl">
        The page you are looking for doesn’t exist or has been moved. Let’s get
        you back on track.
      </p>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-6 py-3 transition-all shadow-md bg-bajrang-surface text-bajrang-brand rounded-xl hover:bg-bajrang-hover"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 px-6 py-3 font-semibold transition-all shadow-md bg-bajrang-accent text-bajrang-brand rounded-xl hover:brightness-110"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>

      {/* Decorative line */}
      <div className="w-24 h-1 mt-12 rounded-full bg-bajrang-accent"></div>
    </div>
  );
};

export default NotFound;
