import { FileNode } from "@/types/file-explorer";
import { sortNodes } from "@/utils/file-explorer/sort-nodes";
import { FileListItem, OpenWorksheet } from "@/types/common";

export function buildFileTree(
  files: FileListItem[],
  activeSheets: OpenWorksheet[]
): FileNode[] {
  const root: FileNode[] = [];
  const map = new Map<string, FileNode>();

  // Create a Set of active sheet paths for easier lookup
  const activeSheetPaths = new Set(
    activeSheets.map((sheet) => sheet.relativePath)
  );

  const sortedFiles = [...files].sort((a, b) => a.depth - b.depth);

  for (const file of sortedFiles) {
    const node: FileNode = {
      name: file.name,
      relativePath: file.relativePath,
      pathType: file.pathType,
      gitStatus: file.gitStatus,
      gitIgnored: file.gitIgnored,
      children: file.pathType === "directory" ? [] : undefined,
      isOpened: activeSheetPaths.has(file.relativePath),
    };

    const parentPath = file.relativePath.split("/").slice(0, -1).join("/");

    if (parentPath === "") {
      root.push(node);
    } else {
      const parent = map.get(parentPath);
      if (parent && parent.children) {
        parent.children.push(node);
        // If this is an active sheet, mark all parent folders as opened
        if (activeSheetPaths.has(file.relativePath)) {
          let currentPath = parentPath;
          while (currentPath !== "") {
            const parentNode = map.get(currentPath);
            if (parentNode) {
              parentNode.isOpened = true;
            }
            currentPath = currentPath.split("/").slice(0, -1).join("/");
          }
        }
      }
    }

    map.set(file.relativePath, node);
  }

  sortNodes(root);
  return root;
}
