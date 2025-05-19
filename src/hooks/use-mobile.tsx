
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait')

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const updateDeviceInfo = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
      setOrientation(window.innerHeight > window.innerWidth ? 'portrait' : 'landscape')
    }
    
    mql.addEventListener("change", updateDeviceInfo)
    updateDeviceInfo()
    
    return () => mql.removeEventListener("change", updateDeviceInfo)
  }, [])

  return {
    isMobile,
    orientation,
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape'
  }
}
