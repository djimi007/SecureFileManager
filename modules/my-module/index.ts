
// Import the native module. On web, it will be resolved to MyModule.web.ts
// and on native platforms to MyModule.ts
import MyModule from './src/MyModule';
import { ChangeEventPayload, MyModuleViewProps } from './src/MyModule.types';


export function sayThink(text : string) {
  return MyModule.sayThink(text)
}


export function requestPermission() {
  return MyModule.requestPermission();
}


export {  MyModuleViewProps, ChangeEventPayload };
