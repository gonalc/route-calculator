import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import {
    selectMap,
} from './mapSlice';
import styles from './Map.module.css';
import { reverseCoords } from '../../data';

mapboxgl.accessToken = process.env.REACT_APP_PK || '';

type MapProps = {
    geometry: [number, number][];
}

const Map = ({ geometry }: MapProps) => {
    const { zoom } = useSelector(selectMap);
    const mapContainer = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainer.current!,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: reverseCoords(geometry[Math.floor(geometry.length / 2)]),
            zoom
        });
        // Add marker at origin
        new mapboxgl.Marker()
            .setLngLat(reverseCoords(geometry[0]))
            .addTo(map);
        
        // Add marker at destination
        new mapboxgl.Marker()
            .setLngLat(reverseCoords(geometry[geometry.length - 1]))
            .addTo(map);
    }, [geometry]);

    return (
        <div className={styles.mapContainer}>
            <div ref={mapContainer} className={styles.map} />
        </div>
    );
};

export default Map;