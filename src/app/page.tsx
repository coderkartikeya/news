import Image from "next/image";
import Taskbar from './components/Taskbar'
import Categories from './components/Categories'
export default function Home() {
  return (
    <div className="w-screen h-screen bg-slate-200 p-4 ">
      <Taskbar/>
      <Categories/>

    </div>
  );
}
