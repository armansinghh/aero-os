'use client';

import { useState } from 'react';

const WMO_ICONS = {
  0: '☀️', 1: '🌤️', 2: '⛅', 3: '☁️',
  45: '🌫️', 48: '🌫️',
  51: '🌦️', 53: '🌦️', 55: '🌧️',
  61: '🌧️', 63: '🌧️', 65: '🌧️',
  71: '🌨️', 73: '🌨️', 75: '❄️',
  80: '🌦️', 81: '🌧️', 82: '⛈️',
  95: '⛈️', 96: '⛈️', 99: '⛈️',
};
const WMO_LABEL = {
  0: 'Clear sky', 1: 'Mostly clear', 2: 'Partly cloudy', 3: 'Overcast',
  45: 'Fog', 48: 'Fog',
  51: 'Light drizzle', 53: 'Drizzle', 55: 'Heavy drizzle',
  61: 'Light rain', 63: 'Rain', 65: 'Heavy rain',
  71: 'Light snow', 73: 'Snow', 75: 'Heavy snow',
  80: 'Rain showers', 81: 'Rain showers', 82: 'Violent showers',
  95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm',
};

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function search(e) {
    e?.preventDefault();
    if (!city.trim()) return;
    setLoading(true);
    setError('');
    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`
      );
      const geo = await geoRes.json();
      if (!geo.results || geo.results.length === 0) {
        setError('City not found');
        setData(null);
        return;
      }
      const { latitude, longitude, name, country } = geo.results[0];
      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m&temperature_unit=celsius`
      );
      const w = await wRes.json();
      setData({ name, country, ...w.current });
    } catch {
      setError('Could not fetch weather');
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="w-full h-full flex flex-col items-center px-5 py-5 relative overflow-hidden"
      style={{
        background: `
          radial-gradient(circle at 15% 0%, rgba(255,255,255,0.4) 0%, transparent 40%),
          radial-gradient(circle at 85% 100%, rgba(0,168,232,0.18) 0%, transparent 50%),
          linear-gradient(165deg, rgba(220,240,250,0.5) 0%, rgba(179,227,255,0.35) 45%, rgba(128,208,255,0.25) 100%)
        `,
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
      }}
    >
      <form onSubmit={search} className="w-full flex gap-2 mb-4">
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city…"
          className="flex-1 rounded-full px-3 py-1.5 outline-none"
          style={{
            fontSize: '12px',
            fontFamily: '"Segoe UI", Tahoma, sans-serif',
            background: 'rgba(255,255,255,0.6)',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: 'inset 0 1px 3px rgba(0,40,80,0.15)',
            color: '#0a2540',
          }}
        />
        <button type="submit" className="aero-btn" style={{ padding: '0.3rem 1rem', fontSize: '11px' }}>
          Go
        </button>
      </form>

      {loading && <Spinner />}
      {error && !loading && (
        <p style={{ fontSize: '12px', color: '#7a1f1f', fontFamily: 'Tahoma, sans-serif' }}>{error}</p>
      )}

      {data && !loading && (
        <div className="flex flex-col items-center gap-1 mt-2">
          <div style={{ fontSize: '52px', filter: 'drop-shadow(0 4px 8px rgba(0,80,140,0.3))' }}>
            {WMO_ICONS[data.weather_code] ?? '🌡️'}
          </div>
          <h2
            style={{
              fontSize: '30px',
              fontWeight: 700,
              color: '#062640',
              fontFamily: '"Segoe UI", sans-serif',
              textShadow: '0 1px 1px rgba(255,255,255,0.8)',
            }}
          >
            {Math.round(data.temperature_2m)}°C
          </h2>
          <p style={{ fontSize: '13px', color: '#1a3b5c', fontFamily: 'Tahoma, sans-serif', fontWeight: 600 }}>
            {WMO_LABEL[data.weather_code] ?? 'Unknown'}
          </p>
          <p style={{ fontSize: '11px', color: '#1a3b5c', fontFamily: 'Tahoma, sans-serif' }}>
            {data.name}{data.country ? `, ${data.country}` : ''}
          </p>
          <div className="flex gap-4 mt-3 text-center">
            <div>
              <div style={{ fontSize: '10px', color: '#3a6a8f' }}>Humidity</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#062640' }}>
                {data.relative_humidity_2m}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: '10px', color: '#3a6a8f' }}>Wind</div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: '#062640' }}>
                {Math.round(data.wind_speed_10m)} km/h
              </div>
            </div>
          </div>
        </div>
      )}

      {!data && !loading && !error && (
        <p style={{ fontSize: '11px', color: '#3a6a8f', fontFamily: 'Tahoma, sans-serif', marginTop: '20px' }}>
          Search a city to see current conditions.
        </p>
      )}
    </div>
  );
}

function Spinner() {
  return (
    <div
      style={{
        width: 28,
        height: 28,
        borderRadius: '50%',
        border: '3px solid rgba(0,120,200,0.25)',
        borderTopColor: '#0077B6',
        animation: 'spin 0.8s linear infinite',
      }}
    >
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}