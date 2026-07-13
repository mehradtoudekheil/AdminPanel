// import Icons
import { UsersIcon } from "@heroicons/react/24/outline";
// import tools
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { usersApi } from "../../api/usersApi";
import { formatCreatedAt } from "../../utils/date";

function LastUsers() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await usersApi.getUsers();

        setUsersList(data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className='col-span-1 h-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3'>
      <header className="w-full flex justify-between h-12 items-center">
        <div className="flex items-center">
          <UsersIcon className="text-indigo-500 w-6 h-6" />

          <h3 className="mr-2 text-slate-900 dark:text-slate-50 font-bold">
            کاربران جدید
          </h3>
        </div>

        <Link
          to="/dashboard/Users"
          className="text-blue-500 text-sm hover:text-indigo-500"
        >
          مشاهده همه
        </Link>
      </header>

      <div className="w-full">
        {usersList.slice(0, 5).map((user) => (
          <div
            key={user._id}
            className="w-full h-14 flex mt-2 px-3 items-center rounded-xl justify-between border border-slate-200 dark:border-slate-800"
          >
            <div className="flex items-center">
              <img
                src={user.avatar || "/images/Avatar.png"}
                alt="آواتار کاربر"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div className="mr-3">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-50">
                  {`${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.name}
                </p>

                <p className="text-xs font-light text-slate-500 dark:text-slate-400 mt-1">
                  {user.email}
                </p>
              </div>
            </div>

            <p className="text-xs font-light text-slate-500 dark:text-slate-400">
              {formatCreatedAt(user.createdAt)}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LastUsers