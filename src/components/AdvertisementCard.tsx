import { Button } from "@mui/material";
import styles from "../styles/AdvertisementCard.module.css";
import Advertisement from "../types/Advertisement";

interface AdvertisementCardProps {
    advertisement: Advertisement;
    onClickFunction: () => void;
}
function AdvertisementCard(props: AdvertisementCardProps) {
    return (
        <div className={styles.productCard}>
            <img
                src={props.advertisement.image}
                alt={props.advertisement.name}
                className={styles.productImage}
            />
            <div className={styles.productInfo}>
                <div className={styles.productName}>
                    {props.advertisement.name}
                </div>
                <div className={styles.productDescription}>
                    {props.advertisement.description}
                </div>
                <div className={styles.productPrice}>
                    {`${props.advertisement.price} €/kg`}
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
export default AdvertisementCard;
