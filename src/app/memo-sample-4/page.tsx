"use client";

import React, { memo, useMemo, useState } from "react";

export default function Page() {
  const [formState, setFormState] = useState<{
    checkItems: string[];
    texts: string[];
  }>({ checkItems: [], texts: ["テキスト1", "テキスト2", "テキスト3"] });
  const [message, setMessage] = useState("");
  const toggle = (value: string) => {
    const temp = { ...formState };
    if (temp.checkItems.includes(value)) {
      const index = temp.checkItems.indexOf(value);
      temp.checkItems.splice(index, 1);
    } else {
      temp.checkItems.push(value);
    }
    setFormState(temp);
    setMessage(temp.checkItems.join(","));
  };

  // 何らかの処理をして最終的にUserオブジェクトを生成する
  const doSomething = useMemo(() => ({ name: "ユーザー", age: 22 }), []);

  return (
    <>
      <h2>
        レンダリングが重いコンポーネントに同じ中身のオブジェクトを毎回新たに生成して再レンダリングを起こす場合
      </h2>
      <div>
        同じStateを共有していてコンポーネントを分けるのが難しい場合は、memoを使用すると余計な再レンダリングを防ぐことができる
      </div>
      {[1, 2, 3].map((number) => (
        <CheckBox
          key={number}
          checked={formState.checkItems.includes(`value${number}`)}
          value={`value${number}`}
          toggle={toggle}
        >
          {`条件：${number}`}
        </CheckBox>
      ))}
      <br />
      <div>検索条件：{message}</div>
      <div className="space-70" />
      <MemoHeavyComponent user={doSomething} />
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

type User = {
  name: string;
  age: number;
};

type HeavyComponentProps = {
  user: User;
};

const HeavyComponent = ({ user }: HeavyComponentProps) => {
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
      <p>
        {user.name} ({user.age})
      </p>
    </div>
  );
};

const MemoHeavyComponent = memo(HeavyComponent);
