import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"
import Navbar from "@/components/navbar";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";
import useMovieList from "@/hooks/useMovieList";
import useFavories from "@/hooks/useFavorites";

import useInfoModal from "@/hooks/useInfoModal";
import InfoModal from "@/components/InfoModal";
export async function getServerSideProps(context: NextPageContext){
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }

}

export default function Home() { 
  const {data:movies = []} = useMovieList();
  const {data: favorites = []} = useFavories();
  const {isOpen, closeModal} = useInfoModal();

  return (
    <>
    <InfoModal/>
    <Navbar/>
    <Billboard/>
    <div className="pb-40">
      <MovieList title="Trending Now" data={movies}/>
      <MovieList title="My list" data={favorites}/>
    </div>
    </>
  )
}
