import { forwardRef } from "react";

const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
  return (
    <label className="flex flex-col gap-2">
      {label}
      {textarea ? (
        <textarea {...props} ref={ref} />
      ) : (
        <input {...props} ref={ref} />
      )}
    </label>
  );
});

export default Input;
