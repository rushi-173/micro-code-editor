import { useState } from "react";
import { FileNode } from "@/types/file-explorer";
import { cn } from "@/utils/tailwind";
import {
  File,
  FilePlus,
  Folder,
  FolderOpen,
  FolderPlus,
  Trash2,
} from "lucide-react";

interface FileExplorerItemProps {
  fileNode: FileNode;
  handleInsertNode: (
    parentPath: string,
    name: string,
    isDirectory: boolean
  ) => void;
  handleDeleteNode: (pathToDelete: string) => void;
  onFileClick: (fileNode: FileNode) => void;
}

export function FileExplorerItem({
  handleInsertNode,
  fileNode,
  handleDeleteNode,
  onFileClick,
}: FileExplorerItemProps) {
  const [expanded, setExpanded] = useState(fileNode?.isOpened || false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isDirectory: false,
  });

  const handleNewItem = (e: React.MouseEvent, isDirectory: boolean) => {
    e.stopPropagation();
    setExpanded(true);
    setShowInput({
      visible: true,
      isDirectory,
    });
  };

  const onAddItem = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value) {
      handleInsertNode(
        fileNode.relativePath,
        e.currentTarget.value,
        showInput.isDirectory
      );
      setShowInput({ ...showInput, visible: false });
    }
  };

  const onDeleteItem = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleDeleteNode(fileNode.relativePath);
  };

  if (fileNode.pathType === "directory") {
    return (
      <div className="w-full flex flex-col">
        <div
          onClick={() => setExpanded(!expanded)}
          role="button"
          aria-label="directory"
          className="w-full px-4 py-1 flex items-center gap-2 group overflow-hidden"
        >
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2">
              {expanded ? <FolderOpen size={14} /> : <Folder size={14} />}
              <p className="text-xs font-medium truncate flex-1">
                {fileNode.name}
              </p>
            </div>
          </div>

          <div className="w-fit max-w-full overflow-hidden hidden gap-2 group-hover:flex">
            <button onClick={onDeleteItem}>
              <Trash2 size={14} />
            </button>
            <button onClick={(e) => handleNewItem(e, true)}>
              <FolderPlus size={14} />
            </button>
            <button onClick={(e) => handleNewItem(e, false)}>
              <FilePlus size={14} />
            </button>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col pl-6 w-full overflow-hidden",
            expanded ? "" : "hidden"
          )}
        >
          {fileNode.children?.map((exp, index) => (
            <FileExplorerItem
              handleInsertNode={handleInsertNode}
              key={exp.relativePath + index}
              fileNode={exp}
              handleDeleteNode={handleDeleteNode}
              onFileClick={onFileClick}
            />
          ))}
          {showInput.visible && (
            <div className="w-full px-4 h-fit flex items-center gap-2">
              {showInput.isDirectory ? (
                <Folder size={14} />
              ) : (
                <File size={14} />
              )}
              <input
                type="text"
                className="text-xs font-semibold p-0 m-0 outline-none flex-1"
                autoFocus
                onKeyDown={onAddItem}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
              />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full px-4 py-1 h-fit flex items-center gap-2 group"
      role="button"
      aria-label="file"
      onClick={() => {
        onFileClick(fileNode);
      }}
    >
      <File size={14} />
      <p className="text-xs font-medium truncate flex-1">{fileNode.name}</p>
      <button onClick={onDeleteItem} className="hidden group-hover:block">
        <Trash2 size={14} />
      </button>
    </div>
  );
}

export default FileExplorerItem;
