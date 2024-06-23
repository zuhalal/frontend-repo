"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { User } from "firebase/auth";
import { onAuthStateChanged } from "@/lib/firebase/auth";
import Cookies from 'js-cookie';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
	const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged((authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
		onAuthStateChanged((authUser) => {
			if (user === undefined || user == null) return

      user.getIdToken().then(idToken => {
        // Optionally, send the ID token to the server to validate and set a cookie there
        Cookies.set('token', idToken, { expires: 7, secure: false, sameSite: 'strict' }); // secure: true ensures HTTPS
      });

			// refresh when user changed to ease testing
			if (user?.email !== authUser?.email) {
				router.refresh()
			}
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user])

  return user;
}
