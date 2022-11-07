import Advertisement from "../types/Advertisement";
import axios from "axios";
import { Buffer } from "buffer";
import { KeyboardReturnSharp } from "@mui/icons-material";

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

async function GetImageAdvertisment(id: string): Promise<string> {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}/images`
  );

  const imageName = res.data[0];

  const image = await axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}/images/${imageName}`,
    {
      responseType: "arraybuffer",
    }
  );

  return `data:;base64,${Buffer.from(image.data, "binary").toString("base64")}`;
}

export default {
  GetAdvertisementById,
  GetAllAdvertisements,
  GetImageAdvertisment,
};
