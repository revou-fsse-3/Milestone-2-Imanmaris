
import { Button, Input, Text, Card, Table,} from "../../components"
import { useFormik } from "formik";
import { useState } from "react";
import { userRegister } from './../../api/authApi';
import { useNavigate } from "react-router-dom";
import * as yup from"yup";

interface DataProps {
    name: string;
    phone: number;
    email: string;
    password: string;
}

const HomeContainer = () => {

    const [users, setUsers] = useState<DataProps[]>([]); 
    const Navigate = useNavigate();

    const forMik = useFormik({
        initialValues: {
            name:"",
            phone:0,
            email:"",
            password:"",
        },
        onSubmit: async (values, {resetForm}) => {
            setUsers([...users, values])
            resetForm()
            try {
                await userRegister(values);
                console.log('Selamat akun sudah terdaftar');
              } catch (error) {
                console.error(error);
              }
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            phone: yup.number().required(),
            email: yup.string().email('invalid email format, example => agus@example.com').required('Email is required'),
            password: yup.string().required('input your password'),
        }),
        enableReinitialize: true

    });

    // const onDelete = (index: number) => {
    //     setUsers ((prevState) => prevState.filter((_, dataindex) => dataindex !== index))
    // }

    // const onEdit = (index: number) => {
    //     const findUser = users.find((_, dataindex) => dataindex === index);
    //     setSelectedUser(findUser);
    // }    

    // const handleInsertToken = () => {
    //     localStorage.setItem ('token', '112233445566')
    // }


    return (

        <>            
            <Card border className={'flex flex-wrap flex-col items-center'}>
                
                <Card border={false}>
                    
                    <Card border>
                        <h2 className="w-full text-xl bg-sky-400/[.9] text-white flex justify-center rounded-md">Registrasi Akun</h2>
                        <form onSubmit={forMik.handleSubmit} className=" h-[25rem] my-5 px-8 py-2 rounded-lg border-4 border-indigo-200 border-y-indigo-500 ">
                            <div>
                                <Text>{'Nama'}</Text>
                                <Input className="border-solid border-2 border-sky-500" 
                                name="nama"
                                value={forMik.values.name}
                                onBlur={forMik.handleBlur("name")}
                                onChange={forMik.handleChange("name")}
                                />

                                {
                                    forMik.errors.name && (
                                        <Text>{forMik.errors.name}</Text>
                                    )
                                }
                            </div>
                            <div>
                                <Text>{'Phone'}</Text>
                                <Input className="border-solid border-2 border-sky-500" 
                                name="phone"
                                value={forMik.values.phone}
                                onBlur={forMik.handleBlur("phone")}
                                onChange={forMik.handleChange("phone")}
                                />

                                {
                                    forMik.errors.name && (
                                        <Text>{forMik.errors.name}</Text>
                                    )
                                }
                            </div>
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
                                name="dob"
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
                            <Button label={"Submit"} type={"submit"} className="w-full py-1 text-sm bg-green-400 opacity-90 mt-3"/>
                                
                        </form >

                        <Card border className={'flex flex-wrap flex-col items-center'}>
                            {/* <Button label={"Login"} onClick={handleInsertToken} className="p-2 bg-green-400 opacity-90 rounded-lg"/> */}
                            <p className="mb-1 text-center text-sm text-slate-500">If you already have an account, you can log in directly</p>
                            {/* <a href="/Login" className="p-1.5 border-2 rounded-lg mt-8 flex items-center justify-center space-x-4 text-sm font-semibold leading-6 text-slate-700">Login Here</a> */}
                            <Button label="Login Here" onClick={() => Navigate('/Login')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                        </Card>

                    </Card>   



                    <Card border className={'flex flex-wrap flex-col items-center'}>

                        {/* <Card border className="text-sm h-[15rem] px-4 py-4 rounded-lg border-4 border-indigo-200 border-y-indigo-500 "> */}
                        <Card border={false}>

                            <Table 
                                headers={[
                                            {
                                                label:"Nama",
                                                key:"name"
                                            },
                                            {
                                                label:"Email",
                                                key:"email"
                                            },
                                            {
                                                label:"Phone Number",
                                                key:"phone"
                                            }
                                        ]} 
                            data={users}
                            />
                        </Card>
                    </Card>

                </Card>

            </Card>

        </> 
        
    )
}

export default HomeContainer