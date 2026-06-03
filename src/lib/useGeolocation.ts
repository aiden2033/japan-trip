import { useCallback, useEffect, useState } from 'react';
import type { LatLng } from './geo';

type GeoStatus = 'idle' | 'locating' | 'ready' | 'unavailable';

export interface Geolocation {
  position: LatLng | null;
  status: GeoStatus;
  supported: boolean;
  request: () => void;
}

const supported = typeof navigator !== 'undefined' && 'geolocation' in navigator;

export const useGeolocation = (): Geolocation => {
  const [position, setPosition] = useState<LatLng | null>(null);
  const [status, setStatus] = useState<GeoStatus>(supported ? 'idle' : 'unavailable');

  const request = useCallback(() => {
    if (!supported) return;
    setStatus('locating');
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        setStatus('ready');
      },
      () => setStatus('unavailable'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
  }, []);

  useEffect(() => {
    if (!supported) return;
    let active = true;
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        if (!active) return;
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        setStatus('ready');
      },
      () => active && setStatus('unavailable'),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    );
    return () => {
      active = false;
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { position, status, supported, request };
};
