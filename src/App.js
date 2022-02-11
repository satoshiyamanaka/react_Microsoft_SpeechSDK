import React, { useState, useEffect } from 'react'
import './App.css'


const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'ja-JP'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [savedNotes, setSavedNotes] = useState([])

  useEffect(() => {
    handleListen()
  }, [isListening])

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)
      setNote(transcript)
      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      <h1>今日の出来事　　一日一ぼやき！日記をつけていきましょう </h1>
      <div className="container">
        <div className="box">
          <h2>今日のぼやっきー</h2>
          {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            ぼやき保存
          </button>
          <button onClick={() => setIsListening(prevState => !prevState)}>
            ぼやき開始/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box1">
          <h2>溜まったぼやっきー</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
      </div>

<footer>
  <p>©️Digital Tree
    <a href="./voice1030/src/Company.js">会社情報</a>
  </p> 
</footer>

    </>
  )
}

export default App