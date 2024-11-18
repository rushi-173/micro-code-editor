"use client";

import { useEditor } from "@/contexts/editor-context";
import { cn } from "@/utils/tailwind";

export default function Git() {
  const {
    branchesData,
    onChangeBranch,
    modifiedFiles,
    activeModifiedFile,
    setOpenModifiedFileIndex,
  } = useEditor();

  const handleBranchChange = async (branchName: string) => {
    onChangeBranch(branchName);
  };

  return (
    <div className="w-full h-full relative">
      <div className="px-4 py-1 h-8 w-full absolute top-0 left-0 flex items-center border-b border-slate-950/10 bg-white shadow-md">
        <p className="text-xs font-semibold mr-2 flex-1">{"Git Branch"}</p>
        <select
          className="text-xs border border-slate-200 rounded px-2 py-0.5"
          value={branchesData?.currentBranch || ""}
          onChange={(e) => handleBranchChange(e.target.value)}
        >
          {branchesData?.localBranches.map((branch: string) => (
            <option key={branch} value={branch}>
              {branch}
            </option>
          ))}
        </select>
      </div>
      <div className="w-full h-full overflow-auto py-12">
        <div className="flex flex-col gap-1 p-4">
          {modifiedFiles?.map((item, index) => {
            return (
              <button
                className={cn(
                  "w-full border border-slate-950/10 rounded-sm overflow-hidden px-2 py-1",
                  item?.relativePath === activeModifiedFile?.relativePath
                    ? "border-slate-950"
                    : ""
                )}
                key={index}
                onClick={() => {
                  setOpenModifiedFileIndex(index);
                }}
              >
                <p className="text-xs font-medium truncate">{item?.name}</p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
