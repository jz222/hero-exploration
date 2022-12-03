import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Depth, LayerMaterial, Noise } from 'lamina';
import { BackSide, Vector3 } from 'three';
import { Text } from '@react-three/drei';
import { Suspense } from 'react';
import Noodles from './Noodles';

export default function Scene() {
    return (
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 22 }}>
            <Bg/>
            <Suspense fallback={null}>
                <Noodles/>
                <Caption>{`This is\nsome example\nhero text`}</Caption>
                <Rig/>
            </Suspense>
        </Canvas>
    );
}

function Caption({ children }) {
    const { width } = useThree((state) => state.viewport);
    return (
        <Text
            position={[0, 0, 0]}
            lineHeight={0.8}
            font="/DarkerGrotesque-Bold.ttf"
            fontSize={width < 7 ? width / 5.8 : width / 9}
            material-toneMapped={false}
            anchorX="center"
            anchorY="middle">
            {children}
        </Text>
    );
}

function Rig({ v = new Vector3() }) {
    return useFrame((state) => {
        state.camera.position.lerp(v.set(state.mouse.x / 2, state.mouse.y / 2, 10), 0.05);
    });
}

function Bg() {
    return (
        <mesh scale={100}>
            <boxGeometry args={[1, 1, 1]}/>
            <LayerMaterial side={BackSide}>
                <Depth colorA="#2d2d2d" colorB="#bec6d0" alpha={1} mode="normal" near={120} far={205} origin={[100, 100, -100]}/>
                <Noise mapping="local" type="white" scale={1000} colorA="white" colorB="black" mode="subtract" alpha={0.08}/>
            </LayerMaterial>
        </mesh>
    );
}
