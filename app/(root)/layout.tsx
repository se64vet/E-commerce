import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import prismadb from "@/lib/prismadb";

// this layout check logged in user
// then load default store and navigate to dashboard
export default async function SetupPageLayout ({
    children
} : {
    children : React.ReactNode
}){
    const {userId} =  auth();
    if(!userId){
        redirect('/sign-in')
    }

    const store =  await prismadb.store.findFirst({
        where:{
            userId,
        }
    })

    if(store){
        redirect(`/${store.id}`);
    }


    return(
        <>
            {children}
        </>
    )

}