import Map from './components/map.js';
import Dialog from './components/dialog.js';
import Chat from './components/chat.js';
import Link from 'react-router-dom';
import './index.css';

function App() {
  return (
    <div>
      <nav>
          <ul id="navigation">
              <li>
                  <Link to="/flights">Flights</Link>
              </li>
              {/* <li>
                  <Link to="/about">About</Link>
              </li>
              <li>
                  <Link to="/contact">Contact</Link>
              </li> */}
          </ul>
      </nav>
  </div>
  );
}

export default App;
