import { useState, useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import FileUpload from './components/FileUpload'
import AthleteForm from './components/AthleteForm'
import VoiceSettings from './components/VoiceSettings'
import PresentationViewer from './components/PresentationViewer'
import './App.css'

function App() {
  const [files, setFiles] = useState([])
  const [athleteName, setAthleteName] = useState('')
  const [sport, setSport] = useState('baseball')
  const [elevenLabsApiKey, setElevenLabsApiKey] = useState('')
  const [voiceId, setVoiceId] = useState('Adam')
  const [isGenerating, setIsGenerating] = useState(false)
  const [presentationId, setPresentationId] = useState(null)
  const [videoFile, setVideoFile] = useState(null)
  const [error, setError] = useState(null)
  
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  
  const handleFileUpload = (uploadedFiles) => {
    setFiles([...files, ...uploadedFiles])
  }
  
  const handleRemoveFile = (index) => {
    const newFiles = [...files]
    newFiles.splice(index, 1)
    setFiles(newFiles)
  }
  
  const handleGeneratePresentation = async () => {
    if (files.length === 0) {
      setError('Please upload at least one file')
      return
    }
    
    if (!athleteName) {
      setError('Please enter athlete name')
      return
    }
    
    setError(null)
    setIsGenerating(true)
    
    try {
      const response = await fetch(`${apiUrl}/api/presentation/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          athleteName,
          sport,
          files,
          elevenLabsApiKey,
          voiceId
        })
      })
      
      const data = await response.json()
      
      if (response.ok) {
        setPresentationId(data.presentationId)
        setVideoFile(data.videoFile)
      } else {
        setError(data.error || 'Failed to generate presentation')
      }
    } catch (err) {
      setError('Error connecting to server: ' + err.message)
    } finally {
      setIsGenerating(false)
    }
  }
  
  const handleDownload = () => {
    if (videoFile) {
      window.open(`${apiUrl}/api/presentation/download/${videoFile}`, '_blank')
    }
  }
  
  const handleDownloadDemo = () => {
    window.open(`${apiUrl}/api/presentation/download/demo`, '_blank')
  }
  
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-content">
        <h1>Athletic Presentation Generator</h1>
        
        <div className="card">
          <h2>Upload Performance Data</h2>
          <FileUpload 
            onFileUpload={handleFileUpload} 
            onRemoveFile={handleRemoveFile}
            files={files}
            apiUrl={apiUrl}
          />
        </div>
        
        <div className="card">
          <h2>Athlete Information</h2>
          <AthleteForm 
            athleteName={athleteName}
            setAthleteName={setAthleteName}
            sport={sport}
            setSport={setSport}
          />
        </div>
        
        <div className="card">
          <h2>Voice Settings</h2>
          <VoiceSettings 
            elevenLabsApiKey={elevenLabsApiKey}
            setElevenLabsApiKey={setElevenLabsApiKey}
            voiceId={voiceId}
            setVoiceId={setVoiceId}
          />
        </div>
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="actions">
          <button 
            className="generate-button"
            onClick={handleGeneratePresentation}
            disabled={isGenerating}
          >
            {isGenerating ? 'Generating...' : 'Generate Presentation'}
          </button>
          
          <button 
            className="demo-button"
            onClick={handleDownloadDemo}
          >
            Download Demo
          </button>
        </div>
        
        {presentationId && (
          <div className="card result-card">
            <h2>Your Presentation is Ready!</h2>
            <PresentationViewer 
              presentationId={presentationId}
              videoFile={videoFile}
              onDownload={handleDownload}
            />
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  )
}

export default App