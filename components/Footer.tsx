import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { IoIosGlobe } from "react-icons/io";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="footer footer-center p-10 text-primary-content mt-auto">
            <aside>
                <Image src="https://www.recker.io/_next/static/media/r-black.daaf3663.svg" alt="logo" width={50} height={50} />
                <p className="font-bold">
                    Paul Recker
                </p>
                <p>
                    <br /> All artwork belongs to their respective owners. <br /> Not associated with Spotify. <br /> Non-commercial.
                </p>
            </aside>
            <nav>
                <div className="grid grid-flow-col gap-4">
                    <Link href="https://github.com/reckerp">
                        <FaGithub className='w-6 h-6' />
                    </Link>

                    <Link href="https://recker.io">
                        <IoIosGlobe className='w-6 h-6' />
                    </Link>


                </div>
            </nav>
        </footer>
    )
}

export default Footer
