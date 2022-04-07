import{R as E,G as q,D as A,P as G,V as p,O as z,e as B,S as F,f as O,b as I,M as L,s as R,W as U,g as W,h as $,i as V,L as k}from"./dat.gui.module.a713d531.js";import{D as H,G as X,g as Y}from"./index.a44b4e02.js";import{_ as N}from"./index.929d4177.js";import{l as J,B as K,C as Q,p as Z}from"./vendor.a9b44f4b.js";const ee=Z('<canvas class="webgl" data-v-887fdd14></canvas><div id="progressDiv" class="w-full bg-gray-200 h-2 mb-6 absolute top-1/2" data-v-887fdd14><div id="progress" class="transition-all duration-200 ease-in-out bg-main-active h-2 w-{{progressRatio}}" data-v-887fdd14></div></div><div class="point point-0" data-v-887fdd14><div class="label select-none" data-v-887fdd14>1</div><div class="text select-none" data-v-887fdd14>This is creation of Roy</div></div><div class="point point-1" data-v-887fdd14><div class="label select-none" data-v-887fdd14>2</div><div class="text select-none" data-v-887fdd14>Switch</div></div><div class="point point-2" data-v-887fdd14><div class="label select-none" data-v-887fdd14>3</div><div class="text select-none" data-v-887fdd14>Light Switch</div></div><div class="point point-3" data-v-887fdd14><div class="label select-none" data-v-887fdd14>4</div><div class="text select-none" data-v-887fdd14>Power</div></div><div class="point point-4" data-v-887fdd14><div class="label select-none" data-v-887fdd14>5</div><div class="text select-none" data-v-887fdd14>Elden Ring</div></div><div class="point point-5" data-v-887fdd14><div class="label select-none" data-v-887fdd14>6</div><div class="text select-none" data-v-887fdd14>USB</div></div><div class="point point-6" data-v-887fdd14><div class="label select-none" data-v-887fdd14>7</div><div class="text select-none" data-v-887fdd14>This is creation of Roy</div></div><div class="point point-7" data-v-887fdd14><div class="label select-none" data-v-887fdd14>8</div><div class="text select-none" data-v-887fdd14>This is creation of Roy</div></div><div class="point point-8" data-v-887fdd14><div class="label select-none" data-v-887fdd14>9</div><div class="text select-none" data-v-887fdd14>This is creation of Roy</div></div>',11),te={setup(ae){let u,n,t,f,m,s,w=J(0),h,g=!1;const a={width:window.innerWidth,height:window.innerHeight},P=()=>{s.traverse(e=>{e instanceof L&&e.material instanceof V&&(e.material.envMapIntensity=u.envMapIntensity,e.material.needsUpdate=!0,e.castShadow=!0,e.receiveShadow=!0)})},y=new E,b=new q,x={visible:!1};b.add(x,"visible").name("Show tips").onFinishChange(()=>{for(const e of h)e.element.classList.remove("visible")}),u={},u.envMapIntensity=5;const d=new A("#ffffff",3);d.position.set(-13,22.4,14.8),d.castShadow=!0,d.shadow.camera.far=15,d.shadow.mapSize.set(1024,1024),n=new G(75,a.width/a.height,.1,100),n.position.set(-5,1,5),K(()=>{b.destroy()}),Q(()=>{m=document.querySelector("canvas.webgl");const e=document.querySelector("#progress"),i=document.querySelector("#progressDiv");h=[{position:new p(-1.5,-.2,1.5),element:document.querySelector(".point-0")},{position:new p(.6,-.9,1.7),element:document.querySelector(".point-1")},{position:new p(1.9,-.9,1.7),element:document.querySelector(".point-2")},{position:new p(.2,-.9,-5.5),element:document.querySelector(".point-4")}],f=new z(n,m),f.enableDamping=!0;const l=new k(()=>{window.setTimeout(()=>{Y.to(_.uniforms.uAlpha,{duration:1,value:0}),i.style.visibility="hidden"},500),window.setTimeout(()=>{g=!0})},(r,T,j)=>{w.value=T/j*100,e.style.width=`${w.value}%`}),c=new H;c.setDecoderPath("/draco/");const v=new X(l);v.setDRACOLoader(c);const o=new B().load(["/textures/environmentMaps/0/px.jpg","/textures/environmentMaps/0/nx.jpg","/textures/environmentMaps/0/py.jpg","/textures/environmentMaps/0/ny.jpg","/textures/environmentMaps/0/pz.jpg","/textures/environmentMaps/0/nz.jpg"]);v.load("models/DSPEC_jr/DSPEC_jr.gltf",r=>{r.scene.scale.set(1.5,1.5,1.5),r.scene.position.set(0,-2,0),r.scene.rotation.y=0,s.add(r.scene),P()}),s=new F,s.add(d),s.add(n);const C=new O(2,2,1,1),_=new I({transparent:!0,uniforms:{uAlpha:{value:1}},vertexShader:`

    void main(){
        gl_Position = vec4(position, 1.0);
        
    }`,fragmentShader:`
    uniform float uAlpha;

    void main(){
        gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
    }`}),D=new L(C,_);s.add(D),o.encoding=R,s.background=o,s.environment=o,t=new U({canvas:m,antialias:!0}),t.setSize(a.width,a.height),t.setPixelRatio(window.devicePixelRatio),t.physicallyCorrectLights=!0,t.outputEncoding=R,t.toneMapping=W,t.toneMappingExposure=3,t.shadowMap.enabled=!0,t.shadowMap.type=$,S()});const S=()=>{if(f.update(),g&&x.visible)for(const e of h){const i=e.position.clone();i.project(n),y.setFromCamera(i,n);const l=y.intersectObjects(s.children,!0);if(l.length===0)e.element.classList.add("visible");else{const M=l[0].distance,o=e.position.distanceTo(n.position);M<o?e.element.classList.remove("visible"):e.element.classList.add("visible")}const c=i.x*a.width*.5,v=-i.y*a.height*.5;e.element.style.transform=`translateX(${c}px) translateY(${v}px)`}t.render(s,n),window.requestAnimationFrame(S)};return window.addEventListener("resize",()=>{a.width=window.innerWidth,a.height=window.innerHeight,n.aspect=a.width/a.height,n.updateProjectionMatrix(),t.setSize(a.width,a.height),t.setPixelRatio(Math.min(window.devicePixelRatio,2))}),(e,i)=>ee}};var oe=N(te,[["__scopeId","data-v-887fdd14"]]);export{oe as default};
