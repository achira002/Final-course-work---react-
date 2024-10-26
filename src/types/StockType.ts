import CategoryType from "./CategoryType";
import ItemType from "./ItemType";
import LocationType from "./LocationType";

interface StockType{
    id:number,
    item:ItemType,
    location:LocationType,
    category:CategoryType,
    qty:number  
}
export default StockType;