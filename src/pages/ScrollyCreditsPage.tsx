import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const ScrollyCreditsPage = () => {
  const autoScrollBtnRef = useRef<HTMLButtonElement>(null);
  const isAutoScrollingRef = useRef(false);
  const autoScrollAnimationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    // Initialize all GSAP animations after component mounts
    initializeAnimations();

    return () => {
      // Cleanup ScrollTrigger instances
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const initializeAnimations = () => {
    // Scene 0: Opening
    const tl0 = gsap.timeline({
      scrollTrigger: { trigger: "#scene0", start: "top top", end: "+=500%", scrub: 1, pin: true },
    });
    tl0
      .from("#text1", { opacity: 0, duration: 1 })
      .to("#text1", { opacity: 0, duration: 1 }, "+=1")
      .from("#text2", { opacity: 0, duration: 1 }, "-=1")
      .to("#text2", { opacity: 0, duration: 1 }, "+=1")
      .from("#text3", { opacity: 0, duration: 1 })
      .to("#text3", { opacity: 0, duration: 1 }, "+=1")
      .from("#text4", { opacity: 0, duration: 1 }, "-=1")
      .to(".scene-background", { opacity: 1, duration: 3 }, "+=0.5")
      .to("#scene0", { background: "linear-gradient(to bottom, #000 0%, rgba(10, 16, 31, 0.5) 100%)", duration: 2 }, "-=2")
      .to("#text4", { opacity: 0, duration: 2 }, "-=1.5");

    // Scene 1: NVIDIA
    const tl1 = gsap.timeline({ scrollTrigger: { trigger: "#scene1", start: "top top", end: "+=700%", scrub: 1, pin: true } });
    tl1
      .from(["#s1-title", "#s1-quote"], { opacity: 0, x: -100, stagger: 0.3 })
      .from("#s1-chart", { opacity: 0, x: 100 }, "-=0.5")
      .to("#nvidia-bar", { height: "90%", duration: 2 })
      .to(["#amd-bar", "#intel-bar"], { height: (i: number) => (i === 0 ? "7%" : "3%"), duration: 2 }, "-=2")
      .to("#s1-highlight", { opacity: 1, duration: 1 })
      .from("#s1-conclusion", { opacity: 0, y: 30 })
      .to("#scene1", { opacity: 0, duration: 2 }, "+=0.5");

    // Scene 2: Microsoft + OpenAI
    const tl2 = gsap.timeline({ scrollTrigger: { trigger: "#scene2", start: "top top", end: "+=1100%", scrub: 1, pin: true } });
    tl2
      .set("#scene2", { opacity: 1 })
      .from(["#s2-title", "#s2-quote"], { opacity: 0, x: -100, stagger: 0.3 })
      .from(["#msft-logo", "#oai-logo"], { opacity: 0, scale: 0.5, stagger: 0.5 })
      .to("#line1", { strokeDashoffset: 0, duration: 2 })
      .to("#line-label-1", { opacity: 1, scale: 1, duration: 1 }, "-=1")
      .to("#line2", { strokeDashoffset: 0, duration: 2 })
      .to("#line-label-2", { opacity: 1, scale: 1, duration: 1 }, "-=1")
      .from("#azure-logo", { opacity: 0, scale: 0.5 })
      .to("#line3", { strokeDashoffset: 0, duration: 2 })
      .to("#line-label-3", { opacity: 1, scale: 1, duration: 1 }, "-=1")
      .from("#s2-conclusion", { opacity: 0, scale: 1.2 })
      .to("#modal-backdrop", { opacity: 1, duration: 1, pointerEvents: "auto" as const }, "+=0.5")
      .to("#summary-s2", { opacity: 1, duration: 1, pointerEvents: "auto" as const }, "-=0.5")
      .to("#summary-s2", { opacity: 1, duration: 2 })
      .to(["#summary-s2", "#modal-backdrop", "#scene2"], { opacity: 0, duration: 2 }, "+=0.5");

    // Scene 3: Export
    const tl3 = gsap.timeline({ scrollTrigger: { trigger: "#scene3", start: "top top", end: "+=1600%", scrub: 1, pin: true } });
    tl3
      .set("#scene3", { opacity: 1 })
      .from(["#s3-title", "#s3-quote"], { opacity: 0, stagger: 0.3, duration: 1 })
      .to(".plexus-map", { opacity: 0.3, duration: 1 })
      .to([".map-point", ".map-label"], { opacity: 1, scale: 1, stagger: 0.15, duration: 0.8 })
      .to("#p-usa", { scale: 1.6, repeat: 3, yoyo: true, ease: "power1.inOut", duration: 0.4 })
      .add("export_phase")
      .to("#api-indicator", { opacity: 1, scale: 1, duration: 1 }, "export_phase")
      .to("#flow-eu", { opacity: 1, duration: 0.5 }, "export_phase+=0.5")
      .to("#flow-eu", { strokeDashoffset: -100, duration: 2, ease: "none" })
      .to("#flow-asia", { opacity: 1, duration: 0.5 })
      .to("#flow-asia", { strokeDashoffset: -100, duration: 2, ease: "none" })
      .to("#flow-vn", { opacity: 1, duration: 0.5 })
      .to("#flow-vn", { strokeDashoffset: -100, duration: 2, ease: "none" })
      .add("profit_phase", "+=0.5")
      .to("#profit-indicator", { opacity: 1, scale: 1, duration: 1 }, "profit_phase")
      .to("#flow-back-eu", { opacity: 1, duration: 0.5 })
      .to("#flow-back-eu", { strokeDashoffset: -100, duration: 2, ease: "none" })
      .to("#flow-back-asia", { opacity: 1, duration: 0.5 })
      .to("#flow-back-asia", { strokeDashoffset: -100, duration: 2, ease: "none" })
      .to("#flow-back-vn", { opacity: 1, duration: 0.5 })
      .to("#flow-back-vn", { strokeDashoffset: -100, duration: 2, ease: "none" })
      .from("#s3-conclusion", { opacity: 0, y: 50, duration: 2 })
      .to("#modal-backdrop", { opacity: 1, duration: 1, pointerEvents: "auto" as const }, "+=0.5")
      .to("#summary-s3", { opacity: 1, duration: 1, pointerEvents: "auto" as const }, "-=0.5")
      .to("#summary-s3", { opacity: 1, duration: 2 })
      .to(["#summary-s3", "#modal-backdrop", "#scene3"], { opacity: 0, duration: 2 }, "+=0.5");

    // Scene 4: Impact
    const tl4 = gsap.timeline({ scrollTrigger: { trigger: "#scene4", start: "top top", end: "+=800%", scrub: 1, pin: true } });
    tl4
      .set("#scene4", { opacity: 1 })
      .from("#s4-title", { opacity: 0, scale: 1.5, filter: "blur(10px)", duration: 1 })
      .from(".impact-card", { opacity: 0, y: 100, stagger: 0.3, duration: 1 })
      .add(() => document.getElementById("card-startup")?.classList.add("flipped"))
      .to({}, { duration: 1 })
      .add(() => document.getElementById("card-worker")?.classList.add("flipped"))
      .to({}, { duration: 1 })
      .add(() => document.getElementById("card-nation")?.classList.add("flipped"))
      .to({}, { duration: 1 });

    // Scene 5: Conclusion
    const tl5 = gsap.timeline({ scrollTrigger: { trigger: "#scene5", start: "top top", end: "+=1000%", scrub: 1, pin: true } });
    const threatCards = document.querySelectorAll(".threats .item-card");
    const oppCards = document.querySelectorAll(".opportunities .item-card");

    tl5
      .from("#s5-title", { opacity: 0, y: -30, duration: 1 })
      .from(".threats h2", { opacity: 0, x: -100, duration: 0.5 })
      .from(".opportunities h2", { opacity: 0, x: 100, duration: 0.5 }, "-=0.3")
      .to(threatCards[0], { opacity: 1, x: 0, duration: 0.5 })
      .to(oppCards[0], { opacity: 1, x: 0, duration: 0.5 }, "-=0.3")
      .to(threatCards[1], { opacity: 1, x: 0, duration: 0.5 })
      .to(oppCards[1], { opacity: 1, x: 0, duration: 0.5 }, "-=0.3")
      .to(threatCards[2], { opacity: 1, x: 0, duration: 0.5 })
      .to(oppCards[2], { opacity: 1, x: 0, duration: 0.5 }, "-=0.3")
      .to(threatCards[3], { opacity: 1, x: 0, duration: 0.5 })
      .to(oppCards[3], { opacity: 1, x: 0, duration: 0.5 }, "-=0.3")
      .to(threatCards[4], { opacity: 1, x: 0, duration: 0.5 })
      .to(oppCards[4], { opacity: 1, x: 0, duration: 0.5 }, "-=0.3")
      .from(".action-zone", { opacity: 0, scale: 0.8, duration: 1.5 })
      .to(".action-item", { opacity: 1, stagger: 0.2, duration: 0.5 });

    // Scene 6: Credits
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#credits",
          start: "top 80%",
          end: "bottom bottom",
          toggleActions: "play none none reverse",
        },
      })
      .to(".credits-header", { opacity: 1, y: 0, duration: 1 })
      .to(".course-info", { opacity: 1, scale: 1, duration: 1 }, "-=0.5");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".team-section",
          start: "top 70%",
          end: "bottom 80%",
          toggleActions: "play none none reverse",
        },
      })
      .to(".team-section h2", { opacity: 1, y: 0, duration: 0.8 })
      .to(".member-card", {
        opacity: 1,
        y: 0,
        stagger: 0.3,
        duration: 0.8,
        ease: "power2.out",
      });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".thanks-section",
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      })
      .to(".thanks-section", { opacity: 1, scale: 1, duration: 1.2 });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: ".final-message",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
      .to(".final-message", {
        opacity: 1,
        scale: 1.05,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
  };

  const AUTO_SCROLL_DURATION = 90; // Duration in seconds for auto-scroll

  const handleAutoScroll = () => {
    isAutoScrollingRef.current = !isAutoScrollingRef.current;
    if (isAutoScrollingRef.current && autoScrollBtnRef.current) {
      autoScrollBtnRef.current.textContent = "⏹️ Stop";
      autoScrollAnimationRef.current = gsap.to(window, {
        scrollTo: { y: document.body.scrollHeight, autoKill: false },
        duration: AUTO_SCROLL_DURATION,
        ease: "none",
        onComplete: () => {
          isAutoScrollingRef.current = false;
          if (autoScrollBtnRef.current) {
            autoScrollBtnRef.current.textContent = "▶️ Auto Scroll";
          }
        },
      });
    } else {
      if (autoScrollBtnRef.current) {
        autoScrollBtnRef.current.textContent = "▶️ Auto Scroll";
      }
      if (autoScrollAnimationRef.current) autoScrollAnimationRef.current.kill();
    }
  };

  return (
    <div className="scrolly-credits-container" style={{ fontFamily: "Inter, sans-serif", backgroundColor: "#000", color: "#FFFFFF", overflowX: "hidden" }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
          
          :root {
            --bg-color: #0A101F;
            --text-color: #FFFFFF;
            --cyan-glow: #00E5FF;
            --yellow-warn: #FFD700;
            --money-green: #4CAF50;
            --red-danger: #FF4444;
          }
          
          * { margin: 0; padding: 0; box-sizing: border-box; }
          
          .scene {
            min-height: 100vh;
            width: 100%;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            text-align: center;
          }
          
          .scene-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            z-index: -1;
            opacity: 0;
          }
          
          .bg-grid {
            position: absolute;
            width: 100%;
            height: 100%;
            background-image: linear-gradient(rgba(10, 16, 31, 0.98), rgba(10, 16, 31, 0.98)),
                              radial-gradient(var(--cyan-glow) 0.5px, transparent 0.5px),
                              radial-gradient(var(--cyan-glow) 0.5px, var(--bg-color) 0.5px);
            background-size: 100% 100%, 30px 30px, 30px 30px;
            background-position: 0 0, -15px -15px, 0 0;
          }
          
          .scene .title { font-size: 3.5vw; font-weight: 900; margin: 0; }
          .scene .quote { font-size: 1.2vw; max-width: 600px; margin-top: 20px; font-style: italic; opacity: 0.8; }
          .scene .conclusion { font-size: 2.5vw; font-weight: 700; margin-top: 40px; }
          
          .modal-backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            z-index: 99;
            opacity: 0;
            pointer-events: none;
            backdrop-filter: blur(5px);
          }
          
          .summary-popup {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 100;
            background: linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(10, 16, 31, 0.98));
            border: 3px solid var(--cyan-glow);
            border-radius: 25px;
            padding: 50px 60px;
            max-width: 650px;
            box-shadow: 0 0 60px rgba(0, 229, 255, 0.7);
            opacity: 0;
            pointer-events: none;
          }
          
          .summary-popup .icon { font-size: 4vw; margin-bottom: 15px; }
          .summary-popup h3 { color: var(--cyan-glow); font-size: 2.2vw; margin-bottom: 25px; font-weight: 900; text-transform: uppercase; letter-spacing: 2px; }
          .summary-popup ul { list-style: none; text-align: left; font-size: 1.2vw; line-height: 2; }
          .summary-popup ul li { padding-left: 30px; position: relative; margin-bottom: 10px; }
          .summary-popup ul li::before { content: "→"; position: absolute; left: 0; color: var(--cyan-glow); font-weight: bold; }
          
          #scene0 { background-color: #000; position: relative; z-index: 2; }
          #scene0 .text-group { position: absolute; }
          #scene0 .large-text { font-size: 5vw; font-weight: 700; }
          #scene0 .small-text { font-size: 2vw; margin-top: 15px; }
          #scene0 .highlight-ai { color: var(--cyan-glow); text-shadow: 0 0 15px var(--cyan-glow); }
          
          #scene1 { z-index: 1; background-color: transparent; }
          #scene1 .content-wrapper { display: flex; width: 90%; max-width: 1200px; align-items: center; justify-content: space-between; gap: 40px; }
          #scene1 .text-content { width: 45%; text-align: left; }
          #scene1 .chart-container { width: 50%; height: 400px; display: flex; justify-content: space-around; align-items: flex-end; border-left: 2px solid var(--text-color); border-bottom: 2px solid var(--text-color); padding: 10px 0 0 10px; position: relative; }
          .bar { width: 20%; background-color: var(--cyan-glow); position: relative; height: 0; }
          .bar .label { position: absolute; bottom: -30px; width: 100%; text-align: center; font-weight: bold; font-size: 1vw; }
          #nvidia-bar { background-color: var(--cyan-glow); }
          #amd-bar, #intel-bar { background-color: #666; }
          .chart-highlight { position: absolute; top: 10%; right: -220px; width: 200px; color: var(--yellow-warn); font-size: 1.3vw; font-weight: bold; opacity: 0; text-align: left; background: rgba(0,0,0,0.5); padding: 10px; border-radius: 8px; border-left: 3px solid var(--yellow-warn); }
          #scene1 .conclusion { text-align: center; width: 100%; margin-top: 50px; }
          
          #scene2 { background-color: transparent; }
          #scene2 .content-wrapper { position: relative; width: 90%; max-width: 1100px; height: 700px; margin-top: 40px; }
          .logo { min-width: 180px; font-size: 1.6vw; font-weight: bold; border: 3px solid var(--text-color); padding: 25px 20px; border-radius: 12px; position: absolute; background: rgba(10, 16, 31, 0.95); z-index: 10; display: flex; align-items: center; justify-content: center; }
          #msft-logo { left: 0; top: 35%; transform: translateY(-50%); }
          #oai-logo { right: 0; top: 35%; transform: translateY(-50%); }
          #azure-logo { left: 0; bottom: 0%; font-size: 1.2vw; padding: 18px 15px; border-color: #666; min-width: 140px; }
          
          .connection-line { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; }
          .connection-line path { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
          
          .line-label { position: absolute; font-size: 1.2vw; font-weight: bold; opacity: 0; display: flex; align-items: center; gap: 8px; background: rgba(0,0,0,0.8); padding: 10px 18px; border-radius: 20px; z-index: 10; }
          #line-label-1 { color: var(--money-green); top: 16%; left: 50%; transform: translateX(-50%); }
          #line-label-1::before { content: '💰'; font-size: 1.5vw; }
          #line-label-2 { color: var(--cyan-glow); top: 48%; left: 50%; transform: translateX(-50%); }
          #line-label-2::before { content: '🔄'; font-size: 1.5vw; }
          #line-label-3 { color: var(--cyan-glow); bottom: 9%; left: 50%; transform: translateX(-50%); font-size: 1vw; }
          #line-label-3::before { content: '☁️'; font-size: 1.3vw; }
          #scene2 .conclusion { color: var(--yellow-warn); margin-top: 50px; }
          
          #scene3 { background-color: transparent; }
          #scene3 .map-container { position: relative; width: 85vw; height: 55vh; margin: 40px 0; }
          #scene3 .plexus-map { width: 100%; height: 100%; background-image: url('https://raw.githubusercontent.com/subtlepatterns/subtlepatterns/master/dot-grid.png'); background-repeat: repeat; opacity: 0; border: 1px solid rgba(0, 229, 255, 0.2); border-radius: 10px; }
          .map-point { position: absolute; width: 20px; height: 20px; background-color: var(--cyan-glow); border-radius: 50%; transform: translate(-50%, -50%); opacity: 0; box-shadow: 0 0 15px var(--cyan-glow); }
          .map-label { position: absolute; font-size: 0.85vw; font-weight: bold; color: var(--text-color); opacity: 0; white-space: nowrap; background: rgba(0,0,0,0.8); padding: 5px 10px; border-radius: 5px; }
          
          #p-usa { top: 40%; left: 20%; }
          #label-usa { top: 36%; left: 20%; transform: translate(-50%, -100%); margin-top: -28px; }
          #p-eu { top: 28%; left: 48%; }
          #label-eu { top: 24%; left: 48%; transform: translate(-50%, -100%); margin-top: -12px; }
          #p-asia { top: 45%; left: 75%; }
          #label-asia { top: 41%; left: 75%; transform: translate(-50%, -100%); margin-top: -12px; }
          #p-vn { top: 68%; left: 82%; }
          #label-vn { top: 64%; left: 82%; transform: translate(-50%, -100%); margin-top: -12px; }
          
          .flow-line { position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; }
          .flow-line path { stroke-dasharray: 8, 5; stroke-dashoffset: 500; opacity: 0; }
          
          .flow-indicator { position: absolute; color: var(--cyan-glow); opacity: 0; font-weight: bold; background: rgba(0, 229, 255, 0.15); padding: 10px 18px; border-radius: 10px; border: 2px solid var(--cyan-glow); font-size: 1.3vw; }
          #api-indicator { bottom: 10%; left: 60%; transform: translateX(-50%); }
          
          .profit-indicator { position: absolute; color: var(--money-green); opacity: 0; font-weight: bold; background: rgba(76, 175, 80, 0.15); padding: 10px 18px; border-radius: 10px; border: 2px solid var(--money-green); font-size: 1.3vw; }
          #profit-indicator { bottom: 10%; left: 30%; transform: translateX(-50%); }
          
          #scene4 { background-color: transparent; }
          #scene4 .title { color: var(--yellow-warn); font-size: 4vw; text-shadow: 0 0 20px var(--yellow-warn); animation: pulse 2s ease-in-out infinite; }
          @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
          
          #scene4 .cards-container { display: flex; justify-content: space-around; width: 95%; max-width: 1300px; margin-top: 60px; gap: 30px; }
          .impact-card { width: 32%; height: 400px; position: relative; cursor: pointer; transition: transform 0.3s; }
          .impact-card:hover { transform: translateY(-10px); }
          .card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s; transform-style: preserve-3d; }
          .impact-card.flipped .card-inner { transform: rotateY(180deg); }
          .card-face { position: absolute; width: 100%; height: 100%; backface-visibility: hidden; display: flex; flex-direction: column; justify-content: center; align-items: center; border: 3px solid var(--cyan-glow); border-radius: 20px; overflow: hidden; }
          .card-front { background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(10, 16, 31, 0.95)); }
          .card-front .icon { font-size: 5vw; margin-bottom: 20px; filter: drop-shadow(0 0 10px var(--cyan-glow)); }
          .card-front h3 { font-size: 1.8vw; font-weight: bold; color: var(--cyan-glow); }
          .card-back { background: linear-gradient(135deg, #1a2a45, #0f1a2e); transform: rotateY(180deg); padding: 30px; text-align: left; }
          .card-back h4 { color: var(--yellow-warn); font-size: 1.4vw; margin-bottom: 15px; text-transform: uppercase; }
          .card-back p { font-size: 1.1vw; line-height: 1.8; color: rgba(255, 255, 255, 0.9); }
          
          #scene5 { background-color: transparent; padding: 60px 20px; }
          #scene5 .title { font-size: 3.5vw; font-weight: 900; margin-bottom: 50px; }
          
          .battle-container { display: flex; width: 95%; max-width: 1400px; gap: 40px; margin-bottom: 60px; }
          .column { flex: 1; padding: 40px; border-radius: 20px; position: relative; overflow: hidden; }
          .threats { background: linear-gradient(135deg, rgba(255, 68, 68, 0.1), rgba(10, 16, 31, 0.95)); border: 3px solid var(--red-danger); }
          .opportunities { background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(10, 16, 31, 0.95)); border: 3px solid var(--cyan-glow); }
          .column h2 { font-size: 2.5vw; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 2px; }
          .threats h2 { color: var(--red-danger); }
          .opportunities h2 { color: var(--cyan-glow); }
          .column ul { list-style: none; }
          .item-card { background: rgba(255, 255, 255, 0.05); border-left: 4px solid; border-radius: 10px; padding: 20px; margin-bottom: 15px; transition: all 0.3s; opacity: 0; transform: translateX(-50px); }
          .threats .item-card { border-color: var(--red-danger); }
          .threats .item-card:hover { background: rgba(255, 68, 68, 0.1); transform: translateX(10px); }
          .opportunities .item-card { border-color: var(--cyan-glow); transform: translateX(50px); }
          .opportunities .item-card:hover { background: rgba(0, 229, 255, 0.1); transform: translateX(-10px); }
          .item-card .icon { font-size: 2vw; margin-right: 15px; }
          .item-card p { font-size: 1.2vw; line-height: 1.6; display: inline; }
          
          .action-zone { width: 95%; max-width: 1400px; padding: 50px; background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(10, 16, 31, 0.95)); border: 3px solid var(--yellow-warn); border-radius: 25px; margin-bottom: 40px; }
          .action-zone h2 { font-size: 2.8vw; color: var(--yellow-warn); text-transform: uppercase; margin-bottom: 40px; text-shadow: 0 0 20px var(--yellow-warn); }
          .actions-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; }
          .action-item { text-align: center; padding: 35px; background: rgba(255, 255, 255, 0.05); border: 2px solid var(--cyan-glow); border-radius: 15px; transition: all 0.3s; opacity: 0; }
          .action-item:hover { transform: translateY(-10px); background: rgba(255, 255, 255, 0.1); box-shadow: 0 10px 30px rgba(0, 229, 255, 0.3); }
          .action-item .icon { font-size: 4vw; margin-bottom: 20px; }
          .action-item h3 { font-size: 1.5vw; color: var(--cyan-glow); margin-bottom: 15px; font-weight: bold; }
          .action-item p { font-size: 1.1vw; line-height: 1.7; }
          
          #credits { background-color: transparent; padding: 80px 20px 120px; min-height: 100vh; }
          .credits-container { width: 90%; max-width: 1200px; margin: 0 auto; }
          .credits-header { text-align: center; margin-bottom: 80px; opacity: 0; transform: translateY(30px); }
          .credits-header h1 { font-size: 4vw; font-weight: 900; background: linear-gradient(135deg, var(--cyan-glow), var(--yellow-warn)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 3px; }
          .credits-header .subtitle { font-size: 1.5vw; color: rgba(255, 255, 255, 0.7); font-weight: 300; }
          
          .course-info { background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(10, 16, 31, 0.95)); border: 2px solid var(--cyan-glow); border-radius: 20px; padding: 40px; margin-bottom: 60px; text-align: center; opacity: 0; transform: scale(0.9); }
          .course-info .course-code { font-size: 1.8vw; color: var(--cyan-glow); font-weight: bold; margin-bottom: 10px; }
          .course-info .course-name { font-size: 1.3vw; margin-bottom: 20px; line-height: 1.6; }
          .course-info .instructor { font-size: 1.2vw; color: var(--yellow-warn); margin-top: 15px; }
          .course-info .university { font-size: 1.1vw; color: rgba(255, 255, 255, 0.8); margin-top: 10px; }
          
          .team-section { margin-bottom: 60px; }
          .team-section h2 { font-size: 2.5vw; color: var(--cyan-glow); text-align: center; margin-bottom: 50px; text-transform: uppercase; letter-spacing: 2px; opacity: 0; transform: translateY(20px); }
          .team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 30px; margin-bottom: 40px; }
          .member-card { background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(10, 16, 31, 0.9)); border: 2px solid var(--cyan-glow); border-radius: 15px; padding: 35px; text-align: center; transition: all 0.3s; opacity: 0; transform: translateY(50px); }
          .member-card:hover { transform: translateY(-10px); box-shadow: 0 15px 40px rgba(0, 229, 255, 0.3); background: linear-gradient(135deg, rgba(0, 229, 255, 0.1), rgba(10, 16, 31, 0.95)); }
          .member-card .avatar { width: 80px; height: 80px; background: linear-gradient(135deg, var(--cyan-glow), var(--yellow-warn)); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center; font-size: 2.5vw; font-weight: bold; color: var(--bg-color); }
          .member-card .name { font-size: 1.5vw; font-weight: bold; color: var(--cyan-glow); margin-bottom: 10px; }
          .member-card .student-id { font-size: 1.1vw; color: rgba(255, 255, 255, 0.7); font-family: 'Courier New', monospace; }
          
          .thanks-section { background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(10, 16, 31, 0.95)); border: 3px solid var(--yellow-warn); border-radius: 20px; padding: 50px; text-align: center; margin-bottom: 60px; opacity: 0; transform: scale(0.9); }
          .thanks-section h2 { font-size: 2.5vw; color: var(--yellow-warn); margin-bottom: 30px; text-transform: uppercase; }
          .thanks-section p { font-size: 1.3vw; line-height: 1.8; color: rgba(255, 255, 255, 0.9); }
          
          .final-message { text-align: center; font-size: 1.8vw; color: var(--cyan-glow); margin-top: 60px; opacity: 0; font-weight: bold; text-shadow: 0 0 20px var(--cyan-glow); }
          
          #auto-scroll-btn { position: fixed; bottom: 30px; right: 30px; z-index: 1000; padding: 12px 20px; background-color: var(--cyan-glow); color: var(--bg-color); border: none; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 16px; box-shadow: 0 4px 15px rgba(0, 229, 255, 0.4); transition: all 0.3s; }
          #auto-scroll-btn:hover { transform: scale(1.05); box-shadow: 0 6px 20px rgba(0, 229, 255, 0.6); }
          
          @media (max-width: 768px) {
            .scene .title { font-size: 8vw; }
            .scene .quote { font-size: 3.5vw; }
            #scene1 .content-wrapper { flex-direction: column; }
            #scene1 .text-content, #scene1 .chart-container { width: 90%; }
            .chart-highlight { position: static; width: auto; margin-top: 20px; text-align: center; right: auto; }
            #scene2 .logo { min-width: 120px; font-size: 4vw; }
            .line-label { font-size: 3vw; }
            .summary-popup { padding: 20px; max-width: 90%; }
            .summary-popup .icon { font-size: 10vw; }
            .summary-popup h3 { font-size: 5vw; }
            .summary-popup ul { font-size: 3.5vw; }
            #scene4 .cards-container { flex-direction: column; align-items: center; }
            .impact-card { width: 85%; margin-bottom: 25px; }
            .battle-container { flex-direction: column; }
            .actions-grid { grid-template-columns: 1fr; }
            .action-item h3 { font-size: 4vw; }
            .action-item p { font-size: 3vw; }
            .team-grid { grid-template-columns: 1fr; }
            .credits-header h1 { font-size: 8vw; }
            .member-card .name { font-size: 4vw; }
          }
        `}
      </style>

      <div className="scene-background">
        <div className="bg-grid"></div>
      </div>

      <div id="modal-backdrop" className="modal-backdrop"></div>

      <div id="summary-s2" className="summary-popup">
        <div className="icon">💡</div>
        <h3>Điểm Mấu Chốt</h3>
        <ul>
          <li>Microsoft (Tiền) + OpenAI (AI) = Tư bản tài chính mới</li>
          <li>Sự hợp nhất giữa nền tảng và công nghệ AI</li>
          <li>Đúng như Lênin dự báo năm 1916</li>
        </ul>
      </div>

      <div id="summary-s3" className="summary-popup">
        <div className="icon">🌍</div>
        <h3>Tổng Kết</h3>
        <ul>
          <li>Xuất khẩu API thay vì nhà máy vật lý</li>
          <li>Thu lợi nhuận toàn cầu từ tri thức AI</li>
          <li>Tạo ra sự phụ thuộc công nghệ mới</li>
        </ul>
      </div>

      {/* Scene 0: Opening */}
      <section id="scene0" className="scene">
        <div id="text1" className="text-group">
          <p className="large-text">Năm 1916...</p>
        </div>
        <div id="text2" className="text-group">
          <p className="small-text">...V.I. Lênin mô tả 5 đặc điểm của Chủ nghĩa Tư bản Độc quyền.</p>
        </div>
        <div id="text3" className="text-group">
          <p className="large-text">Hơn 100 năm sau...</p>
        </div>
        <div id="text4" className="text-group">
          <p className="small-text">
            Những đặc điểm đó đang tái sinh... trong kỷ nguyên <span className="highlight-ai">A.I.</span>
          </p>
        </div>
      </section>

      {/* Scene 1: Production */}
      <section id="scene1" className="scene">
        <div className="content-wrapper">
          <div className="text-content">
            <h1 id="s1-title" className="title">
              ĐẶC ĐIỂM 1:<br />
              TẬP TRUNG SẢN XUẤT
            </h1>
            <p id="s1-quote" className="quote">
              "...sự tập trung sản xuất và tư bản phát triển tới một mức độ cao khiến nó tạo ra những tổ chức độc quyền..."
            </p>
          </div>
          <div id="s1-chart" className="chart-container">
            <div id="nvidia-bar" className="bar">
              <div className="label">NVIDIA</div>
            </div>
            <div id="amd-bar" className="bar">
              <div className="label">AMD</div>
            </div>
            <div id="intel-bar" className="bar">
              <div className="label">INTEL</div>
            </div>
            <div id="s1-highlight" className="chart-highlight">
              📊 Nắm giữ 90% thị phần GPU AI toàn cầu
            </div>
          </div>
        </div>
        <p id="s1-conclusion" className="conclusion">
          Họ nắm giữ 'TƯ LIỆU SẢN XUẤT' của thời đại mới.
        </p>
      </section>

      {/* Scene 2: Financial Capital */}
      <section id="scene2" className="scene">
        <div>
          <h1 id="s2-title" className="title">
            ĐẶC ĐIỂM 2: TƯ BẢN TÀI CHÍNH
          </h1>
          <p id="s2-quote" className="quote">
            "...sự hợp nhất giữa tư bản ngân hàng và tư bản công nghiệp..."
          </p>
        </div>
        <div className="content-wrapper">
          <div id="msft-logo" className="logo">
            MICROSOFT
          </div>
          <div id="oai-logo" className="logo">
            OPENAI
          </div>
          <div id="azure-logo" className="logo">
            AZURE
          </div>

          <svg className="connection-line" viewBox="0 0 1000 700" preserveAspectRatio="none">
            <path id="line1" d="M 185 220 Q 500 130 815 220" stroke="var(--money-green)" strokeWidth="4" fill="none" />
            <path id="line2" d="M 815 245 Q 500 330 185 245" stroke="var(--cyan-glow)" strokeWidth="4" fill="none" />
            <path id="line3" d="M 815 240 C 600 630 400 630 175 610" stroke="var(--cyan-glow)" strokeWidth="2" fill="none" strokeDasharray="5,5" />
          </svg>

          <div id="line-label-1" className="line-label">
            $13 TỶ USD Đầu tư
          </div>
          <div id="line-label-2" className="line-label">
            Tích hợp GPT (Office, Bing)
          </div>
          <div id="line-label-3" className="line-label">
            Hạ tầng Azure Cloud
          </div>
        </div>
        <p id="s2-conclusion" className="conclusion">
          Sự 'hôn phối' giữa Tư bản Nền tảng và Tư bản Tri thức.
        </p>
      </section>

      {/* Scene 3: Capital Export */}
      <section id="scene3" className="scene">
        <h1 id="s3-title" className="title">
          ĐẶC ĐIỂM 3: XUẤT KHẨU TƯ BẢN
        </h1>
        <p id="s3-quote" className="quote">
          "...việc xuất khẩu tư bản, khác với xuất khẩu hàng hóa, đã trở thành đặc điểm tiêu biểu."
        </p>
        <div className="map-container">
          <div className="plexus-map"></div>

          <div id="p-usa" className="map-point"></div>
          <div id="label-usa" className="map-label">
            🇺🇸 Silicon Valley (OpenAI, Google)
          </div>

          <div id="p-eu" className="map-point"></div>
          <div id="label-eu" className="map-label">
            🇪🇺 Europe
          </div>

          <div id="p-asia" className="map-point"></div>
          <div id="label-asia" className="map-label">
            🌏 Asia
          </div>

          <div id="p-vn" className="map-point"></div>
          <div id="label-vn" className="map-label">
            🇻🇳 Vietnam
          </div>

          <svg className="flow-line" viewBox="0 0 800 400" preserveAspectRatio="none">
            <path id="flow-eu" d="M 160 160 C 250 100 350 100 384 112" stroke="var(--cyan-glow)" strokeWidth="3" fill="none" />
            <path id="flow-asia" d="M 165 165 C 300 250 500 200 600 180" stroke="var(--cyan-glow)" strokeWidth="3" fill="none" />
            <path id="flow-vn" d="M 168 172 C 300 320 550 320 656 272" stroke="var(--cyan-glow)" strokeWidth="3" fill="none" />
            <path id="flow-back-eu" d="M 384 116 C 350 145 250 145 165 165" stroke="var(--money-green)" strokeWidth="2.5" fill="none" />
            <path id="flow-back-asia" d="M 600 184 C 500 225 300 275 168 176" stroke="var(--money-green)" strokeWidth="2.5" fill="none" />
            <path id="flow-back-vn" d="M 656 276 C 550 330 300 330 168 176" stroke="var(--money-green)" strokeWidth="2.5" fill="none" />
          </svg>

          <div id="api-indicator" className="flow-indicator">
            → API ACCESS →
          </div>
          <div id="profit-indicator" className="profit-indicator">
            ← $ PROFIT $ ←
          </div>
        </div>
        <p id="s3-conclusion" className="conclusion">
          Họ không xuất khẩu nhà máy. Họ xuất khẩu 'NĂNG LỰC TRI THỨC' và thu lợi nhuận toàn cầu.
        </p>
      </section>

      {/* Scene 4: Impact */}
      <section id="scene4" className="scene">
        <h1 id="s4-title" className="title">
          VÀ TÁC ĐỘNG?
        </h1>
        <div className="cards-container">
          <div className="impact-card" id="card-startup">
            <div className="card-inner">
              <div className="card-face card-front">
                <div className="icon">🚀</div>
                <h3>STARTUPS</h3>
              </div>
              <div className="card-face card-back">
                <h4>⚠️ Bị Bóp Nghẹt</h4>
                <p>Buộc phải xây dựng trên nền tảng của 'ông lớn'. Trở thành 'chư hầu' công nghệ, mất quyền tự chủ.</p>
              </div>
            </div>
          </div>
          <div className="impact-card" id="card-worker">
            <div className="card-inner">
              <div className="card-face card-front">
                <div className="icon">��‍💼</div>
                <h3>NGƯỜI LAO ĐỘNG</h3>
              </div>
              <div className="card-face card-back">
                <h4>⚠️ Bị Thay Thế</h4>
                <p>Lao động sáng tạo cấp thấp bị thay thế. Dữ liệu cá nhân bị 'bóc lột' miễn phí (Tư bản giám sát).</p>
              </div>
            </div>
          </div>
          <div className="impact-card" id="card-nation">
            <div className="card-inner">
              <div className="card-face card-front">
                <div className="icon">🏛️</div>
                <h3>QUỐC GIA</h3>
              </div>
              <div className="card-face card-back">
                <h4>⚠️ Thuộc Địa Công Nghệ</h4>
                <p>Nguy cơ trở thành 'THUỘC ĐỊA CÔNG NGHỆ' nếu không sở hữu AI lõi. Mất chủ quyền số.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 5: Conclusion */}
      <section id="scene5" className="scene">
        <h1 id="s5-title" className="title">
          VẬY, SINH VIÊN CHÚNG TA?
        </h1>

        <div className="battle-container">
          <div className="column threats">
            <h2>⚔️ Bất Lợi</h2>
            <ul>
              <li className="item-card">
                <span className="icon">⚠️</span>
                <p>Độc quyền công nghệ AI từ BigTech</p>
              </li>
              <li className="item-card">
                <span className="icon">👁️</span>
                <p>Tư bản giám sát & khai thác dữ liệu</p>
              </li>
              <li className="item-card">
                <span className="icon">📉</span>
                <p>Nguy cơ thất nghiệp cấu trúc</p>
              </li>
              <li className="item-card">
                <span className="icon">⚡</span>
                <p>Chênh lệch kỹ năng ngày càng lớn</p>
              </li>
              <li className="item-card">
                <span className="icon">🏴</span>
                <p>Thuộc địa công nghệ mới</p>
              </li>
            </ul>
          </div>

          <div className="column opportunities">
            <h2>🚀 Lợi Thế</h2>
            <ul>
              <li className="item-card">
                <span className="icon">📚</span>
                <p>Tiếp cận tri thức AI miễn phí/rẻ</p>
              </li>
              <li className="item-card">
                <span className="icon">🎨</span>
                <p>Công cụ AI dân chủ hóa sáng tạo</p>
              </li>
              <li className="item-card">
                <span className="icon">💎</span>
                <p>Cơ hội tạo giá trị mới (niche)</p>
              </li>
              <li className="item-card">
                <span className="icon">⚡</span>
                <p>Thế hệ trẻ thích nghi nhanh</p>
              </li>
              <li className="item-card">
                <span className="icon">🧠</span>
                <p>Tư duy phản biện sắc bén hơn</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="action-zone">
          <h2>⚡ HÀNH ĐỘNG NGAY</h2>
          <div className="actions-grid">
            <div className="action-item">
              <div className="icon">🧠</div>
              <h3>Làm Chủ AI</h3>
              <p>Học Prompting, RAG, Fine-tuning. Biến AI thành "trợ lý" thay vì "sếp".</p>
            </div>
            <div className="action-item">
              <div className="icon">🎯</div>
              <h3>Tìm Niche</h3>
              <p>Tập trung vào thị trường ngách mà AI chưa thống trị hoàn toàn.</p>
            </div>
            <div className="action-item">
              <div className="icon">❓</div>
              <h3>Tư Duy Phản Biện</h3>
              <p>Đặt câu hỏi về AI, BigTech, quyền lực. Không chấp nhận mù quáng.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Scene 6: Credits */}
      <section id="credits">
        <div className="credits-container">
          <div className="credits-header">
            <h1>Credits</h1>
            <p className="subtitle">A ScrollyTelling Project</p>
          </div>

          <div className="course-info">
            <div className="course-code">MLN122</div>
            <div className="course-name">Political Economics of Marxism – Leninism</div>
            <div className="instructor">👨‍🏫 Giảng viên: Kiều Thị Thu Chung</div>
            <div className="university">🏫 Đại Học FPT</div>
          </div>

          <div className="team-section">
            <h2>👥 Nhóm Thực Hiện</h2>
            <div className="team-grid">
              <div className="member-card">
                <div className="avatar">K</div>
                <div className="name">Quách Hữu Khang</div>
                <div className="student-id">SE184031</div>
              </div>
              <div className="member-card">
                <div className="avatar">H</div>
                <div className="name">Nguyễn Phạm Thu Hà</div>
                <div className="student-id">SE184261</div>
              </div>
              <div className="member-card">
                <div className="avatar">T</div>
                <div className="name">Nguyễn Thị Thanh Thảo</div>
                <div className="student-id">SS170047</div>
              </div>
              <div className="member-card">
                <div className="avatar">T</div>
                <div className="name">Trần Nhật Tân</div>
                <div className="student-id">SE184055</div>
              </div>
            </div>
          </div>

          <div className="thanks-section">
            <h2>🙏 Lời Cảm Ơn Đặc Biệt</h2>
            <p>
              Cảm ơn cô <strong>Kiều Thị Thu Chung</strong> đã truyền cảm hứng cho chúng em về tư duy phản biện và nhận thức sâu sắc về bản chất kinh tế - chính trị.
              <br />
              <br />
              Xin chân thành cảm ơn <strong>Tổ quốc Việt Nam</strong> và <strong>Trường Đại học FPT</strong> đã tạo cơ hội để chúng em được tham gia những tiết học đầy ý nghĩa và cảm hứng
              này.
              <br />
              <br />
              Biết ơn sâu sắc <strong>Karl Marx và Lenin</strong> – những tư tưởng vĩ đại đã soi sáng con đường nhận thức và hun đúc trong chúng em niềm tin vào giá trị của tri thức và
              con người.
            </p>
          </div>

          <div className="final-message">✨ Hết - Năm 2025 ✨</div>
        </div>
      </section>

      <button ref={autoScrollBtnRef} id="auto-scroll-btn" onClick={handleAutoScroll}>
        ▶️ Auto Scroll
      </button>
    </div>
  );
};

export default ScrollyCreditsPage;
