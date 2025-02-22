import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { ICategory } from '@/lib/database/models/category.model'
import { Input } from '../ui/input'
import { createCategory, getAllCategory } from '@/lib/actions/category.actions'


type DropdownProps = {
    value?: string,
    onchangeHandler?: () => void
}

const DropDown = ({ value, onchangeHandler, }: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])
    const [newCategory,setNewCategory ] = useState('')

    const handleAddCategory=()=>{
      createCategory({
        categoryName: newCategory.trim()
      }).then((category)=>{
        setCategories((prev)=>[...prev,category])
      })
    }

    useEffect(()=>{
       const getCategories = async ()=>{
        const categoryList = await getAllCategory();

        categoryList && setCategories(categoryList as ICategory[]);
       }
       getCategories();
    },[])

    return (
        <Select onValueChange={onchangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                {
                    categories.length > 0 && categories.map((category) => (
                        <SelectItem key={String(category._id)} value={String(category._id)} className='select-item p-regular-14'>
                            {category.name}
                        </SelectItem>
                    ))
                }

                <AlertDialog>
                    <AlertDialogTrigger className='p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500'>Add new category</AlertDialogTrigger>
                    <AlertDialogContent className='bg-white'>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Category</AlertDialogTitle>
                            <AlertDialogDescription>
                              <Input type='text' placeholder='Category name' className='input-field mt-3' onChange={(e)=>setNewCategory(e.target.value)}/>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={()=>startTransition(handleAddCategory)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

            </SelectContent>
        </Select>

    )
}

export default DropDown