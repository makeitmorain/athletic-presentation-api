import React, { useState, useRef } from 'react'
import './FileUpload.css'

const FileUpload = ({ onFileUpload, onRemoveFile, files, apiUrl }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const fileInputRef = useRef(null)
  
  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
  }
  
  const handleDragLeave = () => {
    setIsDragging(false)
  }
  
  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }
  
  const handleFileInputChange = (e) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }
  
  const handleFiles = async (fileList) => {
    const newFiles = []
    
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      
      // Create a new FormData instance for each file
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        // Track upload progress
        setUploadProgress(prev => ({
          ...prev,
          [file.name]: 0
        }))
        
        // Upload file to server
        const response = await fetch(`${apiUrl}/api/upload`, {
          method: 'POST',
          body: formData,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setUploadProgress(prev => ({
              ...prev,
              [file.name]: percentCompleted
            }))
          }
        })
        
        if (response.ok) {
          const data = await response.json()
          
          // Add file info to the list
          newFiles.push({
            name: file.name,
            path: data.path,
            size: file.size,
            type: file.type
          })
          
          // Clear progress
          setUploadProgress(prev => {
            const newProgress = { ...prev }
            delete newProgress[file.name]
            return newProgress
          })
        } else {
          console.error('Upload failed:', await response.text())
        }
      } catch (err) {
        console.error('Error uploading file:', err)
      }
    }
    
    // Add all successfully uploaded files
    if (newFiles.length > 0) {
      onFileUpload(newFiles)
    }
  }
  
  const handleBrowseClick = () => {
    fileInputRef.current?.click()
  }
  
  return (
    <div className="file-upload">
      <div 
        className={`drop-zone ${isDragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <div className="drop-zone-content">
          <svg className="upload-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"/>
          </svg>
          <p>Drag and drop files here or click to browse</p>
          <p className="file-types">Supported formats: PDF, CSV, XLSX, MP4, MOV, JPG, PNG</p>
        </div>
        <input 
          type="file" 
          ref={fileInputRef}
          onChange={handleFileInputChange}
          multiple
          accept=".pdf,.csv,.xlsx,.xls,.mp4,.mov,.jpg,.jpeg,.png"
          style={{ display: 'none' }}
        />
      </div>
      
      {Object.keys(uploadProgress).length > 0 && (
        <div className="upload-progress">
          <h3>Uploading...</h3>
          {Object.entries(uploadProgress).map(([fileName, progress]) => (
            <div key={fileName} className="progress-item">
              <div className="progress-info">
                <span className="filename">{fileName}</span>
                <span className="percentage">{progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {files.length > 0 && (
        <div className="file-list">
          <h3>Uploaded Files</h3>
          <ul>
            {files.map((file, index) => (
              <li key={index} className="file-item">
                <div className="file-info">
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
                <button 
                  className="remove-button"
                  onClick={() => onRemoveFile(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default FileUpload