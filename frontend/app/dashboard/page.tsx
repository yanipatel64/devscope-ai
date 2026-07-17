import Navbar from "@/components/layout/Navbar";
import RepositoryAnalyzer from "@/components/dashboard/RepositoryAnalyzer";
import Dashboard from "@/components/dashboard/Dashboard";


export default function DashboardPage() {


  return (

    <main className="min-h-screen bg-black text-white">

      <Navbar />


      <RepositoryAnalyzer />


      <Dashboard />


    </main>

  );


}