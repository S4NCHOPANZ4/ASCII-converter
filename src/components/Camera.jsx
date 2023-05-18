import React, {useRef, useEffect, useState } from 'react'
import Webcam from 'react-webcam';
import VideoToAcsii from './VideoToAcsii';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Camera = () => {
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const [imgSrctoAscii, setimgSrctoAscii] = useState('');  

    useEffect(() => {
      const captureFrame = () => {
        const video = webcamRef.current.video;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        // Set canvas dimensions to match the video element
        canvas.width = 380;
        canvas.height = 120;

  
        // Draw the current video frame on the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
        // Get the image data from the canvas and update the image element
        const imageData = canvas.toDataURL('image/jpeg');
        imageRef.current.src = imageData;
        setimgSrctoAscii(imageData)

        // Call captureFrame again to continuously capture frames
        requestAnimationFrame(captureFrame);
      };
  
      captureFrame();
    }, []);

  
    return (
      <div className="camera_super" style={{display: 'flex'}}>
        <div className='camera_container'>
          <Webcam
            className='camera'
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
          />
          <div className='camera_back'>
            <CameraAltIcon  className='icon'/>
            <h1>Your Camera Here</h1>
            <p>Don't forget to activate you camera</p>
          </div>
        </div>
        <canvas ref={canvasRef}  style={{ display: 'none' }}/>
        <VideoToAcsii imgURL={imgSrctoAscii}/>
        <img ref={imageRef} alt="Camera Frame" style={{ display: 'none' }}/>
      </div>
    );
  }
export default Camera