import React, { useEffect, useState } from 'react'

function ArrayMap() {

    const [count,setCount] = useState(0)

    const add= ()=>{
        setCount(count+1)
    }

    console.log('loading');
    
    useEffect(()=>{
        console.log('mounting');
    },[])

  return (
    <div>
         <h6>Counter value {count}</h6>
         <button
        type="button"
        onClick={add}
      >Counter 1</button>

<button
        type="button"
        onClick={() => setCount(count--)}
      >Counter 2</button>

      <p>count</p>

      
    </div>
  )
}

export default ArrayMap
