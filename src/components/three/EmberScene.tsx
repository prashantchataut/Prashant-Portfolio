'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const FIELD_HEIGHT = 12;
const COUNT_DESKTOP = 650;
const COUNT_MOBILE = 240;

const vertexShader = /* glsl */ `
    uniform float uTime;
    uniform float uSize;
    uniform float uPixelRatio;
    attribute float aSeed;
    attribute float aScale;
    varying float vSeed;
    varying float vFade;

    void main() {
        vec3 pos = position;

        // slow upward drift, wrapped over the field height
        float speed = 0.12 + aSeed * 0.3;
        pos.y = mod(pos.y + uTime * speed, ${FIELD_HEIGHT.toFixed(1)}) - ${ (FIELD_HEIGHT / 2).toFixed(1) };

        // gentle lateral sway
        pos.x += sin(uTime * (0.18 + aSeed * 0.35) + aSeed * 43.0) * 0.7;
        pos.z += cos(uTime * (0.14 + aSeed * 0.28) + aSeed * 29.0) * 0.6;

        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_Position = projectionMatrix * mv;

        float size = uSize * aScale * uPixelRatio;
        gl_PointSize = size * (1.0 / -mv.z);

        vSeed = aSeed;
        float yn = (pos.y + ${(FIELD_HEIGHT / 2).toFixed(1)}) / ${FIELD_HEIGHT.toFixed(1)};
        vFade = smoothstep(0.0, 0.14, yn) * (1.0 - smoothstep(0.72, 1.0, yn));
    }
`;

const fragmentShader = /* glsl */ `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform float uOpacity;
    varying float vSeed;
    varying float vFade;

    void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float core = smoothstep(0.5, 0.0, d);
        float glow = core * core;
        vec3 color = mix(uColorB, uColorA, vSeed * vSeed);
        float alpha = glow * vFade * uOpacity * (0.3 + vSeed * 0.7);
        if (alpha < 0.004) discard;
        gl_FragColor = vec4(color, alpha);
    }
`;

function Embers({
    theme,
    still,
    active,
}: {
    theme: 'dark' | 'light';
    still: boolean;
    active: boolean;
}) {
    const { camera, invalidate, size } = useThree();
    const target = useRef(new THREE.Vector2(0, 0));

    useEffect(() => {
        const onMove = (e: PointerEvent) => {
            target.current.set(
                (e.clientX / window.innerWidth) * 2 - 1,
                -((e.clientY / window.innerHeight) * 2 - 1)
            );
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        return () => window.removeEventListener('pointermove', onMove);
    }, []);

    const { geometry, material } = useMemo(() => {
        const count =
            typeof window !== 'undefined' && window.innerWidth < 768
                ? COUNT_MOBILE
                : COUNT_DESKTOP;

        const geo = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);
        const seeds = new Float32Array(count);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 18;
            positions[i * 3 + 1] = Math.random() * FIELD_HEIGHT;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
            seeds[i] = Math.random();
            // mostly fine dust, a few larger bokeh embers
            scales[i] = Math.random() > 0.92 ? 1.8 + Math.random() * 1.6 : 0.5 + Math.random() * 1.1;
        }

        geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
        geo.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));

        const dark = theme !== 'light';
        const mat = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: dark ? THREE.AdditiveBlending : THREE.NormalBlending,
            uniforms: {
                uTime: { value: 40 },
                uSize: { value: 24 },
                uPixelRatio: { value: 1 },
                uColorA: { value: new THREE.Color(dark ? '#ffc46b' : '#b45309') },
                uColorB: { value: new THREE.Color(dark ? '#8a3d0f' : '#92400e') },
                uOpacity: { value: dark ? 0.9 : 0.42 },
            },
        });

        return { geometry: geo, material: mat };
    }, [theme]);

    useEffect(() => {
        material.uniforms.uPixelRatio.value = Math.min(
            typeof window !== 'undefined' ? window.devicePixelRatio : 1,
            2
        );
        invalidate();
    }, [material, invalidate, size.width]);

    useEffect(() => {
        if (still || !active) invalidate();
    }, [still, active, invalidate]);

    useFrame((state) => {
        if (still) return;
        material.uniforms.uTime.value = state.clock.elapsedTime + 40;

        camera.position.x += (target.current.x * 0.9 - camera.position.x) * 0.035;
        camera.position.y += (target.current.y * 0.45 - camera.position.y) * 0.035;
        camera.lookAt(0, 0, 0);
    });

    return <points geometry={geometry} material={material} frustumCulled={false} />;
}

export default function EmberScene({
    theme = 'dark',
    still = false,
    className,
}: {
    theme?: 'dark' | 'light';
    still?: boolean;
    className?: string;
}) {
    const wrapper = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const el = wrapper.current;
        if (!el || typeof IntersectionObserver === 'undefined') return;
        const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
            threshold: 0,
        });
        io.observe(el);
        return () => io.disconnect();
    }, []);

    const running = !still && visible;

    return (
        <div ref={wrapper} className={className} aria-hidden="true">
            <Canvas
                frameloop={running ? 'always' : 'never'}
                dpr={[1, 1.75]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                camera={{ position: [0, 0, 8], fov: 50 }}
            >
                <Embers theme={theme} still={still} active={visible} />
            </Canvas>
        </div>
    );
}
