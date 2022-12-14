import { Divider, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AdvertisementManagement from '../../libs/AdvertisementManagement';
import Navigation from '../../libs/Navigation';
import UserHelper from '../../libs/UserHelper';

interface IPropsOrderCard {
  orderID: string;
  productName: string;
  sellerUsername: string;
  sellerAddress: string;
  quantity: number;
  price: number;
  is_ended: boolean;
  date: string;
  adID: string;
}

const OrderCard = (props: IPropsOrderCard) => {
  const navigate = useNavigate();
  const existsAd = props.adID !== null;

  const navigateToReview = () => {
    navigate(`/review/${props.orderID}`);
  };
  const navigateToSeller = (sellerusername: string): void => {
    UserHelper.getUserByUsername(sellerusername).then((user) => {
      navigate(`/seller/${user._id}`);
    });
  };
  const navigateToAddress = (address: string): void => {
    Navigation.OpenGoogleMapsAddress(address);
  };

  return (
    <div className="flex-col space-y-1 rounded-fresh border-[0.8px] border-black pl-2 pr-2 pt-4 pb-4">
      <div className="ml-6 mr-6 flex justify-between">
        <div className="font-space-mono text-[10px] font-normal">
          {props.date}
        </div>
        <div className="font-space-mono text-[10px] font-normal">
          {props.is_ended ? 'FINALIZADA' : 'EN MARCHA'}
        </div>
      </div>
      <Divider variant="middle" sx={{ borderStyle: 'dashed' }} />
      <div className="ml-6 mr-6 flex justify-between">
        <div className="font-space-mono text-[14px] font-bold">
          {props.productName}
        </div>
        <div className="font-space-mono text-[14px] font-bold">
          {props.quantity} kg
        </div>
        <div className="font-space-mono text-[14px] font-bold">
          {props.price} €
        </div>
      </div>
      <Divider variant="middle" sx={{ borderStyle: 'dashed' }} />
      <div className="ml-6 mr-6 font-space-mono text-[14px] font-normal">
        Gracias por comprar con{' '}
        <Link
          component="button"
          onClick={() => navigateToSeller(props.sellerUsername)}
        >
          @{props.sellerUsername}
        </Link>
      </div>
      {!props.is_ended ? (
        <div>
          <Divider variant="middle" sx={{ borderStyle: 'dashed' }} />
          <div className="mr-6 ml-6 font-space-mono text-[12px] font-normal">
            Recogida en{' '}
            <Link
              component="button"
              onClick={() => navigateToAddress(props.sellerAddress)}
            >
              {props.sellerAddress}
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
      {props.is_ended && existsAd && (
        <div>
          <Divider variant="middle" sx={{ borderStyle: 'dashed' }} />
          <div className="mr-6 ml-6 mt-4 text-center font-space-mono text-[12px] font-normal">
            <button
              onClick={navigateToReview}
              className="inline-block h-10 min-h-full w-4/6 rounded-3xl bg-fresh-verde text-base  text-white ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0"
            >
              Haz tu reseña
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
