import { auth, signIn, signOut } from '@/auth';
import React from 'react'
import { LuLogIn } from "react-icons/lu";
import { FiUser } from "react-icons/fi";

const Navbar = async () => {
    const session = await auth();
    return (
        <nav className="navbar bg-primary text-primary-content rounded-xl flex justify-between">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">EarMark</a>
            </div>
            <div className="flex-none">
                {session ?
                    <form className='flex flex-row items-center' action={async () => {
                        "use server";
                        await signOut();
                    }}>
                        <p className='mr-1 font-medium'>{session?.user?.name}</p>
                        <button className="btn btn-square btn-ghost">
                            <FiUser className="w-6 h-6" />
                        </button>
                    </form>
                    :
                    <form action={async () => {
                        "use server";
                        await signIn();
                    }}>
                        <button className="btn btn-square btn-ghost">
                            <LuLogIn className="w-6 h-6" />
                        </button>
                    </form>
                }
            </div>
        </nav>
    )
}

export default Navbar
