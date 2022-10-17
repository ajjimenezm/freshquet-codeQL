import { Skeleton } from "@mui/material";
import styles from "../styles/AdvertisementCard.module.css";

function AdvertisementCard() {
    return (
        <div className={styles.productCard}>
            <Skeleton
                className={styles.productImage}
                variant="rectangular"
                animation="wave"
                sx={{ width: 200, height: 200 }}
            />
            <div className={styles.productInfo}>
                <Skeleton
                    className={styles.productName}
                    variant="text"
                    animation="wave"
                    sx={{ width: 100, height: 40 }}
                />
                <Skeleton
                    className={styles.productDescription}
                    variant="text"
                    animation="wave"
                    sx={{ width: 200, height: 20 }}
                />
                <Skeleton
                    className={styles.productPrice}
                    variant="text"
                    animation="wave"
                    sx={{ width: 75, height: 30 }}
                />
                <Skeleton
                    className={styles.buyButton}
                    variant="rectangular"
                    animation="wave"
                    sx={{ width: 100, height: 30 }}
                />
            </div>
        </div>
    );
}
export default AdvertisementCard;
