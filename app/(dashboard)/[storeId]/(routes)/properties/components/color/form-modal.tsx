import { Modal } from '@/components/ui/modal'
import zod from 'zod'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Color } from '@prisma/client'

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

//create zod form schema
const formSchema = zod.object({
    name: zod.string().min(1, "Color name required!"),
    value: zod.string().min(4).max(9).regex(/^#/, {
        message: 'String must be a valid hex code'
    })
})

// generate form type
type ColorFormValues = zod.infer<typeof formSchema>

interface ColorFormModalProps {
    initialData: Color | null
    open: boolean
    setClose: ()=>void,
}
export const ColorFormModal = ({initialData,open, setClose} : ColorFormModalProps) => {
    // hooks vars
    const params = useParams();
    const router = useRouter();
    const form = useForm<ColorFormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData ||  {
        name: "",
        value: ""
      }
    })

    // dynamic content vars
    const isCreateNew = initialData ? false : true; // is creating new or updating
    const title = isCreateNew ? "Create" : "Edit";
    const desciption = isCreateNew ? "Adding new color" : "Edit color";
    const action = isCreateNew ? "Create" : "Save changes"
    const toastMessage = isCreateNew ? "Created" : "Updated"

    // control states
    const [loading, setLoading] = useState(false);

    // form handler functions
    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true);

            if (isCreateNew) {
                await axios.post(`/api/${params.storeId}/colors`, data)
            } else {
                await axios.patch(`/api/${params.storeId}/colors/${initialData?.id}`, data)
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
                            placeholder='Black'
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
                            placeholder='#fff'
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
