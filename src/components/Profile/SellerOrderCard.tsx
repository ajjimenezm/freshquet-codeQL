import { Button, Divider, Link } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

interface IPropsOrderCard {
    orderID?: string;
    productName: string;
    buyerUsername: string;
    quantity: number;
    price: number;
    is_ended: boolean;
    date: string;
}

const SellerOrderCard = (props: IPropsOrderCard) => {
    const [state, setState] = useState<IPropsOrderCard>(props);
    const finishOrder = () => {
        axios.put(`${process.env.REACT_APP_BACKEND_DEFAULT_ROUTE}compra/${state.orderID}`, { ...state, is_ended: true }, { headers: { Authorization: `Bearer ${localStorage.getItem('userToken')}` } })
        setState({ ...state, is_ended: true });
    }
    return (
        <div className="flex-col space-y-1 rounded-fresh border-[0.8px] border-black pl-2 pr-2 pt-4 pb-4 mt-4">
            <div className="ml-6 mr-6 flex justify-between">
                <div className="font-space-mono text-[10px] font-normal">
                    {state.date}
                </div>
                <div className="font-space-mono text-[10px] font-normal">
                    {state.is_ended ? 'FINALIZADA' : 'EN MARCHA'}
                </div>
            </div>
            <Divider variant="middle" sx={{ borderStyle: 'dashed' }} />
            <div className="ml-6 mr-6 flex justify-between">
                <div className="font-space-mono text-[14px] font-bold">
                    {state.productName}
                </div>
                <div className="font-space-mono text-[14px] font-bold">
                    {state.quantity} kg
                </div>
                <div className="font-space-mono text-[14px] font-bold">
                    {state.price} €
                </div>
            </div>
            <Divider variant="middle" sx={{ borderStyle: 'dashed' }} />
            <div className="ml-6 mr-6 font-space-mono text-[14px] font-normal">
                Comprado por{' '}
                <Link component="button" onClick={() => navigateToBuyer()}>
                    @{state.buyerUsername}
                </Link>
            </div>
            {!state.is_ended ? (
                <div className="ml-6 mr-6 font-space-mono text-[14px] font-normal text-center">
                    <button onClick={finishOrder}
                        className='inline-block h-10 min-h-full w-4/6 rounded-3xl mt-4 bg-fresh-morado-oscuro text-base  text-white ease-in-out hover:bg-fresh-morado-oscuro hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0'
                    >
                        Finalizar
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
};

export default SellerOrderCard;

function navigateToBuyer(): void {
    console.log('Navigate to buyer');
}

