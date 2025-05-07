import { useGetImage } from "@/actions/recipe/features";
import Image from "next/image";

type Props = {
  id: string;
};

const ImageView = ({ id }: Props) => {
  const { data: imageUrl, isLoading, error } = useGetImage(id);

  if (error) {
    return <p>Something went wrong!</p>;
  }

  return (
    <div className="min-h-72 overflow-hidden flex justify-center items-center rounded-sm shadow-lg">
      {isLoading ? (
        <Image
          src="/spinner.gif"
          width={1290}
          height={260}
          alt="Image"
          className=" w-full rounded-sm shadow-lg object-contain object-center max-h-72"
        />
      ) : (
        <Image
          src={imageUrl || ""}
          width={1290}
          height={260}
          alt="Image"
          className=" w-full rounded-sm shadow-lg object-cover max-h-72"
        />
      )}
    </div>
  );
};

export default ImageView;
