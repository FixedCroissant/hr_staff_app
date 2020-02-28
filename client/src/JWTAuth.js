/**
 * JWT AUTHENTICATION CHECK
 * THOUGH VALUES>
 * Date: 2/27/2020
 */
//Get JS-Cookie to read my stuff.
import Cookies from "js-cookie";

export const Session = () => {
      const jwt = Cookies.get('logged_in');  
      //Debug -- Read what is currently in the cookie.
      console.log(jwt);
  
  let session = false;
  try {
    if (jwt) {
      
        console.log("this is running.");
      
      //if this cookie exists, we can know that the person has authenticated on the server.
        session = true;
    }
  } catch (error) {
    console.log(error)
  }
  return session
}

export default Session;