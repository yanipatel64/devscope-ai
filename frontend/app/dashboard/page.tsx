import Navbar from "@/components/layout/Navbar";
import RepositoryAnalyzer from "@/components/dashboard/RepositoryAnalyzer";


export default function DashboardPage() {


  return (

    <main className="min-h-screen bg-black text-white">

      <Navbar />


      <RepositoryAnalyzer />


    </main>

  );

}