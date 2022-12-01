import axios from "axios";
import { useNavigate } from "react-router-dom";
import { User, UserEdit } from "../types/User";
import LocationManagement from "./LocationManagement";
import { Buffer } from "buffer";

const uploadProfilePicture = (file: any) => {
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
            console.log(res);
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
        address: "",
        biography: "",

        latitude: 0,
        longitude: 0,
        userType: "",
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
        address: "",
        biography: "",

        latitude: 0,
        longitude: 0,
        userType: "",
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
        address: "",
        biography: "",
        latitude: 0,
        longitude: 0,
        userType: "",
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

function StringAvatar(name: string) {
    return {
        sx: {
            bgcolor: "#63d4a1",
            width: 75,
            height: 75,
            fontSize: 45,
            fontWeight: "bold",
            fontFace: "Mono Space",
        },
        children: `${name.split(" ")[0][0]}`,
    };
}

async function UpdateUserData(user: User) {
    await LocationManagement.GetCoordinatesFromAddress(user.address).then(
        async (coordinates) => {
            user.latitude = coordinates.lat;
            user.longitude = coordinates.lng;
            await axios
                .put(
                    `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/edit`,
                    user,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "userToken"
                            )}`,
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
};
