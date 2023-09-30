import { ProgressSpinner } from "primereact/progressspinner";

const MyLoading = () => {
  return (
    <div className="flex items-center justify-center w-[100%] col-span-12">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
};

export default MyLoading;
