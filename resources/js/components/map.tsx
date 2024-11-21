import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useSitesGeojsonData } from "@/hooks/use-sites-geojson-data";
import Marker from "@/components/marker";

type MapProps = {
    onLoad: (map: mapboxgl.Map) => void;
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const INITIAL_CENTER: [number, number] = [-2.5436816, 53.9795155];
const INITIAL_ZOOM = 5.2;

function Map({ onLoad }: MapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);

    const [center] = useState<mapboxgl.LngLatLike>(INITIAL_CENTER);
    const [zoom] = useState<number>(INITIAL_ZOOM);
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);

    const { data } = useSitesGeojsonData();

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
                if (data) {
                    map.addSource("sites", {
                        type: "geojson",
                        data,
                    });

                    map.addLayer({
                        id: "sites-layer",
                        type: "symbol",
                        source: "sites",
                        minzoom: 5,
                        maxzoom: 10,
                        layout: {
                            "icon-image": "sites",
                            "icon-size": 1.5,
                            "icon-allow-overlap": true,
                            "text-field": ["get", "name"],
                            "text-offset": [0, 1.5],
                            "text-anchor": "top",
                        },
                    });

                    map.loadImage("/public/site.png", (error, image) => {
                        if (error) throw error;
                        if (image && !map.hasImage("sites")) {
                            map.addImage("sites", image, { pixelRatio: 2 });
                        }
                    });
                }
                onLoad(map);
                setMapLoaded(true);
            });

            mapRef.current = map;

            return () => map.remove();
        }

        return () => {};
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    return (
        <>
            <div
                className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min"
                ref={mapContainerRef}
            />
            {/* {mapLoaded &&
                data &&
                data.features.map((feature, i) => (
                    <Marker
                        key={feature.properties?.id ?? i}
                        feature={feature}
                        map={mapRef.current}
                    />
                ))} */}
        </>
    );
}

export default Map;
