import React from "react";
import { AbsoluteFill, Composition, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MasaaSaudiAd } from "./masaa-saudi-ad.jsx";

const job = {
  title: "مدير مالية شركات",
  company: "سبيماكو الدوائية",
  city: "الرياض"
};

function JobStory() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 18 } });
  const y = interpolate(enter, [0, 1], [80, 0]);
  const opacity = interpolate(frame, [0, 12, 285, 300], [0, 1, 1, 0], { extrapolateLeft:"clamp", extrapolateRight:"clamp" });
  return <AbsoluteFill style={{background:"linear-gradient(160deg,#031C18,#07342C)",fontFamily:"Arial",color:"white",direction:"rtl",padding:90,opacity}}>
    <div style={{fontSize:70,fontWeight:800,color:"#68E8BC",transform:`translateY(${y}px)`}}>مَسعى وظائف</div>
    <div style={{marginTop:260,fontSize:46,color:"#F6B744"}}>{job.company}</div>
    <div style={{marginTop:35,fontSize:74,fontWeight:800,lineHeight:1.4}}>{job.title}</div>
    <div style={{marginTop:40,fontSize:42}}>{job.city}</div>
    <div style={{marginTop:"auto",fontSize:34,color:"#DCE6E1"}}>✓ متحقق من المصدر الرسمي</div>
  </AbsoluteFill>;
}

export const MasaaVideo = () => <>
  <Composition id="JobStory" component={JobStory} durationInFrames={300} fps={25} width={1080} height={1920}/>
  <Composition id="MasaaSaudiAd" component={MasaaSaudiAd} durationInFrames={455} fps={30} width={1080} height={1920}/>
</>;
