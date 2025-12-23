"use client";
import { useState } from "react";
import Link from "next/link";
import 'bootstrap/dist/css/bootstrap.css';
import Auth from "../auth/page";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <>
     <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          </ul>
          <form className="d-flex">
            <Link href='/auth'><button className="btn btn-outline-success" type="submit">Login</button></Link>           
          </form>
        </div>
      </div>
    </nav>
    </>
   
  );
}
