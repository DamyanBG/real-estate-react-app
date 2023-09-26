const { fetchAllHomes } = require("common/homesApi")
const { HomesDispatchContext } = require("context/HomesContext")
const { useContext } = require("react")

const useUpdateHomes = () => {
    const dispatchHomesContext = useContext(HomesDispatchContext)

    const updateHomes = () => {
        console.log("updateding homes")
        fetchAllHomes()
            .then((fetchedHomes) => {
                dispatchHomesContext({
                    type: "set",
                    setHomes: fetchedHomes
                })
            })
    }

    return updateHomes
}

export default useUpdateHomes