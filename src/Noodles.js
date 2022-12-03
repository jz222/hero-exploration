import { Base, Depth, Fresnel, LayerMaterial, Noise } from 'lamina/vanilla';
import { Float, useGLTF } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useMemo, useState } from 'react';
import { Color, MathUtils } from 'three';

const colorA = new Color('#1F2862').convertSRGBToLinear();
const colorB = new Color('#0F153B').convertSRGBToLinear();
const fresnel = new Color('#7089E6').convertSRGBToLinear();

const material = new LayerMaterial({
    layers: [
        new Base({ color: colorA }),
        new Depth({ colorA: colorA, colorB: colorB, alpha: 0.5, mode: 'normal', near: 0, far: 2, origin: [1, 1, 1] }),
        new Depth({ colorA: 'black', colorB: colorB, alpha: 0.5, mode: 'add', near: 3, far: 2, origin: [1, 1, 1] }),
        new Fresnel({ mode: 'add', color: fresnel, intensity: 0.3, power: 2.5, bias: 0.0 }),
        new Noise({ mapping: 'local', type: 'simplex', scale: 1000, colorA: '#ffaf40', colorB: 'black', mode: 'overlay' })
    ]
});

function Noodle() {
    const { viewport, camera } = useThree();
    const { nodes } = useGLTF('/abstract_cosmic_dust_shape_1.glb');
    const [geometry] = useState(() => nodes.Object_2.geometry);
    const [speed] = useState(() => 0.1 + Math.random() / 10);
    const position = useMemo(() => {
        const z = Math.random() * -20;
        const bounds = viewport.getCurrentViewport(camera, [0, 0, z]);
        return [MathUtils.randFloatSpread(bounds.width), MathUtils.randFloatSpread(bounds.height * 0.75), z];
    }, [viewport]);
    return (
        <Float position={position} speed={speed} rotationIntensity={10} floatIntensity={40} dispose={null}>
            <mesh scale={0.01} geometry={geometry} material={material}/>
        </Float>
    );
}

export default function Noodles() {
    return Array.from({ length: 10 }, (_, i) => <Noodle key={i}/>);
}

useGLTF.preload('/abstract_cosmic_dust_shape_1.glb');
