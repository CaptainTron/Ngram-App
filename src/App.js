import './App.css';
import { useState } from 'react'


function App() {

  const [value, setvalue] = useState({
    Isok: false,
    IsClicked: false,
  });
  function pressenter(e) {
    if (e.keyCode === 13) {
      let { value, name } = e.target;
      async function postdata() {
        try {
          setvalue((p) => ({ ...p, IsClicked: true }));
          let res = await fetch(`http://localhost:5000/ngram`, {
            method: "POST",
            headers: {
              'content-type': "application/json",
            },
            body: JSON.stringify({ value, name })
          })
          let data = await res.json();
          console.log(data);
          setvalue((p) => ({ ...p, Isok: true, statuscode: res.status }))
          setvalue((p) => ({ ...p, data }));
          setvalue((p) => ({ ...p, IsClicked: false }));
        } catch (err) {
          alert(err.message);
        }
      }

      if (value.length > 0) {
        postdata();
      } else {
        alert("Input Field Cannot be Empty")
      }
    }
  }

  return (
    <>
      <div>
        <p className='headingtxt'>App to get Ngram comparision of two Strings</p>
        <div className='contain'>
          <input type="text" id='textcontainer' placeholder='Enter Your Text here...' name="textinput" onKeyDown={(e) => pressenter(e)} autoFocus={true} autoComplete="false" />
          <p className='captiontext'>Press Enter to Send</p>
        </div>
        <div>{value.IsClicked && (<p className='loadingstate'>Loading...</p>)}</div>
        <div className='backenddata'>
          <div className='backenddataContainer'><p>  {value.Isok ? (value.data.ngram ? (<p> Ngrams of Recent Two Entered Strings: <p className='ngramvalue'>{value.data.ngram.value}</p></p>) : "Could not connect to server...") : (<p>Response will appear here <br /> <p className='senddatastring'>Send String to get Ngram...</p></p>)} </p></div>
        </div>
      </div>
      <p className='creatorappMain'>Made By Vaibhav Yadav</p>
    </>
  );
}

export default App;
// Ngrams of Recent Two Entered Strings: 