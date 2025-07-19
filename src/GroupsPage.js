import React from "react";
import "./GroupsPage.css";

function GroupsPage() {
  const teams = [
    {
      name: "CHS Scio",
      members: [
        { name: "John Doe", isAdmin: true },
        { name: "Jane Smith", isAdmin: false },
        { name: "Sam Brown", isAdmin: false },
      ],
    },
  ];

  const userTeams = ["CHS Scio"];

  return (
    <div className="groups-page">
      <header className="groups-header">
        <h2>Your Teams</h2>
        <button className="create-team-btn">Create Team</button>
      </header>

      <main className="teams-main">
        {teams.map((team) => (
          <section className="team-section" key={team.name}>
            <h3>{team.name}</h3>
            <ul className="members-list">
              {team.members.map((member) => (
                <li key={member.name} className="member-item">
                  <span>{member.name}</span>
                  {member.isAdmin && <span className="admin-badge">Admin</span>}
                  {!member.isAdmin && (
                    <button className="make-admin-btn">Make Admin</button>
                  )}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>
      <footer className="teams-footer">
        <span>Teams you are in:&nbsp;</span>
        {userTeams.join(", ")}
      </footer>
    </div>
  );
}

export default GroupsPage;