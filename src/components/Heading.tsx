import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface HeadingProps {
    text: string;
}
function Heading(props: HeadingProps) {
    const theme = useTheme();

    return (
        <Typography
            fontWeight="bold"
            color={theme.palette.primary.dark}
            fontSize="25px"
            paddingTop="20px"
            marginBottom="10px"
            marginRight="20px"
            marginLeft="20px"
        >
            {props.text}
        </Typography>
    );
}

export default Heading;
