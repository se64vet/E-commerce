import { format } from "date-fns";
import { CategoryClient } from './components/client'
import { CategoryColumn } from "./components/columns";
import prismadb from "@/lib/prismadb";

interface CategoryPageProps {
  params : {storeId : string}
}
const CategoryPage = async ({params} : CategoryPageProps) => {

  // const billboards = await prismadb.billboard.findMany({
  //   where: {
  //     storeId: params.storeId
  //   },
  //   orderBy: {
  //     createdAt: 'desc'
  //   }
  // });

  // const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
  //   id: item.id,
  //   label: item.label,
  //   createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  // }));

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