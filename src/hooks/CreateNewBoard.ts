import { QueryClient, useMutation } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { supabase } from "../common/supabaseClient"

export const useCreateNewBoard = () => {
    const queryClient = new QueryClient()
    const user = useAuth()
    return useMutation({
        mutationKey: ["boards"],
        mutationFn: async (name :string) => {
            if (!user.session) {
                throw new Error("User is not authenticated")
            }
            const {data, error } = await supabase
            .from("boards")
            .insert({ owner_id: user.session.user.id, name })
            .select()

            if (error) {
                throw new Error(error.message)
            }
            return data
        },onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["boards"] })
        }
    })
}