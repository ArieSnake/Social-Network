import React from "react"
import { Link, useLocation } from "react-router-dom"

interface CustomNavLinkProps {
    to:string
    children:React.ReactNode
    exact?:boolean
    end?:boolean
}

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children, exact = false, end = false }) => {
    const location = useLocation()

    const isActive = exact
    ? location.pathname === to
    : end
    ? location.pathname === to
    : location.pathname.startsWith(to)


    return(
        <Link to={to} className={isActive? 'active': ''}>
            {children}
        </Link>
    )
}

export default CustomNavLink