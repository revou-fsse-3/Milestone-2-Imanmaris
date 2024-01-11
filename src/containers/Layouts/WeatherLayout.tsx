
import { Navbar } from "../../components";
import { Outlet, Navigate } from "react-router-dom";
import { Footer } from "../../components";

const WeatherLayout = () => {

    const token = localStorage.getItem('customToken');
    if (token) {

        return (
            <div>
                <Navbar/>
                <Outlet />
                <Footer/>
            </div>
        )
    }

    return <Navigate to="/Product-specification" />

}

export default WeatherLayout