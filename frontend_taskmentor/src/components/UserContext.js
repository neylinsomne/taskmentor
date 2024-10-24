import React, { createContext, useState } from 'react';

// Crear el contexto para el usuario
export const UserContext = createContext();

// Proveedor de contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Aquí puedes almacenar el token o el ID de usuario

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
