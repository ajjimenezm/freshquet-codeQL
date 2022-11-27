import Advertisement from "../types/Advertisement";
import axios, { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import { Compra } from "../types/Compra";
import { getDistanceFromLatLonInKm } from "./DistanceCalc";
import { User } from "../types/User";

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

async function GetAllAdvertisementsFromSeller(
  id: string
): Promise<Advertisement[]> {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/all/${id}`
  );
  return response.data;
}

async function GetAllSellers(): Promise<User[]> {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/sellers`
  );
  return response.data;
}

async function GetSellerName(id: string): Promise<string> {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/${id}/name`
  );
  return response.data;
}

async function GetDistanceFormSeller(
  id: string,
  latitudeUser: number,
  longitudeUser: number
): Promise<string> {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/coordinates`,
    [id],
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  const distance = getDistanceFromLatLonInKm(
    response.data[0].latitude,
    response.data[0].longitude,
    latitudeUser,
    longitudeUser
  );

  return distance.toFixed(2);
}

async function GetImageAdvertisment(id: string): Promise<string> {
  const res = await axios.get(
    `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${id}/images`
  );

  const imageName = res.data[0];

  const image = await axios
    .get(
      `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${id}/images/${imageName}`,
      {
        responseType: "arraybuffer",
      }
    )
    .catch();

  return `data:;base64,${Buffer.from(image.data, "binary").toString("base64")}`;
}

async function PlacePurchaseReview(
  id: string,
  rating: number,
  comment: string,
  confcode: string
): Promise<AxiosResponse<any, any>> {
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    data: {
      review: rating,
      review_text: comment,
      confirmation_code: confcode,
    },
    url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/${id}/review`,
  };

  return axios(config);
}

async function GetOrdersFromUser(
  userId: string,
  userRole: string
): Promise<Compra[]> {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/all/${
      userRole === "seller" ? "sell" : "buy"
    }/${userId}`,
    headers: {},
  };

  return axios(config)
    .then((res) => {
      return res.data;
    })
    .catch(() => {
      return [];
    });
}

export default {
  GetAdvertisementById,
  GetAllAdvertisements,
  GetImageAdvertisment,
  PlacePurchaseReview,
  GetOrdersFromUser,
  GetSellerName,
  GetDistanceFormSeller,
  GetAllSellers,
  GetAllAdvertisementsFromSeller,
};
