export interface NavItem {
    id: string;
    name: string;
    render?: () => JSX.Element
}