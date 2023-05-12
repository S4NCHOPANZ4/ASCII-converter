import React, { useState, useRef , useEffect} from 'react'
import ImageToAcsii from './components/ImageToAcsii'
import img from './assets/text.png'
import imgS from './assets/textS.png'
import AddIcon from '@mui/icons-material/Add';
import './style/index.css'

function App() {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(img);
  const [imageDisplay, setImageDisplay] = useState(imgS);
  const [scale, setScale] = useState(100);
  const [fontSize, setFont] = useState(0.3)
  const [minimun, setMin] = useState(true)

  //In case we are using width old  
  const setFontSize = (newDim, oldDim) =>{
    if(newDim > oldDim){
      newDim = oldDim 
    }
    const scale = 30 * oldDim 
    const newScale = 30 * newDim
    const newFontSize = ((scale / newScale) * 30)/100

    return newFontSize

  }

  const sendImg = (file, scaleWidth) =>{
    const reader = new FileReader();


    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        
        if(scaleWidth <= 9){
          setMin(false)
        }
        else{ 
          setMin(true)
        }

        if(scaleWidth > 120){
            scaleWidth = 120;
        }
   
        
        setFont(setFontSize(scaleWidth, 120))

        const maxWidth =  scaleWidth; // Ancho máximo deseado
        const maxHeight = 100; // Alto máximo deseado

        let width = img.width;
        let height = img.height;

        // Reescalar la imagen si supera los límites de ancho y alto
        if (width > maxWidth || height > maxHeight) {
          const aspectRatio = width / height;
          if (width > maxWidth) {
            width = maxWidth;
            height = width / aspectRatio;
          }
          if (height > maxHeight) {
            height = maxHeight;
            width = height * aspectRatio;
          }
        }

        // Establecer las dimensiones del canvas
        canvas.width = width;
        canvas.height = height;

        // Dibujar la imagen en el canvas con las dimensiones reescaladas
        ctx.drawImage(img, 0, 0, width, height);

        // Obtener la URL de la imagen reescalada
        const scaledImageUrl = canvas.toDataURL('image/jpeg');

        // Establecer la URL de la imagen reescalada en el estado
        setImagePreviewUrl(scaledImageUrl);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    console.log(file);
    setImageDisplay(imageUrl)
  };
 
  return (

    <div className='super'>
       <div className='develpedBy'>
          <p>Developed by Juan Buitrago 💻</p>
      </div>
      <div className='title'>
          <h1>Pixel to ASCII</h1>
        </div>
      <div className='main_cont'>
      <div className='side_cont'>
      
          <div className='img_cont'>
            <img src={imageDisplay} alt="" className=''/>
            <label for="file" class="file-input-button"><AddIcon/></label>

          </div>
          <div className='inp_cont'>
            <form onSubmit={(e)=>{
              e.preventDefault();
              const width = e.target.elements.width.value;
              const img = e.target.elements.file.files[0];
              sendImg(img, width)
            }}>
              <input type="file" name="file" id="file"  onChange={handleImageUpload} />
              <div className='scale_cont'>
                <div className='scale_sub_cont'>
                  <p className='res'>Res: </p>
                  <input type="number" name="width" value={scale} onChange={(e)=>{setScale(e.target.value)}}/>
                  <p className='char'>char</p>
                </div>
                <button type='submit'>Convert</button>  
              </div>
              
            </form>
          </div>
        </div>
        <div>
          {minimun?
          <ImageToAcsii imageUrl={imagePreviewUrl} fontSize={fontSize}/>
          :
          <div className='ASCII_IMG'>
            Resolution error
          </div>
          }
        </div>
      </div>
  </div>
  )
}

export default App
