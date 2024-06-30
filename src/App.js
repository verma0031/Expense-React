import React from "react";
import  ReactDOM  from "react-dom/client";
import Signup from "./components/SignUp";

const App = () => {
    return (
        <div>
           <Signup />
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(<App />);