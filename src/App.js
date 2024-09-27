import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

 import VendorProfile from './vendor/VendorProfile';
import VendorRegister from './vendor/VendorRegister';
import VendorLogin from './vendor/VendorLogin';
import VendorOrder from './vendor/VendorOrder';
import VendorComplete from "./vendor/VendorComplete";





function App({ location }) {

 

  

  return (

   

      <Router style={{ fontFamily: "Poppins" }} >




        <Switch>

     
      

          <Route exact path="/vendorprofile">
        <VendorProfile></VendorProfile>
        </Route>
        
        <Route exact path="/">
        <VendorLogin></VendorLogin>
        </Route>

        <Route exact path="/vendorregister">
        <VendorRegister></VendorRegister>
        </Route>

        <Route exact path="/vendororder">
        <VendorOrder></VendorOrder>
        </Route>

        <Route exact path="/vendorcomplete">
        <VendorComplete></VendorComplete>
        </Route>


     
       
       
     

        </Switch>
       







      </Router>





  );
}

export default App;