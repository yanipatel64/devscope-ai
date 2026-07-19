"use client";

import IntelligenceDashboard from "./IntelligenceDashboard";
import { useAnalysis } from "@/context/AnalysisContext";


export default function Dashboard(){

const {analysis}=useAnalysis();


if(!analysis){
return null;
}


return (

<IntelligenceDashboard 
data={analysis}
/>

);

}