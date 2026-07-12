import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function LastProducts() {
  return (
    <div className="col-span-2 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3">
      {/* Header */}
      <header className="w-full flex justify-between h-12 items-center">
        <div className="flex items-center">
          <ShoppingBagIcon className="text-indigo-500 w-6 h-6" />

          <h3 className="mr-2 text-slate-900 dark:text-slate-50 font-bold">
            محصولات اخیر
          </h3>
        </div>

        <Link
          to="/dashboard/products"
          className="text-blue-500 text-sm hover:text-indigo-500"
        >
          مشاهده همه
        </Link>
      </header>

      {/* Table */}
      <table className="w-full mt-3 border-separate border-spacing-0">
        <thead>
          <tr className="bg-slate-100 dark:bg-slate-800">
            <th className="text-right py-4 px-3 text-xs rounded-r-xl font-medium text-slate-500">
              محصول
            </th>

            <th className="text-right py-4 px-3 text-xs font-medium text-slate-500">
              دسته بندی
            </th>

            <th className="text-right py-4 px-3 text-xs font-medium text-slate-500">
              قیمت
            </th>

            <th className="text-right py-4 px-3 text-xs font-medium text-slate-500">
              موجودی
            </th>

            <th className="text-right py-4 px-3 rounded-l-xl text-xs font-medium text-slate-500">
              وضعیت
            </th>
          </tr>
        </thead>

        <tbody>
          <tr className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
            {/* Product */}
            <td className="border-slate-200 dark:border-slate-800 py-4 px-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-500"></div>

                <span className="text-sm text-slate-700 dark:text-slate-200">
                  آیفون 15 پرو مکس
                </span>
              </div>
            </td>

            {/* Category */}
            <td className="border-slate-200 dark:border-slate-800 py-4 px-3 text-sm text-slate-600 dark:text-slate-300">
              موبایل
            </td>

            {/* Price */}
            <td className="border-slate-200 dark:border-slate-800 py-4 px-3 text-sm font-medium text-slate-700 dark:text-slate-200">
              45,000,000 تومان
            </td>

            {/* Stock */}
            <td className="border-slate-200 dark:border-slate-800 py-4 px-3 text-sm text-slate-700 dark:text-slate-200">
              15
            </td>

            {/* Status */}
            <td className="border-slate-200 dark:border-slate-800 py-4 px-3">
              <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-600 dark:bg-green-500/10 dark:text-green-400">
                فعال
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default LastProducts;