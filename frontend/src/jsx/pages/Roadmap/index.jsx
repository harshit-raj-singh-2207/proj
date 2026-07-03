import { useState } from "react";

function Roadmap() {
  const [career, setCareer] = useState("Full Stack");

  return (
    <div
      className="container py-5"
      style={{ background: "#f5f7fb", minHeight: "100vh" }}
    >
      {/* Header */}

      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">
          <i className="bi bi-map-fill me-2"></i>
          Career Roadmap
        </h1>

        <p className="text-muted">
          Track your learning journey step by step.
        </p>
      </div>

      {/* Top Controls */}

      <div className="card shadow border-0 rounded-4 mb-5">
        <div className="card-body">

          <div className="row g-3 align-items-center">

            <div className="col-md-8">

              <label className="fw-bold mb-2">
                Select Your Career Goal
              </label>

              <select
                className="form-select"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
              >
                <option>Full Stack</option>
                <option>Frontend</option>
                <option>Backend</option>
                <option>Java Developer</option>
                <option>Python Developer</option>
              </select>

            </div>

            <div className="col-md-4 d-grid">

              <button className="btn btn-primary mt-md-4">
                <i className="bi bi-stars me-2"></i>
                Generate Roadmap
              </button>

            </div>

          </div>

        </div>
      </div>

      {/* Frontend */}

      <div className="card shadow border-0 rounded-4 mb-4">

        <div className="card-body">

          <div className="d-flex justify-content-between">

            <h4 className="text-primary">
              Frontend
            </h4>

            <span className="badge bg-success fs-6">
              Completed
            </span>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">
              <ul className="list-group">

                <li className="list-group-item">HTML</li>

                <li className="list-group-item">CSS</li>

                <li className="list-group-item">Bootstrap</li>

              </ul>
            </div>

            <div className="col-md-6">
              <ul className="list-group">

                <li className="list-group-item">JavaScript</li>

                <li className="list-group-item">React</li>

                <li className="list-group-item">Redux</li>

              </ul>
            </div>

          </div>

          <div className="mt-4">

            <h6>Progress</h6>

            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar bg-success"
                style={{ width: "80%" }}
              >
                80%
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Backend */}

      <div className="card shadow border-0 rounded-4 mb-4">

        <div className="card-body">

          <div className="d-flex justify-content-between">

            <h4 className="text-warning">
              Backend
            </h4>

            <span className="badge bg-warning text-dark fs-6">
              In Progress
            </span>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

              <ul className="list-group">

                <li className="list-group-item">Node.js</li>

                <li className="list-group-item">Express.js</li>

                <li className="list-group-item">REST API</li>

              </ul>

            </div>

            <div className="col-md-6">

              <ul className="list-group">

                <li className="list-group-item">Authentication</li>

                <li className="list-group-item">MongoDB</li>

              </ul>

            </div>

          </div>

          <div className="mt-4">

            <h6>Progress</h6>

            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar bg-warning"
                style={{ width: "40%" }}
              >
                40%
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Advanced */}

      <div className="card shadow border-0 rounded-4 mb-5">

        <div className="card-body">

          <div className="d-flex justify-content-between">

            <h4 className="text-secondary">
              Advanced
            </h4>

            <span className="badge bg-secondary fs-6">
              Locked
            </span>

          </div>

          <hr />

          <div className="row">

            <div className="col-md-6">

              <ul className="list-group">

                <li className="list-group-item">Docker</li>

                <li className="list-group-item">AWS</li>

                <li className="list-group-item">CI/CD</li>

              </ul>

            </div>

            <div className="col-md-6">

              <ul className="list-group">

                <li className="list-group-item">System Design</li>

                <li className="list-group-item">Microservices</li>

              </ul>

            </div>

          </div>

          <div className="mt-4">

            <h6>Progress</h6>

            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar bg-secondary"
                style={{ width: "0%" }}
              >
                0%
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Cards */}

      <div className="row g-4">

        <div className="col-md-4">

          <div className="card shadow border-0 rounded-4 text-center">

            <div className="card-body">

              <i className="bi bi-clock-history fs-1 text-primary"></i>

              <h5 className="mt-3">Estimated Time</h5>

              <h3>4 - 6 Months</h3>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow border-0 rounded-4 text-center">

            <div className="card-body">

              <i className="bi bi-bar-chart-line fs-1 text-success"></i>

              <h5 className="mt-3">Current Level</h5>

              <h3>Intermediate</h3>

            </div>

          </div>

        </div>

        <div className="col-md-4">

          <div className="card shadow border-0 rounded-4 text-center">

            <div className="card-body">

              <i className="bi bi-book fs-1 text-warning"></i>

              <h5 className="mt-3">Next Topic</h5>

              <h3>Node.js</h3>

            </div>

          </div>

        </div>

      </div>

      {/* Button */}

      <div className="text-center mt-5">

        <button className="btn btn-lg btn-primary px-5">
          <i className="bi bi-play-circle-fill me-2"></i>
          Start Learning
        </button>

      </div>

    </div>
  );
}

export default Roadmap;