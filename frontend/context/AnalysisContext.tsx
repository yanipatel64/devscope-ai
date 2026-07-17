"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


interface AnalysisData {

  project_score: number;

  security_score: string;

  architecture: string;

  repository_info?: {

    name: string;

    owner: string;

    language: string;

    stars: number;

    forks: number;

    description?: string;

  };


  recommendations?: string[];


  ai_report?: {

    strengths?: string[];

    possible_improvements?: string[];

    security_recommendations?: string[];

    documentation_suggestions?: string[];

  };

}



interface AnalysisContextType {

  analysis: AnalysisData | null;

  setAnalysis: (data: AnalysisData) => void;

}



const AnalysisContext =
  createContext<AnalysisContextType | null>(null);





export function AnalysisProvider({

  children,

}: {

  children: ReactNode;

}) {


  const [analysis,setAnalysis] =
    useState<AnalysisData | null>(null);



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





export function useAnalysis(){


  const context =
    useContext(AnalysisContext);



  if(!context){

    throw new Error(
      "useAnalysis must be used inside AnalysisProvider"
    );

  }



  return context;


}