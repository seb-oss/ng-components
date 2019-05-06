export type SebModalType = 'fullscreen' | 'aside-left' | 'aside-right' | null;

export interface SebModalConfig<D = any> {
  type?: SebModalType;
  data?: D;
  closeOnNavigationChanges?: boolean;
  closable?: boolean;
  classes?: string | string [];
}
