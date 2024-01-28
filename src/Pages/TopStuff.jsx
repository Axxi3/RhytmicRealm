import React, { useContext, useEffect, useState } from "react";
import topArtist from "../assets/Sample/topArtist.jpeg";
import star from "../assets/star.png";
import Cards from "../Components/Cards";
import { TokenContext } from "./Home";
import { TopArtistContext } from "../Components/Left";
import { useLocation } from "react-router";

export default function TopStuff() {
  const [TopArtistPopulatity, setTopArtistPopulatity] = useState([]);

  const location = useLocation();
  const data = location.state.data;
  const popularity = Math.floor(parseInt(data[0].sp_popularity) / 10);

  useEffect(() => {
    console.log(location.state.data);

    const popu = [];
    for (let index = 0; index < popularity; index++) {
      popu.push(index);
    }
    setTopArtistPopulatity(popu);
  }, []);

  return (
    <div>
      <section className="TopSection p-8 flex md:flex-row gap-5 flex-col w-[100%] items-center justify-evenly">
        <div className="Image">
          {data[0].image_url !== null ? (
            <img
              src={data[0].image_url}
              className="lg:w-[300px] md:w-[200px] md:h-[200px] w-[200px] h-[200px] lg:h-[300px] mt-5 rounded-[30px]"
              alt=""
            />
          ) : (
            <img
              src={data[0].artist_images[0]}
              className="lg:w-[300px] md:w-[200px] md:h-[200px] w-[200px] h-[200px] lg:h-[300px] mt-5 rounded-[30px]"
              alt=""
            />
          )}
        </div>
        <div className="Text">
          <p className="lg:text-[3.5rem] md:text-[2.8rem] text-[2.1rem]">Top {location.state.name} of the day</p>
          <p className="lg:text-[2rem] md:text-[1.7rem] text-[1.4rem]"> {data[0].name}</p>
          {data[0].hometown_city != null ? (
            <p className="lg:text-[1.5rem] md:text-[1.2rem] text-[1rem]">From {data[0].hometown_city}</p>
          ) : (
            <p className="lg:text-[1.5rem] md:text-[1.2rem] text-[1rem]">Location unavailable</p>
          )}

          <div className="stars flex">
            {TopArtistPopulatity.map(() => (
              <img src={star} className="w-[30px] h-[30px] mt-5" alt="" />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-[20px]">
        <p className="lg:text-[3.5rem] md:text-[2.8rem] text-[2.1rem] text-center">
          Let's see other Top {location.state.name}
        </p>
        <div className="Cards grid mt-9">
        {data.map((item, index) => (
    index !== 0 && (
        <Cards
            key={index}
            name={item.name}
            img={item.image_url !== null ? item.image_url : item.artist_images}
            rank= {index + 1}
        />
    )
))}
        </div>
      </section>
    </div>
  );
}
