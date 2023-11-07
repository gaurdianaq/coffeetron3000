"use client";

interface ISubmitBtnProps {
  label: string;
}

export const SubmitBtn = ({ label }: ISubmitBtnProps) => {
  return (
    <div className="control">
      <input className="button is-link" type="submit" value={label} />
    </div>
  );
};
