import { Link } from "react-router-dom";

function Home(){
    return(
        <div>
            <h1>Home Page</h1>
            <Link to="/categories">Category</Link>
            <br />
            <Link to="/Locations">Stock Locations</Link>
            <br />
            <Link to="/item">Stock Item</Link>
            <br />
            <Link to="/stock">Stock</Link>
            <br />
            <Link to="/order">Order</Link>
            <br />
            <Link to="/createOrder">Create Order</Link>
        </div>
        
    )
}
export default Home;