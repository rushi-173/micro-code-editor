"use client";

import Editor from "@/components/editor/editor";
import FileExplorer from "@/components/file-explorer/file-explorer";
import Git from "@/components/git/git";

export default function Home() {
  return (
    <div className="w-full h-dvh flex flex-col divide-y-2 divide-slate-950/10">
      <div className="w-full h-12 px-4 py-2 flex items-center">
        <p>JS Code</p>
      </div>

      <div className="w-full flex-1 overflow-hidden">
        <div className="w-full h-full flex flex-row items-center divide-x-2 divide-slate-950/10">
          <div className="w-full h-full max-w-xs flex flex-col divide-y-2 divide-slate-950/10">
            <div className="w-full h-full flex overflow-hidden">
              <FileExplorer />
            </div>
            <div className="w-full h-full flex overflow-hidden">
              <Git />
            </div>
          </div>
          <div className="w-full h-full flex flex-col gap-1 overflow-hidden">
            <Editor />
          </div>
        </div>
      </div>

      <div className="w-full h-12 flex justify-center items-center">
        <p>Footer</p>
      </div>
    </div>
  );
}
