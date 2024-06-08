import React from "react";
import SlideConfirmation from "../Button/SlideConfirmation";
import GradiantButton from "../Button/GradiantButton";

const SlideToConfirmDialog = ({
  children,
  onConfirm,
  onCancel,
}: {
  children: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <div
      className="flex justify-center items-center min-h-screen"
      style={{ width: "90%" }}
    >
      <div className="text-center p-5 flex-auto justify-center bg-white">
        <p className="mb-3">{children}</p>
        <SlideConfirmation onConfirm={onConfirm} />
        <GradiantButton className="mt-3 " OnClick={onCancel}>
          Cancel
        </GradiantButton>
      </div>
    </div>
  );
};

export default SlideToConfirmDialog;
