import * as React from 'react';

import { PermissionModuleViewProps } from './PermissionModule.types';

export default function PermissionModuleView(props: PermissionModuleViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
