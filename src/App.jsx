import { useState ,useCallback, useEffect, useRef} from 'react'
import './App.css'

function App() {

  const [length,setLength]=useState(6)
  const [password,setPassword]=useState("");
  const [numbers,setNumbers]=useState(false);
  const [characters,setCharacters]=useState(false);

  const passRef=useRef(null);

  const passwordGenerator= useCallback(()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numbers){
      str+="0123456789";
    }
    if(characters){
       str+="@!#$%^&*+-/_.`~";
    }
    for(let i=1;i<=length;i++){
      let char=Math.floor(Math.random()* str.length+1)
      pass+=str.charAt(char);
    }

    setPassword(pass)
  },[numbers,characters,length,setPassword])

  const copyPasswordToClipboard=useCallback(()=>{
    passRef.current?.select();
    alert("Copied to clipboard!");
    window.navigator.clipboard.writeText(password)
  },[password]);

  useEffect(()=>{
    passwordGenerator();
  },[numbers,characters,length,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-md mx-auto shadow-md bg-gray-700 px-10 py-8 rounded-xl '>
    <div className='text-2xl text-center text-white py-2 '>
      Password Generator
      <div className='flex shadow overflow-hidden mb-4 bg-white rounded-xl outline-none '>
        <input className='block m-2 text-sm text-base text-gray-500 w-full outline-none mb-4' type='text' value={password} placeholder='Password' readOnly ref={passRef}/>
        <button className='outline-none bg-blue-500 px-3 text-md shrink-0' onClick={copyPasswordToClipboard}>Copy</button>
      </div>
      <div>
      <div className='flex text-sm gap-x-3 my-4'>
        <div className='flex items-center gap-x-1'>
        <input type='range' min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}}/>
        <label className='text-md text-orange-300'>Length:{length}</label>
        </div>
      </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' id='numbers' className='cursor-pointer' defaultChecked={numbers} onChange={()=> setNumbers((prev)=>!prev)}/>
          <label htmlFor='numbers' className='ml-2 text-white'>Include Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type='checkbox' id='numbers' className='cursor-pointer' defaultChecked={characters} onChange={()=> setCharacters((prev)=>!prev)}/>
          <label htmlFor='numbers' className='ml-2 text-white'>Include Characters</label>
        </div>
      </div>
    </div>
    </div>
    </>
  )
}

export default App
