import React from 'react'

const ImgWrapper = ({ children }) => (
  <div className="w-100 h-0 position-relative overflow-hidden mb-4" style={{ paddingTop: '75%' }}>
    {children}
  </div>
)

export default ImgWrapper
