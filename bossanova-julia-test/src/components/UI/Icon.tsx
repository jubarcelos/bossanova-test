import { FC } from 'react';
import * as Icons from '@remixicon/react';

export interface IconProps {
  size: string;
  color?: string;
  iconName: keyof typeof Icons | string;
}

const Icon: FC<IconProps> = ({ iconName, size, color }) => {
  const RemixIcon = Icons[iconName as keyof typeof Icons];

  if (!RemixIcon) {
    console.warn(`Icon "${iconName}" not found in RemixIcon library.`);
    return null;
  }

  return <RemixIcon size={size} className={color} data-testid="icon" />;
};

export default Icon;
