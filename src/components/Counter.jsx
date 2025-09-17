import React, { useState } from "react";

export default function Counter() {

  const [count, setCount] = useState(0);

  function plusOne() {
    setCount(count + 1);
  }

  return (
    <>
      <h1>Counter Application</h1>
      <h2>count: {count} </h2>
      <button onClick={plusOne}>press to increment</button>
    </>
  );
}
