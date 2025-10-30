import React from 'react';
import {Navigate} from 'react-router-dom';
import { useSelector } from 'react-redux';



const ProtectedRoute = ({children}) => {
    const {user, loading} = useSelector(store=>store.auth);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if(!user || !user._id){
    return <Navigate to="/login" />
  }
  return <>{children}</>
}

export default ProtectedRoute