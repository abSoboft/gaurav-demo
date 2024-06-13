import './App.css';
import AllRoutes from './routes/route';
import { PrimeReactProvider } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";

import "primereact/resources/themes/lara-light-indigo/theme.css";


function App() {
  return (
    <PrimeReactProvider className="App">
      <AllRoutes />
    </PrimeReactProvider>
  );
}

export default App;
