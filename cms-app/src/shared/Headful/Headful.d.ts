export interface NavItem {
    id: string;
    name: string;
    path: string;
    render?: () => JSX.Element
}