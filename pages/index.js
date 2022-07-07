import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Seo from "../components/Seo";

export default function Home({ results }) {
    const [movies, setMovies] = useState([]);

    //rewrite를 이용하여 api key 숨기기
    // useEffect(() => {
    //     (async () => {
    //         const { results } = await (await fetch(`/api/movies`)).json();
    //         setMovies(results);
    //     })();
    // }, []);

    const router = useRouter();

    const onClick = (id, title) => {
        // router.push(
        //     {
        //         pathname: `/movies/${id}`,
        //         query: {
        //             title,
        //         },
        //     },
        //     //as: query값을 url에서 가려준다, Link도 똑같음
        //     `/movies/${id}`
        // );
        router.push(`/movies/${title}/${id}`);
    };

    return (
        <div className="container">
            <Seo title="Home" />
            {results?.map((movie) => (
                <div
                    onClick={() => onClick(movie.id, movie.original_title)}
                    className="movie"
                    key={movie.id}
                >
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    />
                    <h4>
                        <Link
                            href={`/movies/${movie.original_title}/${movie.id}`}
                        >
                            <a>{movie.original_title}</a>
                        </Link>
                    </h4>
                </div>
            ))}
            <style jsx>{`
                .container {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 20px;
                    gap: 20px;
                }
                .movie {
                    cursor: pointer;
                }
                .movie img {
                    max-width: 100%;
                    border-radius: 12px;
                    transition: transform 0.2s ease-in-out;
                    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
                }
                .movie:hover img {
                    transform: scale(1.05) translateY(-10px);
                }
                .movie h4 {
                    font-size: 18px;
                    text-align: center;
                }
            `}</style>
        </div>
    );
}

//함수명이 바뀌면 안됨, 무조건 getServerSideProps
//어떤 코드를 쓰던 server에서만 작동한다
//ssr을 이용하여 api key 숨기기
export async function getServerSideProps() {
    const { results } = await (
        await fetch(`http://localhost:3000/api/movies`)
    ).json();

    //return 안에 props라는 key가 존재
    //해당 컴포넌트 props안으로 전달
    //_app component의 pageProps에 해당
    return {
        props: {
            results,
        },
    };
}
