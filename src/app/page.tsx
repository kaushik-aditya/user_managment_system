'use client';

import { Navbar, UserList } from "@kaushik-aditya/projectpackages";
import { useEffect, useState } from "react";


export default function Home() {
  const [user,setUser] = useState(Object);
  // useEffect(() => {
    
  // }, [])
  
  return (
    <Navbar userName="aditya"/>
  );
}
