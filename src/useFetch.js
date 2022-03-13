import { useState, useEffect } from "react";

const useFetch = (url) =>{

    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        fetch(url, { signal: abortCont.signal }).then(res => {
            if(!res.ok){
                throw Error('some error');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsPending(false);
            setError(null);
        })
        .catch(err => {
            if(err.name === "AbortError"){
                console.log('fetch aborted');
            }
            else{
                setIsPending(false);
                setError(err.message);
            }
        })
        return () => abortCont.abort();
    }, [url]);  // whenever the url changes this is going to run

    return {data, isPending, error};  // return these parameters so that it can be used in some other files
}

export default useFetch;