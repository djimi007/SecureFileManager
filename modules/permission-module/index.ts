import { NativeModulesProxy, EventEmitter, Subscription } from "expo-modules-core";

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

export function requestPermission() {
  return PermissionModule.requestPermission();
}

export async function setValueAsync(value: string) {
  return await PermissionModule.setValueAsync(value);
}

const emitter = new EventEmitter(PermissionModule ?? NativeModulesProxy.PermissionModule);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>("onChange", listener);
}

export { PermissionModuleView, PermissionModuleViewProps, ChangeEventPayload };
