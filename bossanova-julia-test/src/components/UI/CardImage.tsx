import React from 'react';
import { tv } from 'tailwind-variants';

export interface CardProps {
  img: string;
  altImg?: string;
  title: string;
  onClick?: () => void;
}

const card = tv({
  slots: {
    button:
      'group shadow-sm rounded-lg border border-[transparent] hover:border-branding-tertiary relative h-[500px] w-[300px]',
    image: 'rounded-tl-lg rounded-lg h-full w-full object-cover',
    bluer: 'bg-[#1D254340] group-hover:bg-[transparent] h-full w-full absolute top-0 rounded-lg',
    base: 'flex-col items-start px-4 py-2 gap-1 rounded-bl-lg rounded-br-lg bg-greyScale-clear group-hover:bg-greyScale-white absolute bottom-0 w-full',
    titleStyle: 'text-greyScale-regular truncate w-full',
  },
});

const { image, bluer, button, base, titleStyle } = card();

const CardImage: React.FC<CardProps> = ({ img, title, altImg, onClick }) => (
  <button onClick={onClick} className={button()} data-testid="card-image">
    <img src={img} alt={altImg} className={image()} data-testid="image-item" />
    <div className={bluer()} data-testid="bluer-item" />
    <div className={base()} data-testid="base-box">
      <p className={titleStyle()}> {title} </p>
    </div>
  </button>
);

export default CardImage;
