"use client";
import { useState, createContext, useContext } from "react";

const AdminContext = createContext();

/**
 * Provides an AdminContext Provider component for managing admin-related state
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider
 * @returns {JSX.Element} An AdminContext.Provider component with the provided value and children
 */
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

/**
 * Custom hook to access the AdminContext state
 * @returns {Object} The current AdminContext state
 * @throws {Error} If used outside of an AdminProvider
 */
export const useAdminState = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdminState must be used within an AdminProvider");
  }
  return context;
};

export default AdminProvider;
