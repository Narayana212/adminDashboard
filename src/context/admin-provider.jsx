
"use client";
import { useState, createContext, useContext } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [colorDeleteData, setColorDeleteData] = useState();
  const [sizeDeleteData,setSizeDeleteData]=useState()
  const[categoryDeleteData,setCategoryDeleteData]=useState()
  return (
    <AdminContext.Provider value={{ colorDeleteData, setColorDeleteData,sizeDeleteData,setSizeDeleteData,categoryDeleteData,setCategoryDeleteData }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminState = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminState must be used within an AdminProvider");
  }
  return context;
};

export default AdminProvider;
