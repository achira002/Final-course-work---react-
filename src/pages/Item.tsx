import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";
import ItemType from "../types/ItemType";

function Item(){

    const [stockItem, setStockItem] = useState<ItemType[]>([]);
    const [itemName, setItemName] = useState<string>("");
    const [itemPrice, setItemPrice] = useState<number>(0.0);
    const [itemDescription, setItemDescription] = useState<string>("");
    const [categoryId, setCategoryId] = useState<number>(0);

   const [categories, setCategories] = useState<CategoryType[]>([]);

    async function loadStockItem(){
        const response = await axios.get("http://localhost:8081/item");
        setStockItem(response.data)
    }

    async function loadCategories(){
        const response = await axios.get("http://localhost:8081/category");
        setCategories(response.data);
    }

    useEffect(function (){
        loadStockItem();
        loadCategories();
    },[]);

    function handleItemName(e:any){
        setItemName(e.target.value);
    }

    function handleItemPrice(e:any){

        // const value = e.target.value
        // if(value === ""){
        //     setItemPrice(0);
        // }else{
        //     setItemPrice(parseFloat(value));
        // }
        setItemPrice(e.target.value)
    }

    function handleItemDescription(e:any){
        setItemDescription(e.target.value);
    }

    function handleCategoryId(e:any){
        // const selectedValue = e.target.value;
        // if(selectedValue === ""){
        //     setCategoryId(null);
        // }else{
        //     setCategoryId(Number(selectedValue));
        // }
        setCategoryId(e.target.value);
        
    }

    async function handleSubmit(){
        //e.preventDefault();

        // if(!categoryId){
        //     alert("Please select a valid category");
        //     return;
        // }

        const data = {
            name:itemName,
            price:itemPrice,
            description:itemDescription,
            categoryId:categoryId
        };

            try{
                await axios.post("http://localhost:8081/item",data);
                //console.log(response);
                loadStockItem();
            }catch (error){
                console.error("Error adding item",error);
            }

       
    };

    return(
        <div className="container mx-auto px-2 py-3">
            <h1 className="text-3xl text-slate-800 font-semibold mb-5">Stock Items</h1>
            <table className="table min-w-full border-seperate border-spacing-0 border-none text-left">
                <thead className="bg-slate-200 text-center">
                    <tr>
                        <th className="w-[50px]">Item Code</th>
                        <th className="w-[200px]">Item Name</th>
                        <th className="w-[200px]">Price</th>
                        <th className="w-[200px]">Description</th>
                        <th className="w-[200px]">Category</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {stockItem.map(function (item) {
                        return(
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.price}</td>
                                <td>{item.description}</td>
                                <td>{item.category.categoryName}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

            <div className="mx-auto mt-10 border border-slate-200 px-3 py-2 rounded-lg shadow-lg max-w-[650px]">
                <form>
                    <div>
                        <label className="text-sm text-slate-600 block mb-3">Item Name</label>
                        <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" value={itemName} onChange={handleItemName} required/>
                    </div>
                    <div>
                        <label className="text-sm text-slate-600 block mb-3">Item Price</label>
                        <input type="number" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" value={itemPrice} onChange={handleItemPrice} />
                    </div>
                    <div>
                        <label className="text-sm text-slate-600 block mb-3">Item Description</label>
                        <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" value={itemDescription} onChange={handleItemDescription}/>
                    </div>
                   <div>
                        <label className="text-sm text-slate-600 block mb-3">Item Category</label>
                        <select className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handleCategoryId} required>
                            <option value="">--Please select category--</option>
                            {categories.map(function (category) {
                                return(
                                    <option value={category.categoryId}>{category.categoryName}</option>
                                )
                            })}
                        </select>
                    </div>
                    <button type="button" className="py-2 px-3 rounded-2xl bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={handleSubmit}>Add Item</button>

                </form>
            </div>
        </div>
    )
}
export default Item;