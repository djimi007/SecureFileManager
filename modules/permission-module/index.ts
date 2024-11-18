import { EventEmitter, Subscription } from "expo-modules-core";

// Import the native module. On web, it will be resolved to PermissionModule.web.ts
// and on native platforms to PermissionModule.ts
import PermissionModule from "./src/PermissionModule";
import PermissionModuleView from "./src/PermissionModuleView";
import { ChangeEventPayload, PermissionModuleViewProps } from "./src/PermissionModule.types";

// Get the native constant value.
export const PI = PermissionModule.PI;

export function hello(): string {
  return PermissionModule.hello();
}

export async function checkStoragePermission(): Promise<boolean> {
  return await PermissionModule.checkStoragePermission();
}

export function requestExternalStroragePermission() {
  return PermissionModule.requestExternalStroragePermission();
}

export async function setValueAsync(value: string) {
  return await PermissionModule.setValueAsync(value);
}

export { PermissionModuleView, PermissionModuleViewProps, ChangeEventPayload };
