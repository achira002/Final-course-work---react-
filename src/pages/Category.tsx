 import axios from "axios";
import { useEffect, useState } from "react";
import CategoryType from "../types/CategoryType";



 function Category(){
     const [categories, setCategories] = useState<CategoryType[]>([]);
     const [categoryName, setCategoryName] = useState<string>("");

     const loadCategories = async () => {

         try{
             const response = await axios.get("http://localhost:8081/category");
             setCategories(response.data);
         }catch (error){
             console.error("Error Loading Categories",error);
         }
        
     };

     useEffect(() =>{
         loadCategories();
     },[]);

     function handleCategoryName(event:any){
          setCategoryName(event.target.value)
          console.log("Category Name",event.target.value)
     }

     async function handleSubmit(){
         const data = {
             categoryName:categoryName
        }

        try{
             const response = await axios.post("http://localhost:8081/category", data);
             console.log(response);
             loadCategories();
             setCategoryName("");
        }catch (error){
             console.error("Error Adding Category",error)
        }

       
     };

    return(
         <div className="container mx-auto pt-20 pr-20 pb-20 pl-20">
             <h1 className="text-3xl font-semibold mb-5 text-slate-800">Category Page</h1>
             <ul>
                 {categories.map(category =>(
                     <li className="inline-block px-3 py-2 me-3 mb-3 border border-slate-200 rounded-lg shadow-lg text-slate-600">
                        {category.categoryName} 
                     </li>
                 ))}
             </ul>

             <div className="mt-10 w-[650px] border border-slate-200 px-4 py-4 rounded-lg mx-auto">
                 <h1 className="text-xl font-medium mb-4">Add Categories</h1>

                 <div>
                     <form>
                         <label className="text-sm text-slate-600 block mb-3">Category Name</label>
                         <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handleCategoryName} value={categoryName}required/>
                         <button type="button" className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={handleSubmit}>Add Category</button>
                     </form>
                 </div>
             </div>

         </div>

        
     )
}

export default Category;