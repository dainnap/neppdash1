import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import MyRegister from "./MyRegister";
import MyLogin from "./MyLogin";
import Dashboard from "./Dashboard";
import Resources from "./Resources";

// Dummy icon components for sidebar 
function DashboardIcon() { return <span>🏠</span>; }
function GroupsIcon() { return <span>👥</span>; }
function ResourcesIcon() { return <span>📚</span>; }
function QuizzesIcon() { return <span>📝</span>; }
function EventsIcon() { return <span>📅</span>; }
function AnnouncementsIcon() { return <span>📢</span>; }
function VerifiedIcon() { return <span>✔️</span>; }

const SIDEBAR_TABS = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { key: "groups", label: "Groups", icon: <GroupsIcon /> },
  { key: "resources", label: "Resources", icon: <ResourcesIcon /> },
  { key: "quizzes", label: "Quizzes", icon: <QuizzesIcon /> },
  { key: "events", label: "Events", icon: <EventsIcon /> },
  { key: "announcements", label: "Announcements", icon: <AnnouncementsIcon /> },
];

// --- Groups Page with modal logic, create/delete ---
function Groups({ group, setGroup }) {
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newRole, setNewRole] = useState("admin");

  // Open create group modal
  function handleCreateGroup() {
    setShowCreate(true);
    setNewGroupName("");
    setNewRole("admin");
  }

  // Actually create the group
  function handleCreateSubmit(e) {
    e.preventDefault();
    if (newGroupName.trim()) {
      setGroup({ name: newGroupName.trim(), role: newRole });
      setShowCreate(false);
    }
  }

  // Delete group with confirmation
  function handleDeleteGroup() {
    setShowDelete(true);
  }
  function confirmDelete() {
    setGroup(null);
    setShowDelete(false);
  }
  function cancelDelete() {
    setShowDelete(false);
  }

  return (
    <div style={{ color: "#fff", padding: 40 }}>
      <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: 1, marginBottom: 40, color: "#FFD600" }}>Groups</div>
      <div style={{ marginBottom: 50 }}>
        <div style={{ fontWeight: 800, fontSize: 36, marginBottom: 20, color: "#FFD600" }}>Your Team</div>
        {!group ? (
          <>
            <div style={{ fontStyle: "italic", color: "#ccc", fontSize: 22, marginLeft: 10, marginBottom: 20 }}>
              Not in any group yet.
            </div>
            <button
              style={{
                marginTop: 8,
                padding: "14px 36px",
                fontSize: 24,
                borderRadius: 8,
                border: "2px solid #FFD600",
                background: "#FFD600",
                color: "#101622",
                cursor: "pointer",
                fontWeight: 700,
                boxShadow: "0 2px 10px #FFD60055"
              }}
              onClick={handleCreateGroup}
            >
              + Create a Group
            </button>
          </>
        ) : (
          <div style={{
            background: "#181f2e",
            borderRadius: 12,
            padding: "28px 32px",
            marginBottom: 20,
            color: "#FFD600",
            fontSize: 22,
            boxShadow: "0 2px 12px #FFD60022"
          }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#FFD600" }}>
              {group.name}
            </div>
            <div style={{ fontSize: 20, marginTop: 10, color: "#fff" }}>
              Role: <b>{group.role.charAt(0).toUpperCase() + group.role.slice(1)}</b>
            </div>
            <button
              style={{
                marginTop: 24,
                padding: "10px 26px",
                fontSize: 18,
                borderRadius: 8,
                border: "2px solid #e74c3c",
                background: "#e74c3c",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 700,
                boxShadow: "0 2px 10px #e74c3c55"
              }}
              onClick={handleDeleteGroup}
            >
              Delete Group
            </button>
          </div>
        )}
      </div>
      <div>
        <div style={{ fontWeight: 800, fontSize: 36, marginBottom: 20, color: "#FFD600" }}>Your Other Teams</div>
        <div style={{ fontStyle: "italic", color: "#ccc", fontSize: 22, marginLeft: 10 }}>
          Not in any other teams
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreate && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.88)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <form
            onSubmit={handleCreateSubmit}
            style={{
              background: "#101b28", borderRadius: 18, padding: 36, width: 420, maxWidth: "90vw", color: "#FFD600", boxShadow: "0 2px 24px #000"
            }}
          >
            <h2 style={{ color: "#FFD600", fontWeight: 900, fontSize: 30, marginBottom: 20 }}>Create a Group</h2>
            <label style={{ color: "#FFD600", fontSize: 20 }}>
              Group Name:
              <input
                type="text"
                value={newGroupName}
                onChange={e => setNewGroupName(e.target.value)}
                style={{
                  display: "block", width: "100%", padding: "10px", fontSize: 18, borderRadius: 7, border: "none", marginTop: 10, background: "#181f2e", color: "#FFD600"
                }}
                required
                autoFocus
              />
            </label>
            <div style={{ marginTop: 22, marginBottom: 24 }}>
              <label style={{ fontSize: 18, marginRight: 18 }}>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  checked={newRole === "admin"}
                  onChange={() => setNewRole("admin")}
                />{" "}
                Admin
              </label>
              <label style={{ fontSize: 18 }}>
                <input
                  type="radio"
                  name="role"
                  value="member"
                  checked={newRole === "member"}
                  onChange={() => setNewRole("member")}
                />{" "}
                Member
              </label>
            </div>
            <div style={{ display: "flex", gap: 20, justifyContent: "flex-end" }}>
              <button
                type="button"
                onClick={() => setShowCreate(false)}
                style={{
                  background: "none", border: "2px solid #FFD600", color: "#FFD600", borderRadius: 8, padding: "8px 22px", fontWeight: 700, fontSize: 18, cursor: "pointer"
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: "#FFD600", color: "#101622", border: "none", borderRadius: 8, padding: "8px 22px", fontWeight: 700, fontSize: 18, cursor: "pointer"
                }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDelete && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
          background: "rgba(0,0,0,0.88)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <div style={{
            background: "#101b28", borderRadius: 18, padding: 36, width: 360, maxWidth: "90vw", color: "#FFD600", boxShadow: "0 2px 24px #000", textAlign: "center"
          }}>
            <h2 style={{ color: "#FFD600", fontWeight: 900, fontSize: 28, marginBottom: 20 }}>Delete Group?</h2>
            <p style={{ color: "#fff", fontSize: 20, marginBottom: 24 }}>Are you sure you want to delete this group?</p>
            <div style={{ display: "flex", gap: 24, justifyContent: "center" }}>
              <button
                onClick={cancelDelete}
                style={{
                  background: "none", border: "2px solid #FFD600", color: "#FFD600", borderRadius: 8, padding: "8px 22px", fontWeight: 700, fontSize: 18, cursor: "pointer"
                }}
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                style={{
                  background: "#e74c3c", color: "#fff", border: "none", borderRadius: 8, padding: "8px 22px", fontWeight: 700, fontSize: 18, cursor: "pointer"
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Tutorial Modal, show only after sign up
function TutorialModal({ onClose }) {
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh",
      background: "rgba(0,0,0,0.88)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#101b28", borderRadius: 18, padding: 36, width: 460, maxWidth: "90vw", color: "#FFD600", boxShadow: "0 2px 24px #000",
        textAlign: "center"
      }}>
        <h1 style={{ color: "#FFD600", fontWeight: 900, fontSize: 36, marginBottom: 16 }}>Welcome to NEPP!</h1>
        <p style={{ fontSize: 20, marginBottom: 18 }}>
          Here’s a quick guide:
        </p>
        <ol style={{ color: "#fff", textAlign: "left", fontSize: 18, margin: "0 0 18px 0", paddingLeft: 24 }}>
          <li><b>Dashboard:</b> Overview of your activity, events, and progress.</li>
          <li><b>Groups:</b> Join or create a team to collaborate with others.</li>
          <li><b>Resources:</b> Access study material and guides.</li>
          <li><b>Quizzes:</b> Test your knowledge and track your improvement.</li>
          <li><b>Events:</b> See upcoming competitions and activities.</li>
          <li><b>Announcements:</b> Stay updated with the latest news.</li>
          <li><b>Your Profile:</b> Click your email at the bottom left to view and edit your info.</li>
        </ol>
        <button
          style={{
            background: "#FFD600",
            color: "#101622",
            border: "none",
            borderRadius: 8,
            padding: "12px 28px",
            fontWeight: 700,
            fontSize: 20,
            cursor: "pointer",
            marginTop: 10,
          }}
          onClick={onClose}
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

// 
function Quizzes() {
  return <div style={{ color: "#fff", padding: 40 }}>Quizzes Page (Placeholder)</div>;
}
function Events() {
  return <div style={{ color: "#fff", padding: 40 }}>Events Page (Placeholder)</div>;
}
function Announcements() {
  return <div style={{ color: "#fff", padding: 40 }}>Announcements Page (Placeholder)</div>;
}

function getTutorialKey(email) {
  return `nepp_tutorial_seen:${email}`;
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState(null);
  const [showTutorial, setShowTutorial] = useState(false);
  const [group, setGroup] = useState(null);

  // Used to track if user just signed up, for tutorial
  const [justSignedUpEmail, setJustSignedUpEmail] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      // Always go to dashboard on login
      if (u) setPage("dashboard");
    });
    return () => unsub();
  }, []);

  // Show tutorial only after sign up
  useEffect(() => {
    if (user && justSignedUpEmail === user.email) {
      const key = getTutorialKey(user.email);
      if (!localStorage.getItem(key)) {
        setShowTutorial(true);
        localStorage.setItem(key, "yes");
      }
      setJustSignedUpEmail(null);
    }
  }, [user, justSignedUpEmail]);

  if (!user) {
    if (!authMode) {
      return (
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"10vh"}}>
          <h1>Welcome to NEPP!</h1>
          <div style={{display:"flex",gap:24,marginTop:30}}>
            <button
              style={{padding:"14px 36px",fontSize:22,background:"#FFD600",border:"none",borderRadius:10,fontWeight:700,cursor:"pointer"}}
              onClick={() => setAuthMode("login")}
            >
              Log In
            </button>
            <button
              style={{padding:"14px 36px",fontSize:22,background:"#111722",color:"#FFD600",border:"2px solid #FFD600",borderRadius:10,fontWeight:700,cursor:"pointer"}}
              onClick={() => setAuthMode("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
      );
    }
    return (
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:"10vh"}}>
        {authMode === "login" ? (
          <>
            <MyLogin onSuccess={() => setAuthMode(null)} />
            <p>
              Don't have an account?{" "}
              <button onClick={() => setAuthMode("signup")} style={{background:"none",border:"none",color:"#FFD600",fontWeight:700,cursor:"pointer"}}>Sign Up</button>
            </p>
            <button onClick={() => setAuthMode(null)} style={{marginTop:12}}>← Back</button>
          </>
        ) : (
          <>
            {/* onSuccess: setJustSignedUpEmail triggers tutorial after signup */}
            <MyRegister onSuccess={(email) => { setAuthMode("login"); setJustSignedUpEmail(email); }} />
            <p>
              Already have an account?{" "}
              <button onClick={() => setAuthMode("login")} style={{background:"none",border:"none",color:"#FFD600",fontWeight:700,cursor:"pointer"}}>Log In</button>
            </p>
            <button onClick={() => setAuthMode(null)} style={{marginTop:12}}>← Back</button>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="nepp-root">
      {showTutorial && <TutorialModal onClose={() => setShowTutorial(false)} />}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src={process.env.PUBLIC_URL + "/nepp-logo.png"} alt="NEPP Logo" />
        </div>
        <nav className="sidebar-nav">
          {SIDEBAR_TABS.map((tab) => (
            <div
              key={tab.key}
              className={`sidebar-item${page === tab.key ? " active" : ""}`}
              onClick={() => setPage(tab.key)}
            >
              <span className="sidebar-icon">{tab.icon}</span>
              <span>{tab.label}</span>
            </div>
          ))}
        </nav>
        <div className="sidebar-user">
          <div>
            <span className="sidebar-user-name">{user.email}</span>
            <div className="sidebar-user-verified">Verified NEPP User</div>
          </div>
          <span className="sidebar-user-badge"><VerifiedIcon /></span>
        </div>
      </aside>
      <main className="main-content">
        <button
          style={{
            position: "absolute",
            top: 20,
            right: 30,
            background: "#FFD600",
            color: "#101622",
            border: "none",
            borderRadius: 6,
            padding: "8px 16px",
            fontWeight: 600,
            cursor: "pointer",
            zIndex: 10,
          }}
          onClick={() => signOut(auth)}
        >
          Log Out
        </button>
        {page === "dashboard" && <Dashboard />}
        {page === "groups" && <Groups group={group} setGroup={setGroup} />}
        {page === "resources" && <Resources />}
        {page === "quizzes" && <Quizzes />}
        {page === "events" && <Events />}
        {page === "announcements" && <Announcements />}
      </main>
    </div>
  );
}