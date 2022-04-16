import{G as F,S as T,P as R,W as B,O as k,B as G,C as _,a as p,b as W,A as j,c as E,d as O}from"./dat.gui.module.252fd804.js";import{_ as q,q as I,s as H,o as L,c as U}from"./index.09a7f49c.js";const D={class:"webgl"},X={setup(Y){const e={};e.count=2e5,e.size=.005,e.radius=5,e.branches=3,e.spin=1,e.randomness=.5,e.randomnessPower=3,e.insideColor="#ff6030",e.outsideColor="#1b3984";let r=null,h=null,u=null,P,c,n,v,i,C;const s=new F({width:360});I(()=>{s.destroy()}),H(()=>{P=document.querySelector("canvas.webgl"),c=new T;const o={width:window.innerWidth,height:window.innerHeight};window.addEventListener("resize",()=>{o.width=window.innerWidth,o.height=window.innerHeight,n.aspect=o.width/o.height,n.updateProjectionMatrix(),i.setSize(o.width,o.height),i.setPixelRatio(Math.min(window.devicePixelRatio,2))}),n=new R(75,o.width/o.height,.1,100),n.position.x=3,n.position.y=3,n.position.z=3,c.add(n),i=new B({canvas:P}),i.setSize(o.width,o.height),i.setPixelRatio(Math.min(window.devicePixelRatio,2)),a(),v=new k(n,i.domElement),v.enableDamping=!0,C=new O,f()});const a=()=>{u!==null&&(r.dispose(),h.dispose(),c.remove(u)),r=new G;const o=new Float32Array(e.count*3),d=new Float32Array(e.count*3),b=new Float32Array(e.count*1),g=new Float32Array(e.count*3),M=new _(e.insideColor),z=new _(e.outsideColor);for(let m=0;m<e.count;m++){const t=m*3,l=Math.random()*e.radius,x=m%e.branches/e.branches*Math.PI*2;o[t]=Math.cos(x)*l,o[t+1]=0,o[t+2]=Math.sin(x)*l;const S=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1)*e.randomness*l,y=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1)*e.randomness*l,A=Math.pow(Math.random(),e.randomnessPower)*(Math.random()<.5?1:-1)*e.randomness*l;g[t]=S,g[t+1]=y,g[t+2]=A;const w=M.clone();w.lerp(z,l/e.radius),d[t]=w.r,d[t+1]=w.g,d[t+2]=w.b,b[m]=Math.random()}r.setAttribute("position",new p(o,3)),r.setAttribute("color",new p(d,3)),r.setAttribute("aScale",new p(d,1)),r.setAttribute("aRandomness",new p(g,3)),h=new W({depthWrite:!1,blending:j,vertexColors:!0,uniforms:{uSize:{value:30*i.getPixelRatio()},uTime:{value:0}},vertexShader:`uniform float uSize;
uniform float uTime;

attribute float aScale;
attribute vec3 aRandomness;
varying vec3 vColor;
void main() {
                /* Position */
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Spin
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += angleOffset;
    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    modelPosition.x += aRandomness.x;
    modelPosition.y += aRandomness.y;
    modelPosition.z += aRandomness.z;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z);

    vColor = color;
}`,fragmentShader:`varying vec3 vColor;

void main() {

    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength = 1.0 - step(0.5, strength);

    // float strength = distance(gl_PointCoord, vec2(0.5));
    // strength *= 2.0;
    // strength = 1.0 - strength;

    float strength = distance(gl_PointCoord, vec2(0.5));
    strength = 1.0 - strength;
    strength = pow(strength, 10.0);

    vec3 color = mix(vec3(0.0), vColor, strength);

    gl_FragColor = vec4(color, 1.0);
}`}),u=new E(r,h),c.add(u)};s.add(e,"count").min(100).max(1e6).step(100).onFinishChange(a),s.add(e,"radius").min(.01).max(20).step(.01).onFinishChange(a),s.add(e,"branches").min(2).max(20).step(1).onFinishChange(a),s.add(e,"randomness").min(0).max(2).step(.001).onFinishChange(a),s.add(e,"randomnessPower").min(1).max(10).step(.001).onFinishChange(a),s.addColor(e,"insideColor").onFinishChange(a),s.addColor(e,"outsideColor").onFinishChange(a);const f=()=>{const o=C.getElapsedTime();h.uniforms.uTime.value=o,v.update(),i.render(c,n),window.requestAnimationFrame(f)};return(o,d)=>(L(),U("canvas",D))}};var J=q(X,[["__scopeId","data-v-33ff20b7"]]);export{J as default};
