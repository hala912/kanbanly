import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../common/supabaseClient"

export const  useBoards=() => {
    const user = useAuth()
    return useQuery({
        queryKey: ["boards"],
        queryFn: async () => {
            const {data, error } = await supabase
            .from("boards")
            .select("*")
           
            if (error) {
                throw new Error(error.message)
            }
            return data

        },
        enabled: !!user.session
    })

}