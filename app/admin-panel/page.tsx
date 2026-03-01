'use client'

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";

function AdminRootPage() {

  const router = useRouter()

  useEffect(function () {
    router.replace(ROUTER_LINKS.ADMIN_PANEL_HOME)
  }, [])

  return (
    <></>
  );
}

export default AdminRootPage;