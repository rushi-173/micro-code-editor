import branchesData from "@/lib/data/branches.json";
import filesData from "@/lib/data/list-files.json";
import openWorksheetsData from "@/lib/data/open-worksheets.json";
import mockApiCall from "@/utils/mock-api-call";

export function fetchBranches() {
  return mockApiCall(branchesData);
}

export function fetchFiles() {
  return mockApiCall(filesData);
}

export function fetchOpenWorksheets() {
  return mockApiCall(openWorksheetsData);
}
