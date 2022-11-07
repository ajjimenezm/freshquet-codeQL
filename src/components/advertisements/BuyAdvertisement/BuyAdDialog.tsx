import {
  Stepper,
  StepLabel,
  Step,
  StepContent,
  Typography,
  InputAdornment,
  FormControl,
  FormHelperText,
  OutlinedInput,
  InputLabel,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Advertisement from "../../../types/Advertisement";
import VerticalBuyAdCard from "./VerticalBuyAdCard";
import axios from "axios";
import BuyAdStepButtons from "./BuyAdStepButtons";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { db } from "../../../firebase";
import { User } from "firebase/auth";
import { AuthContext } from "../../../chatContext/AuthContext";
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
  Timestamp,
  arrayUnion,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { UserContext } from "../../../chatContext/UserContext";
import AdvertisementManagement from "../../../libs/AdvertisementManagement";

function BuyAd() {
  const { id } = useParams<{ id: string }>();
  const [requestSent, setRequestSent] = React.useState(false);
  const [advertisement, setAdvertisement] = React.useState<Advertisement>();
  const [activeStep, setActiveStep] = React.useState(0);
  const [quantity, setQuantity] = React.useState(0);
  const [quantityValue, setQuantityValue] = React.useState("");
  const [quantityError, setQuantityError] = React.useState(false);
  const [userChat, setUserChat] = React.useState<any>();
  const [combinedId, setCombinedId] = React.useState<string>("");
  const [text, setText] = React.useState<string>("");
  const [image, setImage] = React.useState<string>("");
  const regexDecimalWithPoint = /^\d*\.?\d*$/;
  const regexDecimalWithComma = /^\d*,?\d*$/;
  const navigate = useNavigate();

  const currentUser = React.useContext(AuthContext);

  React.useEffect(() => {
    if (id) {
      AdvertisementManagement.GetAdvertisementById(id).then((res) => {
        setAdvertisement(res);
      });
    }
  }, [id]);

  React.useEffect(() => {
    if (id) {
      AdvertisementManagement.GetImageAdvertisment(id).then((res) => {
        setImage(res);
      });
    }
  });

  React.useEffect(() => {
    let timeout: string | number | NodeJS.Timeout | undefined;
    if (requestSent) {
      timeout = setTimeout(() => {
        navigate("/chatmenu");
      }, 3000);
    }
    return () => {
      if (requestSent) {
        clearTimeout(timeout);
      }
    };
  }, [requestSent]);

  const steps = [
    {
      stepNumber: 0,
      label: "Confirme el producto",
      description: "Confirme que el producto es el que desea comprar",
    },
    {
      stepNumber: 1,
      label: "Elija la cantidad",
      description: "Introduzca la cantidad que desea comprar",
    },
    {
      stepNumber: 2,
      label: "Revise la solicitud",
      description: "Revise la solicitud antes de enviarla",
    },
  ];

  const sendBuyRequest = async () => {
    console.log("Sending buy request");
    setTimeout(() => {
      setRequestSent(true);
    }, 5000);
  };

  const sendBuyMessage = async () => {
    console.log(text);
    if (text != "") {
      await updateDoc(doc(db, "chats", combinedId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser!.uid,
          date: Timestamp.now(),
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser!.uid), {
        [combinedId + ".lastMessage"]: {
          text,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", userChat), {
        [combinedId + ".lastMessage"]: {
          text,
        },
        [combinedId + ".date"]: serverTimestamp(),
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    if (activeStep === 1 && !checkCorrectQuantity()) {
      return;
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    if (activeStep === steps.length - 1) {
      setText(
        "Buenas, me gustaría comprarle " +
          quantity +
          "kg de " +
          advertisement?.name +
          ". ¿Podría enviarme más información?"
      );
      createCompraBD();
      searchUserChat();
      sendBuyRequest();
    }
  };

  const createCompraBD = () => {
    const data = JSON.stringify({
      adv_id: advertisement?._id,
      buyer_id: `${localStorage.getItem("userId")}`,
      quantity: quantity,
    });

    const config = {
      method: "post",
      url: `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/create`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        alert(error);
      });
  };

  function checkCorrectQuantity(): boolean {
    if (
      (regexDecimalWithPoint.test(quantityValue) ||
        regexDecimalWithComma.test(quantityValue)) &&
      quantityValue !== ""
    ) {
      return true;
    } else {
      return false;
    }
  }

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuantityValue(value);
    if (
      value !== "" &&
      (regexDecimalWithPoint.test(value) || regexDecimalWithComma.test(value))
    ) {
      setQuantityError(false);
      setQuantity(parseFloat(value));
    } else {
      setQuantityError(true);
    }
  };

  const searchUserChat = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", advertisement?.sellerId.username)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserChat(doc.id);
      createCombinedId(doc.id);
    });
    //console.log(userChat);
  };

  const createCombinedId = async (id: string) => {
    const uid = currentUser!.uid;
    const newId = uid > id! ? uid + id : id + uid;
    setCombinedId(newId);
  };

  const navigateChat = async () => {
    //navigate(`/chat/${userChat}`);
    console.log(combinedId);
    let exists = false;
    const q = query(collection(db, "chats"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      if (doc.id === combinedId) {
        exists = true;
        sendBuyMessage();
      }
    });
    // const res = await getDoc(doc(db, "chats", combinedId!));
    if (!exists) {
      await setDoc(doc(db, "chats", combinedId!), { messages: [] });

      await updateDoc(doc(db, "userChats", currentUser!.uid), {
        [combinedId! + ".userInfo"]: {
          uid: userChat,
          displayName: advertisement?.sellerId.username,
        },
        [combinedId! + ".date"]: serverTimestamp(),
      });
      await updateDoc(doc(db, "userChats", userChat!), {
        [combinedId! + ".userInfo"]: {
          uid: currentUser!.uid,
          displayName: currentUser!.displayName,
        },
        [combinedId! + ".date"]: serverTimestamp(),
      });

      await sendBuyMessage();
    }
  };

  React.useEffect(() => {
    if (combinedId !== "" && text !== "") {
      navigateChat();
    }
  }, [combinedId]);

  return (
    <>
      <Stepper orientation="vertical" className="p-10" activeStep={activeStep}>
        <Step key={steps[0].stepNumber}>
          <StepLabel>{steps[0].label}</StepLabel>
          <StepContent>
            <Typography>{steps[0].description}</Typography>
            <VerticalBuyAdCard
              name={advertisement?.name}
              description={advertisement?.description}
              pricePerKilogram={advertisement?.pricePerKilogram}
              image={image}
            />
            <BuyAdStepButtons
              primaryButtonText="Siguiente"
              secondaryButtonText=""
              primaryButtonDisabled={advertisement === undefined}
              secondaryButtonDisabled={true}
              primaryButtonOnClick={handleNext}
              secondaryButtonOnClick={handleBack}
            />
          </StepContent>
        </Step>
        <Step key={steps[1].stepNumber}>
          <StepLabel>{steps[1].label}</StepLabel>
          <StepContent>
            <Typography>{steps[1].description}</Typography>
            <FormControl
              sx={{ marginTop: 2 }}
              variant="outlined"
              error={quantityError}
            >
              <InputLabel htmlFor="quantity-field">Cantidad</InputLabel>
              <OutlinedInput
                id="quantity-field"
                value={quantityValue}
                onChange={handleQuantityChange}
                endAdornment={
                  <InputAdornment position="end">kg</InputAdornment>
                }
                aria-describedby="quantity-field-helper-text"
                inputProps={{
                  "aria-label": "weight",
                }}
                label="Cantidad"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleNext();
                  }
                }}
              />
              <FormHelperText id="quantity-field-helper-text">
                {quantityError ? "Introduzca un número válido" : ""}
              </FormHelperText>
            </FormControl>
            <BuyAdStepButtons
              primaryButtonText="Siguiente"
              secondaryButtonText="Atrás"
              primaryButtonDisabled={quantityError || quantityValue === ""}
              secondaryButtonDisabled={false}
              primaryButtonOnClick={handleNext}
              secondaryButtonOnClick={handleBack}
            />
          </StepContent>
        </Step>
        <Step key={steps[2].stepNumber}>
          <StepLabel>{steps[2].label}</StepLabel>
          <StepContent>
            <Typography>{steps[2].description}</Typography>
            <VerticalBuyAdCard
              name={advertisement?.name}
              description={advertisement?.description}
              pricePerKilogram={advertisement?.pricePerKilogram}
              image={image}
            />
            <div className="ml-3 mb-3 font-light">
              <div>Cantidad: {quantity} kg</div>
              {advertisement !== undefined && (
                <div>
                  Precio: {quantity * advertisement?.pricePerKilogram} €
                </div>
              )}
            </div>
            <BuyAdStepButtons
              primaryButtonText="Enviar solicitud"
              secondaryButtonText="Atrás"
              primaryButtonDisabled={false}
              secondaryButtonDisabled={false}
              primaryButtonOnClick={handleNext}
              secondaryButtonOnClick={handleBack}
            />
          </StepContent>
        </Step>
      </Stepper>

      <Backdrop
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={activeStep === steps.length && !requestSent}
      >
        <div className="flex flex-col items-center">
          <CircularProgress color="inherit" />
          <Typography sx={{ marginTop: 2 }} variant="h6">
            Enviando solicitud...
          </Typography>
        </div>
      </Backdrop>

      <Backdrop
        sx={{
          backgroundColor: (theme) => theme.palette.primary.main,
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        open={requestSent}
      >
        <div className="flex flex-col items-center">
          <CheckCircleIcon sx={{ fontSize: 100 }} />
          <Typography sx={{ marginTop: 2 }} variant="h6">
            Solicitud enviada!
          </Typography>
        </div>
      </Backdrop>
    </>
  );
}

export default BuyAd;
