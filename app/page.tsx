'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";

export default function Home() {

  const router = useRouter()

  useEffect(() => {
    router.replace(ROUTER_LINKS.LOGIN)
  }, []);

  return (
    <div></div>
  );
}
