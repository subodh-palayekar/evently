'use client'

import { useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ICategory } from "@/lib/database/models/category.model"
import { useRouter, useSearchParams } from "next/navigation"
import { getAllCategories } from "@/lib/actions/category.action"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils"

const CategoryFilter = () => {
    const [categories,SetCategories] = useState<ICategory[]>([]);
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(()=>{
        const getCategories = async()=>{
            const categoryList = await getAllCategories();
            categoryList && SetCategories(categoryList as ICategory[])
        }

        getCategories();
    },[])


    const onSelectCategory = (category :string)=>{
        let newUrl = '';

        if(category && category !== 'ALL'){
            newUrl = formUrlQuery({
                params:searchParams.toString(),
                key:'category',
                value:category
            })
        }else{
            newUrl = removeKeysFromQuery({
                params:searchParams.toString(),
                keysToRemove:['category']
            })
        }

        router.push(newUrl,{scroll:false});
    }

  return (
    <Select onValueChange={(value:string)=>onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder='Category'/>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="All" className="select-item p-regular-14">All</SelectItem>
        {categories.map((category)=>(
            <SelectItem value={category.name} key={category._id} className="select-item p-regular-14" >
                {category.name}
            </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default CategoryFilter
