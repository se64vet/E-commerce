'use client'

import z from "zod"
import { useState } from "react";
import { Store } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react"


import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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

  const onSubmit = async (data : SettingFormValues) => {
    console.log(data);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
        title="Settings"
        />
        <Button
        disabled={loading}
        variant={"destructive"}
        size={"icon"}
        onClick={()=> setOpen(true)}
        >
          <Trash className="h-4 w-4" />
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
