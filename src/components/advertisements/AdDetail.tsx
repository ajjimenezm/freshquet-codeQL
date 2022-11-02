import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import Advertisement from '../../types/Advertisement';
import { Button, Rating } from '@mui/material';
import { db } from '../../firebase';
import { AuthContext } from '../../chatContext/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import SimpleImageSlider from 'react-simple-image-slider';
import { Buffer } from 'buffer';
import { Mutex } from 'async-mutex';

function AdDetail() {
  const { id } = useParams<{ id: string }>();
  const [advertisement, setProduct] = useState<Advertisement>();
  const [userId, setUserId] = useState<string>();
  const [userCategory, setUserCategory] = useState<string>();
  const [sellerId, setSellerId] = useState<string>();
  const [error, setError] = useState(false);
  const [userChat, setUserChat] = useState<string>();
  const [images, setImages] = useState<string[]>([]);
  const [imagenames, setImagenames] = useState<string[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState<number>(0);

  const mutex = new Mutex();

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
            `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}/images`
          )
          .then((res) => {
            if (res.data.length > 0) setImagenames(res.data);
          });
      } catch (err) {
        setError(true);
        alert(err);
      }
    };
    getProduct();
    getProductImagenames();
  }, [id]);

  React.useEffect(() => {
    let requests: Promise<AxiosResponse<any, any>>[] = [];
    for (let i = 0; i < imagenames.length; i++) {
      requests = requests.concat(
        axios.get(
          `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}/images/${imagenames[i]}`,
          {
            responseType: 'arraybuffer',
          }
        )
      );
    }

    axios.all(requests).then(
      axios.spread((...responses) => {
        for (let i = 0; i < responses.length; i++) {
          mutex.acquire().then((release) => {
            console.log(images);
            const tmp = images.concat(
              `data:;base64,${Buffer.from(responses[i].data, 'binary').toString(
                'base64'
              )}`
            );
            console.log(tmp);
            setImages(tmp);
            setImagesLoaded((imagesLoaded) => imagesLoaded + 1);
            console.log(imagesLoaded);
            console.log(images);

            release();
          });
        }
      })
    );
  }, [imagenames]);

  axios
    .get(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}users/type`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
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

  const searchUserChat = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', advertisement?.sellerId.username)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserChat(doc.id);
    });
  };

  const navigateChat = async () => {
    const uid = currentUser!.uid;
    if (userChat == undefined) {
      await searchUserChat();
    }
    const combinedId: unknown =
      uid > userChat! ? uid + userChat : userChat + uid;

    //const res = await getDocs(db, "chats", combinedId)
  };

  const chatProcess = () => {
    searchUserChat();
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

  function getAdPicturesSlider(): JSX.Element {
    const moreThanOne = images.length > 1;

    if (imagesLoaded < imagenames.length) {
      return <></>;
    }

    return (
      <SimpleImageSlider
        width={400}
        height={400}
        showBullets={moreThanOne}
        showNavs={true}
        images={images}
      />
    );
  }

  return (
    <>
      {advertisement && (
        <div className="mb-14 flex min-h-screen w-full flex-col items-center bg-slate-200 p-8">
          <h1 className="mb-4 text-3xl font-bold uppercase">
            {advertisement.name}
          </h1>
          {/* <img
            src="https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Patata"
            className="max-w-[80%]"
          /> */}
          {getAdPicturesSlider()}
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
          <div className="mt-2 mb-4 flex flex-col items-center justify-center text-center">
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
              onClick={() => chatProcess()}
            >
              Comprar
            </Button>
            <Button onClick={() => console.log(images)}>
              Eliminame si me ves
            </Button>
          </div>
          {edit}
        </div>
      )}
    </>
  );
}

export default AdDetail;
