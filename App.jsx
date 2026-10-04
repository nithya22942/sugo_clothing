import Navbar from "./Components/navbar";
import hero from "./Components/hero";

function App(){
    return(
        <div>
            <Navbar />
            <hero />
        </div>
    )
}

//states --> for interaction of the components by creating new states
import { useState } from "react";

function ProductCard({name,price}){
    const [added,setAdded]=useState(false);
    return(
        <div className="product">
            <h3>{name}</h3>
            <p>${price}</p>
            <button onClick={()=>setAdded(true)}>
                {added? "Added to cart":"add to cart"}
            </button>
        </div>
    )
    
}


const products=[ {
    id:1,
    name:"organic cotton shirt",
    price:1200
},
{
    id:2,
    name:"lenin cotton skirt",
    price:200
},
{
    id:1,
    name:" cotton pant",
    price:1900
}]



{products.map((product)=>(

    <ProductCard
    key={product.id}
    name={product.name}
    price={product.price}/>
))}

export default ProductCard;