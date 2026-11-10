'use strict';

// A real, locally rendered torus-knot mesh. No models, trackers, CDNs, or dependencies.
(() => {
  const canvas = document.querySelector('#sculpture');
  const fallback = document.querySelector('#sculpture-fallback');
  const button = document.querySelector('#motion-toggle');
  const stage = document.querySelector('#hero-art');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let gl;
  try { gl = canvas.getContext('webgl', {alpha:true, antialias:true, premultipliedAlpha:false}); } catch { gl = null; }
  if (!gl) {
    canvas.hidden = true;
    button.hidden = true;
    document.querySelector('#art-instruction').textContent = 'A CONNECTED WAY OF THINKING';
    return;
  }
  const vertexSource = `
    attribute vec3 position;
    attribute vec3 normal;
    uniform float yaw;
    uniform float pitch;
    uniform float aspect;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main(){
      float cy=cos(yaw), sy=sin(yaw), cx=cos(pitch), sx=sin(pitch);
      mat3 ry=mat3(cy,0.,-sy,0.,1.,0.,sy,0.,cy);
      mat3 rx=mat3(1.,0.,0.,0.,cx,sx,0.,-sx,cx);
      mat3 rotation=rx*ry;
      vec3 p=rotation*position;
      p.y+=.12;
      vNormal=rotation*normal;
      vPosition=p;
      p.z-=5.6;
      float f=2.34;
      gl_Position=vec4(p.x*f/aspect,p.y*f,-1.002002*p.z-.2002002,-p.z);
    }
  `;
  const fragmentSource = `
    precision mediump float;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main(){
      vec3 n=normalize(vNormal);
      vec3 key=normalize(vec3(-3.,4.,5.));
      vec3 fill=normalize(vec3(4.,1.,2.));
      vec3 back=normalize(vec3(0.,3.,-4.));
      vec3 eye=normalize(vec3(0.,0.,5.6)-vPosition);
      float diffuse=max(dot(n,key),0.);
      float secondary=max(dot(n,fill),0.);
      float edge=max(dot(n,back),0.);
      float specular=pow(max(dot(n,normalize(key+eye)),0.),55.);
      float broad=pow(max(dot(n,normalize(fill+eye)),0.),18.);
      vec3 clay=vec3(.84,.205,.075);
      vec3 color=clay*(.33+diffuse*.77+secondary*.18);
      color+=vec3(1.,.78,.53)*specular*.63;
      color+=vec3(.97,.52,.28)*broad*.17;
      color+=vec3(.52,.19,.06)*edge*.32;
      gl_FragColor=vec4(color,1.);
    }
  `;
  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Sculpture shader unavailable');
    return shader;
  }
  let program;
  try {
    program = gl.createProgram();
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Sculpture rendering unavailable');
  } catch {
    canvas.hidden = true;
    button.hidden = true;
    document.querySelector('#art-instruction').textContent = 'A CONNECTED WAY OF THINKING';
    return;
  }
  gl.useProgram(program);
  const normalize = v => { const l = Math.hypot(...v); return v.map(x => x / l); };
  const cross = (a,b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
  const center = t => { const r=1.13+.38*Math.cos(3*t); return [r*Math.cos(2*t),r*Math.sin(2*t),.55*Math.sin(3*t)]; };
  const vertices = [], normals = [], indices = [];
  const segments = 256, sides = 32, radius = .245;
  for (let i=0;i<=segments;i++) {
    const t=i/segments*Math.PI*2;
    const c=center(t), before=center(t-.001), after=center(t+.001);
    const tangent=normalize(after.map((v,j)=>v-before[j]));
    const n=normalize(cross(tangent,[0,0,1]));
    const b=normalize(cross(tangent,n));
    for (let j=0;j<=sides;j++) {
      const angle=j/sides*Math.PI*2;
      const normal=n.map((v,k)=>v*Math.cos(angle)+b[k]*Math.sin(angle));
      vertices.push(...c.map((v,k)=>v+radius*normal[k]));
      normals.push(...normal);
    }
  }
  for(let i=0;i<segments;i++)for(let j=0;j<sides;j++){
    const a=i*(sides+1)+j,b=a+sides+1;
    indices.push(a,b,a+1,b,b+1,a+1);
  }
  function attribute(name, data) {
    gl.bindBuffer(gl.ARRAY_BUFFER,gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(data),gl.STATIC_DRAW);
    const location=gl.getAttribLocation(program,name);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location,3,gl.FLOAT,false,0,0);
  }
  attribute('position',vertices);
  attribute('normal',normals);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices),gl.STATIC_DRAW);
  gl.enable(gl.DEPTH_TEST);
  gl.clearColor(0,0,0,0);
  const uniforms={yaw:gl.getUniformLocation(program,'yaw'),pitch:gl.getUniformLocation(program,'pitch'),aspect:gl.getUniformLocation(program,'aspect')};
  let yaw=-.42,pitch=.4,paused=window.portfolioMotion?.paused ?? reducedMotion.matches,dragging=false,lastX=0,lastY=0,frame=0,lastTime=0,visible=true,contextLost=false;
  function resize() {
    const rect=stage.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,2);
    const width=Math.round(rect.width*dpr),height=Math.round(rect.height*dpr);
    if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;gl.viewport(0,0,width,height);}
  }
  function draw() {
    if(contextLost)return;
    resize();
    gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.uniform1f(uniforms.yaw,yaw);
    gl.uniform1f(uniforms.pitch,pitch);
    gl.uniform1f(uniforms.aspect,canvas.width/canvas.height);
    gl.drawElements(gl.TRIANGLES,indices.length,gl.UNSIGNED_SHORT,0);
  }
  function animate(time) {
    frame=0;
    if(!visible||document.hidden||contextLost)return;
    if(lastTime&&!paused&&!dragging)yaw+=Math.min(time-lastTime,40)*.00017;
    lastTime=time;
    draw();
    if(!paused)frame=requestAnimationFrame(animate);
  }
  function start(){if(!frame&&visible&&!document.hidden&&!contextLost){lastTime=0;frame=requestAnimationFrame(animate);}}
  function updateButton(){
    button.setAttribute('aria-pressed',String(paused));
    button.title=paused?'Play animation':'Pause animation';
    button.querySelector('.motion-label').textContent=paused?'Play motion':'Pause motion';
    button.querySelector('.pause-icon').textContent=paused?'▷':'Ⅱ';
    document.documentElement.classList.toggle('motion-paused',paused);
  }
  if(window.portfolioMotion) {
    window.portfolioMotion.subscribe(value=>{paused=value;start();});
  } else {
    button.addEventListener('click',()=>{paused=!paused;updateButton();start();});
    reducedMotion.addEventListener('change',event=>{paused=event.matches;updateButton();start();});
  }
  canvas.addEventListener('pointerdown',event=>{
    if(event.button!==0)return;
    dragging=true;lastX=event.clientX;lastY=event.clientY;
    canvas.setPointerCapture(event.pointerId);
  });
  canvas.addEventListener('pointermove',event=>{
    if(!dragging)return;
    yaw+=(event.clientX-lastX)*.009;
    if(event.pointerType!=='touch')pitch=Math.max(-1.35,Math.min(1.35,pitch+(event.clientY-lastY)*.007));
    lastX=event.clientX;lastY=event.clientY;draw();
  });
  function stopDrag(){dragging=false;}
  canvas.addEventListener('pointerup',stopDrag);
  canvas.addEventListener('pointercancel',stopDrag);
  canvas.addEventListener('lostpointercapture',stopDrag);
  canvas.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;
    event.preventDefault();
    if(event.key==='ArrowLeft')yaw-=.15;
    if(event.key==='ArrowRight')yaw+=.15;
    if(event.key==='ArrowUp')pitch-=.15;
    if(event.key==='ArrowDown')pitch+=.15;
    draw();
  });
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)start();});
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{
    visible=entries[0].isIntersecting;
    if(visible)start();
    else if(frame){cancelAnimationFrame(frame);frame=0;}
  },{threshold:.01}).observe(stage);
  if('ResizeObserver'in window)new ResizeObserver(()=>{draw();}).observe(stage);
  else window.addEventListener('resize',draw);
  canvas.addEventListener('webglcontextlost',event=>{
    event.preventDefault();contextLost=true;cancelAnimationFrame(frame);frame=0;
    fallback.hidden=false;canvas.hidden=true;button.hidden=true;
    document.querySelector('#art-instruction').textContent='A CONNECTED WAY OF THINKING';
  });
  fallback.hidden=true;
  if(!window.portfolioMotion)updateButton();
  draw();
  start();
})();
