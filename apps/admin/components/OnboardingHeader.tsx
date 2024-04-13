"use client";

const OnboardingHeader = () => {
  return (
    <header className="bg-transparent w-[96vw] mt-[1.5rem] ml-[1.5rem] mr-[1.5rem] text-white">
      <div className="flex justify-between text-[0.875rem]">
        <span className="text-[0.875rem]">Sign Out</span>
        <div className="flex flex-col">
          <span className="text-[#6F757B] font-[400]">Logged in as :</span>
          <span>contactrj25@gmail.com</span>
        </div>
      </div>
    </header>
  );
};

export default OnboardingHeader;
