import Header from "@/components/header";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import Map from "@/components/map";

export const Route = createFileRoute("/_auth/interactive")({
    component: Interactive,
});

function Interactive() {
    const mapInstanceRef = useRef<mapboxgl.Map | null>(null);

    function handleMapLoad(map: mapboxgl.Map) {
        mapInstanceRef.current = map;
        // TODO: Set the coords for the Sites
    }
    return (
        <>
            <Header />
            <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                <Map onLoad={handleMapLoad} />
            </div>
        </>
    );
}
