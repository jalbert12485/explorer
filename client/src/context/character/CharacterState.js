import React, { useReducer, useEffect, useContext } from "react";
import CharacterReducer from "./CharacterReducer";
import CharacterContext from "./CharacterContext";
import {loadCharacter, saveCharacter, getNewCharacterPortrait} from "../../components/utils/API"
import AuthContext from "../auth/authContext";
const CharacterState = (props) => {

  const authContext = useContext(AuthContext);
  
  const initialState = {
    data:{
      name: "Default",
      age:20,
      currentYear:2021,
      credits:100,
      shipIdArray:[],
      birthYear:2001
    },
    loaded:false
  };
  const [state, dispatch] = useReducer(CharacterReducer, initialState);


  useEffect(()=>{    
    // As soon as this is born, it checks to see if we know who the user is
    if(authContext.user){
      // if we do, then we grab the id and use it to load the character info from the database
      let userId=authContext.user._id;      
      if(!state.loaded) loadChar(userId);
    }      
    else 
      // If we don't, then we load the user data. after it's loaded, useEffect will trigger again, with better news
     authContext.loadUser();

  },[authContext.loading, state.loaded]);
  
  // load character
  const loadChar = (userId) => {  
    dispatch({type:"LOADING"})
    // If we haven't already loaded our character, load it now
    if(!state.loaded)loadCharacter(userId)
    .then(res=>{
      if(res.data.data)      {
        console.log(res.data);
        
        dispatch({type:"UPDATE_CHARACTER", char:res.data})}
      else dispatch({type:"ERROR_NO_CHARACTER"})
    });
  };
  const updateName=(name)=>{
    dispatch({type:"UPDATE_CHARACTER_PROPERTY", name:"name", newData:name})
  }
  const updateUserId=(id)=>{
    dispatch({type:"UPDATE_USER", id:id})
  }
  const updateAge=(age)=>{
    let birth=2021-age;    
    dispatch({type:"UPDATE_CHARACTER_PROPERTY", name:"age", newData:age})
    dispatch({type:"UPDATE_CHARACTER_PROPERTY", name:"birthYear", newData:birth})
  }
  const setCredits=(creds)=>{
    dispatch({type:"UPDATE_CHARACTER_PROPERTY", name:"credits", newData:creds})
  }
  const setCurrentYear=(year)=>{
    dispatch({type:"UPDATE_CHARACTER_PROPERTY", name:"currentYear", newData:year})
  }
  const buyShip=shipId=>{
    dispatch({type:"UPDATE_SHIPARRAY", action:"add", newData:shipId})
    saveChar();  
  }
  const sellShip=shipId=>{
    dispatch({type:"UPDATE_SHIPARRAY", action:"remove", newData:shipId})  
    saveChar();  
  }
  const saveChar = ()=>{
    console.log("saving:");
    console.log(state);
    
    saveCharacter(state)
    .then(res=>{
      console.log(res);
      
    });
  };
  const getPortrait=()=>{
    getNewCharacterPortrait()
    .then(res=>{
      if(res.data)      
        dispatch({type:"UPDATE_CHARACTER_PROPERTY", name:"characterImage", newData:res.data.results[0].picture.large})
    });
  }
  const updateCredits = () => {
    let newCredits = state.data.credits + 1000000;
    dispatch({type: "UPDATE_CHARACTER_PROPERTY", name: "credits", newData: newCredits })
  }
  return (
    <CharacterContext.Provider
      value={{
        data:{
          name: state.data.name,
          age:state.data.age,
          currentYear:state.data.currentYear,
          credits:state.data.credits,
          shipIdArray:state.data.shipIdArray,
          birthYear:state.data.birthYear,
          characterImage:state.data.characterImage
        },
        loadChar,
        saveChar,
        getPortrait,
        setCredits,
        setCurrentYear, 
        updateAge,
        updateName,
        updateUserId,
        buyShip,
        sellShip,
        updateCredits,
        missing:state.missing,
        loaded:state.loaded
      }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
};

export default CharacterState;
