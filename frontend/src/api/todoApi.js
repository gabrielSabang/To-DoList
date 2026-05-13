const API_BASE = '/api/cards'

const normalizeCard = (card) => ({
  id: card._id,
  text: card.text,
  completed: card.completed ?? false,
  createdAt: card.createdAt ? new Date(card.createdAt).getTime() : Date.now(),
})

export async function fetchTodos() {
  const res = await fetch(`${API_BASE}/cardList`)
  if (!res.ok) throw new Error(`Failed to load tasks: ${res.status}`)
  const data = await res.json()
  return data.map(normalizeCard)
}

export async function createTodo(text) {
  const res = await fetch(`${API_BASE}/createCard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  })
  if (!res.ok) throw new Error(`Create failed: ${res.status}`)
  const card = await res.json()
  return normalizeCard(card)
}

export async function updateTodo(id, changes) {
  const res = await fetch(`${API_BASE}/updateCard/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  })
  if (!res.ok) throw new Error(`Update failed: ${res.status}`)
  const result = await res.json()
  return normalizeCard(result.card ?? result)
}

export async function deleteTodo(id) {
  const res = await fetch(`${API_BASE}/delCard/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`)
}
