import logo from './logo.svg';
import './App.css';
import { useEffect,useState} from 'react';
import jwt_decode from 'jwt-decode'

function App() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response){
    console.log("Encoded JWT ID Token" + response.credential);

    var userObject = jwt_decode(response.credential);
    console.log(userObject)
    setUser(userObject)

  }

  const handleSignout =(e)=>{
    setUser({});
  }

  useEffect(()=>{
    // global google
    google.accounts.id.initialize({
      client_id:"38111871990-vrga13euflrsjnnjclbkf56upg3dnpb7.apps.googleusercontent.com",
      callback: handleCallbackResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline" , size:"large"}
    );
  },[])


  return (
    <div className="App">
      <div id='signInDiv'></div>
      {
        Object.keys(user).length !=0 && 
      <button onClick={(e)=>handleSignout(e)}>Sign Out</button>
      }
      { user &&
        <div>
          <img src={user.picture}/>
          <h3>{user.name}</h3>
        </div>
      }
    </div>
  );
}

export default App;
