'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Loader2 } from 'lucide-react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // ૧. રિયલ-ટાઇમ લોકેશનનું નામ લાવવા માટે (ફ્રી - No API Key)
        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const geoData = await geoRes.json();
        const city = geoData.city || geoData.locality || geoData.principalSubdivision || 'Unknown';

        // ૨. રિયલ-ટાઇમ હવામાન લાવવા માટે (Open-Meteo - ફ્રી - No API Key)
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherRes.json();
        
        if (isMounted && weatherData.current_weather) {
          const temp = Math.round(weatherData.current_weather.temperature);
          const code = weatherData.current_weather.weathercode;
          
          // હવામાન મુજબ આઇકોન સેટ કરવા (0-1: Clear, 50-99: Rain, બાકી Cloud)
          let condition = 'Cloudy'; 
          if (code === 0 || code === 1) condition = 'Clear';
          else if (code >= 50 && code <= 99) condition = 'Rain';

          setWeather({ temp, city, condition });
        }
      } catch (error) {
        console.error("Real-time weather failed", error);
        // જો યુઝરનું નેટ જ બંધ હોય તો આ દેખાશે
        if (isMounted) setWeather({ temp: '--', city: 'Offline', condition: 'Cloudy' });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const getLocationWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // ફોનનું એક્ઝેટ લોકેશન લેશે
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            // જો યુઝર લોકેશન આપવાની ના પાડે તો ડિફોલ્ટ સુરત લેશે
            fetchWeather(21.1702, 72.8311); 
          },
          // enableHighAccuracy થી એકદમ પાવરફુલ GPS લોકેશન પકડશે
          { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 } 
        );
      } else {
        fetchWeather(21.1702, 72.8311);
      }
    };

    getLocationWeather();

    return () => { isMounted = false; };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
        <Loader2 size={14} className="animate-spin text-blue-500" /> <span>Fetching...</span>
      </div>
    );
  }

  if (!weather) return null; 

  const WeatherIcon = () => {
    switch (weather.condition) {
      case 'Clear': return <Sun size={14} className="text-yellow-500" />;
      case 'Rain': return <CloudRain size={15} className="text-blue-500 drop-shadow-sm" />;
      default: return <Cloud size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs text-slate-800 font-bold bg-white px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-50 transition cursor-pointer shadow-sm">
      <WeatherIcon />
      <span>{weather.temp}°C, {weather.city}</span>
    </div>
  );
}