import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface SubHeadingProps {
  text: string;
}
function SubHeading(props: SubHeadingProps) {
  const theme = useTheme();

  return (
    <Typography
      fontWeight="bold"
      color={theme.palette.primary.dark}
      fontSize="18px"
      marginTop="20px"
      marginBottom="10px"
      marginRight="20px"
      marginLeft="20px"
    >
      {props.text}
    </Typography>
  );
}

export default SubHeading;
