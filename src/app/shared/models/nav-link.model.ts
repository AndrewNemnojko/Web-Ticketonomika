export interface NavLink {
  label: string;
  icon: string;
  route: string;
  active?: boolean;
  authOnly?: boolean;
}
