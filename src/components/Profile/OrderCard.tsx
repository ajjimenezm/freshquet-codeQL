import { Divider, Link } from '@mui/material';

interface IPropsOrderCard {
  productName: string;
  sellerUsername: string;
  sellerAddress: string;
  quantity: number;
  price: number;
  is_ended: boolean;
  date: string;
}

const OrderCard = (props: IPropsOrderCard) => {
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
        <Link component="button" onClick={() => navigateToSeller()}>
          @{props.sellerUsername}
        </Link>
      </div>
      {!props.is_ended ? (
        <div>
          <Divider variant="middle" sx={{ borderStyle: 'dashed' }} />
          <div className="mr-6 ml-6 font-space-mono text-[12px] font-normal">
            Recogida en{' '}
            <Link component="button" onClick={() => navigateToAddress()}>
              {props.sellerAddress}
            </Link>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderCard;

function navigateToSeller(): void {
  console.log('Navigate to seller');
}
function navigateToAddress(): void {
  console.log('Navigate to address');
}
