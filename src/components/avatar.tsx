import Image from "next/image";

type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <>
      <Image src={picture} height={240} width={240} alt={name} />
      <div className="text-xl font-bold">{name}</div>
    </>
  );
};

export default Avatar;
