import React from 'react'
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useAuth from '../../hooks/useAuth';

function AccountBox() {

    const { user } = useAuth();

    const profile = user?.user;

    const roles = {
        admin: "ادمین سایت",
        superadmin: "مدیر سایت",
        user: "کاربر سایت",
    };

    const myRole = roles[profile.role] || "کاربر سایت";

    const avatar = profile.avatar || "/images/Avatar.png";


    return (
        <div className='flex items-center w-full justify-end'>
            <span className='w-9 h-9 rounded-full'>
                <img
                    src={avatar}
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                />
            </span>
            <span className='mr-3'>
                <p className='text-xs text-mdium '>
                    {
                        `${profile.firstName ?? ""} ${profile.lastName ?? ""}`.trim()
                    }
                </p>
                <p className='text-[10px] text-light '>
                    {myRole}
                </p>
            </span>
            <ChevronDownIcon className='w-4 h-4 text-slate-500 mr-3' />
        </div>
    )
}

export default AccountBox