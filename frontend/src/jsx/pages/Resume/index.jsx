import React, { useState } from "react";

const Resume = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div
      className="container py-5"
      style={{ background: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">Resume Analyzer</h1>
        <p className="text-muted">
          Upload your resume and get AI-powered feedback.
        </p>
      </div>

      {/* Upload Card */}
      <div className="card shadow border-0 rounded-4 mb-4">
        <div className="card-body p-5">

          <div
            className="border border-3 border-primary rounded-4 p-5 text-center"
            style={{ borderStyle: "dashed", background: "#fdfdfd" }}
          >
            <i className="bi bi-cloud-arrow-up-fill text-primary fs-1"></i>

            <h4 className="mt-3">Drag & Drop Resume Here</h4>

            <p className="text-muted">PDF or DOCX</p>

            <input
              type="file"
              id="resume"
              hidden
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
            />

            <label
              htmlFor="resume"
              className="btn btn-primary px-4 mt-2"
            >
              Browse File
            </label>
          </div>

          {/* Uploaded File */}

          {file && (
            <div className="card mt-4 border-success">
              <div className="card-body d-flex justify-content-between align-items-center">
                <div>
                  <h5>{file.name}</h5>

                  <small className="text-muted">
                    {(file.size / 1024).toFixed(2)} KB
                  </small>
                </div>

                <button className="btn btn-success">
                  Analyze Resume
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Result */}

      <div className="row g-4">

        {/* Left */}

        <div className="col-lg-4">

          <div className="card shadow border-0 rounded-4">
            <div className="card-body text-center">

              <h3 className="text-success">Resume Score</h3>

              <h1 className="display-3 fw-bold">86</h1>

              <p>/100</p>

              <hr />

              <h4 className="text-primary">ATS Score</h4>

              <h2>82%</h2>

            </div>
          </div>

        </div>

        {/* Right */}

        <div className="col-lg-8">

          <div className="card shadow border-0 rounded-4">
            <div className="card-body">

              <div className="row">

                {/* Strength */}

                <div className="col-md-6">

                  <h4 className="text-success mb-3">

                    <i className="bi bi-check-circle-fill"></i> Strengths

                  </h4>

                  <ul className="list-group">

                    <li className="list-group-item">
                      Good formatting
                    </li>

                    <li className="list-group-item">
                      Technical skills
                    </li>

                  </ul>

                </div>

                {/* Weakness */}

                <div className="col-md-6">

                  <h4 className="text-danger mb-3">

                    <i className="bi bi-x-circle-fill"></i> Weaknesses

                  </h4>

                  <ul className="list-group">

                    <li className="list-group-item">
                      Missing Projects
                    </li>

                    <li className="list-group-item">
                      Weak Summary
                    </li>

                  </ul>

                </div>

              </div>

              <hr />

              {/* Missing Skills */}

              <h4 className="text-warning mb-3">

                Missing Skills

              </h4>

              <span className="badge bg-primary me-2 p-2">
                React
              </span>

              <span className="badge bg-dark me-2 p-2">
                Docker
              </span>

              <span className="badge bg-success me-2 p-2">
                AWS
              </span>

              <hr />

              {/* Suggestions */}

              <h4 className="text-info">

                AI Suggestions

              </h4>

              <ul>

                <li>Add measurable achievements.</li>

                <li>Improve professional summary.</li>

                <li>Add GitHub & LinkedIn links.</li>

              </ul>

              <div className="mt-4">

                <button className="btn btn-success me-3">
                  Download Report
                </button>

                <button className="btn btn-primary">
                  Improve Resume
                </button>

              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Resume;