'use client';

import React, { useState, useEffect } from 'react';
import { Cloud, Sun, CloudRain, Loader2 } from 'lucide-react';

export default function WeatherWidget() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    // 🚀 જાદુઈ મેમરી: 30 મિનિટ સુધી ડેટા સેવ રાખશે
    const CACHE_KEY = 'mihirsync_weather_cache';
    const CACHE_TIME = 30 * 60 * 1000; // 30 મિનિટ

    // સૌથી પહેલા ચેક કરો કે જૂનો સેવ કરેલો ડેટા છે?
    const cachedStr = localStorage.getItem(CACHE_KEY);
    if (cachedStr) {
      try {
        const cached = JSON.parse(cachedStr);
        if (Date.now() - cached.timestamp < CACHE_TIME) {
          setWeather(cached.data);
          setLoading(false);
          return; // 🛑 જો ડેટા મળી જાય, તો અહીંથી જ કોડ અટકી જશે, લોકેશન નહિ માંગે!
        }
      } catch (e) {
        console.error("Cache error");
      }
    }

    const saveToCache = (data: any) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
    };

    const fetchWeather = async (lat: number, lon: number) => {
      try {
        const geoRes = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const geoData = await geoRes.json();
        const city = geoData.city || geoData.locality || geoData.principalSubdivision || 'Unknown';

        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherRes.json();
        
        if (isMounted && weatherData.current_weather) {
          const temp = Math.round(weatherData.current_weather.temperature);
          const code = weatherData.current_weather.weathercode;
          
          let condition = 'Cloudy'; 
          if (code === 0 || code === 1) condition = 'Clear';
          else if (code >= 50 && code <= 99) condition = 'Rain';

          const finalData = { temp, city, condition };
          setWeather(finalData);
          saveToCache(finalData); // 🚀 ડેટાને 30 મિનિટ માટે સેવ કરી લીધો
        }
      } catch (error) {
        console.error("Real-time weather failed", error);
        if (isMounted) setWeather({ temp: '--', city: 'Offline', condition: 'Cloudy' });
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
            // જો યુઝર ના પાડે તો સુરતનું બતાવીને એને પણ સેવ કરી લેશે, જેથી વારેઘડીએ ના પૂછે
            fetchWeather(21.1702, 72.8311); 
          },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 } 
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