import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import ItemType from "../types/ItemType";
import LocationType from "../types/LocationType";
import StockType from "../types/StockType";

function Stock(){

    const [stockItem, setStockItem] = useState<StockType[]>([]);
    const [Items, setItems] = useState<ItemType[]>([]);
    const [category, setCategory] = useState<CategoryType[]>([]);
    const [locations, setLocations] = useState<LocationType[]>([]);


    const [itemCode, setItemCode] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [locationId, setLocationId] = useState<number>(0);
    const [qty, setQty] = useState<number>(0);

    async function loadStockItems(){
        const response = await axios.get("http://localhost:8081/stock");
        setStockItem(response.data);
    }

    async function loadItems(){
        const itemResponse = await axios.get("http://localhost:8081/item");
        setItems(itemResponse.data);
    }

    async function loadCategory(){
        const catResponse = await axios.get("http://localhost:8081/category");
        setCategory(catResponse.data);
    }

    async function loadLocations(){
        const locResponse = await axios.get("http://localhost:8081/location");
        setLocations(locResponse.data);
    }

    useEffect(() =>{
        loadStockItems();
        loadItems();
        loadCategory();
        loadLocations();
    },[]);

    function handleItemId(e:any){
        setItemCode(e.target.value);
    }

    function handleCategoryId(e:any){
        setCategoryId(e.target.value);
    }

    function handleLocationId(e:any){
        setLocationId(e.target.value);
    }

    function handleQty(e:any){
        setQty(e.target.value);
    }

    async function handleSubmit(){
        const data = {
            itemCode:itemCode,
            locCode:locationId,
            catId:categoryId,
            qty:qty
        }
        const apiResponse = await axios.post("http://localhost:8081/stock",data);
        console.log(apiResponse);
        loadStockItems();
    }
    return(
        <div className="container mx-auto pt-8 pr-20 pb-20 pl-20">
            <h1 className="text-3xl mb-10 text-slate-800 text-shadow-lg">Stock Items</h1>
           <table className="table-auto min-w-full border-seperate border-spacing-2 border-none text-left">
            <thead className="bg-neutral-300 text-center">
                <tr>
                    <th>Item Code</th>
                    <th>Category</th>
                    <th>Location</th>
                    <th>Qty(Units)</th>
                </tr>
            </thead>
            <tbody>
                {stockItem.map(function (stock){
                    return(
                        <tr key={stock.id} className="border-t text-center">
                            <td>{stock.item.name}</td>
                            <td>{stock.category.categoryName}</td>
                            <td>{stock.location.name}</td>
                            <td>{stock.qty}</td>
                        </tr>
                    )
                })}
            </tbody>
           </table>
           <div className="mx-auto mt-10 border border-slate-200 px-3 py-2 rounded-lg shadow-lg max-w-[650px]">
            <form>
                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter Item</label>
                    <select className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handleItemId} required>
                        <option value="">--Please select item--</option>
                        {Items.map(function (item){
                            return(
                                <option value={item.id}>{item.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter Category</label>
                    <select className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handleCategoryId} required>
                        <option value="">--Please select category--</option>
                        {category.map(function (categories){
                            return(
                                <option value={categories.categoryId}>{categories.categoryName}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter Location</label>
                    <select className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handleLocationId} required>
                        <option value="">--Please select location--</option>
                        {locations.map(function (location){
                            return(
                                <option value={location.id}>{location.name}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <label className="text-sm text-slate-600 block mb-3">Enter Quantity</label>
                    <input type="number" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" value={qty} onChange={handleQty}/>
                </div>
                <button type="button" className="text-sm bg-slate-600 text-white py-2 px-3 rounded-xl hover:bg-slate-950" onClick={handleSubmit}>Add Stock</button>
                
            </form>
           </div>
        </div>
    )
}
export default Stock;