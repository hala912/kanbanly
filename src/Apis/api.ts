
///

export const apiFetch = async (path: string, options: RequestInit={}) => {
const token= localStorage.getItem("token");

const response = await fetch(`http://localhost:3000${path}`, {
   ...options,
  headers: {
    "Content-Type": "application/json",
    ...(token && { "Authorization": `Bearer ${token}` }),//this line adds the Authorization header only if the token exists
    ...options.headers
  }     
});


if (!response.ok) {
  const body = await response.json().catch(() => null);
  throw new Error(body?.error || `API request failed: ${response.status}`);
}

return await response.json();

}