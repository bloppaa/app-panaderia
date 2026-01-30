"use client";

import React from "react";
import { Button } from "./Button";

interface NumericKeypadProps {
  onNumberPress: (num: string) => void;
  onBackspace: () => void;
}

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onNumberPress,
  onBackspace,
}) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  return (
    <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
      {numbers.map((num) => (
        <Button
          key={num}
          onClick={() => onNumberPress(num)}
          variant="secondary"
          size="large"
          className="text-3xl font-bold h-20"
        >
          {num}
        </Button>
      ))}
      <div className="col-span-2" />
      <Button
        onClick={onBackspace}
        variant="danger"
        size="large"
        className="text-2xl h-20"
      >
        ⌫
      </Button>
    </div>
  );
};
