'use client'

import {useEffect} from 'react';
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";

function StudentPanelPage() {

  const router = useRouter()

  useEffect(function () {
    router.replace(ROUTER_LINKS.STUDENT_PANEL_CLASSES)
  }, [router])

  return (
    <></>
  );
}

export default StudentPanelPage;
