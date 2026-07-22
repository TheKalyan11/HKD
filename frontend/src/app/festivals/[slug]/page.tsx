"use client";

import React from "react";
import { useParams } from "next/navigation";
import FestivalDetail from "@/components/FestivalDetail";

export default function DynamicFestivalPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug || "sri-jagannatha-ratha-yatra";

  return <FestivalDetail slug={slug} />;
}
