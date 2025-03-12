import React from "react";
import SignUp from "../../components/SignUp/SignUp";

function SignUpPage({ setIsLoggedIn }) {
  return (
    <div>
      <SignUp setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default SignUpPage;
