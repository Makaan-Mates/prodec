import React from "react";
import { Input } from "../shadcn/ui/input";
import { Label } from "../shadcn/ui/label";
import { GeistMono } from "geist/font/mono";

interface Params {
  inputtype: string;
  label: string;
  placeholder: string;
  readOnly: boolean;
}

const InputwithLabel = ({
  inputtype,
  label,
  placeholder,
  readOnly,
}: Params) => {
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
          className="onboarding-input bg-[#12171C] px-6 py-4 placeholder-[#6F757B] text-sm font-medium file-border-2  "
          readOnly={readOnly}
          style={{
            margin: "0.5rem 0",
            padding: "0.5rem 1rem",
            border: "1px solid #20272C",
            borderRadius: "0.375rem",
          }}
        />
      </div>
    </div>
  );
};

export default InputwithLabel;
