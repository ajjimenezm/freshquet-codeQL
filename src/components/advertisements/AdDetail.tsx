import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Advertisement from "../../types/Advertisement";
import { Button, Rating } from "@mui/material";
import { db } from "../../firebase";
//import { User } from "firebase/auth";
import { User } from "../../types/User";
import { AuthContext } from "../../chatContext/AuthContext";
import {
  collection,
  getDocs,
  query,
  setDoc,
  where,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { serialize } from "v8";
import SimpleImageSlider from "react-simple-image-slider";
import { Buffer } from "buffer";
import axios, { AxiosResponse } from "axios";
import { Skeleton } from "@mui/material";
import UserHelper from "../../libs/UserHelper";

function AdDetail() {
  const { id } = useParams<{ id: string }>();
  const [advertisement, setProduct] = useState<Advertisement>();
  const [user, setUser] = useState<User>();
  const [userId, setUserId] = useState<string>();
  const [userCategory, setUserCategory] = useState<string>();
  const [sellerId, setSellerId] = useState<string>();
  const [error, setError] = useState(false);
  const [userChat, setUserChat] = React.useState<string>();
  const [combinedId, setCombinedId] = React.useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [imagenames, setImagenames] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  const currentUser = React.useContext(AuthContext);

  useEffect(() => {
    const getProduct = async () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`
          )
          .then((res) => {
            setProduct(res.data);
            setSellerId(res.data.sellerId._id);
          });
      } catch (err) {
        setError(true);
        alert(err);
      }
    };
    const getProductImagenames = async () => {
      try {
        axios
          .get(
            `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${id}/images`
          )
          .then((res) => {
            if (res.data.length > 0) setImagenames(res.data);
          });
      } catch (err) {
        setError(true);
        alert(err);
      }
    };
    const getUser = async () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        })
        .then((res) => {
          setUser(res.data[0]);
        });
    };
    getProduct();
    getProductImagenames();
    getUser();
  }, [id]);

  React.useEffect(() => {
    let requests: Promise<AxiosResponse<any, any>>[] = [];
    for (let i = 0; i < imagenames.length; i++) {
      requests = requests.concat(
        axios.get(
          `${process.env.REACT_APP_BACKENDFOTOS_DEFAULT_ROUTE}advertisements/${id}/images/${imagenames[i]}`,
          {
            responseType: "arraybuffer",
          }
        )
      );
    }

    axios.all(requests).then(
      axios.spread((...responses) => {
        for (let i = 0; i < responses.length; i++) {
          setImages((images) =>
            images.concat(
              `data:;base64,${Buffer.from(responses[i].data, "binary").toString(
                "base64"
              )}`
            )
          );
          setImagesLoaded((imagesLoaded) => imagesLoaded + 1);
        }
      })
    );
  }, [imagenames]);

  axios
    .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    })
    .then((res) => {
      setUserCategory(res.data.userRole);
      setUserId(res.data.userId);
    });

  if (error) return <h1>Product not found</h1>;

  const navigate = useNavigate();
  const navigateToSeller = (id: string) => {
    navigate(`/seller/${id}`);
  };
  const navigateToEdit = (id: string) => {
    navigate(`/products/edit/${id}`);
  };

  // const searchUserChat = async () => {
  //   const q = query(
  //     collection(db, "users"),
  //     where("displayName", "==", advertisement?.sellerId.username)
  //   );
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     setUserChat(doc.id);
  //     createCombinedId(doc.id);
  //   });
  //   //console.log(userChat);
  // };

  // const createCombinedId = async (id: string) => {
  //   const uid = currentUser!.uid;
  //   const newId = uid > id! ? uid + id : id + uid;
  //   setCombinedId(newId);
  // };

  // const navigateChat = async () => {
  //   //navigate(`/chat/${userChat}`);
  //   console.log(combinedId)
  //   let exists = false;
  //   const q = query(collection(db, "chats"));
  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     if (doc.id === combinedId) {
  //       exists = true;
  //     }
  //   });
  //   // const res = await getDoc(doc(db, "chats", combinedId!));
  //   if (!exists) {
  //     await setDoc(doc(db, "chats", combinedId!), { messages: [] });

  //     await updateDoc(doc(db, "userChats", currentUser!.uid), {
  //       [combinedId! + ".userInfo"]: {
  //         uid: userChat,
  //         displayName: advertisement?.sellerId.username,
  //       },
  //       [combinedId! + ".date"]: serverTimestamp(),
  //     });
  //     await updateDoc(doc(db, "userChats", userChat!), {
  //       [combinedId! + ".userInfo"]: {
  //         uid: currentUser!.uid,
  //         displayName: currentUser!.displayName,
  //       },
  //       [combinedId! + ".date"]: serverTimestamp(),
  //     });
  //   }
  // };

  // React.useEffect(() => {
  //   if (combinedId !== "") {
  //     navigateChat();
  //   }
  // }, [combinedId]);

  let edit: any;
  advertisement && userCategory === "seller" && sellerId === userId
    ? (edit = (
        <Button
          className="center-2"
          variant="outlined"
          color="primary"
          onClick={navigateToEdit.bind(null, advertisement._id)}
        >
          Editar
        </Button>
      ))
    : (edit = <></>);

  function getAdPicturesSlider(): JSX.Element {
    const moreThanOne = images.length > 1;

    if (imagesLoaded < imagenames.length) {
      return (
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: 300, height: 300 }}
        />
      );
    }

    return (
      <div>
        <SimpleImageSlider
          width={300}
          height={300}
          showBullets={moreThanOne}
          showNavs={moreThanOne}
          images={images}
        />
      </div>
    );
  }

  const storeProd = () => {
    if (!userId) {
      alert("Debes iniciar sesión para guardar productos");
      return;
    }

    if (!advertisement?._id) {
      alert("Error con el producto seleccionado");
      return;
    }

    if (!user?.adsInSeeLater.includes(advertisement?._id)) {
      user?.adsInSeeLater.push(advertisement._id);
      UserHelper.UpdateUserData(user!);
      alert("GUARDADO");
    } else {
      const idRemove = user?.adsInSeeLater.indexOf(advertisement._id);
      user?.adsInSeeLater.splice(idRemove, 1);
      UserHelper.UpdateUserData(user!);
      alert("BORRADO");
    }
  };

  return (
    <>
      {advertisement && (
        <div className="mb-14 flex min-h-screen w-full flex-col items-center bg-slate-200 p-8">
          <h1 className="mb-4 text-3xl font-bold uppercase">
            {advertisement.name}
          </h1>
          <Button onClick={storeProd}>VER MÁS TARDE</Button>
          {
            //console.log(usersInSeeLater);
            /* <img
            src="https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Patata"
            className="max-w-[80%]"
          /> */
          }
          {getAdPicturesSlider()}
          <p className="py-4 text-2xl font-semibold">
            {advertisement.pricePerKilogram} €/kg
          </p>
          <div className="w-full rounded-lg border-2 border-[#63d4a1] p-4">
            <p className="text-xl"> Descripción del Vendedor: </p>
            <p className="text-xl">{advertisement.description}</p>
          </div>
          <p className="py-4 text-2xl font-medium">
            Categoría:{" "}
            <span className="border-1 rounded-lg p-2 uppercase">
              {advertisement.category}
            </span>
          </p>
          <Rating
            name="half-rating-read"
            defaultValue={advertisement.averageReviewScore}
            precision={0.5}
            readOnly
          />
          <div className="mt-2 mb-4 flex flex-col items-center justify-center text-center">
            Vendido por{" "}
            <span className="font-bold"> {advertisement.sellerId.name}</span>
            <Button
              className="left-2"
              variant="outlined"
              color="primary"
              onClick={navigateToSeller.bind(null, sellerId as string)}
            >
              Visita su tienda
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                navigate(`/products/buy/${advertisement._id}`);
              }}
            >
              Comprar
            </Button>
          </div>
          {edit}
        </div>
      )}
    </>
  );
}

export default AdDetail;
