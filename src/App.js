import "./App.css";

import UserForm from "./user Form/userform";
import { store } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <UserForm />
      </Provider>
    </div>
  );
}

export default App;
