import{E as p,S as g,C as v,a as x,b as h,c as _,d as w,A as i,V as c,e as A}from"./stlFileLoader.581af8bb.js";import{_ as f,x as y,i as m,s as C,o as l,c as d,a as n,n as S,F as M,y as I,z as E}from"./index.09a7f49c.js";class T{constructor(e,t){this.meshes=[],this.currentTarget="GuaGua",this.compensate={y:0,x:0},this.canvas=e,this.loaded=t,window.innerHeight/window.innerWidth>1.76?(this.radius=7,this.compensate.y=1.5,this.compensate.x=0):(this.radius=4,this.compensate.y=0,this.compensate.x=1.5),this.CreateScene(),this.CreateModel(),this.CreateCamera(),this.engine.runRenderLoop(()=>{this.scene.render()}),window.addEventListener("resize",()=>{this.engine.resize()})}CreateScene(){this.engine=new p(this.canvas,!0,{adaptToDeviceRatio:!0}),this.engine.setHardwareScalingLevel(1/window.devicePixelRatio),this.scene=new g(this.engine);const e=v.CreateFromPrefilteredData("textures/environmentMaps/harbor.env",this.scene);e.gammaSpace=!1,this.scene.environmentTexture=e,this.scene.createDefaultSkybox(e,!0,1e3,.25),this.scene.environmentIntensity=1,this.scene.clearColor=new x(0,0,0,0)}async CreateModel(){const e=await h.ImportMeshAsync("","models/jiggly_watermelon_jello/","untitled.gltf",this.scene),t=await h.ImportMeshAsync("","models/Detector_model/","Detector.gltf",this.scene);console.log(t),t.meshes[0].position.y=-6,this.meshes.push(t.meshes[0]),this.meshes.push(e.meshes[0]),this.scene.createDefaultLight(!0),this.loaded.value=!0,this.camera1.target.x=this.meshes[1].position.x,this.camera1.target.y=this.meshes[1].position.y+this.compensate.y,this.camera1.target.z=this.meshes[1].position.z}Switch(){var e=new _;if(e.setEasingMode(w.EASINGMODE_EASEINOUT),this.currentTarget==="detector"){this.camera1.useAutoRotationBehavior=!1;var t=i.CreateAndStartAnimation("at5",this.camera1,"target",60,60,this.camera1.target,new c(this.meshes[1].position.x,this.meshes[1].position.y+this.compensate.y,this.meshes[1].position.z),0,e),t=i.CreateAndStartAnimation("at5",this.camera1,"radius",60,60,this.camera1.radius,this.radius,0,e);t.disposeOnEnd=!0,this.currentTarget="GuaGua"}else{var t=i.CreateAndStartAnimation("at5",this.camera1,"target",60,60,this.camera1.target,new c(this.meshes[0].position.x+1.5,this.meshes[0].position.y+this.compensate.y,this.meshes[0].position.z),0,e),t=i.CreateAndStartAnimation("at5",this.camera1,"radius",60,60,this.camera1.radius,this.radius+3,0,e);t.disposeOnEnd=!0,this.camera1.useAutoRotationBehavior=!0,this.camera1.autoRotationBehavior.idleRotationSpeed=1,this.currentTarget="detector"}}CreateCamera(){this.camera1=new A("camera1",Math.PI/2,Math.PI*22/72,4,c.Zero(),this.scene),window.innerHeight/window.innerWidth>1.76&&(this.camera1.radius=7)}MoveActiveCamera({radius:e,alpha:t,beta:r,target:s}){const a=this.camera1;a.animations=[this.createAnimation("radius",a.radius,e),this.createAnimation("alpha",a.alpha,t),this.createAnimation("beta",a.beta,r),this.createAnimation("target.x",a.target.x,s.x),this.createAnimation("target.y",a.target.y,s.y),this.createAnimation("target.z",a.target.z,s.z)],this.scene.beginAnimation(a,0,100,!1,1)}createAnimation(e,t,r){const s=new i("animation",e,60,i.ANIMATIONTYPE_FLOAT,i.ANIMATIONLOOPMODE_CONSTANT);return s.setKeys([{frame:0,value:t},{frame:100,value:r}]),s}}const u=o=>(I("data-v-1a6235a8"),o=o(),E(),o),b={key:0,class:"flex flex-col space-y-5 absolute top-28 sm:top-1/3 left-10 sm:left-20 text-white text-4xl sm:text-5xl select-none"},N=u(()=>n("p",{class:""},"It's Summer Now",-1)),O=u(()=>n("div",{class:"text-lg sm:text-2xl text-gray-300"},[n("p",{class:""},"Xiao Liu is going to"),n("p",{class:""},"pursue meaningful people and things")],-1)),z=y({setup(o){const e=m(),t=m(!1);let r;C(()=>{r=new T(e.value,t)});function s(){r.Switch()}return(a,P)=>(l(),d(M,null,[n("canvas",{ref_key:"canvas",ref:e,class:"w-full h-screen"},null,512),t.value?(l(),d("div",b,[N,O,n("div",null,[n("button",{onClick:s,class:"transition hover:shadow-lg hover:-translate-y-1 active:translate-y-1 rounded-lg border text-3xl w-24"},"Pull")])])):S("",!0)],64))}});var R=f(z,[["__scopeId","data-v-1a6235a8"]]);export{R as default};
