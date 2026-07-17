"use client";


import { AnalysisProvider } from "@/context/AnalysisContext";


export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {


  return (

    <AnalysisProvider>

      {children}

    </AnalysisProvider>

  );

}