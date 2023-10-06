'use client'
import zod from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Billboard, Category } from '@prisma/client'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { DeleteModal } from '@/components/ui/modals/delete-modal'
import { 
Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  

//create zod form schema
const formSchema = zod.object({
    name: zod.string().min(1, "Name required!"),
    billboardId: zod.string().min(1, "Category must belong to a billboard")
})

// generate form type
type CategoryFormValues = zod.infer<typeof formSchema>

interface CategoryFormProps {
    initialData : Category | null;
    billboards : Billboard[]
}

export const CategoryForm = ({initialData, billboards} : CategoryFormProps) => {  
    
    // hooks vars
    const params = useParams();
    const router = useRouter();
    const form = useForm<CategoryFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData ||  {
        name: "",
        billboardId: ""
      }
    })

    // dynamic content vars
    const isCreateNew = initialData ? false : true; // is creating new or updating
    const title = isCreateNew ? "Create" : "Edit";
    const action = isCreateNew ? "Create" : "Save changes"
    const toastMessage = isCreateNew ? "Created" : "Updated"

    // control states
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    // form handler functions
    const onSubmit = async (data: CategoryFormValues) => {
        try {
            setLoading(true);

            if (isCreateNew) {
                await axios.post(`/api/${params.storeId}/categories`, data)
            } else {
                await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
            }

            router.refresh();
            router.push(`/${params.storeId}/categories`)
            toast.success(toastMessage);
        } 
        catch (error) {
            toast.error("Something went wrong.")
        } 
        finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`)

            router.refresh();
            router.push(`/${params.storeId}/categories`)
            toast.success("deleted");
        } 
        catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false);
        }
    }
  return (
    <>  <DeleteModal 
        open={openModal}
        loading={loading}
        onConfirm={onDelete}
        setClose={() => setOpenModal(false)}
        />
        <div className='flex items-center justify-between'>
            <Heading 
            title={title}
            />
            {!isCreateNew && 
            <Button
            variant={"destructive"}
            onClick={() => setOpenModal(true)}
            >
                <Trash className='h-4 w-4 mr-2'/>
                <span>Delete</span>
            </Button>
            }
        </div>

        <Separator />

        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
            >
                <div className="md:grid md:grid-cols-3 gap-8">
                    <FormField 
                    control={form.control}
                    name='name'
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={loading}
                            placeholder='Casual wear'
                            className="lg:w-1/2"
                            {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                    />

                    <FormField 
                    control={form.control}
                    name='billboardId'
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Billboard</FormLabel>
                            <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select billboard" />
                                </SelectTrigger>

                                <SelectContent>
                                    {billboards.map((billboard)=> (
                                        <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />
                </div>

                <Button
                type='submit'
                disabled={loading}
                className='ml-auto'
                >
                    {action}
                </Button>
            </form>
        </Form>

    </>
  )
}
