import { Roles } from "@/settings/enums";
import { KeyValue } from "@/interfaces/response";

export interface Navigation {
    [Roles.user]: NavigationItem[];
    [Roles.admin]: NavigationItem[];
    default: NavigationItem[];
}

export interface NavigationItem {
    path: string;
    displayName: string;
    icon: string;
    params?: KeyValue<string>;
}
