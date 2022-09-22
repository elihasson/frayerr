import { useEffect, useRef } from "react"

export const useEffectUpdate = (callBack, dependencies) => {
    
    const isFirst = useRef(true)

    useEffect(()=>{

        if (isFirst.current) {
            isFirst.current = false
            return
        }
       
        callBack()
    }, dependencies)
    
}