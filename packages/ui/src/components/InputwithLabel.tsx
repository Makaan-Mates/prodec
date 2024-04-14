import React from "react";
import { Input } from "../shadcn/ui/input";
import { Label } from "../shadcn/ui/label";
import { GeistMono } from "geist/font/mono";

interface Params {
  inputtype: string;
  label: string;
  placeholder: string;
  readOnly:boolean
}

const InputwithLabel = ({ inputtype, label, placeholder,readOnly }: Params) => {
  return (
    <div>
      <div className="w-full max-w-sm  flex flex-col gap-2">
        <Label
          htmlFor="email"
          className={`text-[#E3E6E8] ${GeistMono.className}`}
        >
          {label}
        </Label>
        <Input
          type={inputtype}
          id={inputtype}
          placeholder={placeholder}
          className="bg-[#12171C] px-4 placeholder-[#6F757B] text-sm font-medium file-border-2 border-red-700 text-red-600 "
          readOnly={readOnly}
        />
      </div>
    </div>
  );
};

export default InputwithLabel;
