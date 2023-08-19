import { useEffect, useState } from "react";

const usePlayer = id =>{
    const [player, setPlayer] = useState({});

    useEffect( () =>{
        const url =`https://powerful-wave-58652-26b956be3d84.herokuapp.com/player/${id}`;

        fetch(url)
        .then(res=>res.json())
        .then(data=>setPlayer(data))

    },[id])
    return [player]
}
export default usePlayer;