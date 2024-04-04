"use server";
import { auth } from "@/auth";
import prisma from '@/prisma/connection'
import { Mark } from "@/types/Mark";
import Link from "next/link";
import React from 'react'


const AudiobookGallery = async () => {
    const session = await auth();

    const marksArray: Mark[] = await prisma.marks.findMany({
        where: {
            user: {
                email: { equals: session?.user.email ?? "" },
            },
        },
        orderBy: {
            last_listen: "desc",
        },
    });

    return (
        <>
            <hr className="mt-10 bg-gray-400 opacity-30 h-0.5 rounded" />
            {marksArray.length === 0 && <div className='text-center mt-10 font-medium text-gray-600'>Your Library is currently empty</div>}
            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10'>
                {marksArray.map((mark: Mark) => (
                    <div key={mark.id} className="card w-72 bg-base-100 shadow-xl">
                        <figure><img src={mark.cover_url} alt="Cover Picture" /></figure>
                        <div className="card-body">
                            <h2 className="card-title">{mark.title}</h2>
                            <p className='mb-0'><b>{mark.author}</b><br />{mark.last_listen?.toDateString()}</p>
                            <div className="card-actions justify-end">
                                <Link className='btn btn-xs' href={mark.spotify_url}>Listen Now</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div >
        </>
    );
}

export default AudiobookGallery
