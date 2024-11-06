import { ReactNode } from "react";

export default function SubmitButton({
  children,
  onClick,
  size = "small",
}: {
  children: ReactNode;
  onClick: () => void;
  size?: "big" | "small";
}) {
  return (
    <div
      onClick={onClick}
      className={`${size === "small" ? "text-sm px-4 py-1" : "text-sm font-medium px-10 py-2"} hover:shadow-lg  bg-[#ff4f00] flex justify-center items-center text-white cursor-pointer rounded-full `}
    >
      {children}
    </div>
  );
}