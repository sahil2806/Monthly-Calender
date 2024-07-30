/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { color } from 'framer-motion';
import React from 'react'

const EventItem = ({info}) => {
    const  getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    const response = getRandomColor();

    const { event } = info;
    return (
        <div style={{ backgroundColor: response, color: 'white', borderRadius: '25px', width: '100%', textAlign: 'center' }}>
            <p>{event.title}</p>
        </div>
    );
}
 

export default EventItem