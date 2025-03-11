import React from "react";
import SignIn from "../../components/SignIn/SignIn";

function SignInPage({ setIsLoggedIn }) {
  return (
    <div>
      <SignIn setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
}

export default SignInPage;
