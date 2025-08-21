export interface MenuItem {
  value: string;
  label: string;
  authRequired: boolean;
  path?: string;
}