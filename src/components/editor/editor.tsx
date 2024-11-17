"use client";

import { CircleX } from "lucide-react";
import MonacoEditor from "@monaco-editor/react";
import { useEditor } from "@/contexts/editor-context";
import { OpenWorksheet } from "@/types/common";
import { cn } from "@/utils/tailwind";

export default function Editor() {
  const { activeWorksheetsData, activeFile, setActiveFile, onCloseFile } =
    useEditor();

  console.log({ activeWorksheetsData, activeFile });

  const handleEditorChange = (value: string | undefined) => {
    console.log(value);
  };

  const handleCloseFile = (
    e: React.MouseEvent<HTMLButtonElement>,
    worksheet: OpenWorksheet
  ) => {
    e.stopPropagation();
    onCloseFile(worksheet);
  };

  return (
    <div className="w-full h-full relative flex flex-col">
      <div className="h-8 w-full flex items-center border-b border-slate-950/10  shadow-md overflow-x-auto no-scrollbar bg-slate-100">
        <div className="flex items-center h-full divide-x divide-slate-950/10">
          {activeWorksheetsData?.map((worksheet, index) => {
            return (
              <div
                className={cn(
                  "w-40 grow flex items-center justify-between gap-2 p-2",
                  activeFile?.relativePath === worksheet.relativePath
                    ? "bg-white"
                    : ""
                )}
                role="button"
                key={index}
                onClick={() => {
                  setActiveFile(worksheet);
                }}
              >
                <p className="text-xs font-medium truncate">
                  {worksheet?.name}
                </p>
                <button
                  className="active:scale-75"
                  onClick={(e) => {
                    handleCloseFile(e, worksheet);
                  }}
                >
                  <CircleX size={14} />
                </button>
              </div>
            );
          })}
        </div>
        <div className="p-2 h-full bg-slate-100" />
      </div>
      <div className="w-full h-full flex-1 overflow-hidden">
        <div className="w-full h-full">
          {activeFile ? (
            <MonacoEditor
              height="100%"
              value={activeFile?.content || ""}
              onChange={handleEditorChange}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
