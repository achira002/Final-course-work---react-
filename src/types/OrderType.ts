import ItemType from "./ItemType";

interface OrderType{
    orderId:number,
    orderDateTime:Date,
    totalPrice:number,
    orderItems:ItemType[]

}
export default OrderType;