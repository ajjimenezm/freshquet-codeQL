import { Box, Button } from "@mui/material";

interface BuyAdStepButtonsProps {
    primaryButtonText: string;
    secondaryButtonText: string;
    primaryButtonOnClick: () => void;
    secondaryButtonOnClick: () => void;
    primaryButtonDisabled: boolean;
    secondaryButtonDisabled: boolean;
}

function BuyAdStepButtons(props: BuyAdStepButtonsProps) {
    return (
        <Box sx={{ mb: 2 }}>
            <div>
                <Button
                    variant="contained"
                    onClick={props.primaryButtonOnClick}
                    sx={{ mt: 1, mr: 1 }}
                    disabled={props.primaryButtonDisabled}
                >
                    {props.primaryButtonText}
                </Button>
                <Button
                    disabled={props.secondaryButtonDisabled}
                    onClick={props.secondaryButtonOnClick}
                    sx={{ mt: 1, mr: 1 }}
                >
                    {props.secondaryButtonText}
                </Button>
            </div>
        </Box>
    );
}

export default BuyAdStepButtons;
