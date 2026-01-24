'use client'

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";
import ROUTER_LINKS from "@/constances/routerLinks";

function TeacherPanelPage() {

  const router = useRouter()

  useEffect(function () {
    router.replace(ROUTER_LINKS.TEACHER_PANEL_CLASSES)
  }, [router])

  return (
    <></>
  );
}

export default TeacherPanelPage;