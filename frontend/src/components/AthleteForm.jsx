import React from 'react'
import './AthleteForm.css'

const AthleteForm = ({ athleteName, setAthleteName, sport, setSport }) => {
  const sports = [
    'baseball',
    'basketball',
    'football',
    'soccer',
    'tennis',
    'golf',
    'swimming',
    'track',
    'volleyball',
    'hockey'
  ]
  
  return (
    <div className="athlete-form">
      <div className="form-group">
        <label htmlFor="athlete-name">Athlete Name</label>
        <input
          type="text"
          id="athlete-name"
          value={athleteName}
          onChange={(e) => setAthleteName(e.target.value)}
          placeholder="Enter athlete name"
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="sport">Sport</label>
        <select
          id="sport"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        >
          {sports.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default AthleteForm