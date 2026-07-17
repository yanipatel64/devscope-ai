import Navbar from "@/components/layout/Navbar";
import RepositoryAnalyzer from "@/components/dashboard/RepositoryAnalyzer";
import Dashboard from "@/components/dashboard/Dashboard";


export default function DashboardPage() {

  return (

    <main>

      <Navbar />

      <RepositoryAnalyzer />

      <Dashboard />

    </main>

  );

}