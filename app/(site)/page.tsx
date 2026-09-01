import { DateTime } from 'luxon';
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import getSongs from "@/actions/getSongs";
import PageContent from "./components/PageContent";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  let greetings = 'Good day';

  //const currentTime = DateTime.local().setZone('local').toFormat('HH:mm');

  //const currentHour = parseInt(currentTime.split(':')[0]);

  //if (currentHour >= 4 && currentHour < 12) {
  //  greetings = 'Good morning';
  //} else if (currentHour >= 12 && currentHour < 16) {
  //  greetings = 'Good afternoon';
  //} else if (currentHour >= 16 && currentHour < 22) {
  //  greetings = 'Good evening';
  //} else {
  //  greetings = 'Zzzzzzz';
  //}

  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto
    ">
      <Header>
        <div className="mb-2">
          <h1
            className="
              text-white
              text-3xl
              font-semibold
              tracking-tighter
            "
          >
            {greetings}
          </h1>
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              xl:grid-cols-3
              2xl:grid-cols-4
              gap-3
              mt-4
              tracking-tighter
            "
          >
            <ListItem 
              image="/images/liked.png"
              name="Liked Songs (Favorites)"
              href="liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6 sm:mt-3 sm:mb-8 md:mt-4 md:mb-9 lg:mt-5 lg:mb-10">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold -mt-4">
            Play what you love — top freshest hits
          </h1>
        </div>
        <PageContent songs={songs}/>
      </div>
    </div>
  )
}
 
