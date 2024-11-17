"use client";

import { useEditor } from "@/contexts/editor-context";

export default function Git() {
  const { branchesData, onChangeBranch } = useEditor();

  const handleBranchChange = async (branchName: string) => {
    onChangeBranch(branchName);
  };

  // const modifiedFiles = activeWorksheetsData?.filter(item=> )

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
      <div className="w-full h-full overflow-auto flex flex-col py-12"></div>
    </div>
  );
}
