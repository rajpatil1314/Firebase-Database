import axios from 'axios'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'

import React, { useEffect, useState } from 'react'
import { db } from '../services/firebase'
import { Link } from 'react-router-dom'

const Products = () => {
    const [data,setdata]=useState([])

    const Getdata= async ()=>{
      
       getDocs(collection(db, "products"))
      .then((res)=>{
        const filterdata=res.docs.map((el)=>({id:el.id,...el.data()}))
        setdata(filterdata)
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    const deleteproduct=(id)=>{
      // console.log(id)

      deleteDoc(doc(db,"products",id))
      .then((res)=>{
        console.log(res)
        alert("Data Deleted...")
        Getdata()
      })
      .catch((err)=>{
        console.log(err)
      })
    }
    useEffect(()=>{
        Getdata()
    },[])
  return (
    <div>
      <h1 style={{textAlign:"center"}}>Product Page</h1>
       <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"10px",width:"95%",margin:"auto"}}>
        {data.map((el)=>(
            <div key={el.id} style={{border:"1px solid grey",padding:"10px",textAlign:"center"}}>
                <img src={el.image} alt="" height={200} width={200}/>
                <h3>{el.title}</h3>
                <h3>{el.price}</h3>
                <h3>{el.category}</h3>
                <p>{el.description}</p>
                <button style={{backgroundColor:"grey",color:"white",border:"none",padding:"10px 20px"}}>
                <Link to={`/editproduct/${el.id}`} style={{ textDecoration: "none", color: "white" }}>
              EDIT
              </Link>
              </button>&nbsp;
            <button onClick={()=>deleteproduct(el.id)} style={{backgroundColor:"grey",color:"white",border:"none",padding:"10px 20px"}}>DELETE</button>
            </div>
        ))}
      </div> 
    </div>
  )
}

export default Products
