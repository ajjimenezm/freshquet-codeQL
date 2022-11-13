import { Alert, Button, Snackbar, Typography } from "@mui/material";
import axios from "axios";
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
import { useNavigate } from "react-router-dom";
import LocationManagement from "../../libs/LocationManagement";
import Navigation from "../../libs/Navigation";
import CurrentPositionIconSvg from "./current-location-icon.svg";
import MarkerIconSvg from "./location-pin.svg";

type StoreType = {
    _id: number;
    name: string;
    direction: string;
    latitude: number;
    longitude: number;
};

function Map() {
    // https://nominatim.org/release-docs/develop/api/Search/
    const [position, setPosition] = React.useState<LatLng | null>(null);
    const [radius, setRadius] = React.useState<number>(0);
    const [locationRequested, setLocationRequested] = React.useState(false);
    const [showLocationSnackbar, setShowLocationSnackbar] =
        React.useState(true);
    const [showLocationFoundSnackbar, setShowLocationFoundSnackbar] =
        React.useState(false);
    const [showLocationNotFoundSnackbar, setShowLocationNotFoundSnackbar] =
        React.useState(false);
    const [stores, setStores] = React.useState<StoreType[]>([]);
    const [storeMarkers, setStoreMarkers] = React.useState<JSX.Element[]>([]);
    const navigate = useNavigate();

    function CurrentLocationIcon() {
        const icon = new Icon({
            iconUrl: CurrentPositionIconSvg,
            iconSize: [25, 25],
        });
        return icon;
    }

    function MarkerIcon() {
        const icon = new Icon({
            iconUrl: MarkerIconSvg,
            iconSize: [35, 35],
        });
        return icon;
    }

    React.useEffect(() => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/mapLocations`
            )
            .then((res) => {
                console.log(res.data);
                setStores(res.data);
            });
    }, []);

    React.useEffect(() => {
        if (stores.length > 0) {
            const markers = stores.map((store) => {
                return (
                    <Marker
                        key={store._id}
                        position={new LatLng(store.latitude, store.longitude)}
                        icon={MarkerIcon()}
                    >
                        <Popup>
                            <div className="flex-column">
                                <Typography variant="h6">
                                    {store.name}
                                </Typography>
                                <Typography variant="body1">
                                    {store.direction}
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    onClick={() => {
                                        navigate("/seller/" + store._id);
                                    }}
                                >
                                    Ver productos
                                </Button>
                                <Button
                                    variant="contained"
                                    color={"secondary"}
                                    size="small"
                                    onClick={() => {
                                        Navigation.OpenGoogleMaps(
                                            store.latitude,
                                            store.longitude
                                        );
                                    }}
                                    sx={{ ml: 1 }}
                                >
                                    Cómo llegar
                                </Button>
                            </div>
                        </Popup>
                    </Marker>
                );
            });
            setStoreMarkers(markers);
        }
    }, [stores]);

    function MapManager() {
        const map = useMap();
        React.useEffect(() => {
            if (locationRequested) {
                return;
            }
            setLocationRequested(true);
            map.locate().on("locationfound", (e) => {
                map.flyTo(e.latlng, 13, { duration: 0.01 });
                setRadius(e.accuracy);
                setPosition(e.latlng);
                setShowLocationSnackbar(false);
                setShowLocationFoundSnackbar(true);
            });
            map.locate().on("locationerror", () => {
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
                {storeMarkers}
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
