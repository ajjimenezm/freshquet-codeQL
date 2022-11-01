import Advertisement from "../types/Advertisement";
import axios from "axios";

async function GetAdvertisementById(id: string): Promise<Advertisement> {
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`
    );
    return response.data;
}

async function GetAllAdvertisements(): Promise<Advertisement[]> {
    const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all`
    );
    return response.data;
}

export default {
    GetAdvertisementById,
    GetAllAdvertisements,
};
