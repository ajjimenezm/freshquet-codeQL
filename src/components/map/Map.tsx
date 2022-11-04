import { Button, Snackbar } from "@mui/material";
import { Icon, LatLng } from "leaflet";
import React from "react";
import {
    Circle,
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
} from "react-leaflet";
import CurrentPositionIconSvg from "./current-location-icon.svg";

function Map() {
    // https://nominatim.org/release-docs/develop/api/Search/
    const [locationFound, setLocationFound] = React.useState(false);

    function CurrentLocationIcon() {
        const icon = new Icon({
            iconUrl: CurrentPositionIconSvg,
            iconSize: [25, 25],
        });
        return icon;
    }

    function MapManager() {
        const [position, setPosition] = React.useState<LatLng | null>(null);
        const [radius, setRadius] = React.useState<number>(0);
        const map = useMap();
        React.useEffect(() => {
            map.locate().on("locationfound", (e) => {
                setRadius(e.accuracy);
                map.flyTo(e.latlng, 13, { duration: 0.01 });
                setPosition(e.latlng);
                setLocationFound(true);
            });
        }, [map]);

        return position === null ? null : (
            <Marker position={position} icon={CurrentLocationIcon()}>
                <Circle center={position} radius={radius} color="#a2b3ff" />
            </Marker>
        );
    }

    return (
        <>
            <MapContainer center={[40.4168, -3.7038]} zoom={6}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                        <Button>Click me!</Button>
                    </Popup>
                </Marker>
                <MapManager />
            </MapContainer>
            {!locationFound && (
                <Snackbar
                    sx={{
                        marginBottom: 8,
                    }}
                    open={true}
                    message="Obteniendo tu ubicación..."
                />
            )}
        </>
    );
}

export default Map;
