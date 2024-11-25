import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export type BreadcrumbItemProp = {
    label: string;
    href: string;
};

type BreadcrumbProps = {
    items: BreadcrumbItemProp[];
};

function Header({ items }: BreadcrumbProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {items.map((item, index) => (
                            <>
                                <BreadcrumbItem key={item.href} className="hidden md:block">
                                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                                </BreadcrumbItem>
                                {index !== items.length - 1 && (
                                    <BreadcrumbSeparator className="hidden md:block" />
                                )}
                            </>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    );
}

export default Header;
