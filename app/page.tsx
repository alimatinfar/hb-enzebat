'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";
import getToken from "@/utils/authentication/getToken";
import useGoToPanel from "@/hooks/useGoToPanel";

export default function Home() {

  const router = useRouter()

  const {goToPanel} = useGoToPanel()

  useEffect(() => {
    const token = getToken()
    if (!token) router.replace(ROUTER_LINKS.LOGIN)
    goToPanel()
  }, [router]);

  return (
    <div></div>
  );
}
