import { TreeCanvas } from "@/components/TreeCanvas";
import { SearchBar } from "@/components/SearchBar";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  return (
    <div className="flex w-screen h-screen overflow-hidden font-sans text-slate-900">
      <Sidebar />

      <div className="flex flex-col flex-1 h-full relative">
        <TopBar />

        <div className="flex-1 relative overflow-hidden pb-6">
          <SearchBar />
          <TreeCanvas />
        </div>
      </div>
    </div>
  );
}
