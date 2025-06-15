import React from 'react'
import './PresentationViewer.css'

const PresentationViewer = ({ presentationId, videoFile, onDownload }) => {
  return (
    <div className="presentation-viewer">
      <div className="presentation-info">
        <p>Your presentation has been generated successfully!</p>
        <p className="presentation-id">Presentation ID: {presentationId}</p>
      </div>
      
      <div className="download-section">
        <button className="download-button" onClick={onDownload}>
          <svg className="download-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
          </svg>
          Download Video
        </button>
        <p className="download-info">Click the button above to download your presentation video</p>
      </div>
    </div>
  )
}

export default PresentationViewer