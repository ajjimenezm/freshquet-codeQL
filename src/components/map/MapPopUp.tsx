import { Typography, Button } from "@mui/material";
import { Popup } from "react-leaflet";
import { useNavigate } from "react-router-dom";
import Navigation from "../../libs/Navigation";

interface MapPopUpProps {
    storeName: string;
    storeId: number;
    storeDirection: string;
    storeLatitude: number;
    storeLongitude: number;
}

function MapPopUp(props: MapPopUpProps) {
    const navigate = useNavigate();
    return (
        <Popup>
            <div className="flex-column">
                <Typography variant="h6">{props.storeName}</Typography>
                <Typography variant="body1">{props.storeDirection}</Typography>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => {
                        navigate("/seller/" + props.storeId);
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
                            props.storeLatitude,
                            props.storeLongitude
                        );
                    }}
                    sx={{ ml: 1 }}
                >
                    Cómo llegar
                </Button>
            </div>
        </Popup>
    );
}

export default MapPopUp;
