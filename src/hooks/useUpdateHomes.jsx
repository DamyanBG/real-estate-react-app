import { useContext } from "react";

import { HomesDispatchContext } from "../context/HomesContext";
import { fetchAllHomes } from "../api/homeApi";

const useUpdateHomes = () => {
  const dispatchHomesContext = useContext(HomesDispatchContext);

  const updateHomes = () => {
    fetchAllHomes()
      .then((fetchedHomes) => {
        dispatchHomesContext({
          type: "set",
          setHomes: fetchedHomes
        });
      });
  };

  return updateHomes;
};

export default useUpdateHomes;
