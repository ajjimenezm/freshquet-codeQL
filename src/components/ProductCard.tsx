import { Button } from "@mui/material";
import styles from "../styles/ProductCard.module.css";
import Advertisement from "../types/Advertisement";

interface ProductCardProps {
    product: Advertisement;
    onClickFunction: () => void;
}
function ProductCard(props: ProductCardProps) {
    return (
        <div className={styles.productCard}>
            <img
                src={props.product.image}
                alt={props.product.name}
                className={styles.productImage}
            />
            <div className={styles.productInfo}>
                <div className={styles.productName}>{props.product.name}</div>
                <div className={styles.productDescription}>
                    {props.product.description}
                </div>
                <div className={styles.productPrice}>
                    {`${props.product.price} €/kg`}
                </div>
                <Button
                    variant="outlined"
                    color="primary"
                    className={styles.buyButton}
                    onClick={props.onClickFunction}
                >
                    Comprar
                </Button>
            </div>
        </div>
    );
}
export default ProductCard;
