import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

//NextJs가 렌더링되기전에 가장 먼저 확인 하는 곳
