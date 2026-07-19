"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";


interface AnalysisData {


  scores:{

    project_health:number;

    security:number;

    architecture:number;

    maintainability:number;

  };


  repository_info?:{

    name:string;

    owner:string;

    language:string;

    stars:number;

    forks:number;

    description?:string;

  };


  repository_metrics?:{

    total_files:number;

    total_lines:number;


    languages?:{
      [key:string]:number;
    };


    folder_structure:string[];


    important_files:string[];


    architecture_flow:{
  layer:string;
  reason:string;
}[];

  };


  recommendations?:string[];


  ai_analysis?:string;


  score_factors?:{

    project_health?:string[];

    security?:string[];

    architecture?:string[];

    maintainability?:string[];

  };


}


interface AnalysisContextType {

  analysis: AnalysisData | null;

  setAnalysis: (data: AnalysisData | null) => void;

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