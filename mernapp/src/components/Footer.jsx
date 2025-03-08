import React from 'react'

const Footer = () => {
  return (
    <div>
<div className="container-fluid bg-dark" style={{height:"auto"}}>
  <footer className="py-3 ">
    <ul className="nav justify-content-center border-bottom pb-3 mb-3">
      <li className="nav-item text-white" ><a href="#" className="nav-link px-2  text-white">Home</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Features</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white">Pricing</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
      <li className="nav-item"><a href="#" className="nav-link px-2 text-white">About</a></li>
    </ul>
    <p className="text-center text-white">© 2024 Company, Inc</p>
  </footer>
</div>
    </div>
  )
}

export default Footer
