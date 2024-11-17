"use client";

import { FileNode } from "@/types/file-explorer";
import FileExplorerItem from "./file-explorer-item";
import useTraverseFileTree from "@/hooks/use-traverse-file-tree";
import { useEditor } from "@/contexts/editor-context";

export default function FileExplorer() {
  const { filesTree, setFilesTree, onOpenFile } = useEditor();
  const { insertNode, deleteNode } = useTraverseFileTree();

  const handleInsertNode = (
    parentPath: string,
    name: string,
    isDirectory: boolean
  ) => {
    if (!name) return;
    const updatedFilesData = insertNode(
      filesTree,
      parentPath,
      {
        name,
        relativePath: `${parentPath}/${name}`,
        pathType: isDirectory ? "directory" : "file",
        gitStatus: "new",
        gitIgnored: false,
      },
      isDirectory
    );
    setFilesTree(updatedFilesData);
  };

  const handleDeleteNode = (pathToDelete: string) => {
    const updatedFilesData = deleteNode(filesTree, pathToDelete);
    setFilesTree(updatedFilesData);
  };

  const handleFileClick = (fileNode: FileNode) => {
    onOpenFile(fileNode);
  };

  return (
    <div className="w-full h-full relative">
      <div className="px-4 py-1 h-8 w-full absolute top-0 left-0 flex items-center border-b border-slate-950/10 bg-white shadow-md">
        <p className="text-xs font-semibold">{"File Explorer"}</p>
      </div>
      <div className="w-full h-full overflow-auto flex flex-col py-12">
        {filesTree?.map((fileNodeData, index) => {
          return (
            <FileExplorerItem
              fileNode={fileNodeData}
              key={fileNodeData.relativePath + index}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              onFileClick={handleFileClick}
            />
          );
        })}
      </div>
    </div>
  );
}
