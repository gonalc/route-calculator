import React, { FormEvent, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectDistance,
    setDistance,
    setGeometry,
    setLoading,
    selectManualMode,
    setManualMode,
    selectOrigin,
    setOrigin,
    setDestination,
    selectDestination
} from './formSlice';
import styles from './Form.module.css';
import { geocodingPlace, getOptimizedRoute } from '../../data';

const Form = () => {
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const manualMode = useSelector(selectManualMode);
    // Manual mode
    const distance = useSelector(selectDistance);
    // Automatic mode
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);

    useEffect(() => {
        console.log({ distance });
    }, [distance]);

    const submitForm = async (e: FormEvent) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const originCoords = await geocodingPlace(origin);
            const destinationCoords = await geocodingPlace(destination);
            console.log({ originCoords, destinationCoords });
            const stringCoords = `${originCoords[0]},${originCoords[1]};${destinationCoords[0]},${destinationCoords[1]}`;
            const response = await getOptimizedRoute(stringCoords);
            console.log('Final response: ', response);
            dispatch(setDistance(response.routes[0].distance));
            dispatch(setGeometry(response.routes[0].geometry.coordinates));
            setErrorMessage('');
        } catch (err) {
            console.error('Error geocoding: ', err);
            setErrorMessage('Try to enter a new place to go to/from');
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <div className='Form'>
            <h1>Calculate route price</h1>
            <div className={styles.pricesContainer}>
                <p>Van: 0,25€/Km</p>
                <p>Truck: 0,50€/Km</p>
            </div>
            <div className="toggle-input-mode-container">
                <div className={styles.toggleContainer} onClick={() => dispatch(setManualMode(!manualMode))}>
                    <p>Manual</p>
                    <div className={`${styles.circleContainer} ${manualMode ? styles.left : styles.right}`}>
                        <div className={styles.innerCircle} />
                    </div>
                    <p>Automatic</p>
                </div>
            </div>
            {manualMode ? (
                <>
                    <p>Enter distance in meters.</p>
                    <div className="inputContainer distance">
                        <input
                            type="number"
                            placeholder="Distance in meters"
                            min="0"
                            onChange={(e) => dispatch(setDistance(Number(e.target.value)))}
                            value={distance}
                        />
                    </div>
                </>
            ) : (
                    <form onSubmit={(e) => submitForm(e)}>
                        <div className="input-container origin">
                            <input
                                type="text"
                                placeholder="Origin"
                                onChange={(e) => dispatch(setOrigin(e.target.value))}
                                value={origin}
                            />
                        </div>
                        <div className="input-container destination">
                            <input
                                type="text"
                                placeholder="Destination"
                                onChange={(e) => dispatch(setDestination(e.target.value))}
                                value={destination}
                            />
                        </div>
                        <div className="btn-container">
                            <button
                                className={`btn ${origin.length === 0 || destination.length === 0 ? 'disabled' : ''}`}
                                disabled={origin.length === 0 || destination.length === 0}
                            >
                                Check
                            </button>
                        </div>
                    </form>
                )}
            {errorMessage?.length > 0 && (
                <div className={styles.errorMessageContainer}>
                    <p>{errorMessage}</p>
                </div>
            )}
            {distance > 0 && (
                <div className="finalPriceContainer">
                    <p>The total cost of your {(distance / 1000).toFixed(0)}km trip is:</p>
                    <h2>{((distance / 1000) * 0.25).toFixed(2)}€ by van</h2>
                    <h2>{((distance / 1000) * 0.5).toFixed(2)}€ by truck</h2>
                </div>
            )}
        </div>
    );
};

export default Form;