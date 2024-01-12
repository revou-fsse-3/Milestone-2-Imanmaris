
import { useNavigate } from "react-router-dom";
import { Button, Input, Text, Card} from "../../components"
import {useFormik} from "formik";
import { useState } from "react";
import DateUpdate from "../../components/WeatherComponent/DateUpdate";
import * as yup from"yup";
import { LoginData } from "../../Interfaces/auth";

const ContactContainer = () => {

    const [users, setUsers] = useState<LoginData[]>([]); 
    const Navigate = useNavigate();

    const generateCustomToken = () => {
        // Customize this function to generate your custom token logic
        return Math.random().toString(36).substring(2) + Date.now().toString(36);
    };

    const forMik = useFormik({
        initialValues: {
            email:"",
            password:"",
        },
     
        onSubmit: async (values: LoginData, {resetForm}) => {
            setUsers([...users, values])
            resetForm();

        //     try {
        //         const response = await userLogin(values);
        //         const token = response.data.data.token;
        //         localStorage.setItem('token', token);        
                
        //         // const handleInsertToken = () => {}
        
        //         console.log('Silahkan anda sudah login');
        //       } catch (error) {
        //         console.error(error);
        //       }
        // },

            try {
                // Generate a custom token locally
                const customToken = generateCustomToken();
        
                // Custom token handling function
                handleInsertToken(customToken);
        
                console.log('Silahkan anda sudah login');
        
                // Navigate to the desired route upon successful login
                Navigate('/WeatherApp');
            } catch (error) {
                console.error(error);
            }
            },
        
        validationSchema: yup.object({
            email: yup.string().email('invalid email format, example => agus@example.com').required('Email is required'),
            password: yup.string().required(),            
        })
    });

    const handleInsertToken = (token: string) => {
        // Custom logic for handling the token
        console.log('Custom logic for handling the token:', token);
        localStorage.setItem('customToken', token);
      };

    return (
       
            <Card border className={'flex flex-wrap flex-col items-center bg-sky-50/[.9]'}>
                <h1 className="w-full p-5 text-3xl bg-sky-100/[.9] text-black flex justify-center rounded-md">REGISTER HERE</h1>

                <Card border={false} className="text-xl mt-10">
                    <DateUpdate/>
                </Card>

                        <Card border={false} className={'flex flex-wrap flex-col items-center'}>
                            <form onSubmit={forMik.handleSubmit} >
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
                                    <Button label={"Login"} type={"submit"} className="w-full mt-3 bg-green-400 text-gray-100 hover:bg-green-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                                    {/* <Button label={"Login"} type={"submit"} onClick={() => Navigate('/Category')} className="w-full py-1 text-sm bg-green-400 opacity-90 mt-3"/> */}

                            </form >
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
  

            </Card>

              
    )

}

export default ContactContainer