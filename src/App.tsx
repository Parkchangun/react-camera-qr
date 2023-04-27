import { useEffect, useRef, useState } from 'react'
// https://www.npmjs.com/package/@zxing/browser
import { BrowserQRCodeReader } from '@zxing/browser'
// https://www.npmjs.com/package/react-webcam
import Webcam from 'react-webcam'

function App() {
  const [isSuccess, setIsSuccess] = useState(false)
  const isMounted = useRef(false)
  const videoRef = useRef<Webcam>(null)

  useEffect(() => {
    const video = videoRef.current?.video
    if (!video || isMounted.current) return

    isMounted.current = true

    const init = async () => {
      const codeReader = new BrowserQRCodeReader()
      

      await codeReader.decodeFromVideoElement(video, (result, _, controls) => {
        if (result) {
          console.log(result.getText())
          window.open(result.getText(), '_blank')
          controls.stop()
          setIsSuccess(() => true)
        }
      })
    }
    init()
  }, [])

  return <div>{!isSuccess && <Webcam audio={false} ref={videoRef} />}</div>
}

export default App
