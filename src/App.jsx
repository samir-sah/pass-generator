import React, { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [password, setPassword] = useState("")
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [length, setLength] = useState(8)

  const passwordRef = useRef()

  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz" 
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*"
    
    for(let i=1;i<length;i++)
    {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed])

  const copyPasswordToClipboard =() => {
    window.navigator.clipboard.writeText(password)
    passwordRef.current?.select()
  }

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,charAllowed])

  return (
    <div className="relative h-screen">
      <div className="absolute inset-0 h-full w-full items-center px-5 py-24  bg-radial-[at_25%_25%] from-purple-950 to-yellow-900 to-75%">
        <div className='max-w-md mx-auto'>
        <h1 className ='text-white text-center my-3'>Password Generator</h1>
        <div className='flex items-center shadow rounded-lg overflow-hidden mb-4 max-wd mx-auto'>
          <input type = 'text'
          value={password}
          className='outline-none bg-white w-full py-2 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
          />
          <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-4 py-2 shrink-0 hover:bg-blue-800'>copy</button>

          </div>

        <div className="flex items-center gap-x-6 text-sm">
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
            <input
            type="range"
            min={6}
            max={20}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))}
            name=""
            id=""
            />
            <label htmlFor="length" className='text-white'>Length: {length}</label>
            </div>
          </div>


          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => {
              setNumberAllowed((prev) => !prev)
            }}
            name=""
            id="" />
            <label htmlFor='NumInput' className='text-white'>Numbers</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => {
              setCharAllowed((prev) => !prev)
            }}
            name=""
            id="" />
            <label htmlFor='charInput' className='text-white'>Character</label>
          </div>
        </div>

        </div>
      </div>
    </div>
  )
}

export default App