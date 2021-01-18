/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState } from 'react';

export interface IIndicatorProps {
    numberOfImages: number;
    currentIndex: number;
}
 
const Indicator = ({ numberOfImages, currentIndex }: IIndicatorProps) => {

    const [itmes, setItems] = useState<any[]>([]) 

    useEffect(() => {
        fillItem()
    },[currentIndex, numberOfImages])

    const fillItem = () => {
        const itm = []
        for(let i = 0; i < numberOfImages; i++) {
            itm.push(makeDot(currentIndex === i, i))
        }
        setItems(itm)
    }

    const makeDot = (isActive: boolean, index: number) => {
        return <div key={index} className={`dot ${isActive ? "dot-active": "dot-inactive"}`}/>
    }

    return ( 
        <div className="indicator">
            {itmes}
        </div>
     );
}
 
export default Indicator;