
import { Card, Button } from "../../components";
import { Navigate, useNavigate } from "react-router-dom";
import ListData from "../../components/WeatherComponent/ListData"

const ApiContainer = () => {

    const GoesTo = useNavigate();
    const token = localStorage.getItem("customToken");
    if (token) {
  
        return (

            <Card border className={'bg-sky-50/[.9] rounded-b-xl flex flex-wrap flex-col items-center'}>
                
                <Card border={false}>
                    <h2 className="w-full text-3xl p-4 bg-yellow-200/[.9] text-blue-700 flex justify-center rounded-md">Still On Progress..!!!</h2> 
                </Card>

                <Card border={false}>
                    <ListData/>
                </Card>

                <Card border={false} className={'flex flex-wrap flex-col items-center'}>
                        <p className="mb-1 text-center text-sm text-slate-500"><b> Emergency Menu </b></p>
                        <Button label="Home" onClick={() => GoesTo('/')}className="text-gray-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                        <Button label="Previous" onClick={() => GoesTo('/Category')}className="text-gray-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>

                </Card>

            </Card>
        
        )
    }
  
    return <Navigate to="/Product-specification" />

}

export default ApiContainer

