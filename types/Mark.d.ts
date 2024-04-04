export type Mark = {
    id: string;
    title: string;
    author: string;
    cover_url: string;
    spotify_url: string;
    spotify_uri: string;
    track_no: string | null;
    last_listen: Date | null;
    userId: string;
};
