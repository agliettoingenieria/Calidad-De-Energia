import { useState } from 'react';
import NextImage from 'next/image';

const loadImageSrc = (e) => {
  console.log(e);
};

export const Image = ({
  width = 100,
  height = 100,
  alt = 'Image',
  title = 'Image',
  lazy = true,
  priority = false,
  decoding = 'async',
  src = '',
  about = 'Is an Image',
}) => {
  const [imageSrc, setImageSrc] = useState(src);

  return (
    <NextImage
      width={width}
      height={height}
      src={src}
      alt={alt}
      title={title}
      about={about}
      loading={lazy ? 'lazy' : 'eager'}
      decoding={decoding}
      priority={priority}
      placeholder="blur"
      blurDataURL={`/_next/image?url=${src}&w=16&q=1`}
      objectFit="contain"
    />
  );
};
