'use client'

import z from "zod"
import axios from "axios";
import { useState } from "react";
import { Store } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation";


import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { DeleteModal } from "@/components/ui/modals/delete-modal";

// create Zod form schema & generate form type
const formSchema = z.object({
  name: z.string().min(1, "Store name is required!"),
});
type SettingFormValues = z.infer<typeof formSchema>;

interface SettingFormProps {
  initialData:  Store
}
export const SettingForm = ({initialData}:SettingFormProps) => {
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
  })

  const [open, setOpen] = useState(false); // controlling alert modal
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const router = useRouter()

  const onSubmit = async (data : SettingFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh()
      toast.success("Store updated!")
    } catch (error) {
      toast.error("Something went wrong!")
      console.log(error);
    } finally {  
      setLoading(false)
    }
    
  };
  return (
    <>
      <DeleteModal 
      storeId={initialData.id} 
      open={open} 
      setClose={ ()=> setOpen(false)}
      />
      
      <div className="flex items-center justify-between">
        <Heading
        title="Settings"
        />
        <Button
        disabled={loading}
        variant={"destructive"}
        size={"default"}
        onClick={()=> setOpen(true)}
        >
          <Trash className="h-4 w-4 mr-2" />
          <span>Delete Store</span>
        </Button>
      </div>

      <Separator />

      <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 w-full"
        >
          <div className="grid grid-cols-3 gap-8">
            <FormField 
            control={form.control}
            name="name"
            render={({field})=> (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                  disabled={loading} 
                  placeholder="Store name" 
                  className="lg:w-1/2"
                  {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
          </div>

          <Button 
          type="submit"
          disabled={loading}
          className="ml-auto"
          >
            Save changes
          </Button>
        </form>
      </Form>
    </>
  )
}
