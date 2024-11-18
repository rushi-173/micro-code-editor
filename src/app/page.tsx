"use client";

import Editor from "@/components/editor/editor";
import FileExplorer from "@/components/file-explorer/file-explorer";
import Git from "@/components/git/git";

export default function Home() {
  return (
    <div className="w-full h-dvh flex flex-col divide-y-2 divide-slate-950/10">
      <div className="w-full h-12 px-4 py-2 flex items-center">
        <p className="text-xl font-semibold">JS Code</p>
      </div>

      <div className="w-full flex-1 overflow-hidden">
        <div className="w-full h-full flex flex-col md:flex-row items-center divide-x-0 md:divide-x-2 divide-y-2 md:divide-y-0 divide-slate-950/10">
          <div className="w-full md:max-w-xs h-1/3 md:h-full flex flex-col divide-y-2 divide-slate-950/10">
            <div className="w-full h-full flex overflow-hidden">
              <FileExplorer />
            </div>
            <div className="w-full h-full flex overflow-hidden">
              <Git />
            </div>
          </div>
          <div className="w-full h-2/3 md:h-full flex flex-col gap-1 overflow-hidden">
            <Editor />
          </div>
        </div>
      </div>

      <div className="w-full h-12 flex justify-center items-center">
        <p className="text-xs font-semibold">
          Made with <span>❤️</span> by Rushikesh
        </p>
      </div>
    </div>
  );
}
