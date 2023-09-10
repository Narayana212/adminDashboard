"use client";
import { useState, createContext, useContext } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [categoryDeleteData, setCategoryDeleteData] = useState();
  const [productsDeleteData, setProductsDeleteData] = useState();

  return (
    <AdminContext.Provider
      value={{
        productsDeleteData,
        setProductsDeleteData,
        categoryDeleteData,
        setCategoryDeleteData,
      }}
    >
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
