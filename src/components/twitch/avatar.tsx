import React, { FunctionComponent } from 'react';

export interface TwitchAvatarProps {
  image: string;
  alt?: string;
}

export const TwitchAvatar: FunctionComponent<TwitchAvatarProps> = ({
  image,
  alt,
}) => {
  return (
    <figure aria-label={alt} className="tw-avatar tw-avatar--size-30">
      <img
        className="tw-block tw-border-radius-rounded tw-image tw-image-avatar"
        alt={alt}
        src={image}
      />
    </figure>
  );
};
