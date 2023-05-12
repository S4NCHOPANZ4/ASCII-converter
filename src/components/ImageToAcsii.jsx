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
    // Escalar el brillo al rango de índices del array asciiChars
    const scaledBrightness = Math.floor((brightness / 255) * (asciiChars.length - 1));
    
    // Obtener el carácter ASCII correspondiente
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

  const captureArt = async () => {
    const artElement = artRef.current;

    // Crear una captura de la imagen utilizando html2canvas
    const canvas = await html2canvas(artElement);

    // Obtener el URL de la imagen
    const imageUrl = canvas.toDataURL('image/png');

    // Lógica para compartir la imagen en el chat de Twitch
    // Puedes utilizar la API de carga de imágenes de Twitch o servicios externos como Imgur
    // Ejemplo: twitchChat.sendMessage(`¡Mira mi arte ASCII convertido en imagen: ${imageUrl}!`);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Crear una nueva imagen
    const img = new Image();
    img.src = imageUrl;

    // Esperar a que la imagen cargue
    img.onload = () => {
      // Establecer el nuevo tamaño del canvas
      canvas.width = img.width;
      canvas.height = img.height;

      // Dibujar la imagen original en el canvas
      ctx.drawImage(img, 0, 0);

      // Obtener los datos de los píxeles en el contexto del canvas
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      console.log(imageData);
      // Crear un array para almacenar los caracteres ASCII
      const asciiArray = [];  
      // Recorrer los datos de los píxeles y convertirlos en caracteres ASCII
      for (let i = 0; i < data.length; i += 4) {
        // Obtener los valores de los canales de color (rojo, verde, azul)
        const red = data[i];
        const green = data[i + 1];
        const blue = data[i + 2];

        // Calcular el brillo promedio
        const brightness = (red + green + blue) / 3;

        // Convertir el brillo promedio en un carácter ASCII
        const asciiChar = getAsciiCharacter(brightness);

        // Almacenar el carácter ASCII en el array
        asciiArray.push(asciiChar);
      }
      setImgStr(createRows(asciiArray, imageData.width))

      captureArt()
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