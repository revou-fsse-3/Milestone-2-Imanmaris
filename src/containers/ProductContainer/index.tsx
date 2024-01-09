
import { Card} from "../../components"
import { useParams } from "react-router-dom";

const ProductContainer =() => {

    const{id} = useParams();

    return (
        <>
                <Card border className={'flex flex-wrap flex-col items-center'}>
                <Card border={false}>

                    <h1 className="w-full text-xl p-5 bg-red-400/[.9] text-white flex justify-center rounded-md">Halaman ini memiliki proteksi berupa token {id}</h1>

                </Card>
            </Card>
        </>
        // <div>
        //     Halaman ini memiliki proteksi berupa token {id}
        // </div>
    )
}
export default ProductContainer