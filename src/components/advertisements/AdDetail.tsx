import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Advertisement from '../../types/Advertisement';
import { Button, Rating } from '@mui/material';
import {db} from "../../firebase";
import { User } from "firebase/auth";
import { AuthContext } from '../../chatContext/AuthContext';
import {collection, getDocs, query, setDoc, where, doc, updateDoc, serverTimestamp, getDoc} from "firebase/firestore";
import { serialize } from 'v8';

function AdDetail() {
  const { id } = useParams<{ id: string }>();
  const [advertisement, setProduct] = useState<Advertisement>();
  const [userId, setUserId] = useState<string>();
  const [userCategory, setUserCategory] = useState<string>();
  const [sellerId, setSellerId] = useState<string>();
  const [error, setError] = useState(false);
  const [userChat, setUserChat] = React.useState<string>();
  const [showConfirm, setShowConfirm] = useState(false);
  const [combinedId, setCombinedId] = React.useState<string>();

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
    getProduct();
  }, [id]);


  axios
    .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
      },
    })
    .then((res) => {
      console.log(res);
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

  const searchUserChat = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", advertisement?.sellerId.username));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserChat(doc.id);
      });
    console.log(userChat);
  };

  const createCombinedId = async () => {
    const uid = currentUser!.uid;
    uid > userChat!
      ? setCombinedId(uid + userChat)
      : setCombinedId(userChat + uid);
    console.log(combinedId);
  };

  const chatProcess = async () => {
    searchUserChat();
    createCombinedId();  
  };

  const navigateChat = async () => {
    //navigate(`/chat/${userChat}`);
    let exists = false;
    const q = query(collection(db, "chats"));
    const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          if(doc.id === combinedId){
              exists = true;
          }
      });
    // const res = await getDoc(doc(db, "chats", combinedId!));
    if(!exists){
      await setDoc(doc(db, "chats", combinedId!), { messages: [] });

      await updateDoc(doc(db, "userChats", currentUser!.uid), {
        [combinedId!+".userInfo"]: {
          uid : userChat,
          displayName : advertisement?.sellerId.username,
        },
        [combinedId!+".date"]: serverTimestamp()
      });
      await updateDoc(doc(db, "userChats", userChat!), {
        [combinedId!+".userInfo"]: {
          uid : currentUser!.uid,
          displayName : currentUser!.displayName,
        },
        [combinedId!+".date"]: serverTimestamp()
      });
    }
  } ;

  const buyProcess = () => {
    setShowConfirm(true);
    chatProcess();
  };

  const confirmBuy = () => {
    chatProcess();
    navigateChat();
  };



  let edit: any;
  advertisement && userCategory === 'seller' && sellerId === userId
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


  return (
    <>
      {advertisement && (
        <div className="mb-14 flex min-h-screen w-full flex-col items-center bg-slate-200 p-8">
          <h1 className="mb-4 text-3xl font-bold uppercase">
            {advertisement.name}
          </h1>
          <img
            src="https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Patata"
            className="max-w-[80%]"
          />
          <p className="py-4 text-2xl font-semibold">
            {advertisement.pricePerKilogram} €/kg
          </p>
          <div className="w-full rounded-lg border-2 border-[#63d4a1] p-4">
            <p className="text-xl"> Descripción del Vendedor: </p>
            <p className="text-xl">{advertisement.description}</p>
          </div>
          <p className="py-4 text-2xl font-medium">
            Categoría:{' '}
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
          <div className="mt-2 text-center flex flex-col items-center justify-center mb-4">
            Vendido por{' '}
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
              className="left-2"
              variant="outlined"
              color="primary"
              onClick={() => buyProcess()}
            >
              Comprar
            </Button>
          </div>
          {edit}
        </div>
      )}
      {showConfirm ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold justify-center">
                    Confirmar compra
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowConfirm(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowConfirm(false)}
                  >
                    Atrás
                  </button>
                  <button
                    className="bg-emerald-300 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => confirmBuy()}
                  >
                    Enviar mensaje
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default AdDetail;
