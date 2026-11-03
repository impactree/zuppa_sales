import { convertToPascalCase, getStatusColor } from '@/lib/utils';
import { PillProps } from '../types';
import './Pill.css';

export function Pill({ pillText, pillClass }: PillProps) {
  return (
    <span
      className={` rounded-3 pill_view ${pillClass} ${getStatusColor(pillText)}-pill `}
      id={pillText}
      data-testid={pillText}
    >
      {convertToPascalCase(pillText?.replaceAll('_', ' ').replaceAll('-', ' '))}
    </span>
  );
}
