import logo from './logo.svg';
import './App.css';
import Login from './Login';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import Dashboard from './Dashboard';
import SendVideo from './SendVideo';
import Dashboard_copy from './Dashboard_copy';

const code = new URLSearchParams(window.location.search).get("code")

function App() {
  return code ? (<Dashboard_copy code={code} />) : <Login />
  
  
}
export default App;
