import React from "react";
import { ButtonIcon, Navbar } from "../components";

function Home() {
    return (
      <div className="Homepage">
        <Navbar></Navbar>
        <ButtonIcon icon="checkmark">Hello there!</ButtonIcon>
      </div>
    );
  }

  export default Home