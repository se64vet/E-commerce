import prismadb from "@/lib/prismadb"

import { PropertiesClient } from "./components/client"
import format from "date-fns/format"
import { ColorColumn } from "./components/color/columns"
import { SizeColumn } from "./components/size/columns"

interface PropertiesPageProps {
    params: {
        storeId: string
    }
}
const PropertiesPage = async ({params} : PropertiesPageProps) => {

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    }
  })
  const formattedColors : ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, 'MMMM do, yyyy')
  }))

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    }
  })
  const formattedSizes : SizeColumn[] = sizes.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, 'MMMM do, yyyy')
  }))

  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <PropertiesClient 
            colors={formattedColors} 
            sizes={formattedSizes}/>
        </div>
    </div>
  )
}

export default PropertiesPage