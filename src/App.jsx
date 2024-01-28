import React, { createContext, useContext, useEffect, useState } from "react";
import "./App.css";
import Left from "./Components/Left";
import Middle from "./Components/Middle";
import Right from "./Components/Right";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import TopStuff from "./Pages/TopStuff";

function App() {  



  return (
   <BrowserRouter>
   
   <Routes>

<Route  path="/" element={<Home/>}  />
<Route  path="/top" element={<TopStuff/>}  />
   </Routes>
   
   </BrowserRouter>
  );
}

export default App; 


