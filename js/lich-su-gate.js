(function(){
  var root=document.getElementById('lich-su'); if(!root) return;
  var track=document.getElementById('lsxTrack'),trail=document.getElementById('lsxTrail'),
      handle=document.getElementById('lsxHandle'),rev=document.getElementById('lsxReveal'),
      inn=document.getElementById('lsxIn'),edge=document.getElementById('lsxEdge'),hint=document.getElementById('lsxHint');
  if(!track||!handle||!rev) return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var p=0,startX=0,startP=0,anim=0,wasOpen=false,HINT0=hint.textContent;
  function mx(){return Math.max(1,track.clientWidth-handle.offsetWidth-16);}
  function render(){
    var x=8+p*mx();
    handle.style.transform='translate('+x+'px,-50%) rotate('+(p*360).toFixed(1)+'deg)';
    trail.style.width=(x+handle.offsetWidth/2)+'px';
    handle.setAttribute('aria-valuenow',Math.round(p*100));
    if(p>=1){rev.style.height='auto';rev.style.overflow='visible';}
    else{rev.style.overflow='hidden';rev.style.height=(inn.offsetHeight*p)+'px';}
    edge.style.opacity=(p>0&&p<1)?1:0;
    root.classList.toggle('lsx-open',p>=1);
    if(p>.3&&!root.classList.contains('lsx-seen')){root.classList.add('lsx-seen');window.dispatchEvent(new Event('scroll'));}
    hint.textContent=p>=1?'Hành trình đã mở – cuộn xuống để theo dấu logo':(p>0?'Tiếp tục kéo…':HINT0);
    if((p>=1)!==wasOpen){wasOpen=p>=1;window.dispatchEvent(new Event('resize'));}
  }
  function settle(to){
    cancelAnimationFrame(anim);
    if(reduce){p=to;render();return;}
    var from=p,t0=null;
    (function step(t){t0=t0||t;var k=Math.min(1,(t-t0)/650),e=1-Math.pow(1-k,3);
      p=from+(to-from)*e;render();if(k<1)anim=requestAnimationFrame(step);})(performance.now());
  }
  handle.addEventListener('pointerdown',function(e){
    cancelAnimationFrame(anim);startX=e.clientX;startP=p;handle.setPointerCapture(e.pointerId);
    handle.classList.add('grab');e.preventDefault();
  });
  handle.addEventListener('pointermove',function(e){
    if(!handle.classList.contains('grab')) return;
    p=Math.max(0,Math.min(1,startP+(e.clientX-startX)/mx()));render();
  });
  function up(){ if(!handle.classList.contains('grab')) return; handle.classList.remove('grab'); settle(p>=.55?1:0); }
  handle.addEventListener('pointerup',up);handle.addEventListener('pointercancel',up);
  handle.addEventListener('keydown',function(e){
    var k=e.key,d={ArrowRight:.1,ArrowUp:.1,ArrowLeft:-.1,ArrowDown:-.1}[k];
    if(d!==undefined){e.preventDefault();settle(Math.max(0,Math.min(1,p+d)));}
    else if(k==='Enter'||k===' '){e.preventDefault();settle(p>=1?0:1);}
    else if(k==='End'){e.preventDefault();settle(1);} else if(k==='Home'){e.preventDefault();settle(0);}
  });
  track.addEventListener('click',function(e){ if(!e.target.closest('.lsx-handle')) settle(1); });
  window.addEventListener('resize',render);
  if(window.ResizeObserver) new ResizeObserver(function(){ if(p>0&&p<1) render(); }).observe(inn);
  /* mỗi lần mở lại trang Lịch sử: đóng lại, chỉ còn logo vô cực */
  var was=root.classList.contains('intro-active');
  new MutationObserver(function(){
    var now=root.classList.contains('intro-active'); if(now===was) return; was=now;
    cancelAnimationFrame(anim);p=0;root.classList.remove('lsx-seen');root.dispatchEvent(new Event('lsx:reset'));render();
  }).observe(root,{attributes:true,attributeFilter:['class']});
  render();
})();
