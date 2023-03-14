import { atom } from 'jotai';
import data from '../copy.json'

export const copyAtom = atom<any>(data);
export const langAtom = atom<string>('es');

