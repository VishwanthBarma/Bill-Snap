import Link from "next/link";
import React from "react";

function Login() {
  return (
    <div>
      <Link href={"/api/auth/signin"} passHref>
        <a>
          <button className="font-bold">LogIn</button>
        </a>
      </Link>
    </div>
  );
}

export default Login;
