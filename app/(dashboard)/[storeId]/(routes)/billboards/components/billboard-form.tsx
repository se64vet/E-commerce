'use client'
import zod from 'zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { Billboard } from '@prisma/client'

import { Heading } from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Trash } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { 
Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'
import { ImageUpload } from '@/components/ui/image-upload'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { DeleteModal } from '@/components/ui/modals/delete-modal'

//create zod form schema
const formSchema = zod.object({
    label: zod.string().min(1, "Billboard label required!"),
    imgUrl: zod.string().min(1, "Image URL required")
})

// generate form type
type BillboardFormValues = zod.infer<typeof formSchema>

interface BillboardFormProps {
    initialData : Billboard | null;
}

export const BillboardForm = ({initialData} : BillboardFormProps) => {  
    
    // hooks vars
    const params = useParams();
    const router = useRouter();
    const form = useForm<BillboardFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData ||  {
        label: "",
        imgUrl: ""
      }
    })

    // dynamic content vars
    const isCreateNew = initialData ? false : true; // is creating new or updating
    const title = isCreateNew ? "Create billboard" : "Edit billboard";
    const action = isCreateNew ? "Create" : "Save changes"
    const toastMessage = isCreateNew ? "Created" : "Updated"

    // control states
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    // form handler functions
    const onSubmit = async (data: BillboardFormValues) => {
        try {
            setLoading(true);

            if (isCreateNew) {
                await axios.post(`/api/${params.storeId}/billboards`, data)
            } else {
                await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
            }

            router.refresh();
            router.push(`/${params.storeId}/billboards`)
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
            await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`)

            router.refresh();
            router.push("/");
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
                <span>Delete Billboard</span>
            </Button>
            }
        </div>

        <Separator />

        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
            >
                <FormField
                control={form.control}
                name="imgUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Background image</FormLabel>
                    <FormControl>
                        <ImageUpload 
                        loading={loading}
                        values={field.value ? [field.value] : []}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />

                <div className="md:grid md:grid-cols-3 gap-8">
                    <FormField 
                    control={form.control}
                    name='label'
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={loading}
                            placeholder='Summer Collection'
                            className="lg:w-1/2"
                            {...field}
                            />
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
