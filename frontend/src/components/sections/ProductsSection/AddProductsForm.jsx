// import icons
import { PencilSquareIcon } from "@heroicons/react/24/outline";



function AddProductsForm() {
    return (
        <div className='w-full h-full'>
            <header className='w-full h-12 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800'>
                <PencilSquareIcon className="w-5 h-5 text-indigo-500" />
                <h3 className='text-md font-bold text-indigo-500 dark:text-slate-50'>
                    اضافه کردن محصول
                </h3>
                <span></span>
            </header>
            <form className="px-4">
                {/* product name */}
                <div className="w-full mt-3">
                    <label
                        className="text-sm text-slate-500 dark:text-slate-400 font-light"
                    >
                        نام محصول :
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 h-10 pr-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                        placeholder="مثال : آیفون ۱۷ پرو ..."
                    />
                </div>

                {/* product description */}
                <div className="w-full mt-4">
                    <label
                        className="text-sm text-slate-500 dark:text-slate-400 font-light"
                    >
                        توضیحات محصول :
                    </label>
                    <textarea
                        className="w-full mt-2 p-2 outline-none bg-slate-50 dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 text-xs dark:text-slate-50"
                        placeholder="مثال : آیفون ۱۷ پرو ..."
                    >
                    </textarea>
                </div>

                {/* product price */}
                <div className="w-full mt-2">
                    <label
                        className="text-sm text-slate-500 dark:text-slate-400 font-light"
                    >
                        قیمت :
                    </label>
                    <input
                        type="text"
                        className="w-full h-10 mt-2 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                        placeholder="مثال : ۲،۰۰۰،۰۰۰"
                    />
                </div>

                {/* product categories */}
                <div className="w-full mt-4">
                    <label
                        className="text-sm text-slate-500 dark:text-slate-400 font-light"
                    >
                        دسته بندی ها  :
                    </label>
                    <div className="w-full h-10 grid grid-cols-2 gap-x-3 mt-2">
                        <select className="col-span-1 h-10 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs">
                            <option value="">دسته بندی اصلی </option>
                        </select>
                        <select className="col-span-1 h-10 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs">
                            <option value="">زیر دسته </option>
                        </select>
                    </div>
                </div>

                {/* product stock */}
                <div className="w-full mt-4">
                    <label
                        className="text-sm text-slate-500 dark:text-slate-400 font-light"
                    >
                        تعداد :
                    </label>
                    <div className="w-full grid grid-cols-5">
                        <div className="h-full flex items-center justify-center col-span-1">
                            <button className="h-10 w-10 rounded-md bg-green-500/20 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-slate-50 transition duration-300 cursor-pointer">
                                +
                            </button>
                        </div>
                        <input
                            type="number"
                            className="col-span-3 h-10 mt-2 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                            placeholder="مثال : ۱۰"
                        />
                        <div className="h-full flex items-center justify-center col-span-1">
                            <button className="h-10 w-10 rounded-md bg-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-slate-50 transition duration-300 cursor-pointer">
                                -
                            </button>
                        </div>
                    </div>
                </div>

                {/* product images */}
                <div className="w-full mt-4">
                    <label
                        className="text-sm text-slate-500 dark:text-slate-400 font-light"
                    >
                        تصاویر :
                    </label>
                    <div className="w-full h-10 grid grid-cols-8 gap-x-2 mt-2">
                        <input
                            type="file"
                            className="col-span-3 h-10 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                        />
                        <span className="col-span-1"></span>
                        <span className="col-span-1 h-10 bg-indigo-500 rounded-md"></span>
                        <span className="col-span-1 h-10 bg-indigo-500 rounded-md"></span>
                        <span className="col-span-1 h-10 bg-indigo-500 rounded-md"></span>
                        <span className="col-span-1 h-10 bg-indigo-500 rounded-md"></span>
                    </div>
                </div>


                {/* product status */}
                <div className="w-full flex items-center h-10 justify-between mt-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
                        وضعیت :
                    </p>
                    <span className="flex items-center">
                        <input type="radio" name="status" id="isActiveProduct"/>
                        <label 
                        className="text-xs mr-1 text-slate-500 dark:text-slate-400"
                        htmlFor="isActiveProduct"
                        >
                         فعال
                        </label>
                    </span>
                    <span className="flex items-center">
                        <input type="radio" name="status" id="isNotActiveProduct"/>
                        <label 
                        className="text-xs mr-1 text-slate-500 dark:text-slate-400"
                        htmlFor="isNotActiveProduct"
                        >
                            غیر فعال
                        </label>
                    </span>
                </div>


                {/* submit button */}
                <button
                    type="button"
                    className="w-full mt-2 h-10 bg-gradient-to-r from-blue-500 via-violet-500 to-indigo-600 bg-[length:200%_100%] bg-left hover:bg-right transition-[background-position] duration-500 flex justify-center items-center text-slate-50 rounded-md cursor-pointer text-sm font-medium"
                >
                    افزودن محصول
                </button>


            </form>
        </div>
    )
}

export default AddProductsForm