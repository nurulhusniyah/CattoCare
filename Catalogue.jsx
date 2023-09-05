import React, { useContext, useEffect, useState } from "react";
import { Shopnav } from "../components/Shopnav";
import { Products } from "../components/Products";
import { auth, db } from "../firebase";
import { AuthContext } from '../context/AuthContext'

const Catalogue = (props) => {

const {currentUser} = useContext(AuthContext)

// state of products
const [products, setProducts]=useState([]);


// getting products function
const getProducts = async ()=>{
    const products = await db.collection('products').get();
    const productsArray = [];
    for (var snap of products.docs){
        var data = snap.data();
        data.ID = snap.id;
        productsArray.push({
            ...data
        })
        if(productsArray.length === products.docs.length){
            setProducts(productsArray);
        }
    }
}

useEffect(()=>{
    getProducts();
},[])

// state of totalProducts
const [totalProducts, setTotalProducts]=useState(0);

// getting cart products
useEffect(()=>{
    auth.onAuthStateChanged(currentUser=>{
        if(currentUser){
            db.collection('Cart ' + currentUser.uid).onSnapshot(snapshot=>{
                const qty = snapshot.docs.length;
                setTotalProducts(qty);
            })
        }
    })
},[])

// globl variable
let Product;

// add to cart
const addToCart = (product)=>{
    if(currentUser.uid!==null){
        // console.log(product);
        Product=product;
        Product['qty']=1;
        Product['TotalProductPrice']=Product.qty*Product.price;
        db.collection('Cart ' + currentUser.uid).doc(product.ID).set(Product).then(()=>{
            console.log('successfully added to cart');
        })

    }
    else{
        props.history.push('/login');
    }

}

return (
    <>
        <Shopnav user={currentUser} totalProducts={totalProducts}/>
        <br></br>
        {products.length > 0 && (
            <div className='container-fluid'>
                <h1 className='text-center'>Products</h1>
                <div className='products-box'>
                    <Products products={products} addToCart={addToCart}/>
                </div>
            </div>
        )}
        {products.length < 1 && (
            <div className='container-fluid'>Please wait....</div>
        )}
    </>
)
}

export default Catalogue