import React, { useState } from 'react'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ImageIcon from '@mui/icons-material/Image';
import './style/index.css'
import ImgA from './pages/ImgA';
import VideoA from './pages/VideoA';

function App() {

  const [page, setPage] = useState(true) 

  return (

    <>
        <div className='title'>
          <h1>Pixel to ASCII</h1>
          <div className='buttons_nav'>
              <button onClick={()=>{
                setPage(true)
              }}> <ImageIcon style={page? {color: 'white'} : {}}/> </button>
              <button onClick={()=>{
                setPage(false)
              }}><CameraAltIcon style={page?  {} : {color: 'white'}}  /></button>
          </div>
        </div>
        <div className='develpedBy'>
          <p>Developed by Juan Buitrago 💻</p>
        </div>
        {page? 
        <ImgA/>
        :
        <VideoA/>
        }
      
    </>
  )
}

export default App
