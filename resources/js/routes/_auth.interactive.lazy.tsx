import Header, { BreadcrumbItemProp } from "@/components/header";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Suspense, useRef } from "react";
import { LazyMap } from "@/components/map/lazy";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Globe } from "lucide-react";

export const Route = createLazyFileRoute("/_auth/interactive")({
    component: Interactive,
});

function Interactive() {
    const mapInstanceRef = useRef<mapboxgl.Map | null>(null);

    function handleMapLoad(map: mapboxgl.Map) {
        mapInstanceRef.current = map;
    }

    const breadcrumbItems: BreadcrumbItemProp[] = [
        {
            label: "Interactive",
            href: "/interactive",
        },
    ];

    return (
        <>
            <Header items={breadcrumbItems} />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <Suspense
                    fallback={
                        <div className="flex flex-1 justify-center items-center">
                            <Skeleton className="w-full h-full flex flex-1 justify-center items-center">
                                <Alert className="w-4/5" variant="default">
                                    <Globe className="w-4 h-4" />
                                    <AlertTitle>Your Map is Loading</AlertTitle>
                                </Alert>
                            </Skeleton>
                        </div>
                    }
                >
                    <LazyMap onLoad={handleMapLoad} />
                </Suspense>
            </div>
        </>
    );
}
