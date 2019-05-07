export type SebModalType = 'fullscreen' | 'aside-left' | 'aside-right' | null;
export type SebModalSize = 'sm' | 'lg' | null;

export interface SebModalConfig<D = any> {
  type?: SebModalType;
  size?: SebModalSize;
  data?: D;
  closeOnNavigationChanges?: boolean;
  closable?: boolean;
  classes?: string | string [];
}
