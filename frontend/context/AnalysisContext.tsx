"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


interface AnalysisContextType {
  analysis: any;
  setAnalysis: (data: any) => void;
}


const AnalysisContext = createContext<AnalysisContextType | null>(null);



export function AnalysisProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [analysis, setAnalysis] = useState<any>(null);


  return (

    <AnalysisContext.Provider
      value={{
        analysis,
        setAnalysis,
      }}
    >

      {children}

    </AnalysisContext.Provider>

  );

}



export function useAnalysis() {

  const context = useContext(AnalysisContext);


  if (!context) {

    throw new Error(
      "useAnalysis must be used inside AnalysisProvider"
    );

  }


  return context;

}