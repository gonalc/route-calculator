import axios from 'axios';

/**
 * Get the coordinate for a given place.
 * @param address {String} Place you want to know its coordinates.
 * @returns {number[]} Coordinates in array format [longitude, latitude]
 */
export const geocodingPlace = async (address: string) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${process.env.REACT_APP_PK}`;
    try {
        const response = await axios.get(url);
        const coordinates = response.data.features[0].center;
        const nearbyUrl = `http://router.project-osrm.org/nearest/v1/driving/${coordinates[1]},${coordinates[0]}.json`;
        const nearbyCoords = await axios.get(nearbyUrl);
        console.log({ nearbyCoords });
        const finalCoords = nearbyCoords.data.waypoints[0].location;
        return finalCoords;
    } catch (err) {
        console.error('Error getting coordinates: ', err);
    }
};

export const getOptimizedRoute = async (coordinates: string) => {
    const url = `http://router.project-osrm.org/route/v1/car/${coordinates}?geometries=geojson`;
    console.log({ url });
    try {
        const response = await axios.get(url);
        console.log({ response });
        return response.data;
    } catch (err) {
        console.error('Error getting route: ', err);
    }
};

/**
 * Reorder coordinates for properly displaying.
 * @param array {[number, number]} Coordinates
 * @returns Reversed Array,
 */
export const reverseCoords = (array: [number, number]): [number, number] => [array[1], array[0]];

