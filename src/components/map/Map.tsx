import { Alert, Button, Snackbar } from "@mui/material";
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
import LocationManagement from "../../libs/LocationManagement";
import CurrentPositionIconSvg from "./current-location-icon.svg";

function Map() {
    // https://nominatim.org/release-docs/develop/api/Search/
    const [position, setPosition] = React.useState<LatLng | null>(null);
    const [locationRequested, setLocationRequested] = React.useState(false);
    const [showLocationSnackbar, setShowLocationSnackbar] =
        React.useState(true);
    const [showLocationFoundSnackbar, setShowLocationFoundSnackbar] =
        React.useState(false);
    const [showLocationNotFoundSnackbar, setShowLocationNotFoundSnackbar] =
        React.useState(false);
    const [stores, setStores] = React.useState([]);
    const [storeMarkers, setStoreMarkers] = React.useState<JSX.Element[]>([]);

    function CurrentLocationIcon() {
        const icon = new Icon({
            iconUrl: CurrentPositionIconSvg,
            iconSize: [25, 25],
        });
        return icon;
    }

    React.useEffect(() => {
        console.log(
            LocationManagement.GetCoordinatesFromAddress("Buenos Aires")
        );
    }, []);

    function MapManager() {
        const [radius, setRadius] = React.useState<number>(0);
        const map = useMap();
        React.useEffect(() => {
            if (locationRequested) {
                return;
            }
            setLocationRequested(true);
            map.locate().on("locationfound", (e) => {
                console.log("location found");
                setRadius(e.accuracy);
                map.flyTo(e.latlng, 13, { duration: 0.01 });
                setPosition(e.latlng);
                setShowLocationSnackbar(false);
                setShowLocationFoundSnackbar(true);
            });
            map.locate().on("locationerror", () => {
                console.log("location error");
                setShowLocationSnackbar(false);
                setShowLocationNotFoundSnackbar(true);
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
            <Snackbar
                sx={{
                    marginBottom: 8,
                }}
                open={showLocationSnackbar}
                message="Obteniendo tu ubicación..."
            />
            <Snackbar
                sx={{
                    marginBottom: 8,
                }}
                open={showLocationNotFoundSnackbar}
                onClose={() => setShowLocationNotFoundSnackbar(false)}
                autoHideDuration={6000}
            >
                <Alert
                    severity="error"
                    variant="filled"
                    sx={{ width: "100%" }}
                    elevation={6}
                >
                    No se ha podido obtener tu ubicación. Por favor, comprueba
                    que la ubicación está activada en tu dispositivo.
                </Alert>
            </Snackbar>
            <Snackbar
                sx={{
                    marginBottom: 8,
                }}
                open={showLocationFoundSnackbar}
                onClose={() => {
                    setShowLocationFoundSnackbar(false);
                }}
                autoHideDuration={6000}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                    elevation={6}
                >
                    Ubicación encontrada.
                </Alert>
            </Snackbar>
        </>
    );
}

export default Map;
