import React, { useContext, useEffect, useState } from 'react';
import topArtist from "../assets/Sample/topArtist.jpeg";
import coming from "../assets/comming.png"; // Fix the import statement
import { TokenContext } from '../App';
import axios from 'axios';
import Loader from './Loader';

export default function Left() {  
  const RefrestToken=useContext(TokenContext)    
  const [TopArtist,SetTopArtist]=useState(null)  

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/charts/spotify/artists?latest=true&interval=monthly&type=playlist_reach", {
        headers: {
          Authorization: "Bearer " + RefrestToken.token,
        }
      });
  
      if (response.status === 200) {
        console.log(response.data.obj.data[0]);
        SetTopArtist(response.data.obj.data[0]);
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
      console.log("Fetching data...");
      const firstDataObject = await fetchData();
      console.log("Data fetched:", firstDataObject);
      // Now you can perform actions after the data is fetched
    };
  
    fetchDataAndSetState();
  }, []);
  










  // {id: 3380945, name: 'ATL Jacob', image_url: 'https://i.scdn.co/image/ab67616100005174444eae7e928cddfd6cd254ee', isni: null, code2: 

  return (
    <div className=' h-[100%] grid defineGrid'>
      <div className="TopCard relative rounded-[40px] overflow-hidden flex flex-col justify-end trans">  
      { TopArtist!== null ?( 
         <p className="z-10 text-white customFont text-[1.4rem] pl-3">Top Artist</p> 
        ):null
        } 
         
        { TopArtist!== null ?( 
          <p className="z-10 text-white customFont text-[2rem] pl-3 pb-5">{TopArtist.name}</p>
        ):null
        } 
         

         { TopArtist!== null ?( 
          <img
          src={TopArtist.image_url}
          className="absolute inset-0 w-full h-full object-cover rounded-[40px] bg-img z-0"
          alt=""
        />
        ):<Loader/>
        } 
        
      </div>

      <div className="middleTopCard flex items-center justify-center trans">
        <h1 className='text-white customFont text-[40px]'>RhythmicRealm</h1>
      </div>  

      <div className="bottomCard border-white rounded-[40px] border-2 relative flex items-center trans">  
        <p className="z-10 text-white customFont text-[1.4rem] pl-3">Coming</p>   
        <p className="z-10 text-white customFont text-[1.4rem] pl-3">Soon</p> 
        <img src={coming} className="absolute inset-0 w-[100%] h-full rounded-[40px] bg-img z-0" alt="" />
      </div>
    </div>
  );
}
