import { Auth, getIdToken } from "firebase/auth";
import { cookies } from "next/headers";

type UserData = {
  id: string;
  uid: string;
  email: string;
  username: string;
}

export async function fetchWithFirebaseHeaders(url: string, method: string = "GET", payload?: any) {
  const cookieStore = cookies()

  const idToken = cookieStore.get("token")?.value || "";
  const headers = new Headers();
  if (idToken) headers.append("Authorization", `${idToken}`);
  headers.append('Content-Type', 'application-json')
  const newRequest = new Request(url, {
    body: payload ? JSON.stringify(payload) : undefined,
    headers,
    method
  });
  return await fetch(newRequest);
}

export async function getUserData(): Promise<UserData | null>{
  const res = await fetchWithFirebaseHeaders(`${process.env.NEXT_PUBLIC_API_URL}/api/fetch-user-data`);

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  return data?.data?.length > 0 ? data?.data[0] : null;
}


export async function getAuthIdToken(auth: Auth) {
  await auth.authStateReady();
  if (!auth.currentUser) return;
  return await getIdToken(auth.currentUser);
}