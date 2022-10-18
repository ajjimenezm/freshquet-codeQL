import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

function AddProduct(){
    return (
        <Card className="individual-card" sx={{minWidth: 275}}>
            <CardContent className="content-card">
                <IconButton aria-label="play/pause">
                    <AddShoppingCartIcon />
                </IconButton>
                <p>Put product on sale</p>
            </CardContent>
        </Card>
    )
}

export default AddProduct