import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../lotties/car.json';

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
        }}>
            <Lottie
                options={defaultOptions}
            />
        </div>
    );
};

export default Loader;