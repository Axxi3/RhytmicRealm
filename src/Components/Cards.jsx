import React, { useEffect } from 'react'
import top from "../assets/Sample/topArtist.jpeg"
export default function Cards(props) {
    useEffect(()=>{ 
        console.log("from Card")
        console.log(props.rank)
    })
  return (
    <div className='cards'>
        <img src={props.img} alt="" className=' lg:w-[250px] md:w-[180px] md:h-[180px] w-[160px] h-[160px] lg:h-[250px]'/>  
        <p className=' lg:text-[2.2rem] md:text-[1.6rem] text-[1.4rem] text-center '>{props.name}</p>  
        {
            props.rank !==null?( 
                <p className='lg:text-[1.5rem] md:text-[1.2rem] text-[1rem] text-center'>Rank-{props.rank}</p>
            ):null
        } 
       
    </div>
  )
}
