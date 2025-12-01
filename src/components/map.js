// import { useEffect, useRef } from 'react';

// const MapSelector = ({ latitude, longitude, onLocationChange }) => {
//   const mapRef = useRef(null);
//   const mapInstanceRef = useRef(null); 
//   const markerRef = useRef(null);

//   useEffect(() => {
//     let isMounted = true;

//     const initMap = async () => {
//       if (typeof window === 'undefined') return;

//       try {
//         const L = await import('leaflet');

//         const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
//         const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
        
//         const markerIcon = new L.Icon({
//           iconUrl,
//           shadowUrl,
//           iconSize: [25, 41],
//           iconAnchor: [12, 41],
//           popupAnchor: [1, -34],
//           shadowSize: [41, 41],
//         });

//         if (mapInstanceRef.current) {
//           mapInstanceRef.current.remove();
//           mapInstanceRef.current = null;
//         }

//         const map = L.map('map').setView(
//           [latitude || 3.848, longitude || 11.502],
//           13
//         );
//         mapInstanceRef.current = map;

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//           attribution: '© OpenStreetMap contributors',
//         }).addTo(map);

//         if (latitude && longitude) {
//           markerRef.current = L.marker([latitude, longitude], { 
//             icon: markerIcon 
//           }).addTo(map);
//         }

//         map.on('click', (e) => {
//           const { lat, lng } = e.latlng;
          
//           if (markerRef.current) {
//             map.removeLayer(markerRef.current);
//           }
          
//           markerRef.current = L.marker([lat, lng], { 
//             icon: markerIcon 
//           }).addTo(map);
          
//           if (isMounted && onLocationChange) {
//             onLocationChange(lat, lng);
//           }
//         });
//       } catch (error) {
//         console.error('Error initializing map:', error);
//       }
//     };

//     initMap();

//     return () => {
//       isMounted = false;
//       if (mapInstanceRef.current) {
//         mapInstanceRef.current.remove();
//         mapInstanceRef.current = null;
//       }
//     };
//   }, [latitude, longitude, onLocationChange]);

//   return (
//     <>
//       <link
//         rel="stylesheet"
//         href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
//       />
//       <div 
//         id="map" 
//         ref={mapRef}
//         style={{
//           height: '16rem',
//           width: '100%',
//           borderRadius: '0.375rem',
//           border: '1px solid #e5e7eb'
//         }}
//       />
//     </>
//   );
// };

// export default MapSelector;

import { useEffect, useRef } from 'react';

const MapSelector = ({ latitude, longitude, onLocationChange }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null); 
  const markerRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const initMap = async () => {
      if (typeof window === 'undefined') return;

      try {
        const L = await import('leaflet');

        const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
        const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
        
        const markerIcon = new L.Icon({
          iconUrl,
          shadowUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        const map = L.map('map').setView(
          [latitude || 3.848, longitude || 11.502],
          13
        );
        mapInstanceRef.current = map;

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
        }).addTo(map);

        if (latitude && longitude) {
          markerRef.current = L.marker([latitude, longitude], { 
            icon: markerIcon 
          }).addTo(map);
        }

        map.on('click', (e) => {
          const { lat, lng } = e.latlng;
          
          if (markerRef.current) {
            map.removeLayer(markerRef.current);
          }
          
          markerRef.current = L.marker([lat, lng], { 
            icon: markerIcon 
          }).addTo(map);
          
          if (isMounted && onLocationChange) {
            onLocationChange(lat, lng);
          }
        });
      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, ); // Initialisation une seule fois

  // Effet séparé pour mettre à jour la position de la carte et du marqueur
  useEffect(() => {
    const updateMapPosition = async () => {
      if (!mapInstanceRef.current || !latitude || !longitude ) return;

      try {
        const L = await import('leaflet');

        const iconUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png';
        const shadowUrl = 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png';
        
        const markerIcon = new L.Icon({
          iconUrl,
          shadowUrl,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });

        // Déplacer la vue de la carte
        mapInstanceRef.current.setView([latitude, longitude], 13);

        // Supprimer l'ancien marqueur s'il existe
        if (markerRef.current) {
          mapInstanceRef.current.removeLayer(markerRef.current);
        }

        // Ajouter le nouveau marqueur
        markerRef.current = L.marker([latitude, longitude], { 
          icon: markerIcon 
        }).addTo(mapInstanceRef.current);
      } catch (error) {
        console.error('Error updating map position:', error);
      }
    };

    updateMapPosition();
  }, [latitude, longitude]); // Se déclenche quand les coordonnées changent

  return (
    <>
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      />
      <div 
        id="map" 
        ref={mapRef}
        style={{
          height: '16rem',
          width: '100%',
          borderRadius: '0.375rem',
          border: '1px solid #e5e7eb'
        }}
      />
    </>
  );
};

export default MapSelector;