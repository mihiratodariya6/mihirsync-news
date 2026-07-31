'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Loader2 } from 'lucide-react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // યુઝરનું લોકેશન લેવા માટે
    const getLocationWeather = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(latitude, longitude);
          },
          (error) => {
            console.error("Location access denied", error);
            // જો કોઈ લોકેશન ના આપે તો Default (Surat) નું બતાવશે
            fetchWeather(21.1702, 72.8311); 
          }
        );
      } else {
        // Default Surat
        fetchWeather(21.1702, 72.8311);
      }
    };

    // OpenWeather API માંથી ડેટા લેવા
    const fetchWeather = async (lat: number, lon: number) => {
      try {
        // ફ્રી API Key (આ સીધી ચાલશે)
        const API_KEY = '8d2a110b6ad468ae1a0e4597573c7412'; 
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        const data = await res.json();
        
        if (res.ok) {
          setWeather({
            temp: Math.round(data.main.temp),
            city: data.name,
            condition: data.weather[0].main
          });
        }
      } catch (error) {
        console.error("Weather fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    getLocationWeather();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
        <Loader2 size={14} className="animate-spin" /> Fetching weather...
      </div>
    );
  }

  if (!weather) return null;

  // હવામાન મુજબ આઇકોન બદલાશે
  const WeatherIcon = () => {
    switch (weather.condition) {
      case 'Clear': return <Sun size={14} className="text-yellow-400" />;
      case 'Rain': return <CloudRain size={14} className="text-blue-300" />;
      default: return <Cloud size={14} className="text-slate-200" />;
    }
  };

  return (
    <div className="flex items-center gap-2 text-xs text-slate-700 font-bold bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200 hover:bg-slate-200 transition cursor-pointer">
      <WeatherIcon />
      <span>{weather.temp}°C, {weather.city}</span>
    </div>
  );
}