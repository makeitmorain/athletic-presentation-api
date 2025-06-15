import React, { useState } from 'react'
import './VoiceSettings.css'

const VoiceSettings = ({ elevenLabsApiKey, setElevenLabsApiKey, voiceId, setVoiceId }) => {
  const [showApiKey, setShowApiKey] = useState(false)
  
  const voices = [
    { id: 'Adam', name: 'Adam (Male)' },
    { id: 'Antoni', name: 'Antoni (Male)' },
    { id: 'Arnold', name: 'Arnold (Male)' },
    { id: 'Bella', name: 'Bella (Female)' },
    { id: 'Domi', name: 'Domi (Female)' },
    { id: 'Elli', name: 'Elli (Female)' },
    { id: 'Josh', name: 'Josh (Male)' },
    { id: 'Rachel', name: 'Rachel (Female)' },
    { id: 'Sam', name: 'Sam (Male)' }
  ]
  
  return (
    <div className="voice-settings">
      <div className="form-group">
        <label htmlFor="elevenlabs-api-key">ElevenLabs API Key</label>
        <div className="api-key-input">
          <input
            type={showApiKey ? 'text' : 'password'}
            id="elevenlabs-api-key"
            value={elevenLabsApiKey}
            onChange={(e) => setElevenLabsApiKey(e.target.value)}
            placeholder="Enter your ElevenLabs API key"
          />
          <button
            type="button"
            className="toggle-visibility"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? 'Hide' : 'Show'}
          </button>
        </div>
        <p className="api-key-info">
          Get your API key from <a href="https://elevenlabs.io/app/api-key" target="_blank" rel="noopener noreferrer">ElevenLabs</a>
        </p>
      </div>
      
      <div className="form-group">
        <label htmlFor="voice-id">Voice</label>
        <select
          id="voice-id"
          value={voiceId}
          onChange={(e) => setVoiceId(e.target.value)}
        >
          {voices.map((voice) => (
            <option key={voice.id} value={voice.id}>
              {voice.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default VoiceSettings