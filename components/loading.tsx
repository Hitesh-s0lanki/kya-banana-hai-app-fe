import Image from "next/image";

type Props = {};

const Loading = ({ }: Props) => {
    return (
        <div className=" h-full w-full flex flex-col justify-center items-center">
            <Image
                src="/loading.gif"
                alt="loading"
                height={300}
                width={300}
            />
            <p>AI in action. Sit back & relax.</p>
        </div>
    );
};

export default Loading;