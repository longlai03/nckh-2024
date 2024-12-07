import { NavLink } from "react-router-dom"
import "./Navigation.css"
const Navigation = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <ul className="navbar-nav">
                <NavLink className="nav-link dashboard-link" to="/dashboard">
                    <li className="nav-item">Dashboard</li>
                </NavLink>
                <NavLink className="nav-link predict-link" to="/predict">
                    <li className="nav-item">Predict</li>
                </NavLink>
                <NavLink className="nav-link statistic-link" to="/statistic">
                    <li className="nav-item">Statistic</li>
                </NavLink>
                <NavLink className="nav-link user-link" to="/user">
                    <li className="nav-item">User</li>
                </NavLink>
            </ul>
        </nav>
    )
}
export default Navigation;