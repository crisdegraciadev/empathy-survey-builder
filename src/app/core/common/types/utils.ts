import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core';

export type SelectOption = {
  icon?: { name: IconName; pack: IconPrefix };
  label: string;
  value: number;
};
