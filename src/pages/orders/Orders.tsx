import axios from "axios";
import { useEffect, useState } from "react";
import OrderType from "../../types/OrderType";

function Orders(){

    const [orders, setOrders] = useState<OrderType[]>([]);

    async function loadOrders(){
        const response = await axios.get("http://localhost:8081/order");
        setOrders(response.data);
    }

    useEffect(function (){
        loadOrders();
    },[]);

    return(
        <div className="container mx-auto pt-5 pb-5">
            <h1 className="text-3xl text-semibold mb-5 text-slate-800">Orders</h1>

            <table className="table-auto w-full">
                <thead className="bg-slate-200 text-sm font-medium text-slate-600">
                    <tr>
                        <th className="p-2 w-[50px] text-left">#</th>
                        <th className="p-2 w-[300px] text-left">Date Time</th>
                        <th className="p-2 w-[300px] text-right">Total Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(function(order){
                        return(
                            <tr className="text-sm font-medium text-slate-600">
                                <td className="p-2">{order.orderId}</td>
                                {/* <td>{order.orderDateTime}</td> */}
                                <td className="p-2 ">{order.totalPrice}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
export default Orders;