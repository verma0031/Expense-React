import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App2 from "./App2";
import store from "./redux/store";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
	<Provider store={store}>
		<App2 />
	</Provider>
);
