import React from 'react'
import { signIn } from '@/auth';

const Hero = () => {
    return (
        <div className="hero">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img src="https://images.unsplash.com/photo-1615714891303-5c99c8f0f11d?q=80&w=2680&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="hidden lg:block max-w-sm rounded-lg shadow-2xl" alt="Audiobook image" />
                <div>
                    <h1 className="text-5xl font-bold">Bookmark your Audiobooks</h1>
                    <p className="py-6 pr-12">
                        Are you tired of forgetting which Spotify Audiobooks you have already listend to?
                        Then EarMark can help you by keeping track of all your Audiobooks in one place.
                    </p>
                    <form action={async () => {
                        "use server";
                        await signIn();
                    }}>
                        <button className="btn btn-primary">Log In using Spotify</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Hero
