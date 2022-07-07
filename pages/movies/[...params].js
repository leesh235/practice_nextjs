import { useRouter } from "next/router";
import Seo from "../../components/Seo";

export default function Detail({ params }) {
    const router = useRouter();
    //csr 해결책
    // const [title, id] = router.query.params || [];
    //ssr 해결책
    const [title, id] = params || [];
    return (
        <div>
            <Seo title={title} />
            <h4>{title}</h4>
        </div>
    );
}

export async function getServerSideProps({ params: { params } }) {
    return {
        props: {
            params,
        },
    };
}

/*
    nextjs는 url를 route로 관리하지 않고 폴더로 관리한다.

    1) 상세페이지가 존해할 때
    pages
        -movies
            -index.js : localhost:3000/movies
            -all.js   : localhost:3000/movies/all
    
    2) 페이지가 하나만 존재할 때
    pages
        -movies.js : localhost:3000/movies

    3) 동적페이지
    pages
        -[변수명].js : localhost:3000/변수명
    
    4) catch all url
    pages
        -[...변수명].js : localhost:3000/변수명1/변수명2/변수명3...
*/
