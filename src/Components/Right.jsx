import sit from "../assets/sit.png"  
import lastpic from "../assets/Sample/lastpic.png" 
import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../Pages/Home';
import axios from 'axios'
import Loader from './Loader' 
import { useNavigate } from 'react-router';
export default function Right() {  

  const navigate=useNavigate()
  const RefrestToken=useContext(TokenContext)    
  const [TopMusicVideo,SetTopMusicVideo]=useState(null) 
    
    
  const fetchData = async () => {
    try {
      const response = await axios.get("/api/charts/youtube/videos?latest=true&country_code=us&offset=0", {
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
        SetTopMusicVideo(data);
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



  const PortfolioSite=()=>{ 
 
    window.location.href = 'https://preeminent-trifle-e429eb.netlify.app/ ';  
  } 

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      console.log("Fetching data...from right");
      const firstDataObject = await fetchData();
      console.log("Data fetched for Right:", firstDataObject);
      // Now you can perform actions after the data is fetched
    };
  
    fetchDataAndSetState();
  }, []);


  const navigateToTop=()=>{  
    if(TopMusicVideo!==null) { 
      navigate("/top", { state: { data:TopMusicVideo,name:"Music Video"} })
    }
  
   }


  // "id": "l0U7SxXHkPY",
  // "name": "Future - Life Is Good (Official Music Video) ft. Drake",
  // "isrc": "USSM11914962",
  // "youtube_artist": "/m/0hhwdgn",
  // "image_url": null,
  // "cm_track": 28145374,
  // "upload_date": "2020-01-10T05:00:08.000Z",


  return (
    <div className='lg:w-[33.33%] w-[100%] h-[100%] grid defineRightGrid p-4 gap-4' onClick={navigateToTop}>  
    {TopMusicVideo!=null?( 
          <div className="border-2 border-[#E3E2F1] trans rounded-[40px] flex items-center justify-center customFont text-[#000] lg:justify-end pr-6 bg-[#E3E2F1] relative" onClick={PortfolioSite}> 
   
          <img src={sit} className='w-[30%] absolute lg:left-[0px] lg:top-[0px] lg:inline-block md:hidden hidden z-50' alt="" />
        
        
          <p className='text-[2.5rem] lg:text-end text-center'>Made by Raj</p>
        </div>  
      ):null} 
      
      <div className="border-2 border-white relative rounded-[40px] trans">  
      {TopMusicVideo!=null?( 
        <img src={TopMusicVideo[0].artist_images}
        className='absolute inset-0 w-full h-full object-cover rounded-[40px] bg-img z-0'
         alt="" /> 
      ):<Loader/>} 
        
 {TopMusicVideo!=null?( 
           <p className='md:text-[1.8rem] text-[1.5rem] mt-3 text-center z-auto'>Best Song in youtube Music Now</p>  
      ):null} 
          {TopMusicVideo!=null?( 
             <p className='md:text-[1.6rem] text-[1.3rem] text-center customFont2'>{TopMusicVideo[0].name}</p>
      ):null}    
       {TopMusicVideo!=null?( 
            <p className='md:text-[1.2rem] text-[1rem]  text-end'>By {TopMusicVideo[0].artist_name}</p>
      ):null} 
        
          
      </div>
    </div>
  )
}
