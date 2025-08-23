import Link from "next/link";
import React from "react";
const App = () => {
  return (
    <div>
      <h1>Welcome to the App</h1>
      <Link href="/about">About</Link>
    </div>
  );
};

export default App;
