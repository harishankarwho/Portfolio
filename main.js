(function(){
  'use strict';
  var $=function(s,c){return (c||document).querySelector(s)},$$=function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s))};
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  $('#year').textContent=new Date().getFullYear();

  /* active nav link follows scroll position */
  var links=$$('.pill-nav a, .bottom-nav a:not(.fab)');
  var secs=$$('main section[id]');
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return;
      links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id)});
    });
  },{rootMargin:'-45% 0px -50% 0px'});
  secs.forEach(function(s){io.observe(s)});

  /* hero counter */
  var c=$('#counter'),t=+c.dataset.target;
  if(reduce){c.textContent=t}else{
    var start=null;
    (function step(ts){start=start||ts;var p=Math.min((ts-start-600)/1200,1);
      c.textContent=Math.max(0,Math.round(t*p));if(p<1)requestAnimationFrame(step)})(performance.now());
  }

  /* projects carousel: buttons, dots, swipe/drag, arrow keys */
  var car=$('#carousel'),track=$('.track',car),n=$$('.slide',car).length,dots=$('#dots'),i=0,sx=null,dx=0;
  for(var k=0;k<n;k++){var b=document.createElement('button');b.setAttribute('aria-label','Go to project '+(k+1));(function(j){b.onclick=function(){go(j)}})(k);dots.appendChild(b)}
  function go(x){i=(x+n)%n;track.style.transform='translateX(-'+i*100+'%)';$$('button',dots).forEach(function(d,j){d.classList.toggle('on',j===i)})}
  $('#prev').onclick=function(){go(i-1)};$('#next').onclick=function(){go(i+1)};
  car.addEventListener('keydown',function(e){if(e.key==='ArrowLeft')go(i-1);if(e.key==='ArrowRight')go(i+1)});
  var vp=$('.viewport',car);
  vp.addEventListener('pointerdown',function(e){sx=e.clientX;dx=0});
  vp.addEventListener('pointermove',function(e){if(sx!==null)dx=e.clientX-sx});
  ['pointerup','pointerleave','pointercancel'].forEach(function(ev){vp.addEventListener(ev,function(){
    if(sx!==null&&Math.abs(dx)>50)go(i+(dx<0?1:-1));sx=null})});
  go(0);

  /* custom cursor */
  var cur=$('.cursor');
  if(cur&&window.matchMedia('(hover:hover) and (pointer:fine)').matches){
    document.addEventListener('mousemove',function(e){cur.style.transform='translate('+e.clientX+'px,'+e.clientY+'px)'});
    document.addEventListener('mouseover',function(e){cur.classList.toggle('big',!!e.target.closest('a,button,.viewport'))});
  }
})();
