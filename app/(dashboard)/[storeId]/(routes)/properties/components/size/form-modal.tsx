import { Modal } from '@/components/ui/modal'
import zod from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Size } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
Form, 
    FormControl, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from '@/components/ui/form'
import { useSizeModal } from '@/hooks/use-properties-modal'

//create zod form schema
const formSchema = zod.object({
    name: zod.string().min(1, "Size name required!"),
    value: zod.string().min(1, "Size description required!")
})

// generate form type
type SizeFormValues = zod.infer<typeof formSchema>

interface SizeFormModalProps {
    open: boolean
    setClose: ()=>void,
}
export const SizeFormModal = ({open, setClose} : SizeFormModalProps) => {
    // hooks vars
    const params = useParams();
    const router = useRouter();
    const sizeModal = useSizeModal()
    // check for initial data
    let initialData: Size = {
        id: "",
        name: "",
        storeId: "",
        value: "",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    // default true for v1.0.0; will be update later
    let isCreateNew : boolean = true;// is creating new or updating
    
    // create default form values
    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    // dynamic content vars
    const title = isCreateNew ? "Create" : "Edit";
    const desciption = isCreateNew ? "Adding new size" : "Edit size";
    const action = isCreateNew ? "Create" : "Save changes"
    const toastMessage = isCreateNew ? "Created" : "Updated"

    // control states
    const [loading, setLoading] = useState(false);

    // form handler functions
    const onSubmit = async (data: SizeFormValues) => {
        try {
            setLoading(true);

            if (isCreateNew) {
                await axios.post(`/api/${params.storeId}/sizes`, data)
            } else {
                await axios.patch(`/api/${params.storeId}/sizes/${initialData?.id}`, data)
            }

            router.refresh();
            router.push(`/${params.storeId}/properties`)
            toast.success(toastMessage);
            setClose()
        } 
        catch (error) {
            toast.error("Something went wrong.")
        } 
        finally {
            setLoading(false)
        }
    }
  return (
    <>
        <Modal
        title={title}
        description={desciption}
        isOpen = {open}
        onClose={setClose}>

        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
            >
                <div className="flex flex-col">
                    <FormField 
                    control={form.control}
                    name='name'
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={loading}
                            placeholder='extra small'
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
                    name='value'
                    render={({field}) => (
                    <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={loading}
                            placeholder='XS'
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

        </Modal>

    </>
  )
}
