
import { useNavigate } from "react-router-dom";
import { Button, Input, Text, Card, Table} from "../../components"
import {useFormik} from "formik";
import { useState } from "react";
import { userLogin } from './../../api/authApi';
// import GetProfile from "../Categories/GetProfile";
import * as yup from"yup";
import { LoginData } from "../../Interfaces/auth";

// interface DataProps {

//     email: string;
//     password:string;
// }

const ContactContainer = () => {

    const [users, setUsers] = useState<LoginData[]>([]); 
    const Navigate = useNavigate();
    const forMik = useFormik({
        initialValues: {
            email:"",
            password:"",
        },
        // onSubmit: async (values, {resetForm}) => {
        //     setUsers([...users, values])
        //     resetForm()
        
        onSubmit: async (values: LoginData, {resetForm}) => {
            setUsers([...users, values])
            resetForm()
            try {
                const response = await userLogin(values);
                const token = response.data.data.token;
                localStorage.setItem('token', token);        
                
                // const handleInsertToken = () => {}
        
                console.log('Silahkan anda sudah login');
              } catch (error) {
                console.error(error);
              }
        },
        validationSchema: yup.object({
            email: yup.string().email('invalid email format, example => agus@example.com').required('Email is required'),
            password: yup.string().required(),            
        })
    });

    return (

        <>           
            <Card border className={'flex flex-wrap flex-col items-center'}>
                
                <Card border={false}>
                    <Card border>
                        <h2 className="w-full text-xl bg-sky-400/[.9] text-white flex justify-center rounded-md">Login Akun</h2>
                        <form onSubmit={forMik.handleSubmit} className=" h-[20rem] my-5 px-8 py-2 rounded-lg border-4 border-indigo-200 border-y-indigo-500 ">
                            <div>
                                <Text>{'Email'}</Text>
                                <Input className="border-solid border-2 border-sky-500" 
                                name="email"
                                value={forMik.values.email}
                                onBlur={forMik.handleBlur("email")}
                                onChange={forMik.handleChange("email")}
                                />
                                {
                                    forMik.errors.email && (
                                        <Text>{forMik.errors.email}</Text>
                                    )
                                }
                            </div>

                            <div>
                                <Text>{'Password'}</Text>
                                <Input type="password" className="border-solid border-2 border-sky-500" 
                                name="Password"
                                value={forMik.values.password}
                                onBlur={forMik.handleBlur("password")}
                                onChange={forMik.handleChange("password")}
                                />

                                {
                                    forMik.errors.password && (
                                        <Text>{forMik.errors.password}</Text>
                                    )
                                }
                            </div>
                                <Button label={"Login"} type={"submit"} className="w-full py-1 text-sm bg-green-400 opacity-90 mt-3"/>
                                {/* <Button label={"Login"} type={"submit"} onClick={() => Navigate('/Category')} className="w-full py-1 text-sm bg-green-400 opacity-90 mt-3"/> */}

                        </form >

                        <Card border className={'flex flex-wrap flex-col items-center'}>
                            {/* <Button label={"Login"} onClick={handleInsertToken} className="p-2 bg-green-400 opacity-90 rounded-lg"/> */}
                            <p className="mb-1 text-center text-sm text-slate-500"><b> Weather forecast menu </b></p>
                            {/* <a href="/Login" className="p-1.5 border-2 rounded-lg mt-8 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">Login Here</a> */}
                            <Button label="Press here" onClick={() => Navigate('/WeatherApp')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                        </Card>
                    </Card>

                    <Card border className={'flex flex-wrap flex-col items-center'}>

                        {/* <Card border className="text-sm h-[15rem] px-4 py-4 rounded-lg border-4 border-indigo-200 border-y-indigo-500 "> */}
                        <Card border={false}>
                            <Table 
                                headers={[
                                            {
                                                label:"Email",
                                                key:"email"
                                            },
                                            {
                                                label:"Password",
                                                key:"password"
                                            }
                                        ]} 
                                data={users}
                            />
                        </Card>
                    </Card>
 
                </Card>  

                {/* <GetProfile/>                                    */}

            </Card>

        </>
              
    )


    // return (
    //     <div>
    //         Halaman Kontak Info
    //     </div>
    // )
}

export default ContactContainer