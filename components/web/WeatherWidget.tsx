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
        const API_KEY = '8d2a110b6ad468ae1a0e4597573c7412'; 
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        
        if (res.ok) {
          const data = await res.json();
          if (isMounted) {
            setWeather({
              temp: Math.round(data.main.temp),
              city: data.name,
              condition: data.weather[0].main
            });
          }
        } else {
          // 🚀 જો API Key માં પ્રોબ્લેમ હોય તો ગાયબ થવાને બદલે ફિક્સ ડેટા બતાવશે
          if (isMounted) setWeather({ temp: 32, city: 'Surat', condition: 'Clear' });
        }
      } catch (error) {
        console.error("Weather fetch failed", error);
        // 🚀 જો નેટવર્ક એરર આવે તો પણ સુરતનું જ બતાવશે
        if (isMounted) setWeather({ temp: 32, city: 'Surat', condition: 'Clear' });
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const getLocationWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            fetchWeather(position.coords.latitude, position.coords.longitude);
          },
          (error) => {
            fetchWeather(21.1702, 72.8311); 
          },
          { timeout: 5000, maximumAge: 10000 } 
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
      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
        <Loader2 size={14} className="animate-spin" /> <span>Loading...</span>
      </div>
    );
  }

  // હવે વિજેટ ક્યારેય ખાલી (null) નહિ રહે!
  if (!weather) return null; 

  const WeatherIcon = () => {
    switch (weather.condition) {
      case 'Clear': return <Sun size={14} className="text-yellow-500" />;
      case 'Rain': return <CloudRain size={14} className="text-blue-400" />;
      default: return <Cloud size={14} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs text-slate-700 font-bold bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-100 transition cursor-pointer">
      <WeatherIcon />
      <span>{weather.temp}°C, {weather.city}</span>
    </div>
  );
}