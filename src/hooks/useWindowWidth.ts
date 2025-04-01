"use client"

import { useState, useEffect } from "react"

export const useWindowWidth = () => {
    const [windowWidth, setwindowWidth] = useState(0)
    useEffect(() => {
        const updateWidth = () => {
          setwindowWidth(window.innerWidth)
        }
    
        updateWidth()
        window.addEventListener("resize", updateWidth)
        return () => window.removeEventListener("resize", updateWidth)
      }, [])

    

    return windowWidth
}

