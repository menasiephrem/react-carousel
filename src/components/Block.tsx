/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useState, useEffect } from 'react';
import { apiResponse } from '../data/apiResponse';
import ImageContainer, { IImageContainerProps } from './ImageCotainer';
import { useRef } from 'react';


 
const Blocks = () => {

    const [data, setData] = useState<any>([])
    const [nextDisable, setNextDisable] = useState<boolean>(false)
    const [prevDisable, setPrevDisable] = useState<boolean>(false)
    const currentIndexRef = useRef(0)

    useEffect(() => {
        loadBlock(0)
    }, [])
    
    const loadBlock = (startingIndex: number) => {
        setData([])
        const cloneRespone = [...apiResponse];
        const end = startingIndex + 4 > cloneRespone.length?  cloneRespone.length: startingIndex + 4
        const d = cloneRespone.splice(startingIndex, end - startingIndex)
        setNextDisable(end >= apiResponse.length)
        setPrevDisable(startingIndex === 0)
        setData(d)
    }

    const onNext = () => {
        if(!nextDisable){
            setPrevDisable(false)
            const i = currentIndexRef.current;
            const nextI = i + 4 > apiResponse.length ? apiResponse.length : i + 4
            currentIndexRef.current = nextI;
            loadBlock(nextI)
        }
    }


    const onPrev = () => {
        if(!prevDisable){
            setNextDisable(false)
            const i = currentIndexRef.current;
            const prevI =  i - 4 < 0 ? 0 : i - 4;
            currentIndexRef.current = prevI;
            loadBlock(prevI)
        }
    }

    return ( 
        <div className="block lg-block">
            <span onClick={onPrev} className={`previous ${prevDisable? "disabled": ""}`}>&#8249;</span>
           {
               data.map(({title, images}: IImageContainerProps, index: number )=> <ImageContainer key={index} title={title} images={images}/>)
           } 
           <span onClick={onNext} className={`next  ${nextDisable? "disabled": ""}`}>&#8250;</span>
        </div>
     );
}
 
export default Blocks;