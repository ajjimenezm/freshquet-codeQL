import { Button } from "@mui/material";
import styles from "../../styles/AdvertisementCard.module.css";
import Advertisement from "../../types/Advertisement";
import { useNavigate } from "react-router-dom";

interface AdvertisementCardProps {
  advertisement: Advertisement;
  onClickFunction: () => void;
}
function AdvertisementCard(props: AdvertisementCardProps) {
  const navigate = useNavigate();
  const gotoDetail = (id: string) => {
    navigate(`/products/detail/${id}`);
  };
  return (
    <div className={styles.productCard}>
      {/* <img
        src={props.advertisement.image}
        alt={props.advertisement.name}
        className={styles.productImage}
      /> */}
      <img
        src="https://images.pexels.com/photos/144248/potatoes-vegetables-erdfrucht-bio-144248.jpeg?auto=compress&cs=tinysrgb&w=1600"
        alt="Patata"
        className={styles.productImage}
      />
      <div className={styles.productInfo}>
        <div className={styles.productName}>{props.advertisement.name}</div>
        <div className={styles.productDescription}>
          {props.advertisement.description}
        </div>
        <div className={styles.productPrice}>
          {`${props.advertisement.pricePerKilogram} €/kg`}
        </div>
        <div className="flex justify-between w-full">
          <Button
            variant="outlined"
            color="primary"
            className={styles.buyButton}
            onClick={props.onClickFunction}
          >
            Comprar
          </Button>
          <Button
            variant="outlined"
            color="primary"
            className={styles.buyButton}
            onClick={() => gotoDetail(props.advertisement._id)}
          >
            Ver Más
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AdvertisementCard;
