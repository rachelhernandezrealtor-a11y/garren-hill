import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Viewer, Entity, CameraFlyTo } from 'resium';
import { Cartesian3, Color, Math as CesiumMath, Ion, createWorldTerrainAsync, VerticalOrigin } from 'cesium';
import { Button } from '@/components/ui/button';
import { MapPinned, Mountain, RotateCcw } from 'lucide-react';
import { ESTATE_CAMERA_VIEWS, ESTATE_MARKERS } from './estateTerrainData';
// Cesium widgets CSS is imported where this component is used to avoid loading it on pages that don't render Cesium.
// If this viewer appears on multiple routes, consider a layout-level guarded import.
import 'cesium/Build/Cesium/Widgets/widgets.css';

const token = import.meta.env.VITE_CESIUM_ION_ACCESS_TOKEN || '';
if (token) {
  Ion.defaultAccessToken = token;
}

function toCartesian(point) {
  return Cartesian3.fromDegrees(point.longitude, point.latitude, point.height || 0);
}

function toCameraConfig(view) {
  return {
    destination: toCartesian(view.destination),
    orientation: {
      heading: view.orientation.heading,
      pitch: view.orientation.pitch,
      roll: view.orientation.roll,
    },
    duration: 2.8,
  };
}

export default function CesiumEstateViewer() {
  const viewerRef = useRef(null);
  const [terrain, setTerrain] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(ESTATE_MARKERS[0].id);
  const [cameraView, setCameraView] = useState('overview');

  useEffect(() => {
    let mounted = true;
    createWorldTerrainAsync().then((worldTerrain) => {
      if (mounted) setTerrain(worldTerrain);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const selectedMarker = useMemo(
    () => ESTATE_MARKERS.find((marker) => marker.id === selectedMarkerId) || ESTATE_MARKERS[0],
    [selectedMarkerId]
  );

  const flyToMarker = (marker) => {
    setSelectedMarkerId(marker.id);
    setCameraView('marker');
    const viewer = viewerRef.current?.cesiumElement;
    if (!viewer) return;
    viewer.camera.flyTo({
      destination: Cartesian3.fromDegrees(marker.longitude, marker.latitude, (marker.height || 0) + 320),
      orientation: {
        heading: CesiumMath.toRadians(18),
        pitch: CesiumMath.toRadians(-32),
        roll: 0,
      },
      duration: 2.4,
    });
  };

  const resetView = () => {
    setCameraView('overview');
  };

  if (!token) {
    return null;
  }

  return (
    <div className="h-full overflow-hidden rounded-[20px] border border-black/10 bg-[#f5f1ea]">
      <div className="flex flex-col gap-4 border-b border-black/10 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="mb-2 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-black/45">3D Terrain Viewer</p>
          <h3 className="mb-1 font-display text-[clamp(1.5rem,3vw,2.4rem)] font-normal leading-[1] text-black">Rotate, tilt, and explore the estate topography.</h3>
          <p className="mb-0 max-w-2xl font-sans text-[0.92rem] leading-[1.8] text-black/60">Use touch or mouse controls to move through the land. Select a marker for a guided cinematic flyover.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" onClick={() => setCameraView('cinematic')} className="border-black/15 bg-white text-black hover:bg-black hover:text-white">
            <Mountain className="mr-2 h-4 w-4" /> Cinematic View
          </Button>
          <Button type="button" variant="outline" onClick={resetView} className="border-black/15 bg-white text-black hover:bg-black hover:text-white">
            <RotateCcw className="mr-2 h-4 w-4" /> Reset View
          </Button>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="relative min-h-[420px] bg-black">
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-black/35 via-transparent to-black/10" />
          <Viewer
            ref={viewerRef}
            full
            terrainProvider={terrain || undefined}
            animation={false}
            timeline={false}
            sceneModePicker={false}
            baseLayerPicker={false}
            geocoder={false}
            homeButton={false}
            navigationHelpButton={false}
            infoBox={false}
            selectionIndicator={false}
            fullscreenButton={false}
            shouldAnimate
            className="h-[420px] w-full sm:h-[520px]"
          >
            {cameraView !== 'marker' && <CameraFlyTo {...toCameraConfig(ESTATE_CAMERA_VIEWS[cameraView])} once />}
            {ESTATE_MARKERS.map((marker) => (
              <Entity
                key={marker.id}
                name={marker.name}
                position={toCartesian(marker)}
                point={{
                  pixelSize: marker.id === selectedMarkerId ? 18 : 14,
                  color: marker.id === selectedMarkerId ? Color.WHITE : Color.fromCssColorString('#d6c2a2'),
                  outlineColor: Color.BLACK,
                  outlineWidth: 2,
                }}
                label={{
                  text: marker.name,
                  fillColor: Color.WHITE,
                  showBackground: true,
                  backgroundColor: Color.fromCssColorString('rgba(0,0,0,0.58)'),
                  font: '600 12px DM Sans',
                  pixelOffset: new Cartesian3(0, -28, 0),
                  verticalOrigin: VerticalOrigin.BOTTOM,
                }}
                onClick={() => flyToMarker(marker)}
              />
            ))}
          </Viewer>
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
                  onClick={() => flyToMarker(marker)}
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
            <h4 className="mb-2 font-display text-[1.5rem] font-normal leading-[1.05] text-black">{selectedMarker.name}</h4>
            <p className="mb-0 font-sans text-[0.92rem] leading-[1.8] text-black/60">{selectedMarker.description}</p>
          </div>
        </aside>
      </div>
    </div>
  );
}