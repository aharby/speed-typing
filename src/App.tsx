import React, { useState, useRef, useEffect } from 'react';

import getRandomWord from './randomWords';

const App = () => {
    const INITIAL_TIMER = 60;
    const INITIAL_CURRENT_TEXT= "Text to type";
    
    const [inputText, setInputText] = useState("");
    const [timer, setTimer] = useState(INITIAL_TIMER);
    const [wordCount, setWordCount] = useState(0);
    const [textToType, setTextToType] = useState(INITIAL_CURRENT_TEXT);
    const [isStarted, setIsStarted] = useState(false);
    
    const intervalId = useRef(0);
    const inputRef = useRef<HTMLTextAreaElement>(null);
    
    const renderCount = useRef(0)
    const handleChangeCalls = useRef(0)

    const textToTypeWords = textToType.split(' ').filter((word) => word !== '' );
    renderCount.current = renderCount.current+ 1

    console.log("renders: ", renderCount.current)

    const handleChange = (e: any) => {
      handleChangeCalls.current++
      console.log("handleChangeCalls", handleChangeCalls.current)
        setInputText(e.target.value)
        
        setWordCount( (prevWordCount) => {
            const inputTextWords = inputText.split(' ').filter((word) => word !== '' )
            console.log(textToTypeWords, inputTextWords)
            if (inputTextWords.pop() === textToTypeWords[0]) {
                setTextToType( (prevText) => {
                  console.log(textToTypeWords, inputTextWords)
                  return prevText.substring(prevText.indexOf(' ') + 1) + ' '+ getRandomWord()}) //strip the first word and add a new one
                    
                return prevWordCount +1 
            }
            else return prevWordCount
        })
    }
    
    const handleClick = () => {
        if (!isStarted) startGame()
        else stopGame()
    }
    
    const stopGame = () => {
        setIsStarted(false)
        clearInterval(intervalId.current)
        intervalId.current = 0
        inputRef.current!.disabled= true   
    }
    
    const startGame = () => {
        setIsStarted(true)
        
        const randomText = getRandomWord() + " " +getRandomWord() + " " + getRandomWord()
        setTextToType(randomText)
        setInputText("")
        setWordCount(0)
        
        setTimer(INITIAL_TIMER)
        
        if(!intervalId.current)
            intervalId.current = window.setInterval( () => {
                setTimer(prevTimer => prevTimer -1)
            }, 1000)
        
        inputRef.current!.disabled= false
        inputRef.current!.focus()
    }
     
    const endGame = () => {
        stopGame()        
        setInputText (`your score is ${wordCount} WPM`+ '\n'+ getComment()) 
    }

    useEffect ( ()=> {
        if (timer === 0) endGame()
   }, [timer])
    
    const getComment = () => {
        if (wordCount<20)
            return "\ncomon you can do better"
        if (wordCount>=20 && wordCount<40)
            return "\nyou're JA, just alrigh."
        if (wordCount>=40 && wordCount<60)
            return "\nbro you're JGOMG, \n JUST GOOD OMG!!"
        if (wordCount>=60)
            return "Mind blown 🤯"
    }
    
    return (
        <div>
            <h1>How fast do you type?</h1>
            <span>{textToTypeWords[0]} </span>
            <span>{textToTypeWords[1]} </span>
            <span>{textToTypeWords[2]} </span>
            <textarea 
            ref={inputRef}
            onChange={handleChange}
            title="input text"
            value={inputText}
            disabled={true}/>
            <p>Time remaining: {timer}</p>
            <button onClick={handleClick}>{isStarted? "Stop": "Start"}</button>
            <p>Word count: {wordCount}</p>
        </div>
    )
}

export default App