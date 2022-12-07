import axios from "axios";
import { useEffect, useState } from "react";
import AdvertisementManagement from "../../libs/AdvertisementManagement";
import { Compra } from "../../types/Compra";
import OrderCard from "./OrderCard";
import SellerOrderCard from "./SellerOrderCard";

const Sales = (props: any) => {
    const [orders, setOrders] = useState<Compra[]>([]);
    useEffect(() => {
        AdvertisementManagement.GetOrdersFromUser(
            props.seller_id,
            'seller'
        ).then((res: Compra[]) => {
            console.log(res);
            setOrders(res);
        });
    }, []);
    return (
        <div>
            {orders && orders.map((order, i) => {
                return (
                    <SellerOrderCard
                        key={order.adv_id + order.buyer_id + i}
                        date={"0 MES 0000"}
                        is_ended={order.is_ended}
                        price={order.price}
                        quantity={order.quantity}
                        productName={order.adv_id.name}
                        buyerUsername={order.buyer_id.username}
                        orderID={order._id}
                    />
                )
            })
            }
        </div>
    )
}
export default Sales;