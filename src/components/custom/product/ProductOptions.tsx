import React from 'react';

interface Props {
  name?: string;
  values: string[];
  type: string;
  setSelectedOption?: (name: string, value: string) => void;
  handleSelect?: (selectedKey: string, selectedValue: string) => void;
  selectedKey?: string;
}

export default function ProductOptions({
  name,
  values,
  type,
  setSelectedOption,
  handleSelect,
  selectedKey,
}: Props) {
  switch (type) {
    case 'options':
      return (
        <div className="w-full flex flex-col justify-between items-start gap-1">
          <label className="text-slate-600 text-xs">Select {name}</label>
          <select
            name={name}
            id={name}
            className="flex-1 bg-white w-full appearance-none border border-slate-200 rounded px-3 py-1 text-slate-700 font-normal outline-none focus:ring-2 focus:ring-slate-700  duration-150"
            onChange={(e) =>
              setSelectedOption && setSelectedOption(name!, e.target.value)
            }
          >
            {values.map((value: string) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      );
    case 'metafields':
      return (
        <div className="w-full flex flex-col justify-between items-start gap-1">
          <label className="text-slate-600 text-xs capitalize">
            Select {name}
          </label>
          <select
            onChange={(e) =>
              handleSelect && handleSelect(selectedKey!, e.target.value)
            }
            className="flex-1 w-full appearance-none border bg-white border-slate-200 rounded px-3 py-1 text-slate-700 font-normal outline-none focus:ring-2 focus:ring-slate-700  duration-150"
            defaultValue="DEFAULT"
          >
            <option value="DEFAULT">Select option</option>
            {values.map((option) => (
              <option
                // @ts-ignore
                key={option.node.handle}
                // @ts-ignore
                value={option.node.fields[0].value}
              >
                {/* @ts-ignore */}
                {option.node.fields[0].value}
              </option>
            ))}
          </select>
        </div>
      );
  }
}
