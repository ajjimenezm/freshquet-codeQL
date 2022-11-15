import { Alert, Button, Fab, Snackbar, useTheme, Zoom } from "@mui/material";
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
import CurrentPositionIconSvg from "./current-location-icon.svg";
import MarkerIconSvg from "./location-pin.svg";
import MapPopUp from "./MapPopUp";
import LocationDisabledIcon from "@mui/icons-material/LocationDisabled";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";

type StoreType = {
    _id: number;
    name: string;
    direction: string;
    latitude: number;
    longitude: number;
};

function Map() {
    const [position, setPosition] = React.useState<LatLng | null>(null);
    const [locationCentered, setLocationCentered] = React.useState(false);
    const [radius, setRadius] = React.useState<number>(0);
    const [locationRequested, setLocationRequested] = React.useState(false);
    const [showLocationSnackbar, setShowLocationSnackbar] =
        React.useState(true);
    const [showLocationFoundSnackbar, setShowLocationFoundSnackbar] =
        React.useState(false);
    const [showLocationNotFoundSnackbar, setShowLocationNotFoundSnackbar] =
        React.useState(false);
    const [locationError, setLocationError] = React.useState(false);
    const [stores, setStores] = React.useState<StoreType[]>([]);
    const [storeMarkers, setStoreMarkers] = React.useState<JSX.Element[]>([]);
    const theme = useTheme();
    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    let navigateToLocation: () => void;

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
                setStores(
                    res.data.filter(
                        (store: StoreType) =>
                            store.latitude &&
                            store.latitude !== 0 &&
                            store.longitude &&
                            store.longitude !== 0
                    )
                );
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
                        <MapPopUp
                            storeName={store.name}
                            storeId={store._id}
                            storeDirection={store.direction}
                            storeLatitude={store.latitude}
                            storeLongitude={store.longitude}
                        />
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
                setLocationError(true);
                setShowLocationSnackbar(false);
                setShowLocationNotFoundSnackbar(true);
            });
        }, [map]);

        map.addEventListener("move", () => {
            if (position) {
                setLocationCentered(
                    map.distance(map.getCenter(), position) < 100
                );
            }
        });

        navigateToLocation = () => {
            if (position) {
                map.flyTo(position, 15, { duration: 1 });
            }
        };

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
            {locationError &&
                !(showLocationNotFoundSnackbar || showLocationSnackbar) && (
                    <Zoom
                        in={!showLocationNotFoundSnackbar}
                        timeout={transitionDuration}
                        style={{
                            transitionDelay: "300ms",
                        }}
                    >
                        <Fab
                            color="error"
                            aria-label="location disabled"
                            sx={{
                                position: "fixed",
                                zIndex: 1,
                                bottom: 0,
                                marginBottom: 10,
                                marginRight: 2,
                                right: 0,
                            }}
                            onClick={() => {
                                setShowLocationNotFoundSnackbar(true);
                            }}
                        >
                            <LocationDisabledIcon />
                        </Fab>
                    </Zoom>
                )}
            {!locationError &&
                !showLocationFoundSnackbar &&
                !showLocationSnackbar && (
                    <Zoom
                        in={true}
                        timeout={transitionDuration}
                        style={{
                            transitionDelay: "300ms",
                        }}
                    >
                        <Fab
                            color="primary"
                            aria-label="location disabled"
                            sx={{
                                position: "fixed",
                                zIndex: 1,
                                bottom: 0,
                                marginBottom: 10,
                                marginRight: 2,
                                right: 0,
                            }}
                            onClick={() => {
                                navigateToLocation();
                            }}
                        >
                            {locationCentered ? (
                                <MyLocationIcon />
                            ) : (
                                <LocationSearchingIcon />
                            )}
                        </Fab>
                    </Zoom>
                )}
        </>
    );
}

export default Map;
