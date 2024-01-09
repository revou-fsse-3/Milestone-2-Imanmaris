
import React from 'react';
import { useFormik } from 'formik';
import { CreateCategoryData } from '../../Interfaces/category';
import { createCategory } from '../../api/categoryApi';
import * as ValidationSchemas from '../../validations/validationSchemas';
import { Button, Text, Card} from "../../components";



const WeatherSub: React.FC = () => {
  const { CreateCategorySchema } = ValidationSchemas;
  const token = localStorage.getItem('token') ?? '';
  // const Navigate = useNavigate ();

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: CreateCategorySchema,

    onSubmit: async (values: CreateCategoryData,{resetForm}) => {
      resetForm()
      try {
        await createCategory({name: values.name}, token);
        console.log('Berhasil bikin category bang!');
      } catch (error) {
        console.error(error);
      }
    }
  })
  return (
    <>
        <Card border className={'flex flex-wrap flex-col items-center'}>
            <Card border={false}>
                <h2 className="w-full text-xl bg-sky-400/[.9] text-white flex justify-center rounded-md">Create Category</h2>
                
                <Card border>
                    
                    <form onSubmit={formik.handleSubmit} className=" h-[10rem] my-2 px-8 py-2 rounded-lg border-4 border-indigo-200 border-y-indigo-500 ">
                        <div>
                            <Text>{'Nama'}</Text>
                            <input  className="border-solid border-2 border-sky-500"
                            type="text"
                            id="name"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            />
                            {formik.touched.name && formik.errors.name ? (
                            <div>{formik.errors.name}</div>
                            ) : null}
                        </div>
                        {/* <Button label={"Create Category"} type={"submit"} onClick={() => Navigate('/Category')} className="w-full py-1 text-sm bg-green-400 opacity-90 mt-3 text-black-300 hover:bg-green-700 hover:text-white rounded-md"/> */}
                        <Button label={"Create Category"} type={"submit"} className="w-full py-1 text-sm bg-green-400 opacity-90 mt-3 text-black-300 hover:bg-green-700 hover:text-white rounded-md"/>

                    </form>
                </Card>

            </Card>
        </Card>
    </>

  )
}

export default WeatherSub;