// CREATE STORE MODAL
'use client';

import { z } from "zod";
import  axios  from "axios"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { Modal } from "@/components/ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface formType {
    name: String
}

// 1. create form schema with zod
const formSchema = z.object({
    name: z.string().min(1, 'Store name is required!'),
})


export const StoreModal = () => {
    const [loading, setLoading] = useState(false);
    const storeModal = useStoreModal(); // access states from zustand Store

    // 2. create form hook with react-hook-form & zod schema
    // using zodResolver from @hookform/resolvers.
    // By convention of react-hook-form, this is needed for <Form> component
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        }
    })

    // 3. create onSubmit function
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // create store in database
        try {
            setLoading(true);
            const response = await axios.post('/api/stores', values);

            console.log(response.data);
            toast.success("Store created!")
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <Modal 
        title="CREATE STORE"
        description="Adding new store to the system"
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                            control={form.control}
                            name='name'
                            render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input 
                                            disabled={loading}
                                            placeholder="E-commerce" 
                                            {...field}/>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}    
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end">
                                <Button 
                                disabled={loading}
                                variant={'ghost'} 
                                onClick={storeModal.onClose}
                                >
                                    Cancel
                                </Button>
                                <Button 
                                type="submit"
                                disabled={loading}
                                >
                                    Create
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}