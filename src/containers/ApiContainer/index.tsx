
import { Card } from "../../components"
import { Navigate } from "react-router-dom";

const ApiContainer = () => {

    const token = localStorage.getItem("token");
    if (token) {
  
        return (
            <Card border className={'flex flex-wrap flex-col items-center'}>
                
                <Card border={false}>
                    <h2 className="w-full text-xl p-4 bg-orange-400/[.9] text-white flex justify-center rounded-md">Coming Soon..!!!</h2> 
                </Card>
 
            </Card>
        )
    }
  
    return <Navigate to="/Product-specification" />

}

export default ApiContainer