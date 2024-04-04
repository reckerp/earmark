"use server";

import { auth } from '@/auth';
import { FormState } from '@/types/FormState';
import { z } from 'zod';
import prisma from '@/prisma/connection';
import { revalidatePath } from "next/cache";

const SPOTIFY_API = "https://api.spotify.com/v1/";

type SpotifyMark = {
    title: string;
    author: string;
    cover_url: string;
    spotify_url: string;
    spotify_uri: string;
    track_no: string;
}

export const addAudiobook = async (prevState: FormState, input: FormData) => {
    const schema = z.object({
        share_url: z.string().url(),
    });

    const session = await auth();
    if (!session || !session.user.access_token || !session.user.email || !session.user.refresh_token || !session.user.token_expiry) {
        return { message: 'Please sign in to add an audiobook', type: 'error' }
    }

    if (session.user.token_expiry < Math.floor(Date.now() / 1000)) {
        console.log('Token expired');
        const [accessToken, refreshToken] = await refreshAccessToken(session.user.refresh_token);
        if (!accessToken || !refreshToken) {
            return { message: 'Failed to refresh token', type: 'error' }
        }
        session.user.access_token = accessToken;
        session.user.refresh_token = refreshToken;
        session.user.token_expiry = new Date().getUTCMilliseconds() + 3600;

    } else {
        console.log('Token valid');
    }

    try {
        const data = schema.parse({
            share_url: input.get('link')
        });

        const trackId = parseTrackId(data.share_url);
        const mark = await lookupTrack(trackId, session.user.access_token as string);
        if (await updateMarkIfExist(mark, session.user.email)) {
            return { message: `Last playtime of ${mark.title} updated`, type: 'success' }
        }
        await addMark(mark, session.user.email);

        revalidatePath('/');
        return { message: `Audiobook ${mark.title} added successfully`, type: 'success' }
    } catch (error) {
        return { message: 'Invalid URL', type: 'error' }
    }

}


const parseTrackId = (url: string) => {
    const regex = /track\/(.+?)\?/;
    const match = url.match(regex);

    if (!match || match.length < 2) {
        throw new Error('Invalid URL');
    }

    return match[1];

}

const lookupTrack = async (trackId: string, accessToken: string) => {
    const headers = new Headers();
    headers.append("Authorization", `Bearer ${accessToken}`);

    const requestOptions: RequestInit = {
        method: "GET",
        headers: headers,
        redirect: "follow" as RequestRedirect,
    };


    const response = await fetch(SPOTIFY_API + "tracks/" + trackId, requestOptions);
    const result = await response.json();

    const mark: SpotifyMark = {
        title: result.album.name as string,
        author: result.artists[0].name as string,
        cover_url: result.album.images[0].url as string,
        spotify_url: result.external_urls.spotify as string,
        spotify_uri: result.uri as string,
        track_no: result.track_number as string,
    };

    return mark;
}

const addMark = async (mark: SpotifyMark, userEmail: string) => {
    await prisma.marks.create({
        data: {
            title: mark.title,
            author: mark.author,
            cover_url: mark.cover_url,
            spotify_url: mark.spotify_url,
            spotify_uri: mark.spotify_uri,
            track_no: String(mark.track_no),
            last_listen: new Date(),
            user: {
                connect: {
                    email: userEmail,
                },
            },
        },
    });
}

const updateMarkIfExist = async (mark: SpotifyMark, userEmail: string) => {
    const existingMark = await prisma.marks.findFirst({
        where: {
            spotify_url: mark.spotify_url,
            user: {
                email: userEmail,
            },
        },
    });

    if (existingMark) {
        await prisma.marks.update({
            where: {
                id: existingMark.id,
            },
            data: {
                last_listen: new Date(),
            },
        });
        return true;
    } else {
        return false;
    }
}

const refreshAccessToken = async (refreshToken: string) => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const authEncoded = Buffer.from(clientId + ':' + clientSecret).toString('base64');
    console.log(`AUTH: ${authEncoded}`);

    const headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", `Basic ${authEncoded}`);

    const urlencoded = new URLSearchParams();
    urlencoded.append("grant_type", "refresh_token");
    urlencoded.append("refresh_token", refreshToken);

    const requestOptions: RequestInit = {
        method: "POST",
        headers: headers,
        body: urlencoded.toString(),
    };

    const response = await fetch("https://accounts.spotify.com/api/token", requestOptions);
    console.log(response);
    if (!response.ok) {
        throw new Error('Failed to refresh token');
    }
    const result = await response.json();

    return [result.access_token, result.refresh_token];
}
