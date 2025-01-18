import React from "react";
function Social() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row text-center ">
        <div className="col-4">
          <img
            src="/Assets/Contributors.svg"
            alt="contributors"
            className="SocialHome img-fluid"
          />
        </div>
        <div className="col-4 ">
          <img
            src="/Assets/Github.svg"
            alt="contributors"
            className="SocialHome img-fluid"
          />
        </div>
        <div className="col-4 ">
          <img
            src="/Assets/Content.svg"
            alt="contributors"
            className="SocialHome img-fluid"
          />
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-12 mt-md-5">
          <h1 className="fs-1 fw-bolder mt-5">Latest Uploads</h1>
        </div>
      </div>
    </div>
  );
}

export default Social;
