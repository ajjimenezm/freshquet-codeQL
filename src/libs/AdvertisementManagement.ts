import Advertisement from '../types/Advertisement';
import axios, { AxiosResponse } from 'axios';
import { Buffer } from 'buffer';

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
    `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${id}/images`
  );

  const imageName = res.data[0];

  const image = await axios
    .get(
      `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${id}/images/${imageName}`,
      {
        responseType: 'arraybuffer',
      }
    )
    .catch();

  return `data:;base64,${Buffer.from(image.data, 'binary').toString('base64')}`;
}

async function PlacePurchaseReview(
  id: string,
  rating: number,
  comment: string,
  confcode: string
): Promise<AxiosResponse<any, any>> {
  const config = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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

export default {
  GetAdvertisementById,
  GetAllAdvertisements,
  GetImageAdvertisment,
  PlacePurchaseReview,
};
