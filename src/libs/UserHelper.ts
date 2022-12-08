import axios from "axios";
import { User } from "../types/User";
import LocationManagement from "./LocationManagement";
import { Buffer } from "buffer";
import { Review } from "../types/Compra";

const uploadProfilePicture = async (file: File) => {
  axios.post(
    `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}users/upload`,
    { file: file },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

const retrieveProfilePicture = async (imgname: string): Promise<string> => {
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types

  if (!imgname || imgname === "") return "";

  return await axios
    .get(
      `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}users/profile-picture/${imgname}`,
      {
        responseType: "arraybuffer",
      }
    )
    .then((res) => {
      return `data:;base64,${Buffer.from(res.data, "binary").toString(
        "base64"
      )}`;
    })
    .catch((err) => {
      console.log(err);
      return "";
    });
};

async function getProfile(userId: string): Promise<User> {
  let returnUser: User = {
    _id: "",
    name: "empty",
    username: "",
    password: "",
    phoneNumber: "",
    email: "",
    profile_picture: "",
    direction: "",
    biography: "",

    latitude: 0,
    longitude: 0,
    userType: "",
    adsInSeeLater: [],
  };

  await axios
    .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/${userId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
    .then((res1) => {
      returnUser = res1.data[0];
    });

  return returnUser;
}

async function getProfilePicture(userId: string): Promise<string> {
  const user = await getProfile(userId);
  return user.profile_picture;
}

async function getOwnProfile(): Promise<User> {
  let returnUser: User = {
    _id: "",
    name: "empty",
    username: "",
    password: "",
    phoneNumber: "",
    email: "",
    profile_picture: "",
    direction: "",
    biography: "",

    latitude: 0,
    longitude: 0,
    userType: "",
    adsInSeeLater: [],
  };

  await axios
    .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
    .then((res1) => {
      returnUser = res1.data[0];
    });

  return returnUser;
}

async function getUserById(id: string): Promise<User> {
  let returnUser: User = {
    _id: "",
    name: "empty",
    username: "",
    password: "",
    phoneNumber: "",
    email: "",
    profile_picture: "",
    direction: "",
    biography: "",
    latitude: 0,
    longitude: 0,
    userType: "",
    adsInSeeLater: [],
  };

  const getUserRequest = await axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/${id}/profile`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  returnUser = getUserRequest.data;

  return returnUser;
}
function Logout() {
  localStorage.removeItem("userToken");
  localStorage.removeItem("userId");
  alert("La sesion se ha cerrado correctamente");
}

async function getUserByUsername(username: string): Promise<User> {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/${username}/profilebyUsername`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    }
  );

  return response.data[0];
}

function StringAvatar(
  name: string,
  width?: number,
  height?: number,
  fontSize?: number
) {
  return {
    sx: {
      bgcolor: "#63d4a1",
      width: width || 75,
      height: height || 75,
      fontSize: fontSize || 45,
      fontWeight: "bold",
      fontFace: "Mono Space",
    },
    children: `${name.split(" ")[0][0]}`,
  };
}

async function UpdateUserData(user: User) {
  if (user.direction) {
    await LocationManagement.GetCoordinatesFromAddress(user.direction).then(
      async (coordinates) => {
        user.latitude = coordinates.lat;
        user.longitude = coordinates.lng;
        await axios
          .put(
            `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/edit`,
            user,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`,
              },
            }
          )
          .then(() => {
            return true;
          })
          .catch(() => {
            return false;
          });
      }
    );
  } else {
    await axios
      .put(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/edit`, user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then(() => {
        return true;
      })
      .catch(() => {
        return false;
      });
  }
}

async function GetAverageRating(userId: string): Promise<number> {
  return await axios
    .get(
      `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/${userId}/averagerating`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return -1;
    });
}

async function GetReviews(userId: string): Promise<Review[]> {
  return await axios
    .get(
      `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/${userId}/review/all`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

async function checkIsFavourite(
  userId: string,
  favouriteId: string
): Promise<boolean> {
  return await axios
    .get(
      `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}favourites/${userId}/${favouriteId}`
    )
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
}

async function addFavourite(userId: string, favouriteId: string) {
  await axios
    .post(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}favourites/`, {
      user_id: userId,
      favourite_id: favouriteId,
    })
    .catch((err) => {
      console.log(err);
    });
}

async function removeFavourite(userId: string, favouriteId: string) {
  await axios
    .delete(
      `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}favourites/${userId}/${favouriteId}`
    )
    .catch((err) => {
      console.log(err);
    });
}

async function getFavouriteProfiles(userId: string) {
  return await axios
    .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}favourites/${userId}`)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export default {
  uploadProfilePicture,
  retrieveProfilePicture,
  getOwnProfile,
  getUserById,
  Logout,
  StringAvatar,
  UpdateUserData,
  getUserByUsername,
  getProfilePicture,
  GetAverageRating,
  GetReviews,
  checkIsFavourite,
  addFavourite,
  removeFavourite,
  getFavouriteProfiles,
};
