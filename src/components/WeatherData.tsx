import React, { useCallback, useEffect, useState } from 'react';
import { Sites } from '../contexts/SitesContext';

export function WeatherData(): React.JSX.Element {
  useEffect(() => {
    fetchWeatherData();
    const intervalId = setInterval(fetchWeatherData, 15000);
    return () => {
      clearInterval(intervalId);
    };
  });

  function weatherApi(method) {
    const WeatherServer = 'http://10.23.1.25:8001';
  }

  async function fetchWeatherData() {
    let data;
    const url: string = weatherServer + 'is_safe';

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      data = await response.json();
      console.log('fetchSites(): url: ', url, ', response: ', response);
    } catch (error) {
      console.error('fetchSites(): url: ', url, ', Error fetching data:', error);
    }
    return data as Sites;
  }
}
