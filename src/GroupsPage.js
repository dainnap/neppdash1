import React from "react";
import "./GroupsPage.css";

function GroupsPage() {
  // Demo data
  const team = {
    name: "CHS Scio",
    members: [
      { name: "John Doe", isAdmin: true },
      { name: "Jane Smith", isAdmin: false },
      { name: "Sam Brown", isAdmin: false },
    ],
    primaryAdmin: "John Doe",
    memberCount: 32,
  };
  const userTeams = ["CHS Scio"];

  return (
    <div className="groups-root">
      <div className="groups-header-row">
        <h1 className="groups-title">Your Teams</h1>
        <button className="create-team-btn">
          <span className="create-team-icon" role="img" aria-label="Create">
            <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="4" width="24" height="24" rx="6" stroke="#FFD600" strokeWidth="2" fill="none"/>
              <path d="M10 22L22 10" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
              <path d="M13 10H22V19" stroke="#FFD600" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          Create Team
        </button>
      </div>

      <div className="group-card">
        <div className="group-card-header">
          <div className="group-card-title">{team.name}</div>
          <div className="group-card-info">
            <span className="group-info-item">
              <span role="img" aria-label="members" className="group-info-icon">👥</span>
              {team.memberCount} Members
            </span>
            <span className="group-info-item">
              <span role="img" aria-label="admin" className="group-info-icon">✔️</span>
              {team.primaryAdmin}
            </span>
          </div>
        </div>
        <ul className="members-list">
          {team.members.map((member, idx) => (
            <li key={`${member.name}-${idx}`} className="member-item">
              <span>{member.name}</span>
              {member.isAdmin ? (
                <span className="admin-badge">Admin</span>
              ) : (
                <button className="make-admin-btn">Make Admin</button>
              )}
            </li>
          ))}
        </ul>
      </div>

      <footer className="teams-footer">
        Teams you are in: {userTeams.join(", ")}
      </footer>
    </div>
  );
}

export default GroupsPage;