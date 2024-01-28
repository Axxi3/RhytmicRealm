import React, { useContext, useEffect, useState } from 'react'
import middlecard from "../assets/middlebg.png"
import { TokenContext } from '../Pages/Home';
import axios from 'axios' 
import { useNavigate } from 'react-router';
import Loader from './Loader'
export default function Middle() { 
  const RefrestToken=useContext(TokenContext)    
  const [TopAlbum,SetTopAlbum]=useState(null) 
  const navigate=useNavigate()
  
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/charts/spotify?date=2018-11-01&country_code=US&interval=daily&type=regional", {
        headers: {
          Authorization: "Bearer " + RefrestToken.token,
        }
      });
  
      if (response.status === 200) {
        console.log(response.data.obj.data[0]); 
        const data=[]
        for (let index = 0; index < 11; index++) {
         data.push(response.data.obj.data[index])
          
        }
        SetTopAlbum(data);
        return response.data.obj.data[0];
      } else {
        console.error(`HTTP error! Status: ${response.status}`);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
  
      if (error.response) {
        console.error('Error Details:', error.response.data);
      }
      return null;
    }
  };

 
  useEffect(() => {
    const fetchDataAndSetState = async () => {
      console.log("Fetching data...from middle");
      const firstDataObject = await fetchData();
      console.log("Data fetched for middle:", firstDataObject);
      // Now you can perform actions after the data is fetched
    };
  
    fetchDataAndSetState();
  }, []);

  
 const navigateToTop=()=>{  
  if(TopAlbum!==null) { 
    navigate("/top", { state: { data:TopAlbum,name:"Album"} })
  }

 }


  // "id": 9898931,
  // "name": "Mo Bamba",
  // "isrc": "QM24S1703585",
  // "spotify_track_id": "1xzBco0xcoJEDXktl7Jxrr",
  // "spotify_album_id": "15Id9Jrqab8IwHFirdrrLp",
  // "image_url": "https://i.scdn.co/image/ec3d7aec83fb7ac47fbee58ca9e0473c785f8cec",


  return (
    <div className=' h-[100%] trans' onClick={navigateToTop}>
    <div className="w-[100%] h-[100%] relative flex flex-col items-center justify-start"> 
    {TopAlbum!==null?( 
       <img src={TopAlbum[0].image_url} alt="" className="absolute inset-0 w-full h-full object-cover rounded-[40px] bg-img z-0" />
    ):<Loader/>}
      
      <div className="text-center">  
      {TopAlbum!==null?( 
       <p className="z-99 text-white customFont text-[2.5rem] opacity-100 mt-[30px] pl-3 h-[20%]">Top Album of the day</p>
    ):null}
        
      </div>
  
      <div className="flex flex-col items-center -rotate-90 absolute 2nddiv top-1/2 transform -translate-y-1/2">  
      {TopAlbum!==null?( 
        <p className="z-99 text-white customFont text-[2rem] opacity-100 mt-[30px] pl-3 w-[100%] text-center">{TopAlbum[0].name}</p>
    ):null}
          {TopAlbum!==null?( 
          <p className="z-99 text-white customFont text-[2rem] opacity-100 mt-[30px] pl-3 w-[100%] text-center">LISTEN NOW</p>
    ):null}
     
      </div>
    </div>
  </div>
  
  
  
  )
}
