import type { ReactNode } from 'react';
import { UrlObject } from 'url';

export type Url = string | UrlObject;

export interface Children {
  children?: ReactNode;
}

export type ClassName = {
  className?: string;
};
