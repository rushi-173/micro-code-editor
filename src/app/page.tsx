"use client";

import CollapsibleSection from "@/components/common/collapsible-section";
import Editor from "@/components/editor/editor";
import FileExplorer from "@/components/file-explorer/file-explorer";
import Git from "@/components/git/git";
import { useEditor } from "@/contexts/editor-context";
import { useState } from "react";
import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import "react-reflex/styles.css";
import { ShimmerLines } from "@/components/common/shimmer";

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
        <ReflexContainer orientation="vertical">
          <ReflexElement className="left-pane" minSize={200} maxSize={400}>
            <div className="w-full h-full flex flex-col divide-y-2 divide-slate-950/10">
              <CollapsibleSection
                title="Files"
                isCollapsed={fileExplorerCollapsed}
                onToggle={() =>
                  setFileExplorerCollapsed(!fileExplorerCollapsed)
                }
              >
                {isFetchingFilesData ? (
                  <ShimmerLines count={5} lineClassName="w-3/4" />
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
                  <ShimmerLines count={3} lineClassName="w-2/3" />
                ) : (
                  <Git />
                )}
              </CollapsibleSection>
            </div>
          </ReflexElement>

          <ReflexSplitter />

          <ReflexElement className="right-pane">
            <CollapsibleSection
              title="Editor"
              isCollapsed={editorCollapsed}
              onToggle={() => setEditorCollapsed(!editorCollapsed)}
            >
              {isFetchingFilesData || isFetchingBranchesData ? (
                <ShimmerLines count={10} className="h-full" />
              ) : (
                <Editor />
              )}
            </CollapsibleSection>
          </ReflexElement>
        </ReflexContainer>
      </div>

      <div className="w-full h-12 flex justify-center items-center">
        <p className="text-xs font-semibold">
          Made with <span>❤️</span> by Rushikesh
        </p>
      </div>
    </div>
  );
}
