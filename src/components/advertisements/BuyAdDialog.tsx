import {
    Stepper,
    StepLabel,
    Step,
    Box,
    Button,
    StepContent,
    Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Advertisement from "../../types/Advertisement";
import AdvertisementCard from "../AdvertisementCard";
import AdvertisementCardSkeleton from "../AdvertisementCardSkeleton";
import { getAdvertisementById } from "../../libs/advertisementManager";

function BuyAd() {
    const { id } = useParams<{ id: string }>();
    const [advertisement, setAdvertisement] = useState<Advertisement>();
    const [activeStep, setActiveStep] = React.useState(0);

    React.useEffect(() => {
        if (id) {
            getAdvertisementById(id).then((advertisement) => {
                setAdvertisement(advertisement);
            });
        }
    }, []);

    const steps = [
        {
            stepNumber: 0,
            label: "Confirme el producto",
            description: "Confirme que el producto es el que desea comprar",
        },
        {
            stepNumber: 1,
            label: "Elija la cantidad",
            description: "Elija la cantidad que desea comprar",
        },
        {
            stepNumber: 2,
            label: "Revise la solicitud",
            description: "Revise la solicitud antes de enviarla",
        },
    ];

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleButtons = (
        <Box sx={{ mb: 2 }}>
            <div>
                <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                >
                    {activeStep === steps.length - 1
                        ? "Enviar solicitud"
                        : "Siguiente"}
                </Button>
                <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                >
                    Atrás
                </Button>
            </div>
        </Box>
    );

    return (
        <Stepper
            orientation="vertical"
            className="p-10"
            activeStep={activeStep}
        >
            <Step key={steps[0].stepNumber}>
                <StepLabel>{steps[0].label}</StepLabel>
                <StepContent>
                    <Typography>{steps[0].description}</Typography>
                    {advertisement ? (
                        <AdvertisementCard
                            advertisement={advertisement}
                            onClickFunction={() => {
                                console.log("Hello there");
                            }}
                        />
                    ) : (
                        <AdvertisementCardSkeleton />
                    )}
                    {handleButtons}
                </StepContent>
            </Step>
            <Step key={steps[1].stepNumber}>
                <StepLabel>{steps[1].label}</StepLabel>
                <StepContent>
                    <Typography>{steps[1].description}</Typography>
                    {handleButtons}
                </StepContent>
            </Step>
            <Step key={steps[2].stepNumber}>
                <StepLabel>{steps[2].label}</StepLabel>
                <StepContent>
                    <Typography>{steps[2].description}</Typography>
                    {handleButtons}
                </StepContent>
            </Step>
        </Stepper>
    );
}

export default BuyAd;
