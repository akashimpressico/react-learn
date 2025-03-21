import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState('6');
  const [number, setNumber] = useState('Off');
  const [special, addSpecial] = useState('Off');

  const addNumbers = (event) => {
    if (event.target.checked) {
      setNumber('On')
    }
    else {
      setNumber('Off')
    }
  }

  // for caching function defination & memoryzation
  const generate = useCallback(()=>{

    let str = "ABCDEFGHIGKLMONPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number === "On") str += "0123456789";
    if (special === "On") str += "!@#$%^&*()_+";

    // console.log(str)

    let pg = '' ;
    for (let i = 0; i < length; i++) {
      let index = Math.floor( Math.random() * str.length + 1 );
      // console.log(index)
      // console.log(str.charAt[index]);
      pg += str.charAt(index);
    }

    // console.log(pg) ;
    setPassword(pg) ;
    // console.log("=========================")

  }, [length, number, special])


  // run code on basic event page loading, offloading etc.
  useEffect(()=>{
    generate();
  },
    // run if below dependencies changes 
    [length, number, special] );


  const copy = () => {
    //  generatedPassword
    window.navigator.clipboard.writeText(password);
    // passwordRef.current.select();
    passwordRef.current?.select(); // if not found, use ? 
   
  }

  // useRef => to grab or refernce to window props
  const passwordRef = useRef(null); // null ,  0 , 1

  return (
 
      <div className='bg-gray-900 w-full h-screen grid justify-center items-center '>
        <div className="bg-gray-500 p-4 rounded-md m-2 w-96 min-h-28">

          <h1 className='text-white text-xl text-center mb-3 font-bold'>Password Generator</h1>

          <div className='flex justify-evenly'>
            <input type="text" id="generatedPassword" placeholder='Password Generator' className="bg-white p-2 rounded-md" value={password} 
            ref={passwordRef} // useRef
            />
            <button type="button" onClick={copy} className='p-2 bg-amber-500 rounded text-white cursor-pointer hover:bg-amber-600'>Copy</button>
          </div>

          <div className='px-4 pt-2'>
            <label htmlFor="length" className='text-white'>
              Length: {length} <br />
              <input
                type="range"
                min={1}
                max={20}
                value={length}
                id="length"
                onChange={()=> {setLength(document.getElementById("length").value)}} 
                className='w-full'
              />
            </label>

            <label htmlFor="number" className='text-white'>
              Numbers:{' '}
              <input
                type="checkbox"
                id="number"
                onClick={addNumbers} 
              />
              {' '}{number} <br />
            </label>

            <label htmlFor="special" className='text-white'>
              Special Charactors:{' '}
              <input
                type="checkbox"
                id="special"
                onClick={(e)=>{
                  e.target.checked ? addSpecial('On') : addSpecial('Off')
                }} 
              />
              {' '}{special} <br />
            </label>
            
          </div>
          

        </div>
      </div>
  
  )
}

export default App
