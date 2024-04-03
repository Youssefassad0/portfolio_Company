import './contactUs.css'
function Contact() {
  return (
    <div className="card">
    <p className="heading">Contact Us</p>
    
   <div className="input-div">
      <input type="text" className="input" placeholder="Email"/>
      </div>
      <div className="input-div">
      <input className="input" type="text" placeholder="Phone"/>
      </div>
      <div className="input-div">
      <textarea className="input" type="text" placeholder="Message"/>
      </div>
      <div className="button-div">
        <button className="submit">Submit</button>
      </div>
  </div>
  )
}

export default Contact