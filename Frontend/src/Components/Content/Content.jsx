import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../ApiUrl";
import Show from "./Show";
import CreateSub from "./Subject/CreateSub";
import "../Home/pagination.css";

function Content() {
  const BackendUrl = API_BASE_URL;
  const [data, setData] = useState({
    page: 1,
    subjects: [],
    totalPages: "",
    Pages: [],
  });
  const [loading, setLoading] = useState(true);
  const [Error, setError] = useState("");
  const [show, setShow] = useState(false);
  useEffect(() => {
    const ContentData = async () => {
      try {
        const responsee = await axios.get(
          `${BackendUrl}/content?page=${data.page}`
        );
        const response = responsee.data;
        setData((prev) => ({
          ...prev,
          page: response.page,
          subjects: response.subjects,
          totalPages: response.totalPages,
          Pages: response.Pages,
        }));
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    ContentData();
  }, [data]);

  const Images = [
    "/Assets/Frame 77 (1).svg",
    "/Assets/Frame 78.svg",
    "/Assets/Frame 80.svg",
  ];

  return (
    <>
      <div className="container">
        <div className="text-center mt-2 ">
          <i
            class="fa-solid fa-circle-plus fa-2x"
            onClick={() => setShow(!show)}
          ></i>
        </div>
        {/* Create form  */}
        {show && <CreateSub onClose={() => setShow(false)} />}

        <div className="Notes text-center fs-4 fw-bold mt-3 text-decoration-underline mb-3 ">
          Notes Section
        </div>

        {/* Display Error messages */}
        {Error && <p className="text-danger text-center">{Error}</p>}
        {/* Display spinner unitil data comes */}
        {loading && (
          <p className="text-center mt-5">
            {" "}
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </p>
        )}

        {/* MAin Data  */}
        <div className="row">
          {data.subjects.map((data, index) => (
            <Show
              key={index}
              id={data._id}
              sub={data.subject}
              img={Images[index % Images.length]}
            />
          ))}
        </div>
        <div className="pagination">
          {data.Pages.map((page, index) => {
            return (
              <button
                key={index}
                onClick={() => {
                  setData((prev) => ({ ...prev, page: page }));
                }}
                className={page === data.page ? "active" : ""}
              >
                {page}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Content;
