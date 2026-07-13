// import components
import AddProductsForm from "./ProductsSection/AddProductsForm"
import ProductsList from "./ProductsSection/ProductsList"

function ProductSection() {

  return (
    <div className='w-full h-full gap-x-3 grid grid-cols-3'>
      <div className='col-span-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 h-full'>
        <AddProductsForm/>
      </div>
      <div className='col-span-2 rounded-lg border border-slate-200 dark:border-slate-800 h-full'>
        <ProductsList/>
      </div>
    </div>
  )
}

export default ProductSection