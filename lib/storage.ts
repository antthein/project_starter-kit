import { BlueprintResponse } from "@/types/form";

const BLUEPRINT_KEY = "project-kickstarter-blueprint";

export function loadBlueprintFromStorage(): BlueprintResponse | undefined {
  if (typeof window === "undefined") return undefined;
  try {
    const raw = sessionStorage.getItem(BLUEPRINT_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw) as BlueprintResponse;
  } catch {
    return undefined;
  }
}

export function saveBlueprintToStorage(blueprint: BlueprintResponse): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(BLUEPRINT_KEY, JSON.stringify(blueprint));
  } catch {
    // sessionStorage full or unavailable
  }
}

export function clearBlueprintStorage(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(BLUEPRINT_KEY);
}
