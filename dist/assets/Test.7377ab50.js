import{E as c,S as h,C as m,e as u,V as r,b as l,A as i}from"./stlFileLoader.581af8bb.js";import{t as p}from"./tweakpane.e6d34bd5.js";import{x as v,i as d,s as A,o as M,c as g}from"./index.23e2d54c.js";class C{constructor(e){this.pane=new p.exports.Pane;const t={position:0};this.pane.addInput(t,"position",{options:{\u5168\u4F53:0,\u5934:1,\u624B:2,\u811A:3,\u817F:4}}),this.canvas=e,this.CreateScene(),this.CreateCamera(),this.CreateModel(),this.pane.on("change",s=>{switch(s.value){case 0:this.MoveActiveCamera({radius:16,alpha:Math.PI/2,beta:Math.PI*2/5,target:{x:0,y:5,z:-2}});break;case 1:this.MoveActiveCamera({radius:16,alpha:Math.PI/2,beta:Math.PI/2,target:{x:0,y:9,z:-10}});break;case 2:this.MoveActiveCamera({radius:16,alpha:0,beta:Math.PI/2,target:{x:-10,y:5,z:.3}});break;case 3:this.MoveActiveCamera({radius:16,alpha:Math.PI/2,beta:Math.PI/3,target:{x:0,y:-4,z:-6}});break;case 4:this.MoveActiveCamera({radius:16,alpha:Math.PI/2,beta:Math.PI/2,target:{x:0,y:3,z:-10}});break}}),this.engine.runRenderLoop(()=>{this.scene.render()}),window.addEventListener("resize",()=>{this.engine.resize()})}CreateScene(){this.engine=new c(this.canvas,!0,{adaptToDeviceRatio:!0}),this.engine.displayLoadingUI(),this.scene=new h(this.engine);const e=m.CreateFromPrefilteredData("textures/environmentMaps/harbor.env",this.scene);e.gammaSpace=!1,this.scene.environmentTexture=e,this.scene.createDefaultSkybox(e,!0,1e3,.25),this.scene.environmentIntensity=1}CreateCamera(){this.camera1=new u("camera1",Math.PI/2,Math.PI/3,16,r.Zero(),this.scene),this.camera1.attachControl(),this.camera1.wheelPrecision=10}async CreateModel(){const e=await l.ImportMeshAsync("","models/uruha_rushia_-_hololive_vtuber/","scene.gltf",this.scene);this.camera1.setTarget(new r(0,5,0)),e.animationGroups[0]=null,this.vtb=e,this.engine.hideLoadingUI()}MoveActiveCamera({radius:e,alpha:t,beta:s,target:n}){const a=this.camera1;a.animations=[this.createAnimation("radius",a.radius,e),this.createAnimation("alpha",a.alpha,t),this.createAnimation("beta",a.beta,s),this.createAnimation("target.x",a.target.x,n.x),this.createAnimation("target.y",a.target.y,n.y),this.createAnimation("target.z",a.target.z,n.z)],this.scene.beginAnimation(a,0,100,!1,2)}createAnimation(e,t,s){const n=new i("animation",e,60,i.ANIMATIONTYPE_FLOAT,i.ANIMATIONLOOPMODE_CONSTANT);return n.setKeys([{frame:0,value:t},{frame:100,value:s}]),n}}const x=v({setup(o){const e=d();return A(()=>{new C(e.value)}),(t,s)=>(M(),g("canvas",{ref_key:"bjsCanvas",ref:e,class:"w-full h-screen"},null,512))}});export{x as default};