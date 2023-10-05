import {
  GetStaticProps,
  GetStaticPropsResult,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import React from "react";

const getPictureBlurFallback = async (src: string) => {
  const buffer = await fetch(src).then(async (res) =>
    Buffer.from(await res.arrayBuffer())
  );

  const { ...plaiceholder } = await getPlaiceholder(buffer, { size: 10 });

  return {
    blurDataURL: plaiceholder.base64,
    src,
  };
};

export const getStaticProps = async () => {
  const imgsList = [
    "https://picsum.photos/id/0/5000/3333",
    "https://picsum.photos/id/1/5000/3333",
  ];

  const imgs = await Promise.all(imgsList.map(getPictureBlurFallback));

  return {
    props: {
      imgs,
    },
    revalidate: 60,
  };
};

export default function Home({
  imgs,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [isShown, setIsShown] = React.useState(false);

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      <h1>Sharp issue</h1>
      <button onClick={() => setIsShown(true)}>show images</button>
      {isShown ? (
        <div>
          {imgs.map((img) => (
            <Image
              key={img.src}
              {...img}
              alt="team-member"
              className="h-full w-full object-cover grayscale"
              height={333}
              placeholder="blur"
              width={500}
            />
          ))}
        </div>
      ) : null}

      <h1>Sharp issue</h1>
    </main>
  );
}
