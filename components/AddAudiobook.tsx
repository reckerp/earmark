"use client";
import React from 'react'
import { addAudiobook } from '@/actions/spotifyAction';
import { useFormState } from "react-dom";
import { useEffect, useRef } from 'react';
import { Toaster, toast } from 'sonner';
import { FormState } from '@/types/FormState';

const initialState: FormState = {
    message: '',
    type: ''
}

const AddAudiobook = () => {

    const [state, formAction] = useFormState(addAudiobook, initialState);
    const input = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (state.type === 'error') toast.error(state.message)
        if (state.type === 'success') toast.success(state.message)
        if (input.current) input.current.value = '';
    }, [state.message])


    return (
        <div className='flex justify-center'>

            <form className="flex flex-col gap-1 w-full sm:w-3/4 lg:w-1/2 " action={formAction}>
                <input ref={input} id="link" name="link" type="text" className="input input-bordered input-primary w-full" placeholder='https://open.spotify.com/track/1wqVEq...' required />
                <button className="btn mt-5">Add Audiobook</button>
            </form>
            <Toaster richColors />
        </div>
    )
}

export default AddAudiobook
