import Konva from "konva";
import { Canvas, Rect, Textbox } from "fabric";
import { SVG } from "@svgdotjs/svg.js";
import lottie from "lottie-web";

const stage = new Konva.Stage({ container: "konva", width: 520, height: 360 });
const layer = new Konva.Layer();
stage.add(layer);
layer.add(new Konva.Rect({ x:0,y:0,width:520,height:360,fill:"#07342C",cornerRadius:16 }));
layer.add(new Konva.Text({ x:40,y:70,width:440,align:"right",text:"مَسعى وظائف",fontSize:48,fontStyle:"bold",fill:"#68E8BC" }));
layer.add(new Konva.Text({ x:40,y:155,width:440,align:"right",text:"قالب بصري قابل للتعديل",fontSize:30,fill:"#FFFFFF" }));
layer.draw();

const fabric = new Canvas("fabric");
fabric.backgroundColor = "#FBFCFA";
fabric.add(new Rect({ left:25,top:25,width:470,height:310,rx:24,ry:24,fill:"#F1F7F4" }));
fabric.add(new Textbox("بطاقة مَسعى", { left:60,top:90,width:400,textAlign:"right",fontSize:42,fill:"#0A5B45" }));
fabric.add(new Textbox("اسحب العناصر وعدّل القالب قبل التصدير", { left:60,top:170,width:400,textAlign:"right",fontSize:24,fill:"#263B34" }));
fabric.renderAll();

const svg = SVG().addTo("#svg-stage").size("100%","180").viewbox(0,0,1000,180);
svg.rect(1000,180).radius(24).fill("#07342C");
svg.text("مَسعى — موشن SVG").font({size:56,weight:700,family:"Arial"}).fill("#68E8BC").move(500,48).attr({"text-anchor":"middle"});
svg.findOne("text").animate(1400).ease("<>").move(500,58).loop(true,true);

lottie.loadAnimation({
  container: document.getElementById("lottie-stage"),
  renderer: "svg",
  loop: true,
  autoplay: true,
  animationData: {
    v:"5.7.4",fr:30,ip:0,op:60,w:220,h:120,nm:"Masaa Pulse",ddd:0,assets:[],
    layers:[{ddd:0,ind:1,ty:4,nm:"dot",sr:1,ks:{o:{a:0,k:100},r:{a:0,k:0},p:{a:0,k:[110,60,0]},a:{a:0,k:[0,0,0]},s:{a:1,k:[{t:0,s:[70,70,100]},{t:30,s:[120,120,100]},{t:60,s:[70,70,100]}]}},shapes:[{ty:"el",p:{a:0,k:[0,0]},s:{a:0,k:[52,52]},nm:"Ellipse"},{ty:"fl",c:{a:0,k:[0.965,0.718,0.267,1]},o:{a:0,k:100},r:1,nm:"Fill"}],ip:0,op:60,st:0,bm:0}]
  }
});
