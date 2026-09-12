
///

export const apiFetch = async (path: string, options: RequestInit={}) => {
const token= localStorage.getItem("token");

const response = await fetch(`http://localhost:3000${path}`, {
   ...options,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
    ...options.headers
  }     
});


if (!response.ok) {
  throw new Error(`API request failed: ${response.status}`);    
}

return await response.json();

}