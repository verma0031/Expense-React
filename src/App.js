import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./components/SignUp";
import Login from "./components/Login";
import Welcome from "./components/Welcome";

const App = () => {
	return (
		<BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/" element={<Login />} />
                <Route path="/welcome" element={<Welcome />} />

            </Routes>
        </BrowserRouter>
	);
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
