export async function fetchTeams() {
  const res = await fetch('/api/teams');
  return res.json();
}

export async function fetchTeam(id: number) {
  const res = await fetch(`/api/teams/${id}`);
  const text = await res.text();
  try { return JSON.parse(text); } catch { return { id, name: text }; }
}
