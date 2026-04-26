import { Canvas } from "@react-three/fiber"
import Scene from "../components/scene";
import HomeSection1 from "../components/HomeSection1";
import HomeSection2 from "../components/HomeSection2";
import HomeSection3 from "../components/HomeSection3";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "../Context/contextAPI";
import Loading3d from "../components/Loading3d";
const Home = () => {
const{colorFont,roleAU,Authoriza} = useAuth()

  return (
    <main className="relative">
<Canvas style={{width:"100vw",height:"100vh",position:"fixed",top:0,left:0,
// background:"#0951B7",
zIndex:"1",
backgroundImage:`url(${roleAU ? "/bg2.png": "/bg.png"})`,
backgroundSize:"cover",
backgroundPosition:"center"
}} dpr={[1,2]}>
<Suspense fallback={<Loading3d/>}>
<Scene/>
</Suspense>  

{/* //Lights */}
<ambientLight color={`${colorFont.color}`} intensity={5}/>
<directionalLight color={`${colorFont.color}`} intensity={roleAU?111: 17}/>
</Canvas>
<HomeSection1/>
{
  Authoriza &&
<HomeSection2/>
}
<HomeSection3/>
    </main>
  );
};

export default Home;