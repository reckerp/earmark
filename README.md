# EarMark
This is a simple Next.js project that allows you to bookmark your Spotify audiobooks, providing an overview of your listening progress.

### Features

- Bookmark Spotify audiobooks with chapter and timestamp.
- View a list of all your bookmarked audiobooks.
- See your progress for each audiobook, including the bookmarked chapter and timestamp.

### Technologies

- Next.js
- TypeScript
- Tailwind CSS
- Spotify API
- Docker
- PostgreSQL (with Prisma)

### Getting Started

1. Build the docker image.
```bash
docker build -t earmark:latest .
```

2. Run the docker image.
```bash
docker run -p 3000:3000 -d earmark:latest
```
- Additionally, specify all required environment variables in the `docker run` command (see env.example).
    - `SPOTIFY_CLIENT_ID`
    - `SPOTIFY_CLIENT_SECRET`
    - `DATABASE_URL`
    - `AUTH_SECRET`

### Further Documentation
Look at the Spotify API documentation [here](https://developer.spotify.com/documentation/web-api/)
on further information on how to obtain a Client ID and Secret.
