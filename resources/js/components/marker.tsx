import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import Windmill from "@/components/windmill";

type Props = {
    feature: GeoJSON.Feature;
    map: mapboxgl.Map;
};

function Marker({ feature, map }: Props) {
    const markerRef = useRef<mapboxgl.Marker>();
    const markerEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (feature.geometry.type === "Point") {
            const marker = new mapboxgl.Marker({
                element: markerEl.current ?? undefined,
            })
                .setLngLat(feature.geometry.coordinates as [number, number])
                .addTo(map);

            markerRef.current = marker;

            return () => marker.remove();
        }

        return () => {};
    }, [feature, map]);

    function handleClick() {
        if (feature.geometry.type === "Point") {
            map.flyTo({
                center: feature.geometry.coordinates as [number, number],
                zoom: 14,
                duration: 2000,
            });
        }
    }

    return (
        <div
            ref={markerEl}
            tabIndex={0}
            role="button"
            onClick={() => handleClick()}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    handleClick();
                }
            }}
        >
            <Windmill size="md" />
        </div>
    );
}

export default Marker;
