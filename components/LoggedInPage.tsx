"use client";
import React from 'react'
import { useState } from 'react';
import AddAudiobook from '@/components/AddAudiobook';
import AudiobookGallery from '@/components/AudiobookGallery';

const LoggedInPage = () => {
    const [markArray, setMarkArray] = useState([]);
    return (
        <>
            <AddAudiobook />
            <AudiobookGallery />

        </>
    )
}

export default LoggedInPage
