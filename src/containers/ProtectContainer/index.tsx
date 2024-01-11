// import { Card } from "../../components";
// import { useEffect, useState } from "react";
// import { userProfile } from './../../api/authApi';

// interface DataProps {
//     id: number;
//     name:string;
//     email: string;
//     password: string;
// }

// const ProtectContainer =() => {

//     const token = localStorage.getItem('token') ?? '';
//     const [users, setCategories] = useState<DataProps[]>([]);
  
//     useEffect(() => {
//       const fetchCategories = async () => {
//         try {
//           const response = await userProfile(token);
//           setCategories(response.data.data);
          
//           console.log('Data diri anda terdata disini !')
//         } catch (error) {
//           console.error(error)
//         }
//       };
//       fetchCategories();
//     },[token]);
  
  
//     return (
//       <Card border= {false} className={'flex flex-wrap flex-col items-center'}>
        
//         <h2>Data diri yang tersimpan</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Password</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((profile) => (
//               <tr key={profile.id}>
//                 <td>{profile.id}</td>
//                 <td>{profile.name}</td>
//                 <td>{profile.password}</td>
//               </tr>
//             ))}

//             <td></td>
            
//           </tbody>
//         </table>
//       </Card>
//     )
// }
// export default ProtectContainer


import { Text, Card, Input, Button } from '../../components';
import { useEffect, useState } from 'react';
import { deleteCategory } from '../../api/categoryApi';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";

interface CategoryProps {
    name?: string;
    is_active?: boolean;
}
interface Category {
    id: string;
    name: string;
    is_active: boolean;
}

const ProtectContainer = () => {
    const token = localStorage.getItem('token') ?? '';
    const [categories, setCategory] = useState<Category[]>([]);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const Navigate= useNavigate();

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://mock-api.arikmpt.com/api/category', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            })
            const data = await response.json()
            setCategory?.(data.data)
        }
        catch (error) {
            console.error('Error fetching categories:', error);
        }
    }

    useEffect(
        () => {
            fetchCategories()
            if (editingCategory) {
                formMik.setValues({
                    name: editingCategory.name,
                    is_active: editingCategory.is_active
                })
            }
        }, [editingCategory]
    )

    const formMik = useFormik({
        initialValues: {
            name: '',
            is_active: true
        },
        onSubmit: async (values, { resetForm }) => {
            console.log('submitting form with values:', values)
            if (editingCategory) {
                await updateCategory({ ...editingCategory, ...values });
            } else {
                await createCategory(values);
            }
            resetForm();
            setEditingCategory(null);
        },
        validationSchema: yup.object({
            name: yup.string().required(),
            is_active: yup.boolean().required(),
        })
    })

    const createCategory = async (data: CategoryProps) => {
        try {
            const response = await fetch('https://mock-api.arikmpt.com/api/category/create', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
                method: 'POST',
                body: JSON.stringify({
                    name: data.name,
                    is_active: data.is_active
                })
            })
            const newCategory = await response.json()
            fetchCategories()
            console.log(newCategory)
        }
        catch (error) {
            console.log(error)
        }
    }

    const updateCategory = async (data: Category) => {
        try {
            const response = await fetch('https://mock-api.arikmpt.com/api/category/update', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                method: 'PUT',
                body: JSON.stringify({
                    id: data.id,
                    name: data.name,
                    is_active: data.is_active
                })
            });
    
            if (response.status !== 204) {
                const updatedCategory = await response.json()
                console.log('Category updated successfully with data:', updatedCategory)
            } else {
                console.log('Category updated successfully')
            }
    
            fetchCategories()
        } catch (error) {
            console.error('Error updating category:', error)
        }
    }
       

    const editCategory = async (id: string) => {
        try {
            const response = await fetch(`https://mock-api.arikmpt.com/api/category/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': "application/json"
                },
                method: 'GET'
            });
    
            if (response.ok) {
                const responseData = await response.json();
                const getCategory = responseData.data; // Access the nested 'data' property
                console.log('editing category:', getCategory)
                if (getCategory && typeof getCategory.is_active === 'boolean') {
                    setEditingCategory(getCategory);
                } else {
                    console.error('Invalid category data:', getCategory);
                } 
            }
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };

    // const deleteCategory = async (id: string) => {
    //     try {
    //         return await fetch(`https://mock-api.arikmpt.com/api/category/${id}`, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //             method: 'DELETE'
    //         });
    //         fetchCategories()
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }

    const handleDelete = async (categoryId: string) => {
      try {
        await deleteCategory(categoryId, token);
        const updatedCategories = categories.filter((category) => category.id !== categoryId);
        setCategory(updatedCategories);
      } catch (error) {
        console.error(error)
      }
    }

    // const { errors, values, handleChange, handleSubmit } = formMik;
    // const { name, is_active } = values;
    // const token = localStorage.getItem("token")

    return (
      <>
        <Card border className={'flex flex-wrap flex-col items-center'}>
            <h2 className="w-full text-xl bg-sky-400/[.9] text-white flex justify-center rounded-md">Create Category</h2>
            <Card border={false}>
                <form onSubmit={formMik.handleSubmit}>
                    <div>
                        <Text>{'Category Name'}</Text>
                        <Input
                            className="border-solid border-2 border-sky-500 rounded-md w-full"
                            name={'name'}
                            type="text"
                            value={editingCategory ? editingCategory.name : formMik.values.name}
                            onChange={(e) => {
                                if (editingCategory) {
                                // Update the editingCategory directly
                                setEditingCategory({
                                    ...editingCategory,
                                    name: e.target.value,
                                });
                                } else {
                                // Update formMik.values
                                formMik.handleChange('name')(e);
                                }
                            }}
                        /> {formMik.errors.name && <Text>{formMik.errors.name}</Text>}
                    </div>
                    <div>
                        <Text>{'Status'}</Text>
                        <label>
                            <select
                                className="border-solid border-2 border-sky-500 rounded-md w-full"
                                name="is_active"
                                value={
                                    editingCategory
                                    ? editingCategory.is_active.toString()
                                    : formMik.values.is_active.toString()
                                }
                                onChange={(e) => {
                                    if (editingCategory) {
                                    // Update the editingCategory directly
                                    setEditingCategory({
                                        ...editingCategory,
                                        is_active: e.target.value === 'true',
                                    });
                                    } else {
                                    // Update formMik.values
                                    formMik.handleChange('is_active')(e);
                                    }
                                }}
                            >
                                <option value="">-- Select --</option>
                                <option value='true'>Active</option>
                                <option value='false'>Inactive</option>
                            </select>
                        </label>
                    </div>
                    <div>
                    <Button label={'Create Category'} type={"submit"} className="w-full py-1 text-sm bg-green-400 opacity-90 mt-3 text-black-300 hover:bg-green-700 hover:text-white rounded-md"/>
                    <Button label={'Save Edit'} type={"submit"} className="w-full py-1 text-sm bg-sky-400 opacity-90 mt-3 text-black-300 hover:bg-sky-700 hover:text-white rounded-md"/>
                    </div>
                    <div className={'mt-5 flex flex-wrap flex-col items-center'}>
                    <Button label="Previous/ Back Page" onClick={() => Navigate('/Category')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                    <Button label="Home Page" onClick={() => Navigate('/')}className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"/>
                    </div>
                                
                </form>
            </Card>
        </Card>

        <Card border className={'flex flex-wrap flex-col items-center'}>
          <h2 className="w-full text-xl bg-sky-400/[.9] text-white flex justify-center rounded-md">List Category</h2>
          <Card border={false}>

                <table>
                    <thead >
                        <tr >
                            <th>ID</th>
                            <th>Name</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((data) => (
                            <tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.is_active? 'active' : 'inactive'}</td>
                                <td>
                                    <Button label={"Edit"} type={"submit"} className="w-full py-1 text-sm bg-blue-400 opacity-90 mt-3 text-black-300 hover:bg-blue-700 hover:text-white rounded-md" onClick={() => editCategory(data.id)}>Edit</Button>
                                    <Button label={"Delete"} type={"submit"} className="w-full py-1 text-sm bg-red-400 opacity-90 mt-3 text-black-300 hover:bg-red-700 hover:text-white rounded-md" onClick={() => handleDelete(data.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </Card> 
          </Card>                       
      </>


    )    
}
export default ProtectContainer