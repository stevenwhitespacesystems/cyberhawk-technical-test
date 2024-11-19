import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

type MapProps = {
    onLoad: (map: mapboxgl.Map) => void;
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const INITIAL_CENTER: [number, number] = [-2.5436816, 53.9795155];
const INITIAL_ZOOM = 5.2;

function Map({ onLoad }: MapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    // let mapRef = useRef<mapboxgl.Map | null>(null);

    const [center] = useState<mapboxgl.LngLatLike>(INITIAL_CENTER);
    const [zoom] = useState<number>(INITIAL_ZOOM);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (mapContainerRef.current) {
            const map = new mapboxgl.Map({
                container: mapContainerRef.current,
                style: "mapbox://styles/mapbox/satellite-v9",
                center,
                zoom,
            });

            map.addControl(new mapboxgl.NavigationControl());

            map.on("load", () => {
                onLoad(map);
                setMapLoaded(true);
            });

            return () => map.remove();
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div
                className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"
                ref={mapContainerRef}
            />
            {mapLoaded && "data-loaded"}
        </>
    );
}

export default Map;
