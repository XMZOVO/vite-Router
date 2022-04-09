import{D as R,P as E,O as A,k as T,S as F,n as G,b as j,m as y,s as _,W as z,p as S,q as B,ao as q,ap as k,aq as O,ar as W,o as N,L as U}from"./OrbitControls.3c74ff74.js";import{G as H}from"./dat.gui.module.6914edc7.js";import{D as $,G as V,g as X}from"./index.62bb5d1d.js";import{_ as Y}from"./index.92b88ea0.js";import{l as Z,B as J,C as K,o as Q,e as ee,F as te,E as ae,G as ne,f as g}from"./vendor.69ab715b.js";const b=d=>(ae("data-v-6f7e5625"),d=d(),ne(),d),oe=b(()=>g("canvas",{class:"webgl"},null,-1)),ie=b(()=>g("div",{id:"progressDiv",class:"w-full bg-gray-200 h-2 mb-6 absolute top-1/2"},[g("div",{id:"progress",class:"transition-all duration-200 ease-in-out bg-main-active h-2 w-{{progressRatio}}"})],-1)),se={setup(d){let p,s,e,c,l,n,h=Z(0);const t={width:window.innerWidth,height:window.innerHeight},m=()=>{n.traverse(i=>{i instanceof y&&i.material instanceof N&&(i.material.envMapIntensity=p.envMapIntensity,i.material.needsUpdate=!0,i.castShadow=!0,i.receiveShadow=!0)})},a=new H;a.closed=!0,p={},p.envMapIntensity=5,a.add(p,"envMapIntensity").min(0).max(10).step(.001).onChange(m);const o=new R("#ffffff",3);o.position.set(-13,22.4,14.8),o.castShadow=!0,o.shadow.camera.far=15,o.shadow.mapSize.set(1024,1024),a.add(o,"intensity").min(0).max(10).step(.001).name("lightIntensity"),a.add(o.position,"x").min(-50).max(50).step(.001).name("lightX"),a.add(o.position,"y").min(-50).max(50).step(.001).name("lightY"),a.add(o.position,"z").min(-50).max(50).step(.001).name("lightZ"),s=new E(75,t.width/t.height,.1,100),s.position.set(0,1,7),J(()=>{a.destroy()}),K(()=>{l=document.querySelector("canvas.webgl");const i=document.querySelector("#progress"),v=document.querySelector("#progressDiv");c=new A(s,l),c.enableDamping=!0;const L=new U(()=>{window.setTimeout(()=>{X.to(f.uniforms.uAlpha,{duration:3,value:0}),v.style.visibility="hidden"},500)},(r,D,I)=>{h.value=D/I*100,i.style.width=`${h.value}%`}),M=new $;M.setDecoderPath("/draco/");const x=new V(L);x.setDRACOLoader(M);const u=new T().load(["/textures/environmentMaps/0/px.jpg","/textures/environmentMaps/0/nx.jpg","/textures/environmentMaps/0/py.jpg","/textures/environmentMaps/0/ny.jpg","/textures/environmentMaps/0/pz.jpg","/textures/environmentMaps/0/nz.jpg"]);x.load("/models/Detector_model/Detector.gltf",r=>{r.scene.scale.set(1.5,1.5,1.5),r.scene.position.set(0,0,0),r.scene.rotation.y=-Math.PI*1/4,n.add(r.scene),a.add(r.scene.rotation,"y").min(-Math.PI).max(Math.PI).step(.001).name("rotation"),m()}),n=new F,n.add(o),n.add(s);const C=new G(2,2,1,1),f=new j({transparent:!0,uniforms:{uAlpha:{value:1}},vertexShader:`

    void main(){
        gl_Position = vec4(position, 1.0);
        
    }`,fragmentShader:`
    uniform float uAlpha;

    void main(){
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }`}),P=new y(C,f);n.add(P),u.encoding=_,n.background=u,n.environment=u,e=new z({canvas:l,antialias:!0}),e.setSize(t.width,t.height),e.setPixelRatio(window.devicePixelRatio),e.physicallyCorrectLights=!0,e.outputEncoding=_,e.toneMapping=S,e.toneMappingExposure=3,e.shadowMap.enabled=!0,e.shadowMap.type=B,a.add(e,"toneMapping",{No:q,Linear:k,Reinhard:S,Cineon:O,ACESFilmic:W}).onFinishChange(()=>{e.toneMapping=Number(e.toneMapping),m()}),a.add(e,"toneMappingExposure").min(0).max(10).step(.001),w()});const w=()=>{c.update(),e.render(n,s),window.requestAnimationFrame(w)};return window.addEventListener("resize",()=>{t.width=window.innerWidth,t.height=window.innerHeight,s.aspect=t.width/t.height,s.updateProjectionMatrix(),e.setSize(t.width,t.height),e.setPixelRatio(Math.min(window.devicePixelRatio,2))}),(i,v)=>(Q(),ee(te,null,[oe,ie],64))}};var ue=Y(se,[["__scopeId","data-v-6f7e5625"]]);export{ue as default};