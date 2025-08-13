const BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:4000';

export async function postAvailability(payload: {
  icsText: string;
  occasion: string;
  rangeStartISO: string;
  rangeEndISO: string;
  minDurationMin?: number;
}) {
  const res = await fetch(`${BASE_URL}/availability`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}