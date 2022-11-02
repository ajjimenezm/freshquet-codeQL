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

function BuyAd() {
    const { id } = useParams<{ id: string }>();
    const [requestSent, setRequestSent] = React.useState(false);
    const [advertisement, setAdvertisement] = React.useState<Advertisement>();
    const [activeStep, setActiveStep] = React.useState(0);
    const [quantity, setQuantity] = React.useState(0);
    const [quantityValue, setQuantityValue] = React.useState("");
    const [quantityError, setQuantityError] = React.useState(false);
    const regexDecimalWithPoint = /^\d*\.?\d*$/;
    const regexDecimalWithComma = /^\d*,?\d*$/;
    const navigate = useNavigate();

    React.useEffect(() => {
        const getProduct = async () => {
            try {
                axios
                    .get(
                        `${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}advertisements/${id}`
                    )
                    .then((res) => {
                        setAdvertisement(res.data);
                    });
            } catch (err) {
                alert(err);
            }
        };
        getProduct();
    }, [id]);

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

    const sendBuyRequest = () => {
        console.log("Sending buy request");
        setTimeout(() => {
            setRequestSent(true);
        }, 3000);
        // TODO: Send buy request
        // AJ Aqui tiens que ir tu
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
            sendBuyRequest();
        }
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

    const handleQuantityChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const value = event.target.value;
        setQuantityValue(value);
        if (
            value !== "" &&
            (regexDecimalWithPoint.test(value) ||
                regexDecimalWithComma.test(value))
        ) {
            setQuantityError(false);
            setQuantity(parseFloat(value));
        } else {
            setQuantityError(true);
        }
    };

    return (
        <>
            <Stepper
                orientation="vertical"
                className="p-10"
                activeStep={activeStep}
            >
                <Step key={steps[0].stepNumber}>
                    <StepLabel>{steps[0].label}</StepLabel>
                    <StepContent>
                        <Typography>{steps[0].description}</Typography>
                        <VerticalBuyAdCard
                            name={advertisement?.name}
                            description={advertisement?.description}
                            pricePerKilogram={advertisement?.pricePerKilogram}
                            image="https://media.istockphoto.com/photos/tomatoes-isolate-on-white-background-tomato-half-isolated-tomatoes-picture-id1258142863?k=20&m=1258142863&s=612x612&w=0&h=lVLMaX3tiP407SwLUElEifKqHpNRYw4ZR6B0GOycGc4="
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
                            <InputLabel htmlFor="quantity-field">
                                Cantidad
                            </InputLabel>
                            <OutlinedInput
                                id="quantity-field"
                                value={quantityValue}
                                onChange={handleQuantityChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        kg
                                    </InputAdornment>
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
                                {quantityError
                                    ? "Introduzca un número válido"
                                    : ""}
                            </FormHelperText>
                        </FormControl>
                        <BuyAdStepButtons
                            primaryButtonText="Siguiente"
                            secondaryButtonText="Atrás"
                            primaryButtonDisabled={
                                quantityError || quantityValue === ""
                            }
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
                            image="https://media.istockphoto.com/photos/tomatoes-isolate-on-white-background-tomato-half-isolated-tomatoes-picture-id1258142863?k=20&m=1258142863&s=612x612&w=0&h=lVLMaX3tiP407SwLUElEifKqHpNRYw4ZR6B0GOycGc4="
                        />
                        <div className="ml-3 mb-3 font-light">
                            <div>Cantidad: {quantity} kg</div>
                            {advertisement !== undefined && (
                                <div>
                                    Precio:{" "}
                                    {quantity * advertisement?.pricePerKilogram}{" "}
                                    €
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
