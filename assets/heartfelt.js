/* ============================================================
   HEARTFELT — shared interactions (no IntersectionObserver;
   reveal via scroll + getBoundingClientRect so it works even
   where IO is unavailable). Content is never hidden by opacity.
   ============================================================ */
(function(){
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn){
    if(document.readyState !== 'loading') fn();
    else document.addEventListener('DOMContentLoaded', fn);
  }

  ready(function(){
    /* ---- sticky header ---- */
    var head = document.querySelector('.site-head');
    function onScroll(){ if(head) head.classList.toggle('scrolled', window.scrollY > 24); }
    window.addEventListener('scroll', onScroll, {passive:true});
    onScroll();

    /* ---- mobile nav ---- */
    var toggle = document.querySelector('.nav-toggle');
    var mnav = document.querySelector('.mobile-nav');
    if(toggle && mnav){
      toggle.addEventListener('click', function(){
        var open = mnav.classList.toggle('open');
        toggle.classList.toggle('open', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
      mnav.querySelectorAll('a').forEach(function(a){
        a.addEventListener('click', function(){
          mnav.classList.remove('open'); toggle.classList.remove('open');
          document.body.style.overflow='';
        });
      });
    }

    /* ---- reveal on scroll (robust) ---- */
    function inView(el){
      var r = el.getBoundingClientRect();
      var vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.92 && r.bottom > 0;
    }
    function sweep(){
      var els = document.querySelectorAll('.reveal:not(.in)');
      for(var i=0;i<els.length;i++){ if(reduce || inView(els[i])) els[i].classList.add('in'); }
    }
    window.HF = window.HF || {};
    window.HF.sweep = sweep;
    sweep();
    var ticking = false;
    window.addEventListener('scroll', function(){
      if(ticking) return; ticking = true;
      requestAnimationFrame(function(){ sweep(); ticking = false; });
    }, {passive:true});
    window.addEventListener('resize', sweep);
    window.addEventListener('load', sweep);
    // safety re-sweeps in case layout/fonts shift
    setTimeout(sweep, 250); setTimeout(sweep, 1200);

    /* ---- year ---- */
    document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

    /* ---- subtle parallax ---- */
    if(!reduce){
      var pars = [].slice.call(document.querySelectorAll('[data-par]'));
      if(pars.length){
        var pt = false;
        var run = function(){
          var vh = window.innerHeight;
          pars.forEach(function(p){
            var r = p.getBoundingClientRect();
            var prog = (r.top + r.height/2 - vh/2) / vh;
            var amt = parseFloat(p.getAttribute('data-par')) || 18;
            p.style.transform = 'translateY('+(prog*amt*-1).toFixed(1)+'px)';
          });
          pt = false;
        };
        window.addEventListener('scroll', function(){ if(pt) return; pt = true; requestAnimationFrame(run); }, {passive:true});
        run();
      }
    }

    /* ---- active nav link ---- */
    var path = (location.pathname.split('/').pop() || 'index.html');
    document.querySelectorAll('.nav a, .mobile-nav a').forEach(function(a){
      if(a.getAttribute('href') === path) a.classList.add('active');
    });
  });
})();
