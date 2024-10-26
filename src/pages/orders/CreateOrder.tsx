import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemType from "../../types/ItemType";

function CreateOrder(){

    const [items, setItems] = useState<ItemType[]>([]);

    async function getItems(){
        const response = await axios.get("http://localhost:8081/item");
        setItems(response.data);
    }

    useEffect(function (){
        getItems();
    },[])

    const [orderedItems, setOrderedItems] = useState<ItemType[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0.0);

    function addProductToOrder(items:ItemType){
        const newArray = [...orderedItems, items]
        setOrderedItems(newArray);
    }

    useEffect(function (){
        orderedItems.map(function (orderedItems){
            const total = totalPrice + orderedItems.price;
            setTotalPrice(total);
        });
    },[orderedItems])

    const navigate = useNavigate();

    async function saveOrder(){
        try{
            const itemIds:any = [];
            orderedItems.map(function (item){
                itemIds.push(item.id); 
            });
            
            await axios.post("http://localhost:8081/order",{
                itemIds:itemIds
            });

            navigate("/order");

        }catch (error){
            console.log(error)
        }
    }


    return(
        <div className="flex">
            <div className="p-2 w-[300px] border-r border-slate-100">
                <div className="text-xl text-slate-800 font-semibold">
                    Products
                </div>
                <div className="mt-5">
                    {items.map(function (item){
                        return(
                            <div onClick={() => addProductToOrder(item)} className="p-3 mb-3 border border-slate-200 rounded-lg">
                                <div className="text-lg font-semibold text-slate-800">{item.name}</div>
                                <div className="text-sm text-slate-600">{item.category.categoryName}</div>
                                <div className="text-sm text-right text-green-500">Rs. {item.price}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="w-full p-2">
                <div className="text-xl text-slate-800 font-semibold mb-5">
                    New Order
                </div>
                <table className="table-auto w-full">
                    <thead>
                        <tr className="bg-slate-200 text-sm font-medium text-slate-600">
                            <th className="p-2 w-[50px] text-left">#</th>
                            <th className="p-2 w-[300px] text-left">Items</th>
                            <th className="p-2 text-left w-[300px] text-right">Total Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orderedItems.map(function (orderedItems){
                            return(
                                <tr className="text-left">
                                    <td>{orderedItems.id}</td>
                                    <td>{orderedItems.name}</td>
                                    <td className="text-right">{orderedItems.price}</td>
                                </tr>
                            )
                        })}
                        <tr>
                            <td className="font-semibold" colSpan={2}>
                                Grand Total
                            </td>
                            <td className="font-semibold text-right">{totalPrice}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="mt-5">
                    <button type="button" onClick={saveOrder}>Save Order</button>
                </div>
            </div>
        </div>
    )
}
export default CreateOrder;