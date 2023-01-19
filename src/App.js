import React, { useState } from 'react';
import './App.css'
import Axios from 'axios'
import Typewriter from 'typewriter-effect';
function App() {
  const [textData,setTextData]=useState('') 
  const [generatedTextData,setGeneratedTextData]=useState('')
  const [done,setDone]=useState(false)
  const onTextChange=(event)=>{
    setTextData(event.target.value)
  }
 const submitTextData=()=>{
  setDone(false)
    Axios.post(
       "https://api-inference.huggingface.co/models/gpt2",
        {"inputs":textData},{
          "headers": { "Authorization": "Bearer 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" }
        })
      .then(function (response) {
        //handle success
        console.log(response.data[0].generated_text)
        setGeneratedTextData(response.data[0].generated_text)
        setDone(true)
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
};
const robotostyle={
  width:'150px',
  height:'150px',
  marginLeft:'-800px',
  marginTop:'-60px'
}
const editorStyle={
  width:'100px',
  height:'100px',
  marginTop:'-400px',
  marginLeft:'800px'
}
const textBox={
  background:'black',
  color:'white',
  fontSize:'20px',
  height:'50px',
  marginTop:'20px',
  borderBottomLeftRadius:'20px',
  borderTopLeftRadius:'20px',
}
const TextGeneratedbox={
  background:'opaque',
  opacity:'0.7',
  color:'white',
  fontSize:'20px',
  marginLeft:'100px',
  height:'200px',
  width:'1000px',
  borderRadius:'20px',
  visibility:done?'visible':'hidden'
}
return (
    <div className="App">
     <div style={{color:'white' ,fontSize:'50px',fontFamily:'cursive',marginTop:'-80px'}}>
  <Typewriter
  onInit={(typewriter) => {
    typewriter.typeString('TEXT GENERATOR')
      .callFunction(() => {
        console.log('String typed out!');
      })
      .deleteAll()
      .callFunction(() => {
        console.log('All strings were deleted');
      })
      .start();
      
  }}
  options={{
    autoStart: true,
    loop: true,
  }}
/>
</div> 
        <div >
        <input type="text" value={textData} name="initial message" placeholder="Your text..." onChange={onTextChange} style={textBox}/>  
        <button className='block' type="submit" onClick={submitTextData} style={{fontSize:'20px',height:'60px',width:'90px',borderBottomRightRadius:'20px',borderTopRightRadius:'20px'}}>Submit</button>
        </div>
      <div>
      <img src="robo.png" alt="robot " style={robotostyle}/>
      </div>
      <div>
     <img src="texteditor.svg" alt="text editor" style={editorStyle}/>
     </div>
     <div style={TextGeneratedbox}>
  {generatedTextData}
     </div>
    </div>
  );
}

export default App;