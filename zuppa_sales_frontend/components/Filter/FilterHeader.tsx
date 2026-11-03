interface CommonFilterHeaderProps {
  readonly resetButton: () => void;
}

export default function FilterHeader({ resetButton }: CommonFilterHeaderProps) {
  return (
    <div className=" d-flex justify-content-between align-items-center pb-2 mb-4 border-bottom">
      <div className=" fw-semibold fs-13 letter-spacing "> Filters</div>
      <button
        type="button"
        className="d-flex justify-content-between align-items-center  border-0 bg-white"
        onClick={() => resetButton()}
      >
        <span className="resetAll_btn ">Reset All</span>
        {/* <span className=" ps-2">
          <Image src={reset} alt="reset" />
        </span> */}
      </button>
    </div>
  );
}
