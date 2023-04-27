import { useEffect, useRef, useState } from 'react'
// https://www.npmjs.com/package/@zxing/browser
import { BrowserQRCodeReader } from '@zxing/browser'
// https://www.npmjs.com/package/react-webcam
import Webcam from 'react-webcam'
import { useMediaQuery } from 'react-responsive'

function App() {
  const [isSuccess, setIsSuccess] = useState(false)
  const isMounted = useRef(false)
  const videoRef = useRef<Webcam>(null)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  useEffect(() => {
    const video = videoRef.current?.video
    if (!video || isMounted.current) return

    isMounted.current = true

    const init = async () => {
      const codeReader = new BrowserQRCodeReader()

      await codeReader
        .decodeFromVideoElement(video, (result, error, controls) => {
          if (result) {
            console.log(result.getText())
            window.open(result.getText(), '_blank')
            controls.stop()
            setIsSuccess(() => true)
          }
          if (error) {
            alert(error)
          }
        })
    }
    init()
  }, [])

  return (
    <div>
      {!isSuccess && (
        <Webcam
          audio={false}
          ref={videoRef}
          videoConstraints={
            isTabletOrMobile
              ? {
                  facingMode: { exact: 'environment' },
                }
              : undefined
          }
        />
      )}
    </div>
  )
}

export default App
