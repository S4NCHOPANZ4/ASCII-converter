import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const ImageToAcsii = ({ imageUrl, fontSize }) => {
  const canvasRef = useRef(null);
  const artRef = useRef(null);


  const [imgStr, setImgStr] = useState('');

  // Función para mapear el brillo a un carácter ASCII
  const getAsciiCharacter = (brightness) => {
    const asciiChars = '@ $#wa*i=;,.    ';
    // .,:!*#$@
    // Scale the brightness to the range of asciiChars array indexes
    const scaledBrightness = Math.floor((brightness / 255) * (asciiChars.length - 1));
    
    // Get the corresponding ASCII character
    const asciiChar = asciiChars.charAt(scaledBrightness);
    
    return asciiChar;
  };

  const  createRows = (arr, length) =>{
    const row = [];
    for (let i = 0; i < arr.length; i += length) {
        const chunk = arr.slice(i, i + length);
        row.push(chunk);
    }
    const imgStr =  createRowsStr(row, 1)
  
    return imgStr;
  }
  
  const createRowsStr = (arr, spacing) =>{
    const rowsWithSpacing = arr.map(row => row.join(" ".repeat(spacing)));
    const asciiArt = rowsWithSpacing.join("\n");
    return asciiArt;
  }


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
  
    // Create a new image
    const img = new Image();
    img.src = imageUrl;
  
    // Wait for the image to load
    img.onload = () => {
      // Set the new size of the canvas
      canvas.width = img.width;
      canvas.height = img.height;
  
      // Draw the original image onto the canvas
      ctx.drawImage(img, 0, 0);
  
      // Get the pixel data from the canvas context
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
  
      // Create an array to store the ASCII characters
      const asciiArray = [];  
      // Iterate over the pixel data and convert it to ASCII characters
      for (let i = 0; i < data.length; i += 4) {
        // Get the color channel values (red, green, blue)
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];
  
        // Calculate the average brightness
        const brightness = (red + green + blue) / 3;
  
        // Convert the average brightness to an ASCII character
        const asciiChar = getAsciiCharacter(brightness);
  
        // Store the ASCII character in the array
        asciiArray.push(asciiChar);
      }
      setImgStr(createRows(asciiArray, imageData.width))
    };
  }, [imageUrl]);

  return (
    <>
    <canvas ref={canvasRef} style={{display: 'none'}}/>
    <pre className='ASCII_IMG' ref={artRef} style={{fontSize: `${fontSize}rem`}}>
      {imgStr}
    </pre>
    </>
  )
}

export default ImageToAcsii