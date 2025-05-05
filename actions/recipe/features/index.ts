import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { create, findAll, findOne, getImageUrl } from "@/actions/recipe/actions"
import { z } from "zod"
import { RecipeSchema } from "@/schema/index.schema"
import { toast } from "sonner"

export const useGetRecipes = () => {
    const query = useQuery({
        queryKey: ["recipes"],
        queryFn: async () => {
            const data = await findAll()
            return data
        }
    })

    return query
}

export const useCreateRecipe = () => {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (values: z.infer<typeof RecipeSchema>) => await create(values),
        onSuccess: () => {
            toast.success("Recipe Created Successfully!")
            queryClient.invalidateQueries({ queryKey: ["recipes"] })
        },
        onError: (error) => {
            toast.error(`Failed to create account : ${error.message}`)
        }
    })

    return mutation
}

export const useGetRecipe = (id?: string) => {

    const query = useQuery({
        enabled: !!id,
        queryKey: ["recipe", { id }],
        queryFn: async () => await findOne(id)
    })

    return query
}

export const useGetImage = (id?: string) => {

    const query = useQuery({
        enabled: !!id,
        queryKey: ["recipe-image", { id }],
        queryFn: async () => await getImageUrl(id)
    })

    return query
}
