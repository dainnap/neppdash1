export async function getCurrentUser() {
  // Fetch from your backend or auth context
  return { id: "user123", name: "Alex", role: "student", teamId: "team456" };
}

export async function getLatestAnnouncement(teamId) {
  // Fetch from your backend API
  return { title: "MUN Conference This Saturday!" };
}

export async function getLatestForm(teamId) {
  // Fetch from your backend API
  return { title: "Event Permission Slip" };
}

export async function getNextEvent(userId) {
  // Fetch from your backend API
  return { title: "Mock Debate Round", date: new Date(Date.now() + 86400000).toISOString() };
}