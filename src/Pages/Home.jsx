import React, { createContext, useContext, useEffect, useState } from "react";
import "../App.css";
import Left from "../Components/Left";
import Middle from "../Components/Middle";
import Right from "../Components/Right";
 

export default function Home() {  

    
  const [ApiData, setApiData] = useState(null)
  const fetchData = async () => {
    const url = '/api/token';
    const data = {
      refreshtoken: 'ZhsrWkzBKUZFxRZtb3sJw93XPeYsiZJ6UUKrtpeUs6eV6GqqoVg79I5KW8ArfI1G'
    };
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
    
    // Use fetch and handle the promise
    fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        setApiData(data)
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
    
  };
  
  useEffect(() => {
    // Use GetAccessToken here
    fetchData();
  }, []);
  return (
    <div className=" w-[100vw] test flex gap-5 justify-center items-center relative ">
      <div className="banner w-[100%] absolute h-[60px] bg-[#f5ff3a] z-99 opacity-100 -rotate-[30deg] right-[30%] top-[7%] textbg"></div>  
      {ApiData!==null ? ( 
        <TokenContext.Provider value={ApiData}>
      <div className="w-[100%] h-[88%] rounded-[50px] bg-[#060606] gap-5 flex p-6 flex-wrap items-center justify-center">
        <Left />   

        <Middle />
        <Right />
      </div>  
      </TokenContext.Provider>
      ):null}

    </div>
  )
}


export const TokenContext=React.createContext()