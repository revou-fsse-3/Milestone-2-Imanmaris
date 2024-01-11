
import { Card } from "../../components";
import { Navigate } from "react-router-dom";
// import ListData from "../../components/WeatherComponent/ListData"

const ApiContainer = () => {

    const token = localStorage.getItem("customToken");
    if (token) {
  
        return (

            <Card border className={'flex flex-wrap flex-col items-center'}>
                
                <Card border={false}>
                    <h2 className="w-full text-xl p-4 bg-orange-400/[.9] text-white flex justify-center rounded-md">Coming Soon..!!!</h2> 
                </Card>

                {/* <ListData/> */}
 
            </Card>
        
        )
    }
  
    return <Navigate to="/Product-specification" />

}

export default ApiContainer

