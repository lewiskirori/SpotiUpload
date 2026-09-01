"use client";

import SongItem from "@/components/SongItem";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface PageContentProps {
    songs: Song[];
}

const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);

    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400 flex flex-col items-center" style={{ paddingTop: '50px', marginTop: 'auto', marginBottom: 'auto' }}>
                <span style={{ fontSize: '1.4rem' }}>
                    Oh dear. Not for a Moment
                </span>
                <br />
                <span style={{ fontSize: '0.9rem' }}>
                    Sign in or try reloading shortly.
                </span>
            </div>
        )
    }
    return (
        <div
            className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-3
                lg:grid-cols-4
                xl:grid-cols-5
                2xl:grid-cols-8
                gap-4
                mt-4
            "
        >
            {songs.map((item) => (
                <SongItem 
                    key={item.id}
                    onClick={(id: string) => onPlay(id)}
                    data={item}
                />
            ))}
        </div>
    );
}

export default PageContent;
