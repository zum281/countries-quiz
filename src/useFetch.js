import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url)
            .then((res) => {
                if (!res.ok) {
                    throw Error("could not fetch data");
                }
                return res.json();
            })
            .then((data) => {
                setIsPending(false);

                let correctData = [];
                data.forEach((element) => {
                    if (
                        element.name !== "" &&
                        element.capital !== "" &&
                        element.flag !== ""
                    )
                        correctData.push(element);
                });

                setData(correctData);
                setError(null);
            })
            .catch((err) => {
                if (err.name === "AbortError") {
                    console.log("fetch aborted");
                } else {
                    setIsPending(false);
                    setError(err.message);
                }
            });
        return () => abortCont.abort();
    }, [url]);

    return { data, isPending, error };
};

export default useFetch;
