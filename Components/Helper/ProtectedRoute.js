import React from 'react'
import { UserContext } from '../../UserContext';

const ProtectedRoute = ({children}) => {
  const {login, userLogout} = React.useContext(UserContext);
  if(login) return children;
  userLogout();
}

export default ProtectedRoute;

