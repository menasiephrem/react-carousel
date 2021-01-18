
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import Indicator from './Indicator';
/* eslint-disable react-hooks/exhaustive-deps */
export interface IImageContainerProps {
    images: string[];
    title: string;
}
 
const ImageContainer = ({images, title}: IImageContainerProps) => {
    
    const [currentIndex, setCurrentIndex] = useState<number>(0)

    const intervaRef = useRef<any>()
    const indexRef = useRef(currentIndex)

    useEffect(()=>{
     intervaRef.current  = setInterval(() => {
         const nextIndex = (indexRef.current + 1) % images.length
         setCurrentIndex(nextIndex)
         indexRef.current = nextIndex;
      }, 4000)  
      
      return () => {
          clearInterval(intervaRef.current)
      }

    }, [images, title])

    const currentUrl = images[currentIndex]
    return ( 
        <div title={title}>
            <div className="img-container" style={{backgroundImage: `url(${currentUrl})` }}>
                <Indicator currentIndex={currentIndex} numberOfImages={images.length}/>
            </div>
        </div>
     );
}
 
export default ImageContainer;