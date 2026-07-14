import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { categoryApi } from "../../../api/categoryApi";
import { productsApi } from "../../../api/productApi";
import FormButton from "../../ui/FormButton";

function AddProductsForm() {
    const [productData, setProductData] = useState({
        name: "",
        description: "",
        price: "",
        stock: 0,
        category: "",     // دسته اصلی انتخاب‌شده
        subCategory: "",  // زیردسته انتخاب‌شده (اگر وجود داشته باشد)
        images: [],
    });


    const [previews, setPreviews] = useState([]);

    useEffect(() => {
        if (productData.images.length === 0) {
            setPreviews([]);
            return;
        }

        const urls = productData.images.map((file) => URL.createObjectURL(file));
        setPreviews(urls);

        // با تغییر یا آنمونت شدن، URL های قبلی رو آزاد کن تا مموری لیک نشه
        return () => {
            urls.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [productData.images]);

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await categoryApi.getCategories();
                setCategories(data);
            } catch (err) {
                toast.error("خطا در دریافت دسته بندی ها");
            } finally {
                setLoadingCategories(false);
            }
        };
        fetchCategories();
    }, []);

    // فقط دسته های اصلی (بدون parent)
    const parentCategories = categories.filter((c) => !c.parent);

    // زیردسته های مربوط به دسته اصلی انتخاب شده
    const subCategories = categories.filter(
        (c) => c.parent && c.parent._id === productData.category
    );

    const hasSubCategories = subCategories.length > 0;

    const handleParentCategoryChange = (categoryId) => {
        setProductData({
            ...productData,
            category: categoryId,
            subCategory: "", // با تغییر دسته اصلی، زیردسته ریست میشه
        });
    };

    const validate = () => {
        const newErrors = {};

        if (!productData.name.trim()) {
            newErrors.name = "نام محصول الزامی است";
        }

        if (!productData.price || Number(productData.price) <= 0) {
            newErrors.price = "قیمت معتبر وارد کنید";
        }

        if (productData.stock === "" || Number(productData.stock) < 0) {
            newErrors.stock = "تعداد معتبر وارد کنید";
        }

        if (!productData.category) {
            newErrors.category = "دسته بندی را انتخاب کنید";
        } else if (hasSubCategories && !productData.subCategory) {
            newErrors.category = "زیر دسته را انتخاب کنید";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        console.log("submit");

        if (!validate()) {
            toast.error("لطفا فرم را کامل کنید");
            return;
        }

        const finalCategoryId = hasSubCategories
            ? productData.subCategory
            : productData.category;

        const formData = new FormData();
        formData.append("name", productData.name);
        formData.append("description", productData.description);
        formData.append("price", productData.price);
        formData.append("stock", productData.stock);
        formData.append("category", finalCategoryId);

        productData.images.forEach((img) => {
            formData.append("images", img);
        });

        try {
            setSubmitting(true);
            await productsApi.createProduct(formData);
            toast.success("محصول با موفقیت اضافه شد");

            setProductData({
                name: "",
                description: "",
                price: "",
                stock: 0,
                category: "",
                subCategory: "",
                images: [],
            });
        } catch (err) {
            toast.error(
                err?.response?.data?.message || "خطا در ثبت محصول"
            );
        } finally {
            setSubmitting(false);
        }
    };

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
                    <label className="text-sm text-slate-500 dark:text-slate-400 font-light">
                        نام محصول :
                    </label>
                    <input
                        type="text"
                        className="w-full mt-2 h-10 pr-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                        placeholder="مثال : آیفون ۱۷ پرو ..."
                        value={productData.name}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                name: e.target.value,
                            })
                        }
                    />
                    {errors.name && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>
                    )}
                </div>

                {/* product description */}
                <div className="w-full mt-4">
                    <label className="text-sm text-slate-500 dark:text-slate-400 font-light">
                        توضیحات محصول :
                    </label>
                    <textarea
                        className="w-full mt-2 p-2 outline-none bg-slate-50 dark:bg-slate-950 rounded-md border border-slate-200 dark:border-slate-800 text-xs dark:text-slate-50"
                        placeholder="مثال : آیفون ۱۷ پرو ..."
                        value={productData.description}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                description: e.target.value,
                            })
                        }
                    ></textarea>
                </div>

                {/* product price */}
                <div className="w-full mt-2">
                    <label className="text-sm text-slate-500 dark:text-slate-400 font-light">
                        قیمت :
                    </label>
                    <input
                        className="w-full h-10 mt-2 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                        placeholder="مثال : ۲،۰۰۰،۰۰۰"
                        type="number"
                        value={productData.price}
                        onChange={(e) =>
                            setProductData({
                                ...productData,
                                price: e.target.value,
                            })
                        }
                    />
                    {errors.price && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.price}</p>
                    )}
                </div>

                {/* product categories */}
                <div className="w-full mt-4">
                    <label className="text-sm text-slate-500 dark:text-slate-400 font-light">
                        دسته بندی ها  :
                    </label>
                    <div className="w-full h-10 grid grid-cols-2 gap-x-3 mt-2">
                        <select
                            value={productData.category}
                            onChange={(e) => handleParentCategoryChange(e.target.value)}
                            disabled={loadingCategories}
                            className="col-span-1 h-10 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                        >
                            <option value="">
                                {loadingCategories ? "در حال بارگذاری..." : "دسته بندی اصلی"}
                            </option>
                            {parentCategories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>

                        <select
                            value={productData.subCategory}
                            onChange={(e) =>
                                setProductData({
                                    ...productData,
                                    subCategory: e.target.value,
                                })
                            }
                            disabled={!hasSubCategories}
                            className="col-span-1 h-10 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                        >
                            <option value="">
                                {hasSubCategories ? "زیر دسته" : "زیر دسته ندارد"}
                            </option>
                            {subCategories.map((cat) => (
                                <option key={cat._id} value={cat._id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {errors.category && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.category}</p>
                    )}
                </div>

                {/* product stock */}
                <div className="w-full mt-4">
                    <label className="text-sm text-slate-500 dark:text-slate-400 font-light">
                        تعداد :
                    </label>
                    <div className="w-full grid grid-cols-5">
                        <div className="h-full flex items-center justify-center col-span-1">
                            <button
                                type="button"
                                className="h-10 w-10 rounded-md bg-green-500/20 flex items-center justify-center text-green-500 hover:bg-green-500 hover:text-slate-50 transition duration-300 cursor-pointer"
                                onClick={() =>
                                    setProductData({
                                        ...productData,
                                        stock: productData.stock + 1,
                                    })
                                }
                            >
                                +
                            </button>
                        </div>
                        <input
                            type="number"
                            className="col-span-3 h-10 mt-2 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                            placeholder="مثال : ۱۰"
                            value={productData.stock}
                            onChange={(e) =>
                                setProductData({
                                    ...productData,
                                    stock: Number(e.target.value),
                                })
                            }
                        />
                        <div className="h-full flex items-center justify-center col-span-1">
                            <button
                                type="button"
                                onClick={() =>
                                    setProductData({
                                        ...productData,
                                        stock: Math.max(0, productData.stock - 1),
                                    })
                                }
                                className="h-10 w-10 rounded-md bg-red-500/20 flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-slate-50 transition duration-300 cursor-pointer"
                            >
                                -
                            </button>
                        </div>
                    </div>
                    {errors.stock && (
                        <p className="text-[10px] text-red-500 mt-1">{errors.stock}</p>
                    )}
                </div>

                {/* product images */}
                <div className="w-full mt-4">
                    <label className="text-sm text-slate-500 dark:text-slate-400 font-light">
                        تصاویر :
                    </label>
                    <div className="w-full h-10 grid grid-cols-8 gap-x-2 mt-2">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                                setProductData((prev) => ({
                                    ...prev,
                                    images: [...e.target.files].slice(0, 5),
                                }))
                            }
                            className="col-span-3 h-10 p-2 outline-none bg-slate-50 dark:bg-slate-950 dark:text-slate-50 rounded-md border border-slate-200 dark:border-slate-800 text-xs"
                        />
                        <span className="col-span-1"></span>

                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="col-span-1 h-10 bg-indigo-500 rounded-md overflow-hidden flex items-center justify-center"
                            >
                                {previews[index] && (
                                    <img
                                        src={previews[index]}
                                        alt={`preview-${index}`}
                                        className="w-full h-full object-cover"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* product status */}
                <div className="w-full flex items-center h-10 justify-between mt-4">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-light">
                        وضعیت :
                    </p>
                    <span className="flex items-center">
                        <input type="radio" name="status" id="isActiveProduct" />
                        <label
                            className="text-xs mr-1 text-slate-500 dark:text-slate-400"
                            htmlFor="isActiveProduct"
                        >
                            فعال
                        </label>
                    </span>
                    <span className="flex items-center">
                        <input type="radio" name="status" id="isNotActiveProduct" />
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
                    className="w-full h-10 mt-4 bg-indigo-500 hover:bg-indigo-600 text-slate-50 rounded-md text-sm transition duration-300"
                    type="button"
                    text={submitting ? "در حال ارسال..." : "افزودن محصول"}
                    onClick={handleSubmit}
                    disabled={submitting}
                />
            </form>
        </div>
    );
}

export default AddProductsForm;