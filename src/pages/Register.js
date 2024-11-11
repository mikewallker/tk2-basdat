import { isElement } from "react-dom/test-utils";
import NavBar from "../components/navbar";
import { useEffect, useState } from "react";
import User from "../components/user";

export default function Register() {
    return (
        <User text={"Register"} status={"Register"} role={false} />
    )
}