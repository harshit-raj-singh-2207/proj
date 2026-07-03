import { useState } from "react";

function TrendRadar() {
  const [search, setSearch] = useState("");

  return (
    <div
      className="container py-5"
      style={{ background: "#f8fafc", minHeight: "100vh" }}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">
          📈 TrendRadar
        </h1>
        <p className="text-muted">
          Explore trending technologies and career insights.
        </p>
      </div>

      {/* Search */}
      <div className="card shadow border-0 rounded-4 mb-4">
        <div className="card-body">
          <div className="input-group">
            <input
              className="form-control"
              placeholder="Search Technology..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Trending + Market */}
      <div className="row g-4">

        <div className="col-lg-6">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body">
              <h4 className="text-primary mb-3">
                🔥 Trending Technologies
              </h4>

              <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                  React.js <span className="text-success">▲ +18%</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  AI Engineering <span className="text-success">▲ +35%</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  Docker <span className="text-success">▲ +12%</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  Kubernetes <span className="text-success">▲ +25%</span>
                </li>

                <li className="list-group-item d-flex justify-content-between">
                  AWS <span className="text-success">▲ +21%</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body">
              <h4 className="text-primary mb-3">
                📊 Market Demand
              </h4>

              <p>High Demand</p>

              <div className="progress mb-3">
                <div
                  className="progress-bar bg-success"
                  style={{ width: "90%" }}
                >
                  90%
                </div>
              </div>

              <h6>Average Salary</h6>
              <h4>₹12 LPA</h4>

              <h6 className="mt-3">Open Jobs</h6>
              <h4>18,500+</h4>

              <h6 className="mt-3">Growth Rate</h6>
              <h4 className="text-success">+28%</h4>
            </div>
          </div>
        </div>

      </div>

      {/* Skills + News */}
      <div className="row g-4 mt-2">

        <div className="col-lg-6">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body">

              <h4>📚 Required Skills</h4>

              <span className="badge bg-primary m-1">JavaScript</span>
              <span className="badge bg-primary m-1">React</span>
              <span className="badge bg-primary m-1">Redux</span>
              <span className="badge bg-primary m-1">TypeScript</span>
              <span className="badge bg-primary m-1">REST API</span>
              <span className="badge bg-primary m-1">Git</span>
              <span className="badge bg-primary m-1">Tailwind CSS</span>

            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card shadow border-0 rounded-4 h-100">
            <div className="card-body">

              <h4>📰 Latest Industry News</h4>

              <ul>
                <li>React 20 Released</li>
                <li>AI Engineers are in highest demand</li>
                <li>Companies are adopting TypeScript rapidly</li>
              </ul>

            </div>
          </div>
        </div>

      </div>

      {/* AI Suggestion */}
      <div className="card shadow border-0 rounded-4 mt-4">
        <div className="card-body">

          <h4>💡 AI Career Suggestion</h4>

          <p className="text-muted">
            Based on your profile, learn
            <strong> TypeScript</strong> and
            <strong> Docker</strong> to improve
            your chances of getting hired.
          </p>

          <button className="btn btn-primary me-3">
            View Learning Resources
          </button>

          <button className="btn btn-success me-3">
            View Job Openings
          </button>

          <button className="btn btn-outline-secondary">
            Save Trend
          </button>

        </div>
      </div>

    </div>
  );
}

export default TrendRadar;