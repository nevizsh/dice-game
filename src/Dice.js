import * as THREE from 'three';
import { useLoader, useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function Dice ({ value }) { // création du composant du dé, ici appelé Dice
    const meshRef = useRef();

    const [f1, f2, f3, f4, f5, f6] = useLoader(THREE.TextureLoader, [ // chargement des textures des faces du dé
        '/textures/dice1.png',
        '/textures/dice2.png',
        '/textures/dice3.png',
        '/textures/dice4.png',
        '/textures/dice5.png',
        '/textures/dice6.png'
    ]);

    const materials = [f3, f4, f1, f6, f5, f2];

    const rotations = {
        1: [0, 0, 0],
        2: [Math.PI / 2, 0, 0],
        3: [0, 0, Math.PI / 2],
        4: [0, 0, -Math.PI / 2],
        5: [-Math.PI / 2, 0, 0],
        6: [Math.PI, 0, 0]
    };

    useFrame(() => {
        if (meshRef.current) {
            const target = rotations[value] || [0, 0, 0];

            meshRef.current.rotation.x += (target[0] - meshRef.current.rotation.x) * 0.1;
            meshRef.current.rotation.y += (target[1] - meshRef.current.rotation.y) * 0.1;
            meshRef.current.rotation.z += (target[2] - meshRef.current.rotation.z) * 0.1;
        }
    });

    return (
        <group rotation={[0, 2.2, 0]}>
            <mesh ref={meshRef}>
                <boxGeometry args={[1, 1, 1]} />
                {materials.map((material, index) => (
                    <meshStandardMaterial 
                        key={index} 
                        attach={`material-${index}`} 
                        map={material} 
                    />
                ))}
            </mesh>
        </group>
    );
}

export default Dice; // on rend le composant Dice disponible pour l'importer en dehors de lui-même