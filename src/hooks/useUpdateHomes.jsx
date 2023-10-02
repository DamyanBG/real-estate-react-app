import { fetchAllHomes } from "@/common/homesApi";
import { HomesDispatchContext } from "@/context/HomesContext";
import { useContext } from "react";

const useUpdateHomes = () => {
  const dispatchHomesContext = useContext(HomesDispatchContext);

  const updateHomes = () => {
    console.log("updating homes");
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
