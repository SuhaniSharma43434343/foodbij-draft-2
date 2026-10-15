import Image from "next/image";
import "./intro-loader.css";

/**
 * First-visit intro (W10.1). A navy panel: a copper hairline, slanted like the "/" in FOODB/Z, sweeps across
 * and reveals the white logo, a thin copper line fills with real loading
 * progress (DOM, web fonts, the page's priority photo), then the panel lifts away while the opening headline
 * rises. Shown on the first page view of a visit only (sessionStorage); later pages use the PageCurtain.
 *
 * How it stays safe:
 * - Server-rendered hidden. The inline script right after it (runs during HTML parsing, before anything
 *   below it paints, independent of React hydration) decides whether to show it and drives it with plain
 *   timers. No JS, a script error, no sessionStorage or prefers-reduced-motion: no intro, content as usual.
 * - Minimum ~1.1s from the logo sweep, hard cap 2.5s from navigation start, then a 650ms lift. A CSS
 *   failsafe animation lifts it at 3.4s even if the timers never fire.
 * - position: fixed, transforms/opacity only: no layout shift. The photo request is not delayed (it is
 *   preloaded in <head>); the panel only covers it. aria-hidden; any key press (Tab to the skip link) lifts
 *   it at once, so focus is never trapped behind it.
 * - While it is up, the hero's first-paint animations (.hero-line-inner, .hero-fade, .hero-rule, .op-slash,
 *   .hero-zoom) are paused (CSS in intro-loader.css) so they play as the panel lifts.
 */
const KEY = "fbz-intro-seen";

// Plain ES5-ish so it can run before any bundle. Keep it small.
const SCRIPT = `(function(){var el=document.getElementById("intro");if(!el)return;try{
var ss=window.sessionStorage;if(ss.getItem("${KEY}"))return;ss.setItem("${KEY}","1");
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
var now=function(){return performance.now()};var MIN=1100,CAP=2500,LIFT=650,lifted=false,sweep=0,done=0,TOTAL=3;
el.setAttribute("data-state","on");
var setP=function(p){el.style.setProperty("--il-p",String(p))};setP(0.06);
var finish=function(){el.setAttribute("data-state","done");el.removeAttribute("style")};
var lift=function(){if(lifted)return;lifted=true;clearInterval(iv);setP(1);el.setAttribute("data-state","lift");setTimeout(finish,LIFT+60);
removeEventListener("keydown",onKey,true)};
var onKey=function(){lift()};addEventListener("keydown",onKey,true);
var maybe=function(){if(lifted||done<TOTAL||!sweep)return;var wait=Math.max(0,sweep+MIN-now());setTimeout(function(){setP(1);setTimeout(lift,300)},Math.max(0,wait-300))};
var real=0.06,shown=0;var pace=function(){var t=sweep?Math.min(1,(now()-sweep)/MIN):0;var p=Math.max(shown,Math.min(real,0.06+0.94*t));if(p!==shown){shown=p;setP(p)}};
var iv=setInterval(function(){if(lifted)clearInterval(iv);else pace()},120);
var tick=function(){done++;real=0.06+0.94*done/TOTAL;pace();maybe()};
var once=function(f){var c=false;return function(){if(!c){c=true;f()}}};
var run=function(){if(sweep)return;sweep=now();el.setAttribute("data-run","");maybe()};
var logo=el.querySelector("img");if(logo&&!logo.complete){logo.addEventListener("load",run);logo.addEventListener("error",run);setTimeout(run,500)}else run();
setTimeout(lift,Math.max(0,CAP-now()));
if(document.fonts&&document.fonts.ready){document.fonts.ready.then(once(tick),once(tick))}else tick();
var onDom=function(){tick();var img=document.querySelector('main img[fetchpriority="high"]');if(!img){tick();return}
var t=once(tick);var dec=function(){img.decode?img.decode().then(t,t):t()};
if(img.complete)dec();else{img.addEventListener("load",dec);img.addEventListener("error",t)}};
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",onDom);else onDom();
}catch(e){el.removeAttribute("data-state")}})();`;

export function IntroLoader() {
  return (
    <>
      <div id="intro" className="il" aria-hidden="true" suppressHydrationWarning>
        <div className="il-inner">
          <div className="il-mark">
            <Image
              src="/logos/foodbiz-2026-white-1200w.png"
              alt=""
              width={1200}
              height={274}
              loading="eager"
              sizes="(min-width: 1024px) 220px, 170px"
              className="il-logo"
            />
            <span className="il-sweep" />
          </div>
          <span className="il-track">
            <span className="il-bar" />
          </span>
        </div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: SCRIPT }} />
    </>
  );
}
