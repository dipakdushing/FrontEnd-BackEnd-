import { useEffect, useState } from "react"
import "./product.css"

export const Product = () => {
    const [data, setdata] = useState([]);
    const [brand, setbrand] = useState([]);
    const [color, setcolor] = useState([]);
    const [cate, setcate] = useState([]);
    const [sort,setsort] = useState("sort_acc")
    useEffect(() => {
        fetchProduct()
    }, [color,cate,brand,sort]);
    console.log(cate,"brand")
    const fetchProduct = async () => {
        try {
            let res = await fetch(`http://localhost:3008/product?color=${color}&name=${brand}&type=${cate}&sort=${sort}`)
            let result = await res.json();
            setdata(result.product);
        } catch (error) {
            console.log(error.message)
        }
    }
    const handlebrand = (e, value) => {
        if (value == "brand") {
            if (e.target.checked) {
                setbrand([...brand, e.target.value])
            } else {
                console.log(e.target.value)
                const result = brand.filter(word => word !== e.target.value);
                setbrand(result)
            }
        }
        else if (value == "color") {
            if (e.target.checked) {
                setcolor([...color, e.target.value])
            } else {
                console.log(e.target.value)
                const result = color.filter(word => word !== e.target.value);
                setcolor(result)
            }
        } else if (value == "cate") {
            if (e.target.checked) {
                setcate([...cate, e.target.value])
            } else {
                console.log(e.target.value)
                const result = cate.filter(word => word !== e.target.value);
                setcate(result)
            }
        }

    }
    console.log(data)
   return <div>
       <div className="Sorting">
           <div>Total Items : {data.length}</div>
           <div>
               Price Sorting<select onChange ={(e)=>{
                   setsort(e.target.value)
               }}name="" id="">  
                    <option value="sort_acc">Low to High</option>
                   <option value="sort_dec">High to Low</option>
               </select>
            </div>
       </div>
       <div className="mainContainer">
           <div className="filter_container">
               <div>
                   <h3>BRANDS NAME</h3>
                   <ul className="brands">
                       <li><input onChange={(e) => handlebrand(e, "brand")} type="checkbox" value="Nike" /> Nike</li>
                       <li><input onChange={(e) => handlebrand(e, "brand")} type="checkbox" value="NETPLAY" /> NETPLAY</li>
                       <li><input onChange={(e) => handlebrand(e, "brand")} type="checkbox" value="LEVIS" /> LEVIS</li>
                       <li><input onChange={(e) => handlebrand(e, "brand")} type="checkbox" value="Mpl Sports" /> Mpl Sports</li>
                       <li><input onChange={(e) => handlebrand(e, "brand")} type="checkbox" value="ADIDAS" /> ADIDAS</li>
                   </ul>
               </div>
               <div>
                   <h3>CATEGORY</h3>
                   <ul className="category">
                       <li><input onChange={(e) => handlebrand(e, "cate")} type="checkbox" value="T-Shirt" /> T-Shirt</li>
                       <li><input onChange={(e) => handlebrand(e, "cate")} type="checkbox" value="Jacket" /> Jacket</li>
                       <li><input onChange={(e) => handlebrand(e, "cate")} type="checkbox" value="pant" /> pant</li>
                       <li><input onChange={(e) => handlebrand(e, "cate")} type="checkbox" value="Shorts" /> Shorts</li>
                   </ul>
               </div>
               <div>
                   <h3>COLORS</h3>
                   <ul className="colors">
                       <li><input onChange={(e) => handlebrand(e, "color")} type="checkbox" value="Blue" /> Blue</li>
                       <li><input onChange={(e) => handlebrand(e, "color")} type="checkbox" value="Brown" /> Brown</li>
                       <li><input onChange={(e) => handlebrand(e, "color")} type="checkbox" value="Green" /> Green</li>
                       <li><input onChange={(e) => handlebrand(e, "color")} type="checkbox" value="Black" /> Black</li>
                       <li><input onChange={(e) => handlebrand(e, "color")} type="checkbox" value="White" /> White</li>
                   </ul>
               </div>

           </div>
           <div className="Container">
               {
                   data.map((e) => {
                       return <div className="product-card">
                           <img src={e.image.img1} alt="" />
                           <p>{e.name}</p>
                           <p>{e.details}</p>
                           <div>
                               <p>Rs.{e.discount_price}</p>
                               <p>Rs.{e.main_price}</p>
                               <p>({e.discount}.% off)</p>
                           </div>
                           <p>Offer Price : Rs.{e.offer_price}</p>
                       </div>
                   })
               }
           </div>
       </div>
    
   </div>
}