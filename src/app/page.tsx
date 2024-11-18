"use client";

import CollapsibleSection from "@/components/common/collapsible-section";
import Editor from "@/components/editor/editor";
import FileExplorer from "@/components/file-explorer/file-explorer";
import Git from "@/components/git/git";
import { useEditor } from "@/contexts/editor-context";
import { useState } from "react";

export default function Home() {
  const [fileExplorerCollapsed, setFileExplorerCollapsed] = useState(false);
  const [gitCollapsed, setGitCollapsed] = useState(false);
  const [editorCollapsed, setEditorCollapsed] = useState(false);
  const { isFetchingFilesData, isFetchingBranchesData } = useEditor();

  return (
    <div className="w-full h-dvh flex flex-col divide-y-2 divide-slate-950/10">
      <div className="w-full h-12 px-4 py-2 flex items-center">
        <p className="text-xl font-semibold">JS Code</p>
      </div>

      <div className="w-full flex-1 overflow-hidden">
        <div className="w-full h-full flex flex-col md:flex-row items-center divide-x-0 md:divide-x-2 divide-y-2 md:divide-y-0 divide-slate-950/10">
          <div className="w-full md:max-w-xs max-md:max-h-1/2 h-full flex flex-col divide-y-2 divide-slate-950/10">
            <CollapsibleSection
              title="Files"
              isCollapsed={fileExplorerCollapsed}
              onToggle={() => setFileExplorerCollapsed(!fileExplorerCollapsed)}
            >
              {isFetchingFilesData ? (
                <div className="animate-pulse p-4 space-y-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-4 bg-slate-200 rounded w-3/4" />
                  ))}
                </div>
              ) : (
                <FileExplorer />
              )}
            </CollapsibleSection>

            <CollapsibleSection
              title="Git"
              isCollapsed={gitCollapsed}
              onToggle={() => setGitCollapsed(!gitCollapsed)}
            >
              {isFetchingBranchesData ? (
                <div className="animate-pulse p-4 space-y-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-4 bg-slate-200 rounded w-2/3" />
                  ))}
                </div>
              ) : (
                <Git />
              )}
            </CollapsibleSection>
          </div>

          <div className="w-full h-full max-md:max-h-1/2 flex flex-col gap-1 overflow-hidden">
            <CollapsibleSection
              title="Editor"
              isCollapsed={editorCollapsed}
              onToggle={() => setEditorCollapsed(!editorCollapsed)}
            >
              {isFetchingFilesData || isFetchingBranchesData ? (
                <div className="animate-pulse p-4 space-y-2 h-full">
                  {[...Array(10)].map((_, i) => (
                    <div key={i} className="h-4 bg-slate-200 rounded w-full" />
                  ))}
                </div>
              ) : (
                <Editor />
              )}
            </CollapsibleSection>
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
