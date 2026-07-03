import { useState } from "react";

function Settings() {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("English");

  return (
    <div className="container py-5">
      <h2 className="fw-bold text-primary mb-4">
        <i className="bi bi-gear-fill me-2"></i>
        Settings
      </h2>

      {/* Profile */}
      <div className="card shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <h4>👤 Profile Information</h4>
          <hr />
          <p><strong>Name:</strong> Amardeep Kumar</p>
          <p><strong>Email:</strong> amardeep@gmail.com</p>
          <p><strong>Phone:</strong> +91 XXXXX XXXXX</p>

          <button className="btn btn-primary">
            Edit Profile
          </button>
        </div>
      </div>

      {/* Preferences */}
      <div className="card shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <h4>🎯 Career Preferences</h4>
          <hr />

          <label className="form-label">
            Career Goal
          </label>

          <select className="form-select mb-3">
            <option>Full Stack Developer</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Java Developer</option>
          </select>

          <label className="form-label">
            Preferred Language
          </label>

          <select
            className="form-select mb-3"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
          </select>

          <label className="form-label">
            Theme
          </label>

          <select
            className="form-select"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="card shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <h4>🔔 Notifications</h4>
          <hr />

          <div className="form-check">
            <input className="form-check-input" type="checkbox" defaultChecked />
            <label className="form-check-label">
              Email Notifications
            </label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" defaultChecked />
            <label className="form-check-label">
              Interview Reminders
            </label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" defaultChecked />
            <label className="form-check-label">
              Weekly Progress Report
            </label>
          </div>

          <div className="form-check">
            <input className="form-check-input" type="checkbox" />
            <label className="form-check-label">
              Job Alerts
            </label>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="card shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <h4>🔒 Security</h4>
          <hr />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Current Password"
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="New Password"
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
          />

          <button className="btn btn-success">
            Update Password
          </button>
        </div>
      </div>

      {/* Resume */}
      <div className="card shadow-sm rounded-4 mb-4">
        <div className="card-body">
          <h4>📄 Resume Settings</h4>
          <hr />

          <p><strong>Current Resume:</strong> Resume.pdf</p>

          <input
            type="file"
            className="form-control mb-3"
          />

          <button className="btn btn-primary">
            Upload Resume
          </button>
        </div>
      </div>

      {/* Account */}
      <div className="card shadow-sm rounded-4">
        <div className="card-body">
          <h4>⚙️ Account</h4>
          <hr />

          <button className="btn btn-outline-primary me-3">
            Export Data
          </button>

          <button className="btn btn-outline-danger me-3">
            Delete Account
          </button>

          <button className="btn btn-danger">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;