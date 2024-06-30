"use client"

import { Icon } from '@iconify/react';
import React, { useState, FunctionComponent, useEffect } from 'react';

import { countries } from '@/constants';
import Button from '@/components/Buttons/ControlButton';

interface TranslatorFormProps { }

const TranslatorForm: FunctionComponent<TranslatorFormProps> = () => {
  const [fromText, setFromText] = useState('');
  const [toText, setToText] = useState('');
  const [fromLang, setFromLang] = useState('en-GB');
  const [toLang, setToLang] = useState('de-DE');

  const handleExchange = () => {
    [setFromText, setToText, setFromLang, setToLang].forEach(func => func(prev => prev));
    [setFromLang(toLang), setToLang(fromLang)];
    [setFromText(toText), setToText(fromText)];
  };

  const handleTranslate = async () => {
    if (!fromText) return;
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${fromLang}|${toLang}`);
    const data = await response.json();
    setToText(data.responseData.translatedText);
  };

  useEffect(() => {
    const handleTranslate = async () => {
      if (!fromText) {
        setToText('');
        return;
      }
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(fromText)}&langpair=${fromLang}|${toLang}`);
      const data = await response.json();
      setToText(data.responseData.translatedText || "Error in translation");
    };

    const timeoutId = setTimeout(handleTranslate, 500);
    return () => clearTimeout(timeoutId);
  }, [fromText, fromLang, toLang]);

  return (
    <>
      <div className="container mx-auto bg-secondary/50 p-0 rounded-lg shadow-lg">
        <div className="wrapper border border-line/10 rounded-md">
          <div className="text-input flex border-b border-line/10">
            <textarea
              value={fromText}
              onChange={e => setFromText(e.target.value)}
              className="from-text flex-1 text-lg outline-none resize-none focus:ring ring-[#06283D]/50 ring-offset-2 ring-offset-[#06283D]/50"
              placeholder="Write or paste the text here"
            ></textarea>
            <textarea
              value={toText}
              readOnly
              className="to-text flex-1 p-4 text-lg outline-none resize-none border-l border-t border-line/10 "
            ></textarea>
          </div>
          <ul className="controls flex items-center py-3 px-4">
            <li className="row flex items-center">
              <div className="icons flex-1 flex justify-end pr-3 border-r border-line/10">
                <Button><Icon icon="solar:volume-loud-bold" className='text-lg cursor-pointer' width="15" height="15" /></Button>
                <Button event={() => navigator.clipboard.writeText(fromText)}><Icon icon="solar:clipboard-list-bold-duotone" width="15" height="15" className=' text-lg cursor-pointer' /></Button>
              </div>
              <select className="text-lg outline-none" value={fromLang} onChange={e => setFromLang(e.target.value)}>
                {Object.entries(countries).map(([code, name]) => (
                  <option value={code} key={code}>{name}</option>
                ))}
              </select>
            </li>
            <li className="exchange mx-4">
              <Icon icon="uil:exchange" onClick={handleExchange} width={20} height={20} className='text-lg cursor-pointer' />
            </li>
            <li className="row flex items-center">
              <select className="text-lg outline-none " value={toLang} onChange={e => setToLang(e.target.value)}>
                {Object.entries(countries).map(([code, name]) => (
                  <option value={code} key={code}>{name}</option>
                ))}
              </select>
              <div className="icons flex-1 flex justify-start pl-3 border-l border-white/10">
                <Button event={() => navigator.clipboard.writeText(toText)}><Icon icon="solar:clipboard-list-bold-duotone" width="15" height="15" className=' text-lg cursor-pointer' /></Button>
                <Button><Icon icon="solar:volume-loud-bold" className='text-lg cursor-pointer' width="15" height="15" /></Button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default TranslatorForm;
