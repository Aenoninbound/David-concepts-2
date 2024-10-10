import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './App.css';

function App() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isMouseInside, setIsMouseInside] = useState(false);
  const animationsRef = useRef([]);

  useEffect(() => {
    const container = containerRef.current;
    const shapes = container.querySelectorAll('.shape');

    shapes.forEach((shape, index) => {
      shape.dataset.startY = shape.style.top;
      shape.dataset.startX = shape.style.left;
      const animation = gsap.to(shape, {
        duration: gsap.utils.random(2, 4),
        y: `+=${gsap.utils.random(-20, 20)}`,
        x: `+=${gsap.utils.random(-20, 20)}`,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
      });
      animationsRef.current[index] = animation;
    });

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => {
      setIsMouseInside(true);
    };

    const handleMouseLeave = () => {
      setIsMouseInside(false);
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      animationsRef.current.forEach(animation => animation.kill());
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const shapes = container.querySelectorAll('.shape');

    shapes.forEach((shape) => {
      const startY = parseFloat(shape.dataset.startY);
      const startX = parseFloat(shape.dataset.startX);
      
      if (isMouseInside) {
        gsap.to(shape, {
          duration: 1,
          y: startY + (mousePosition.y - 0.5) * 100,
          x: startX + (mousePosition.x - 0.5) * 100,
          ease: 'power2.out',
        });
      } else {
        gsap.to(shape, {
          duration: 1.5,
          y: startY,
          x: startX,
          ease: 'elastic.out(1, 0.5)',
        });
      }
    });
  }, [mousePosition, isMouseInside]);

  return (
    <div className="App" ref={containerRef}>
      <div className="shape box" style={{width: '100px', height: '100px', left: '5%', top: '10%'}}>
        <div className="face front" style={{background: '#ffa500'}}></div>
        <div className="face back" style={{background: '#ffa500'}}></div>
        <div className="face right" style={{background: '#ffa500'}}></div>
        <div className="face left" style={{background: '#ffa500'}}></div>
        <div className="face top" style={{background: '#ffa500'}}></div>
        <div className="face bottom" style={{background: '#ffa500'}}></div>
      </div>
      <div className="shape box" style={{width: '80px', height: '120px', left: '25%', top: '40%'}}>
        <div className="face front" style={{background: '#8a2be2'}}></div>
        <div className="face back" style={{background: '#8a2be2'}}></div>
        <div className="face right" style={{background: '#8a2be2'}}></div>
        <div className="face left" style={{background: '#8a2be2'}}></div>
        <div className="face top" style={{background: '#8a2be2'}}></div>
        <div className="face bottom" style={{background: '#8a2be2'}}></div>
      </div>
      <div className="shape box" style={{width: '70px', height: '90px', left: '55%', top: '20%'}}>
        <div className="face front" style={{background: '#4169e1'}}></div>
        <div className="face back" style={{background: '#4169e1'}}></div>
        <div className="face right" style={{background: '#4169e1'}}></div>
        <div className="face left" style={{background: '#4169e1'}}></div>
        <div className="face top" style={{background: '#4169e1'}}></div>
        <div className="face bottom" style={{background: '#4169e1'}}></div>
      </div>
      <div className="shape sphere" style={{width: '80px', height: '80px', background: '#ff69b4', left: '75%', top: '50%'}}></div>
      <div className="shape sphere" style={{width: '60px', height: '60px', background: '#20b2aa', left: '35%', top: '70%'}}></div>
      <div className="shape sphere" style={{width: '40px', height: '40px', background: '#ffa500', left: '65%', top: '5%'}}></div>
      <div className="shape box" style={{width: '90px', height: '90px', left: '10%', top: '60%'}}>
        <div className="face front" style={{background: '#32cd32'}}></div>
        <div className="face back" style={{background: '#32cd32'}}></div>
        <div className="face right" style={{background: '#32cd32'}}></div>
        <div className="face left" style={{background: '#32cd32'}}></div>
        <div className="face top" style={{background: '#32cd32'}}></div>
        <div className="face bottom" style={{background: '#32cd32'}}></div>
      </div>
      <div className="shape sphere" style={{width: '70px', height: '70px', background: '#ff4500', left: '85%', top: '15%'}}></div>
      <div className="shape box" style={{width: '60px', height: '110px', left: '45%', top: '85%'}}>
        <div className="face front" style={{background: '#9932cc'}}></div>
        <div className="face back" style={{background: '#9932cc'}}></div>
        <div className="face right" style={{background: '#9932cc'}}></div>
        <div className="face left" style={{background: '#9932cc'}}></div>
        <div className="face top" style={{background: '#9932cc'}}></div>
        <div className="face bottom" style={{background: '#9932cc'}}></div>
      </div>
      <div className="shape sphere" style={{width: '50px', height: '50px', background: '#1e90ff', left: '20%', top: '85%'}}></div>
      
      {/* New shapes */}
      <div className="shape sphere" style={{width: '45px', height: '45px', background: '#ff6347', left: '92%', top: '75%'}}></div>
      <div className="shape sphere" style={{width: '55px', height: '55px', background: '#00ced1', left: '15%', top: '30%'}}></div>
      <div className="shape sphere" style={{width: '35px', height: '35px', background: '#ba55d3', left: '80%', top: '90%'}}></div>
      <div className="shape sphere" style={{width: '65px', height: '65px', background: '#32cd32', left: '40%', top: '5%'}}></div>
      <div className="shape sphere" style={{width: '75px', height: '75px', background: '#daa520', left: '3%', top: '95%'}}></div>
      <div className="shape sphere" style={{width: '30px', height: '30px', background: '#ff69b4', left: '70%', top: '75%'}}></div>
      <div className="shape sphere" style={{width: '50px', height: '50px', background: '#4682b4', left: '95%', top: '40%'}}></div>
      <div className="shape sphere" style={{width: '40px', height: '40px', background: '#7b68ee', left: '60%', top: '95%'}}></div>
    </div>
  );
}

export default App;