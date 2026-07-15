'use client';

import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'aero_volume_state';

const defaultState = 65;

let currentVolume = defaultState;
const listeners = new Set();

function readStoredVolume() {
  if (typeof window === 'undefined') {
    return defaultState;
  }

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      return defaultState;
    }

    const parsed = Number(stored);
    if (Number.isNaN(parsed)) {
      return defaultState;
    }

    return Math.max(0, Math.min(100, parsed));
  } catch {
    return defaultState;
  }
}

function emitVolume(nextVolume) {
  currentVolume = nextVolume;
  listeners.forEach((listener) => listener(nextVolume));
}

function persistVolume(nextVolume) {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, String(nextVolume));
  }
}

export function useVolumeState() {
  const [volume, setVolumeState] = useState(() => {
    currentVolume = readStoredVolume();
    return currentVolume;
  });

  useEffect(() => {
    const listener = (nextVolume) => setVolumeState(nextVolume);
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const handleStorage = (event) => {
      if (event.key === STORAGE_KEY && event.newValue !== null) {
        const nextVolume = Number(event.newValue);
        if (!Number.isNaN(nextVolume)) {
          emitVolume(Math.max(0, Math.min(100, nextVolume)));
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const setVolume = useCallback((nextVolume) => {
    const normalized = Math.max(0, Math.min(100, Number(nextVolume)));
    persistVolume(normalized);
    emitVolume(normalized);
  }, []);

  return [volume, setVolume];
}
