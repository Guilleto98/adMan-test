import React from 'react';

interface HelloProps {
  message: string;
}

const Hello: React.FC<HelloProps> = ({ message }) => {
  return <h1>{message}</h1>;
};

export default Hello;