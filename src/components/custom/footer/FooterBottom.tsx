import { Code, Code2 } from 'lucide-react';
import React from 'react';

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="bg-slate-100 py-3 px-6 rounded-lg text-sm text-slate-400 flex flex-wrap flex-col sm:flex-row items-center justify-between gap-2">
      <p>© {currentYear} | All rights reserved </p>
      <p className="flex items-center gap-2">
        <Code2 className="w-4" />
        <span>
          Site by{' '}
          <a
            href="https://www.moccotech.com"
            target="_blank"
            className="hover:text-indigo-500 duration-150"
          >
            Mocco Tech
          </a>
        </span>
      </p>
    </div>
  );
}
