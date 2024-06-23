'use client'
import React from "react";
import Link from "next/link";
import {
	signOut,
} from "@/lib/firebase/auth";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";
import Cookies from "js-cookie";

export default function Header() {
	const user = useUser();
  const router = useRouter();
	const handleSignOut = async (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
		event.preventDefault();
    await Cookies.remove("token");
	  await signOut();
    router.push('/login');
	};

	return (
		<header>
			<Box display={'flex'} padding={4} alignItems={"center"} gap={8}>
        <Link href="/" className="logo">
          <Typography>
            EBuddy
          </Typography>
        </Link>
        {user ? (
          <>
            <Box display={"flex"} gap={4} alignItems={"center"}>
              <Typography>
                {user.email}
              </Typography>
             <Button href="#" onClick={handleSignOut}>
                Sign Out
              </Button>
            </Box>
          </>
        ) : (
          <></>
        )}
      </Box>
		</header>
	);
}
