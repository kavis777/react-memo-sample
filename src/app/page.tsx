"use client";

import { useState } from "react";

export default function Home() {
  const [checkItems, setCheckItems] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const toggle = (value: string) => {
    const result = [...checkItems];
    if (checkItems.includes(value)) {
      const index = checkItems.indexOf(value);
      result.splice(index, 1);
    } else {
      result.push(value);
    }
    setCheckItems(result);
    setMessage(result.join(","));
  };

  // 1から100までの数値を持つ配列
  // [1, 2, 3, ..., 10]
  const array = Array.from({ length: 10 }, (_, index) => index + 1);

  return (
    <>
      <h2>React memoを使わない場合</h2>
      {array.map((number) => (
        <CheckBox
          key={number}
          checked={checkItems.includes(`value${number}`)}
          value={`value${number}`}
          toggle={toggle}
        >
          {`条件：${number}`}
        </CheckBox>
      ))}
      <br />
      <div>検索条件：{message}</div>
      <div></div>
    </>
  );
}

type CheckBoxProps = {
  checked: boolean;
  value: string;
  children: React.ReactNode;
  toggle: (value: string) => void;
};

const CheckBox = ({ children, checked, value, toggle }: CheckBoxProps) => {
  return (
    <div>
      <input type="checkbox" checked={checked} readOnly />
      <label
        onClick={() => {
          toggle(value);
        }}
      >
        <span>{children}</span>
      </label>
    </div>
  );
};
