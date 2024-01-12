
import { Card, Button} from "../../components"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductContainer =() => {

    const{id} = useParams();
    const Navigate = useNavigate();

    return (
        <>
            <Card border className={'flex flex-wrap flex-col items-center'}>
                <Card border={false}>

                    <h1 className="w-full text-xl p-5 bg-red-400/[.9] text-white flex justify-center rounded-md">Halaman ini memiliki proteksi berupa token {id}</h1>

                </Card>
            </Card>
            <Card border={false} className='grid gap-10 grid-cols-2 mt-20'>
                
                <section className={'flex flex-wrap flex-col items-center'}>
                    <p className="mb-1 text-center text-sm text-slate-500"><b> Home Menu </b></p>
                    <Button label="Press here" onClick={() => Navigate('/')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                </section>

                <section className={'flex flex-wrap flex-col items-center'}>
                    <p className="mb-1 text-center text-sm text-slate-500"><b> Weather Finder Menu </b></p>
                    <Button label="Press here" onClick={() => Navigate('/Category')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                </section>

            </Card>
        </>
        // <div>
        //     Halaman ini memiliki proteksi berupa token {id}
        // </div>
    )
}
export default ProductContainer