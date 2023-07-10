"use client";
import { useState } from "react";
import "./Display.css";

const Display = ({ contract, account }) => {
  // console.log(account);
  const [imageUrl,setImageUrl]=useState([]);
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
        setImageUrl(dataArray);
      } else {
        dataArray = await contract.display(account);
        setImageUrl(dataArray);
      }
    } catch (e) {
      alert("You don't have access");
    }
    // const isEmpty = Object.keys(dataArray).length === 0;

    // if (!isEmpty) {
    //   // console.log('image ipfs files')
    //   // console.log(dataArray.length);
    //   // console.log(dataArray[0])
    //   const str = dataArray.toString();
    //   const str_array = str.split(",");
    //   console.log(str);
    //   console.log(str_array);
    //   const images = str_array.map((imageurl, i) => {
    //     console.log(imageurl);
    //     return (
    //       <a href={imageurl} key={i} target="_blank">
    //         <img
    //           key={i}
    //           src={`https://gateway.pinata.cloud/ipfs/${imageurl.substring(6)}`}
    //           // src={imageurl}
    //           alt="new"
    //           className="image-list"
    //         ></img>
    //       </a>
    //     );
    //   });
    //   setData(images);
    // } else {
    //   alert("No image to display");
    // }
  };
  return (
    <>
      {/* <div className="image-list">{data}</div> */}
      {/* <img src="https://gateway.pinata.cloud/ipfs/QmakiEqJ3cU8h5oWLtjJmYiDbnSAP87HNFG6aT54nGvtVU" alt='image'/> */}
       
      {
         imageUrl.length > 0 && imageUrl.map((image, index) => (

       <img key={index} src={image} alt='img' />
         ))
      }
     
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
