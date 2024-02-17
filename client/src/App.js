import './App.css';
import Dashboard from './Pages/Dashboard';
import Navbar from './Components/Navbar';
import { Box } from '@chakra-ui/react';
import AllRoute from './Routes/AllRoutes';



function App() {


return (
    <Box>
      <Navbar/>
      <AllRoute/>
      {/* <Dashboard/> */}
    </Box>
  );
}

export default App;
