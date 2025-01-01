import React,{ useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from './Navbar'; 
import EmojiCursor from "./EmojiCursor";
import Hero from "./Hero";
import Profile from "./Profile";
import Logout from "./Logout"
import EventForm from "./EventForm";
import Eventlist from "./Eventlist";
import Eventview from "./Eventview";



function App() {
  const [showEmojiCursor, setShowEmojiCursor] = useState(false);
  const toggleEmojiCursor = () => {
    setShowEmojiCursor((prevState) => !prevState);
  };
  return (
    <Router>
      <div>
        {!showEmojiCursor && <EmojiCursor/>} 
        <Routes>
          <Route path="/Hero" element={<Hero  ontog={toggleEmojiCursor}/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/Eventlist" element={<Eventlist />} />
          <Route path="/Eventform" element={<EventForm />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Eventview/:id" element={<Eventview />} />
          <Route path="/" element={<Navbar ontog={toggleEmojiCursor} />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
