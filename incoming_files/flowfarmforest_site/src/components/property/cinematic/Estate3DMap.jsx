import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Button } from '@/components/ui/button';
import { MapPinned, Mountain, RotateCcw } from 'lucide-react';
import { ESTATE_MARKERS } from './estateTerrainData';

const SATELLITE_TEXTURE_URL = 'https://media.base44.com/images/public/69a8c6b6c09f3f53db8fa60a/ca1833e61_flowfarmmasterphotoswebsite.jpg';
const MAP_WIDTH = 12;
const MAP_HEIGHT = 8;
const DEFAULT_CAMERA = new THREE.Vector3(0, 5.8, 6.8);
const CINEMATIC_CAMERA = new THREE.Vector3(-3.4, 4.4, 4.6);

const MARKER_LAYOUTS = {
  'main-residence': { x: 1.1, z: -0.65 },
  'cabana-house': { x: 2.0, z: -0.25 },
  'high-tunnel': { x: -0.5, z: 1.2 },
  'farm-workshop': { x: 2.6, z: 0.35 },
  'compost-area': { x: 3.2, z: 1.0 },
  'biochar-area': { x: -1.2, z: 1.65 },
  'veganic-farm': { x: 1.55, z: 2.8 },
};

function MarkerTargetRing({ active }) {
  const groupRef = useRef(null);

  useFrame((state) => {
    if (!groupRef.current || !active) return;
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 3.2) * 0.12;
    groupRef.current.scale.setScalar(pulse);
    groupRef.current.rotation.z += 0.02;
  });

  if (!active) return null;

  return (
    <group ref={groupRef} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh>
        <ringGeometry args={[0.2, 0.32, 64]} />
        <meshBasicMaterial color="#f8f2e8" transparent opacity={0.95} side={THREE.DoubleSide} />
      </mesh>
      <mesh>
        <ringGeometry args={[0.38, 0.46, 64]} />
        <meshBasicMaterial color="#d7b98a" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function EstateMarker({ marker, active, onSelect }) {
  const markerPosition = MARKER_LAYOUTS[marker.id] || { x: 0, z: 0 };

  return (
    <group position={[markerPosition.x, 0.12, markerPosition.z]}>
      <MarkerTargetRing active={active} />
      <mesh onClick={() => onSelect(marker)} onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }} onPointerOut={() => { document.body.style.cursor = 'default'; }}>
        <sphereGeometry args={[active ? 0.12 : 0.09, 24, 24]} />
        <meshStandardMaterial color={active ? '#fff8ee' : '#d7b98a'} emissive={active ? '#c8a56b' : '#000000'} emissiveIntensity={active ? 1.1 : 0} />
      </mesh>
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[active ? 0.16 : 0.12, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={active ? 0.24 : 0.12} />
      </mesh>
      <Html position={[0, 0.34, 0]} center distanceFactor={8}>
        <button
          type="button"
          onClick={() => onSelect(marker)}
          className={`whitespace-nowrap rounded-full border px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] transition-all ${active ? 'border-white bg-white text-black shadow-[0_10px_28px_rgba(0,0,0,0.22)]' : 'border-white/35 bg-black/55 text-white backdrop-blur-sm'}`}
        >
          {marker.name}
        </button>
      </Html>
    </group>
  );
}

function CameraController({ selectedMarkerId, cinematicMode }) {
  const { camera } = useThree();
  const controlsRef = useRef(null);
  const targetPosition = useMemo(() => {
    if (!selectedMarkerId) return null;
    const marker = MARKER_LAYOUTS[selectedMarkerId];
    return marker ? new THREE.Vector3(marker.x, 0, marker.z) : null;
  }, [selectedMarkerId]);

  useFrame(() => {
    const desiredCamera = targetPosition
      ? new THREE.Vector3(targetPosition.x + 2.1, cinematicMode ? 2.4 : 3.2, targetPosition.z + (cinematicMode ? 2.4 : 3.3))
      : (cinematicMode ? CINEMATIC_CAMERA : DEFAULT_CAMERA);

    const desiredTarget = targetPosition || new THREE.Vector3(0, 0, 0);

    camera.position.lerp(desiredCamera, 0.06);
    if (controlsRef.current) {
      controlsRef.current.target.lerp(desiredTarget, 0.08);
      controlsRef.current.update();
    } else {
      camera.lookAt(desiredTarget);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      minDistance={3.8}
      maxDistance={10}
      maxPolarAngle={Math.PI / 2.1}
      minPolarAngle={Math.PI / 3.8}
    />
  );
}

function Terrain() {
  const texture = useLoader(THREE.TextureLoader, SATELLITE_TEXTURE_URL);

  useEffect(() => {
    texture.wrapS = THREE.ClampToEdgeWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.anisotropy = 8;
  }, [texture]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[MAP_WIDTH, MAP_HEIGHT, 120, 120]} />
        <meshStandardMaterial map={texture} displacementScale={0.35} roughness={1} metalness={0} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[MAP_WIDTH + 0.4, MAP_HEIGHT + 0.4]} />
        <meshStandardMaterial color="#1a1612" roughness={1} />
      </mesh>
    </group>
  );
}

function Scene({ selectedMarkerId, cinematicMode, onSelect }) {
  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight position={[4, 7, 4]} intensity={1.25} castShadow />
      <directionalLight position={[-5, 4, -3]} intensity={0.45} />
      <Terrain />
      {ESTATE_MARKERS.map((marker) => (
        <EstateMarker key={marker.id} marker={marker} active={marker.id === selectedMarkerId} onSelect={onSelect} />
      ))}
      <CameraController selectedMarkerId={selectedMarkerId} cinematicMode={cinematicMode} />
    </>
  );
}

export default function Estate3DMap() {
  const [selectedMarkerId, setSelectedMarkerId] = useState(ESTATE_MARKERS[0]?.id || null);
  const [cinematicMode, setCinematicMode] = useState(false);

  const selectedMarker = useMemo(
    () => ESTATE_MARKERS.find((marker) => marker.id === selectedMarkerId) || ESTATE_MARKERS[0],
    [selectedMarkerId]
  );

  const handleSelect = (marker) => {
    setSelectedMarkerId(marker.id);
  };

  const handleReset = () => {
    setSelectedMarkerId(null);
    setCinematicMode(false);
  };

  return (
    <div className="h-full overflow-hidden rounded-[20px] border border-black/10 bg-[#f5f1ea]">
      <div className="flex flex-col gap-4 border-b border-black/10 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black/45">3D Estate Map</p>
          <h3 className="mb-1 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-normal leading-[1] text-black">Satellite terrain with cinematic motion and live target focus.</h3>
          <p className="mb-0 max-w-2xl font-sans text-[0.92rem] leading-[1.8] text-black/60">Drag to orbit, scroll to zoom, and click any marker to fly in and lock a glowing target ring around it.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => setCinematicMode((current) => !current)} className="border-black/15 bg-white text-black hover:bg-black hover:text-white">
            <Mountain className="mr-2 h-4 w-4" /> {cinematicMode ? 'Standard View' : 'Cinematic View'}
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} className="border-black/15 bg-white text-black hover:bg-black hover:text-white">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset View
          </Button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative min-h-[420px] bg-black">
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <Canvas shadows camera={{ position: [0, 5.8, 6.8], fov: 38 }} className="h-[420px] w-full bg-[#070707] sm:h-[520px]">
            <Scene selectedMarkerId={selectedMarkerId} cinematicMode={cinematicMode} onSelect={handleSelect} />
          </Canvas>
        </div>

        <aside className="border-t border-black/10 bg-[#f7f3ee] p-4 sm:p-6 lg:border-l lg:border-t-0">
          <p className="mb-4 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black/45">Property Markers</p>
          <div className="space-y-3">
            {ESTATE_MARKERS.map((marker) => {
              const active = marker.id === selectedMarkerId;
              return (
                <button
                  key={marker.id}
                  type="button"
                  onClick={() => handleSelect(marker)}
                  className={`w-full rounded-[16px] border px-4 py-4 text-left transition-colors ${active ? 'border-black bg-black text-white' : 'border-black/10 bg-white text-black hover:bg-black hover:text-white'}`}
                >
                  <div className="flex items-start gap-3">
                    <MapPinned className="mt-1 h-4 w-4 shrink-0" />
                    <div>
                      <p className="mb-1 font-sans text-[0.78rem] font-semibold uppercase tracking-[0.18em]">{marker.name}</p>
                      <p className={`mb-0 font-sans text-[0.9rem] leading-[1.7] ${active ? 'text-white/75' : 'text-black/58'}`}>{marker.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-6 rounded-[16px] border border-black/10 bg-white p-4">
            <p className="mb-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black/45">Focused View</p>
            <h4 className="mb-2 font-display text-[1.5rem] font-normal leading-[1.05] text-black">{selectedMarker?.name}</h4>
            <p className="mb-0 font-sans text-[0.92rem] leading-[1.8] text-black/60">{selectedMarker?.description}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}