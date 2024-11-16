import { FileNode } from "@/types/file-explorer";
import { sortNodes } from "@/utils/file-explorer/sort-nodes";

const useTraverseFileTree = () => {
  const insertNode = (
    tree: FileNode[],
    parentPath: string,
    newNode: Omit<FileNode, "children">,
    isDirectory: boolean
  ): FileNode[] => {
    const updatedTree = tree.map((node) => {
      if (node.relativePath === parentPath) {
        if (!node.children) {
          node.children = [];
        }
        node.children.unshift({
          ...newNode,
          children: isDirectory ? [] : undefined,
        });
        return node;
      }

      if (node.children) {
        return {
          ...node,
          children: insertNode(node.children, parentPath, newNode, isDirectory),
        };
      }

      return node;
    });
    sortNodes(updatedTree);
    return updatedTree;
  };

  const deleteNode = (tree: FileNode[], pathToDelete: string): FileNode[] => {
    const updatedTree = tree
      .filter((node) => node.relativePath !== pathToDelete)
      .map((node) => {
        if (node.children) {
          return {
            ...node,
            children: deleteNode(node.children, pathToDelete),
          };
        }
        return node;
      });
    return updatedTree;
  };

  return { insertNode, deleteNode };
};

export default useTraverseFileTree;
