import { format } from "date-fns";
import { CategoryClient } from './components/client'
import { CategoryColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";

interface CategoryPageProps {
  params : {storeId : string}
}
const CategoryPage = async ({params} : CategoryPageProps) => {

  const categories =  await prismadb.category.findMany({
    where:{
      storeId: params.storeId
    },
    include:{
      billboard: true
    }
  })

  const formattedCategories : CategoryColumn[] = categories.map((cat) => ({
    id: cat.id,
    name: cat.name,
    billboard: cat.billboard.label,
    createdAt: format(cat.createdAt, 'MMMM do, yyyy'),
  }))
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories}/>
      </div>
    </div>
  )
}

export default CategoryPage