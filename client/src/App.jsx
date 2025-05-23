import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import Login from "./Login";
import Signup from "./Signup";
import Navbar from "./Navbar";
import EmojiCursor from "./EmojiCursor";
import Hero from "./Hero";
import Profile from "./Profile";
import Logout from "./Logout";
import EventForm from "./EventForm";
import Eventlist from "./Eventlist";
import Eventview from "./Eventview";
import Suggest from "./Suggest";
import Thanks from "./Thank";
import Donate from "./Donate";

function App() {
  const [showEmojiCursor, setShowEmojiCursor] = useState(false);

  const toggleEmojiCursor = () => {
    setShowEmojiCursor((prevState) => !prevState);
  };

  return (
    <Auth0Provider
  domain="dev-f8vulrw4qp5rv4q0.us.auth0.com"
  clientId="7ChytZtaoW6T55ZhX12so7v9Eux2FN0Y"
  authorizationParams={{ 
    redirect_uri: window.location.origin 
  }}  
  cacheLocation="localstorage"  // Store tokens in localStorage
  useRefreshTokens={true}
>

      <Router>
        <div>
          {!showEmojiCursor && <EmojiCursor />}
          <Routes>
            <Route path="/hero" element={<Hero ontog={toggleEmojiCursor} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/Suggest" element={<Suggest />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/thank" element={<Thanks />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/eventlist" element={<Eventlist />} />
            <Route path="/eventform" element={<EventForm />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/eventview/:id" element={<Eventview />} />
            <Route path="/" element={<Navbar ontog={toggleEmojiCursor} />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </Router>
    </Auth0Provider>
  );
}

export default App;
