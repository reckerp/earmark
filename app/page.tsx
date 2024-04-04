import AddAudiobook from "@/components/AddAudiobook";
import Hero from "@/components/Hero";
import { auth } from "@/auth";
import AudiobookGallery from "@/components/AudiobookGallery";

export default async function Home() {
    const session = await auth();
    return (
        <main className="mt-10 pb-40">
            {session ?
                <>
                    <AddAudiobook />
                    <AudiobookGallery />
                </>
                :
                <Hero />
            }
        </main>
    );
}
