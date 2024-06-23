import Cookies from "js-cookie";

export async function fetchWithFirebaseHeadersClient(url: string, method: string = "GET", payload?: any) {
  const idToken = Cookies.get("token") || "";
  const headers = new Headers();
  if (idToken) headers.append("Authorization", `${idToken}`);

  const newRequest = new Request(url, {
    body: payload ? JSON.stringify(payload) : undefined,
    headers,
    method
  });

  return await fetch(newRequest);
}