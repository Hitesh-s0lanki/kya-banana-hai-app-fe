import { useGetImage } from "@/actions/recipe/features";
import Image from "next/image";
import MenuItemImg from "./menu-item-img";

type Props = {
    id: string
};

const ImageListRecipe = ({
    id
}: Props) => {

    const { data: imageUrl, isLoading, error } = useGetImage(id)

    if (error) {
        return <p>Something went wrong!</p>
    }

    return (
        <div className=" h-36">
            {isLoading ? <MenuItemImg height={150} width={150} /> : (
                <Image
                    src={imageUrl || ""}
                    width={150}
                    height={150}
                    alt='Image'
                    className=" w-full rounded-sm shadow-lg object-contain object-center"
                />
            )}
        </div>
    );
};

export default ImageListRecipe;