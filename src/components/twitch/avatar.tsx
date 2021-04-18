import React, { FunctionComponent } from 'react';
import { makeStyles } from '@src/utils/styles';

const useStyles = makeStyles({
  figure: {
    position: 'relative',
    width: '3rem',
    height: '3rem',
  },
  img: {
    borderRadius: '50%',
  },
});

export interface TwitchAvatarProps {
  image: string;
  alt?: string;
}

export const TwitchAvatar: FunctionComponent<TwitchAvatarProps> = ({
  image,
  alt,
}) => {
  const styles = useStyles();

  return (
    <figure aria-label={alt} className={styles.figure}>
      <img className={styles.img} alt={alt} src={image} />
    </figure>
  );
};
