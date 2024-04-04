import React from 'react'

const AddAudiobook = () => {
    return (
        <div className='flex justify-center'>

            <form className="flex flex-col gap-1 w-full sm:w-3/4 lg:w-1/2 " action="">
                <input type="text" className="input input-bordered input-primary w-full" placeholder='https://open.spotify.com/track/1wqVEq...' />
                <button className="btn mt-5">Add Audiobook</button>
            </form>
        </div>
    )
}

export default AddAudiobook
