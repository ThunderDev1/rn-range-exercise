import { Label } from "./types";

export const generateRandomLabels = (): Label[] => {
  const labels: Label[] = [];

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (const character of alphabet) {
    const upperBound = Math.floor(Math.random() * 100) + 1;
    const lowerBound = Math.floor(Math.random() * upperBound - 1);

    labels.push({
      name: character,
      lowerBound,
      upperBound,
    });
  }

  return labels;
};

export const getMatchingLabels = (item: number, labels: Label[]) => {
  return labels.filter(
    (label) => item >= label.lowerBound && item <= label.upperBound
  );
};