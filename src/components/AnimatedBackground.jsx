import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
    const shadowHostRef = useRef(null);

    useEffect(() => {
        const shadowHost = shadowHostRef.current;
        if (!shadowHost) return;

        const shadowRoot = shadowHost.shadowRoot || shadowHost.attachShadow({ mode: 'open' });

        if (shadowRoot.children.length > 0) return;
        
        const animations = Array.from({ length: 3 }, () => ({
            x: Math.random() * 100 - 50,
            y: Math.random() * 100 - 50
        }));

        shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    z-index: -1;
                }
                
                .pixel {
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    border-radius: 50%;
                    background-color: rgba(100, 100, 255, 0.7);
                    box-shadow: 0 0 8px 2px rgba(100, 100, 255, 0.5);
                    pointer-events: none;
                }
                
                .pixel:nth-child(3n+1) {
                    background-color: rgba(157, 157, 254, 0.7);
                    box-shadow: 0 0 8px 2px rgba(198, 198, 255, 0.5);
                }
                
                .pixel:nth-child(3n+2) {
                    background-color: rgba(236, 236, 254, 0.7);
                    box-shadow: 0 0 8px 2px rgba(190, 190, 252, 0.5);
                }
                
                @keyframes float {
                    0% { transform: translate(0, 0) rotate(0deg); }
                    25% { transform: translate(${animations[0].x}px, ${animations[0].y}px) rotate(90deg); }
                    50% { transform: translate(${animations[1].x}px, ${animations[1].y}px) rotate(180deg); }
                    75% { transform: translate(${animations[2].x}px, ${animations[2].y}px) rotate(270deg); }
                    100% { transform: translate(0, 0) rotate(360deg); }
                }
            </style>
            <div id="pixels-container"></div>
        `;

        const pixelsContainer = shadowRoot.getElementById('pixels-container');
        const pixelCount = 180;

        for (let i = 0; i < pixelCount; i++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel');
            
            const left = Math.random() * 100;
            const top = Math.random() * 100;
            const depth = Math.random() * 3 + 4;
            
            const size = 10 / depth;
            pixel.style.width = `${size}px`;
            pixel.style.height = `${size}px`;
            pixel.style.opacity = 0.3 + (depth * 0.2);
            pixel.style.left = `${left}%`;
            pixel.style.top = `${top}%`;
            
            const duration = 2 + (depth * 10);
            const delay = Math.random() * 20;
            pixel.style.animation = `float ${duration}s linear ${delay}s infinite`;
            
            pixelsContainer.appendChild(pixel);
        }

        return () => {
        };
    }, []);

    return (
        <div
            ref={shadowHostRef}
            id="matrix"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}
        />
    );
}