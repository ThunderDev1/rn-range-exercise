import { Label } from "./types";

export const generateRandomLabels = (count: number): Label[] => { 
  const labels: Label[] = [];

  for (let index = 0; index < count; index++) {
    
    const upperBound = Math.floor(Math.random() * 100) + 1;
    const lowerBound = Math.floor(Math.random() * upperBound - 1);

    labels.push({
      name: 'Label ' + index,
      lowerBound,
      upperBound,
    });
  }
  return labels;
};

export const getMatchingLabels = (item: number, labels: Label[]) => {
  return labels.filter(
    (label) => {
      if(item < label.lowerBound) return;
      if(item > label.upperBound) return;
      return item;
    }
  );
};