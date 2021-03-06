// import React,{useEffect} from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {addToCart, removeFromCart} from "./../actions/Cartaction";
// import "./../css/Home.css";
// import {Link} from "react-router-dom";
// // import Cookie from "js-cookies";
// export default function CartScreen(props){
//     const cart=useSelector(state=>state.cart);
//     const {cartItems}=cart;
//     const productId=props.match.params.id;
//     const qty=props.location.search?Number(props.location.search.split("=")[1]):1;
//     const dispatch=useDispatch();
//     useEffect(()=>{
//         if(productId){
//             dispatch(addToCart(productId,qty));
//         }
//     },
//     // eslint-disable-next-line
//     []);
//     const removeFromCartHandler=(productId)=>{
//         dispatch(removeFromCart(productId));
//     }
//     const chaeckoutHandler=()=>{
//         props.history.push("/signin?redirect=shipping");
//     }
//     return (
//         <div className="cart">
//             <div className="cartlist">
//                 <ul className="cartlistcontainer" >
//                     <li>
//                         <h3>Shopping Cart</h3>
//                         <div >Price:</div>
//                     </li>
//                    <li> {
//                         cartItems.length===0? <div>Cart is Empty</div>:
//                         cartItems.map(item=>
//                            <div className="cartdetails" key={item.id}>
//                                <div className="cartimage">
//                                <img src={item.image} alt="img"/>
//                                </div>
//                                <div className="cartname">
//                                    <div>
//                                        <Link to={"/product/"+item.product} className="link">{item.name}</Link>
//                                    </div>
//                                    <div >
//                                        Qty:
//                                        <select value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,e.target.value))}>
//                                            <option value={1}>1</option>
//                                            <option value={2}>2</option> 
//                                            <option value={3}>3</option>
//                                            <option value={4}>4</option>
//                                        </select>
//                                         </div>
//                                         <div> 
//                     <button type="button" onClick={()=>removeFromCartHandler(item.product)}>Delete</button>
//                                  </div>
//                                </div>
//                                <div className="cartprice">
//                                   $ {item.price}
//                                    </div>
//                            </div>
//                             )
//                     }
//                     </li>
//                 </ul>
//             </div>
//             <div className="cartaction">
//                 <h3>SubTotal ( {cartItems.reduce((a,c)=>a+c.qty,0)} items)
//                 : $ {cartItems.reduce((a,c)=>a+c.price*c.qty, 0)}
//                 </h3>
//                 <button className ="button primary fullwidth" onClick={chaeckoutHandler}disabled={cartItems.length===0}>Proceed to chekout</button>
//             </div>
//         </div>
//     );
// }


import React, { useEffect } from 'react';
import { addToCart, removeFromCart } from '../actions/Cartaction';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import "./../css/Home.css";
function CartScreen(props) {

  const cart = useSelector(state => state.cart);

  const { cartItems } = cart;

  const productId = props.match.params.id;
  const qty = props.location.search ? Number(props.location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = (productId) => {
    dispatch(removeFromCart(productId));
  }
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  },
     //  eslint-disable-next-line 
  []);

  const checkoutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  }

  return <div className="cart">
    <div className="cartlist">
      <ul className="cartlistcontainer">
        <li>
          <h3>
            Shopping Cart
          </h3>
          <div>
            Price
          </div>
        </li>
        {
          cartItems.length === 0 ?
            <div>
              Cart is empty
          </div>
            :
            cartItems.map(item =>
              <li key={item._id}>
                <div className="cartimage">
                  <img src={item.image} alt="product" />
                </div>
                <div className="cartname">
                  <div>
                    <Link to={"/product/" + item.product} className="link">
                      {item.name}
                    </Link>

                  </div>
                  <div>
                    Qty:
                  <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                      {[...Array(item.countInStock).keys()].map(x =>
                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                      )}
                    </select>
                    <button type="button" className="button" onClick={() => removeFromCartHandler(item.product)} >
                      Delete
                    </button>
                  </div>
                </div>
                <div className="cartprice">
                  ${item.price}
                </div>
              </li>
            )
        }
      </ul>

    </div>
    <div className="cartaction">
      <h3>
        Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} items)
        :
         $ {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
      </h3>
      <button onClick={checkoutHandler} className="button primary fullwidth" disabled={cartItems.length === 0}>
        Proceed to Checkout
      </button>

    </div>

  </div>
}

export default CartScreen;