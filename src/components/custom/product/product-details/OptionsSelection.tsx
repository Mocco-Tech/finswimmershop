import React from 'react';

export default function OptionsSelection({
  options,
  setSelectedOption,
}: {
  options: any;
  setSelectedOption: (name: string, value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-5">
      {/* @ts-ignore */}
      {options?.map(({ name, values }) => (
        <div
          key={name}
          className="w-full flex flex-col justify-between items-start gap-1"
        >
          <label className="text-slate-600/80 text-xs">Select {name}</label>
          <select
            name={name}
            id={name}
            className="flex-1 w-full appearance-none border border-slate-200 rounded px-3 py-1 text-slate-600 font-light outline-none focus:ring-2 focus:ring-slate-700  duration-150"
            onChange={(e) => setSelectedOption(name, e.target.value)}
            defaultValue={'DEFAULT'}
          >
            <option value="DEFAULT" disabled>
              Select option
            </option>
            {values.map((value: string) => {
              return (
                <option key={value} value={value}>
                  {value}
                </option>
              );
            })}
          </select>
        </div>
      ))}
    </div>
  );
}
