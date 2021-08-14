import './App.css';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Join from './Components/Join/Join';
import Chat from './Components/Chat/Chat';


function App() {


  return (
    <div className="App">
     {/* <h1> Working</h1> */}
     <Router>
         <Route path="/" component={Join} exact/>
         <Route path="/chat" component={Chat} exact/>
     </Router>
    </div>
  );
}

export default App;
 