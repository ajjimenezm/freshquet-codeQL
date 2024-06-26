import Advertisement from "../types/Advertisement";
import axios, { AxiosResponse } from "axios";
import { Buffer } from "buffer";
import { Compra } from "../types/Compra";
import { getDistanceFromLatLonInKm } from "./DistanceCalc";
import { User } from "../types/User";
import { Category } from "../types/Category";

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
  const result: Advertisement[] = response.data.map((ad: Advertisement) => {
    return {
      _id: ad._id,
      name: ad.name,
      pricePerKilogram: ad.pricePerKilogram,
      description: ad.description,
      averageReviewScore: ad.averageReviewScore,
      category: ad.category,
      pictures: ad.pictures,
      sellerId: {
        _id: ad.sellerId._id,
        name: ad.sellerId.name,
        username: ad.sellerId.username,
      },
    };
  });
  return result;
}

async function CreateNewAdvertisement(
  id: string,
  name: string,
  description: string,
  pricePerKilogram: number,
  category: Category,
  averageReviewScore: number,
  sellerId: string,
  images: File[]
) {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/create`,
    data: {
      id: id,
      name: name,
      description: description,
      pricePerKilogram: pricePerKilogram,
      category: category,
      averageReviewScore: averageReviewScore,
      sellerId: sellerId,
      pictures: images,
    },
  };

  return axios(config);
}

async function UploadProductImages(productId: string, images: File[]) {
  const filesdata = new FormData();

  for (let i = 0; i < images.length; i++) {
    filesdata.append("files", images[i]);
  }

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${productId}/uploadimages`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("userToken")}`,
    },
    data: filesdata,
  };

  return axios(config);
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

async function GetAverageReview(advId: string) {
  const config = {
    method: "get",
    url: `http://localhost:3001/api/advertisements/${advId}/averageReview`,
    headers: {},
  };

  return await (
    await axios(config)
  ).data;
}

async function GetNumberOfOrdersFromUser(
  userId: string,
  userRole: string
): Promise<number> {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/all/${
      userRole === "seller" ? "sell" : "buy"
    }/${userId}`,
    headers: {},
  };

  return axios(config)
    .then((res) => {
      return res.data.length;
    })
    .catch(() => {
      return 0;
    });
}

async function GetProductPicturesNames(id: string): Promise<string[]> {
  return await axios
    .get(
      `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${id}/images`
    )
    .then((res) => {
      if (res.data.length > 0) return res.data;
    })
    .catch(() => {
      return [];
    });
}

/**
 * @param id Id of the advertisement
 * @returns A promise that resolves to the array of all the images of the advertisement in base64, ready to be used as the source of an image component
 */
async function GetProductPictures(id: string): Promise<string[]> {
  const imgnames: string[] = await GetProductPicturesNames(id);

  if (!imgnames || imgnames.length === 0) return []; // no images

  for (let i = 0; i < imgnames.length; i++) {
    if (!imgnames[i] || imgnames[i] === "") return []; //if any of the images are not found, return empty array
  }

  let requests: Promise<AxiosResponse<any, any>>[] = [];
  for (let i = 0; i < imgnames.length; i++) {
    if (!imgnames[i] || imgnames[i] === "") continue; //if any image is empty, skip it. it is redundant, but just in case
    requests = requests.concat(
      axios.get(
        `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${id}/images/${imgnames[i]}`,
        {
          responseType: "arraybuffer",
        }
      )
    );
  }

  const resImages: string[] = [];

  await axios.all(requests).then(
    axios.spread((...responses) => {
      for (let i = 0; i < responses.length; i++) {
        resImages.push(
          `data:;base64,${Buffer.from(responses[i].data, "binary").toString(
            "base64"
          )}`
        );
      }
    })
  );

  return resImages;
}

const UpdateAdvertisment = async (advertisement: Advertisement) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${advertisement._id}`,
    advertisement,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
};

const EndCompra = async (idCompra: string) => {
  return await axios.put(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/${idCompra}/end`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );
};

const filterByDistance = async (
  filterValue: number,
  advertisements: Advertisement[],
  userLocs: {
    latitude: number;
    longitude: number;
  }
) => {
  const sellerIds = new Set();
  advertisements.forEach((ad: Advertisement) => {
    sellerIds.add(ad.sellerId._id);
  });
  const sellerIdsArray = Array.from(sellerIds);

  const adsToShow: Advertisement[] = [];
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/coordinates`,
    sellerIdsArray,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  response.data.map((seller: any) => {
    const distance = getDistanceFromLatLonInKm(
      seller.latitude,
      seller.longitude,
      userLocs.latitude,
      userLocs.longitude
    );
    if (distance < filterValue) {
      const ads = advertisements.filter((ad) => ad.sellerId._id == seller._id);
      if (ads) ads.forEach((ad) => adsToShow.push(ad));
    }
  });

  return adsToShow;
};

export default {
  GetAdvertisementById,
  GetAllAdvertisements,
  GetImageAdvertisment,
  PlacePurchaseReview,
  GetOrdersFromUser,
  GetNumberOfOrdersFromUser,
  GetSellerName,
  GetDistanceFormSeller,
  GetAllSellers,
  GetAllAdvertisementsFromSeller,
  GetProductPictures,
  GetProductPicturesNames,
  filterByDistance,
  CreateNewAdvertisement,
  UploadProductImages,
  GetAverageReview,
  UpdateAdvertisment,
  EndCompra,
};
