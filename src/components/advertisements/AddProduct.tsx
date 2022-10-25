import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import {useNavigate} from "react-router-dom"
import SubHeading from '../SubHeading';

function AddProduct(){
    const navigate = useNavigate();
    return (
        <Card sx={{minWidth: 275}} className="w-20 ml-5">
            <CardContent>
                <IconButton aria-label="play/pause" onClick={() => navigate("/newproduct")}>
                    <AddShoppingCartIcon />
                </IconButton>
                <SubHeading text="Put product on sale"/>
            </CardContent>
        </Card>
    )
}

export default AddProduct