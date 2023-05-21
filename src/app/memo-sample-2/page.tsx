"use client";

import { memo, useState } from "react";

export default function Page() {
  return (
    <>
      <h2>重いコンポーネントとのレンダリングを分けた場合</h2>
      <div>条件を更新しても再レンダリングされないためサクサク動く</div>
      <CheckBoxList />
      <MemoHeavyComponent />
    </>
  );
}

const CheckBoxList = () => {
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

  return (
    <>
      {[1, 2, 3].map((number) => (
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
    </>
  );
};

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

const HeavyComponent = () => {
  // 非常に重い計算を行う
  const calculateSum = () => {
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum += i;
    }
    return sum;
  };

  const result = calculateSum();

  return (
    <div>
      <h2>非常に重い計算を行うコンポーネント</h2>
      <p>計算結果: {result}</p>
    </div>
  );
};

const MemoHeavyComponent = memo(HeavyComponent);
