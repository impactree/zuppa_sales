import './Loader.css';

export function Loader() {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '80vh' }}
    >
      <section
        className="position-relative"
        style={{ width: '300px', height: '250px' }}
      >
        <div
          className="loader"
          data-testid="loader"
          style={{ transform: 'scale(1.5)' }}
        />
        <div
          className="loading loading06"
          style={{ fontSize: '2rem' }}
        >
          <span data-text="L">L</span>
          <span data-text="O">O</span>
          <span data-text="A">A</span>
          <span data-text="D">D</span>
          <span data-text="I">I</span>
          <span data-text="N">N</span>
          <span data-text="G">G</span>
          <span data-text=".">.</span>
          <span data-text=".">.</span>
          <span data-text=".">.</span>
        </div>
      </section>
    </div>
  );
}
