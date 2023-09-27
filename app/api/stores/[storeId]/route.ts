import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

interface APIProps {
    params : {storeId: string},
}

// PATCH : "api/stores/:storeId" -- UPDATE STORE NAME
export async function PATCH(req: Request, {params}: APIProps) {
    try {
        const {userId} = auth();
        const body = await req.json()
        const {name} = body;        
        
        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!name) {
            return new NextResponse("Store name is required", {status: 400})
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }
        // use updateMany because "userId" is not unique, that will cause error in prisma      
        const store = await prismadb.store.updateMany({
            where:{
                id: params.storeId,
                userId
            },
            data:{
                name
            }
        });

        return NextResponse.json(store)

    } catch (error) {
        console.log("[STORE_PATCH]", error);
        return new NextResponse("Internal error", {status: 500})
    }
}


// DELETE : "api/stores/:storeId" -- DELETE STORE

export async function DELETE(_req : Request, {params}: APIProps) {
    try {
        const {userId} = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", {status: 401})
        }

        if (!params.storeId) {
            return new NextResponse("Store id is required", {status: 400})
        }
        // use deleteMany because "userId" is not unique, that will cause error in prisma      
        const store = await prismadb.store.deleteMany({ 
            where:{
                id: params.storeId,
                userId
            }
        });

        return NextResponse.json(store)

    } catch (error) {
        console.log("[STORE_DELETE]", error);
        return new NextResponse("Internal error", {status: 500})
    }
}