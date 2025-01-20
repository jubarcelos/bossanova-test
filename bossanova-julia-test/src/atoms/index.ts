import { atom } from 'jotai';
import { Beach } from '../axios';

// Átomo para armazenar a lista de praias
export const beachesAtom = atom<Beach[]>([]);

// Átomo para gerenciar a função de adicionar uma praia
export const addBeachAtom = atom(null, (get, set, newBeach: Beach) => {
  const beaches = get(beachesAtom);
  set(beachesAtom, [...beaches, newBeach]);
});
