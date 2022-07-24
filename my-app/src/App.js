import logo from './logo.svg';
import './App.css';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Dashboard from './Dashboard';
import Dashboard2 from './Dashboard2';
import SendVideo from './SendVideo';

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? (<SendVideo code={code} />) : <Login />
  
  
}
export default App;
