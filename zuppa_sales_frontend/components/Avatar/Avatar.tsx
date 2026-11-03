'use client';

import React, { memo, PropsWithChildren } from 'react';
import ReactAvatar from 'react-avatar';

type Iprops = PropsWithChildren<{
  name: string;
  size: string;
  className?: string;
  avator: string;
  title?: string;
}>;

function Avatar({
  name, size, className, avator, title,
}: Iprops) {
  return (
    <ReactAvatar
      name={name?.charAt(0)?.toLocaleUpperCase()}
      size={size}
      className={className}
      src={avator || ''}
      round
      title={title || ''}
    />
  );
}

export default memo(Avatar);
