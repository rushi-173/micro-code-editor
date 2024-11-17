"use client";

import { fetchBranches, fetchFiles, fetchOpenWorksheets } from "@/apis/editor";
import { FileListItem, OpenWorksheet } from "@/types/common";
import { FileNode } from "@/types/file-explorer";
import { BranchData } from "@/types/git";
import { buildFileTree } from "@/utils/file-explorer/build-file-tree";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface EditorContextType {
  activeWorksheetsData: OpenWorksheet[];
  setActiveWorksheetsData: (worksheets: OpenWorksheet[]) => void;
  activeFile: OpenWorksheet | null;
  setActiveFile: (file: OpenWorksheet | null) => void;
  filesTree: FileNode[];
  setFilesTree: (files: FileNode[]) => void;
  branchesData: BranchData | null;
  setBranchesData: (data: BranchData) => void;
  onChangeBranch: (branchName: string) => void;
  filesList: FileListItem[];
  isFetchingFilesData: boolean;
  onOpenFile: (files: FileNode) => void;
  onCloseFile: (files: OpenWorksheet) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children }: { children: React.ReactNode }) {
  const [activeWorksheetsData, setActiveWorksheetsData] = useState<
    OpenWorksheet[]
  >([]);
  const [activeFile, setActiveFile] = useState<OpenWorksheet | null>(null);
  const [filesTree, setFilesTree] = useState<FileNode[]>([]);
  const [filesList, setFilesList] = useState<FileListItem[]>([]);
  const [branchesData, setBranchesData] = useState<BranchData | null>(null);

  const [isFetchingFilesData, setIsFetchingFilesData] =
    useState<boolean>(false);

  const getFilesData = useCallback(async () => {
    try {
      setIsFetchingFilesData(true);

      const activeSheetsResponse = await fetchOpenWorksheets(
        branchesData?.currentBranch
      );
      const activeSheets =
        activeSheetsResponse?.activeWorksheets as OpenWorksheet[];
      setActiveWorksheetsData(activeSheets);
      setActiveFile(activeSheets[0] || null);

      const response = await fetchFiles();
      const files = response?.data?.files as FileListItem[];
      const tranformedFileTree = buildFileTree(files || [], activeSheets);
      setFilesList(files);
      setFilesTree(tranformedFileTree);
    } catch (e) {
      console.log(e);
    } finally {
      setIsFetchingFilesData(false);
    }
  }, [branchesData]);

  const getBranchesData = async () => {
    const response = await fetchBranches();
    setBranchesData(response?.data as BranchData);
  };

  useEffect(() => {
    getBranchesData();
  }, []);

  useEffect(() => {
    getFilesData();
  }, [branchesData?.currentBranch, getFilesData]);

  const onChangeBranch = (branchName: string) => {
    setBranchesData((prev) =>
      prev ? { ...prev, currentBranch: branchName } : null
    );
  };

  const onOpenFile = (file: FileNode) => {
    const fileToOpen = filesList?.find(
      (item) => item.relativePath === file.relativePath
    ) as OpenWorksheet;
    const ifAlreadyOpen = activeWorksheetsData?.find(
      (item) => item.relativePath === file.relativePath
    );
    if (!ifAlreadyOpen) {
      setActiveWorksheetsData((prev) => [...prev, { ...fileToOpen }]);
    }
    setActiveFile(fileToOpen);
  };

  const onCloseFile = (worksheet: OpenWorksheet) => {
    setActiveWorksheetsData((prev) =>
      prev?.filter((item) => item.relativePath !== worksheet.relativePath)
    );
    if (activeFile?.relativePath === worksheet?.relativePath) {
      const filteredData = activeWorksheetsData?.filter(
        (item) => item.relativePath !== worksheet.relativePath
      );
      setActiveFile(filteredData[0] || null);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        activeWorksheetsData,
        setActiveWorksheetsData,
        activeFile,
        setActiveFile,
        filesTree,
        setFilesTree,
        branchesData,
        setBranchesData,
        onChangeBranch,
        filesList,
        isFetchingFilesData,
        onOpenFile,
        onCloseFile,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const context = useContext(EditorContext);
  if (context === undefined) {
    throw new Error("useEditor must be used within an EditorProvider");
  }
  return context;
}
