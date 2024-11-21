import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { useSitesGeojsonData } from "@/hooks/use-sites-geojson-data";
import siteIcon from "@/assets/site.png";
import equipmentIcon from "@/assets/equipment.png";
import { useEquipmentGeojsonData } from "@/hooks/use-equipment-geojson-data";
import EquipmentPopup from "@/components/map/equipment-popup";
import { createRoot } from "react-dom/client";

type MapProps = {
    onLoad: (map: mapboxgl.Map) => void;
};

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
const INITIAL_CENTER: [number, number] = [-2.5436816, 53.9795155];
const INITIAL_ZOOM = 5.2;

function Map({ onLoad }: MapProps) {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    const popupRef = useRef<mapboxgl.Popup | null>(null);

    const [center] = useState<mapboxgl.LngLatLike>(INITIAL_CENTER);
    const [zoom] = useState<number>(INITIAL_ZOOM);
    const [, setMapLoaded] = useState<boolean>(false);

    const { data: siteData } = useSitesGeojsonData();
    const { data: equipmentData } = useEquipmentGeojsonData();

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
                if (siteData && equipmentData) {
                    map.addSource("sites", {
                        type: "geojson",
                        data: siteData,
                    });

                    map.addSource("equipment", {
                        type: "geojson",
                        data: equipmentData,
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
                            "text-offset": [0, 1.5],
                            "text-anchor": "top",
                        },
                    });

                    map.addLayer({
                        id: "equipment-layer",
                        type: "symbol",
                        source: "equipment",
                        minzoom: 10,
                        maxzoom: 22,
                        layout: {
                            "icon-image": "equipment",
                            "icon-size": 1.5,
                            "icon-allow-overlap": true,
                            "text-offset": [0, 1.5],
                            "text-anchor": "top",
                        },
                    });

                    map.loadImage(siteIcon, (error, image) => {
                        if (error) throw error;
                        if (image && !map.hasImage("sites")) {
                            map.addImage("sites", image, { pixelRatio: 2 });
                        }
                    });

                    map.loadImage(equipmentIcon, (error, image) => {
                        if (error) throw error;
                        if (image && !map.hasImage("equipment")) {
                            map.addImage("equipment", image, { pixelRatio: 2 });
                        }
                    });

                    map.on("mouseenter", "sites-layer", () => {
                        map.getCanvas().style.cursor = "pointer";
                    });

                    map.on("mouseenter", "equipment-layer", () => {
                        map.getCanvas().style.cursor = "pointer";
                    });

                    map.on("mouseleave", "sites-layer", () => {
                        map.getCanvas().style.cursor = "";
                    });

                    map.on("mouseleave", "equipment-layer", () => {
                        map.getCanvas().style.cursor = "";
                    });

                    map.on("click", "sites-layer", (e) => {
                        const site = siteData.features.find(
                            (f) => f.properties?.id === e.features?.[0].properties?.id
                        );

                        if (!site) {
                            return;
                        }

                        if (site.geometry.type === "Point") {
                            map.flyTo({
                                center: site.geometry.coordinates as [number, number],
                                zoom: 11,
                                duration: 2000,
                            });
                        }
                    });

                    map.on("click", "equipment-layer", (e) => {
                        if (popupRef.current) {
                            popupRef.current.remove();
                        }

                        const equipment = equipmentData.features.find(
                            (f) => f.properties?.id === e.features?.[0].properties?.id
                        );

                        if (!equipment || equipment.geometry.type !== "Point") {
                            return;
                        }

                        const coordinates = equipment.geometry.coordinates.slice() as [
                            number,
                            number,
                        ];

                        const popupNode = document.createElement("div");
                        const popupRoot = createRoot(popupNode);
                        popupRoot.render(<EquipmentPopup equipment={equipment.properties} />);

                        popupRef.current = new mapboxgl.Popup({
                            closeButton: false,
                            closeOnClick: true,
                        })
                            .setLngLat(coordinates)
                            .setDOMContent(popupNode)
                            .addTo(map);

                        // Cleanup React component when popup is removed
                        popupRef.current.on("close", () => {
                            popupRoot.unmount();
                        });

                        map.flyTo({
                            center: coordinates,
                            zoom: 17,
                            duration: 2000,
                        });
                    });
                }
                onLoad(map);
                setMapLoaded(true);
            });

            mapRef.current = map;

            return () => {
                map.remove();
                if (popupRef.current) {
                    popupRef.current.remove();
                }
            };
        }

        return () => {};
    }, [siteData, equipmentData, center, zoom, onLoad]);

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
