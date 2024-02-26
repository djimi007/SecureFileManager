import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { PermissionModuleViewProps } from './PermissionModule.types';

const NativeView: React.ComponentType<PermissionModuleViewProps> =
  requireNativeViewManager('PermissionModule');

export default function PermissionModuleView(props: PermissionModuleViewProps) {
  return <NativeView {...props} />;
}
