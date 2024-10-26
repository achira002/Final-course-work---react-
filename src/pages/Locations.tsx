import axios from "axios";
import { useEffect, useState } from "react";
import LocationType from "../types/LocationType";

function Locations(){
    const [locations, setLocations] = useState<LocationType[]>([]);
    const [locationName, setLocationName] = useState<string>("");

    async function loadLocation(){
        const response = await axios.get("http://localhost:8081/location");
        setLocations(response.data);
    }

    useEffect(function(){
        //action to take
        loadLocation();
    },[]);

    function handleLocationName(event:any){
        setLocationName(event.target.value);
    }

    async function handleSubmit(){
        const data ={
            name:locationName,
        };

        const response = await axios.post("http://localhost:8081/location",data);
        console.log(response);
        loadLocation();
        setLocationName("");
    }

    return(
        <div className="container mx-auto pt-20 pb-20 pl-20 pr-20">
            <h1 className="text-3xl font-semibold mb-5 text-slate-800">Stock Locations</h1>
            <ul>
                {locations.map(location =>(
                    <li className="inline-block px-3 py-2 me-3 mb-3 border border-slate-200 shadow-lg rounded-lg text-slate-600">
                        {location.name}
                    </li>
                ))}
            </ul>
                <div className="mx-auto mt-10 w-[650px] border border-slate-200 px-4 py-3 rounded-lg">
                    <h2 className="text-xl font-medium mb-4">Add Location</h2>
                    <div>
                        <form>
                            <label className="text-sm text-slate-600 block mb-3">Location Name</label>
                            <input type="text" className="block w-full p-2 border border-slate-300 rounded-lg text-slate-600 text-sm mb-4" onChange={handleLocationName} value={locationName} required/>
                            <button type="button" className="py-2 px-3 rounded-lg bg-slate-800 text-sm text-white hover:bg-slate-950" onClick={handleSubmit}>Add Location</button>
                        </form>
                    </div>
                </div>
        </div>
    )
}
export default Locations;