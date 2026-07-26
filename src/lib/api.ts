/**
 * IGRIS Technical Systems - Secure API Gateway client
 */

export async function fetchApi(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("igris_session_token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // Automatically handle session invalidation / expiration
  if (response.status === 401) {
    const hasToken = !!localStorage.getItem("igris_session_token");
    if (hasToken) {
      localStorage.removeItem("igris_session_token");
      localStorage.removeItem("igris_user");
      
      // Dispatch events to sync frontend user state and notify App routing
      window.dispatchEvent(new Event("igris-user-login"));
      window.dispatchEvent(new CustomEvent("igris-session-expired"));
    }
  }

  return response;
}
