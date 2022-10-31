import axios from "axios";
import Advertisement from "../types/Advertisement";

function getAdvertisementById(id: string): Promise<Advertisement> {
    return axios.get(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`
    );
}

export { getAdvertisementById };
