import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Content() {
  const Navigate = useNavigate();

  useEffect(() => {
    toast("Loading... Please don’t hold your breath!", {
      duration: 2800,
      icon: "👏",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });

    setTimeout(() => {
      Navigate("/home");
    }, 3000);
  }, []);

  return (
    <>
      <div className="container">
        <div
          className="d-flex justify-content-center align-items-center fs-1 fw-bold"
          style={{
            height: "70vh",
            color: "rgba(0, 0, 0, 0.6)",
            borderRadius: "10px",
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          Coming Soon!
        </div>
      </div>

      <Toaster />
    </>
  );
}

export default Content;
