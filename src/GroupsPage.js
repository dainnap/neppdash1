import React, { useState } from "react";

export default function Groups() {
  // Simulated state for demo
  const [group, setGroup] = useState(null); // { name: '', role: 'admin' | 'member' }
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