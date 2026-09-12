import "./App.css";

function App() {
  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">
          Open<span>PDF</span>
        </div>

        <nav>
          <a href="#home">Home</a>
          <a href="#tools">Tools</a>
          <a href="#about">About</a>
          <a href="#github">Open Source</a>
        </nav>
      </header>

      <main>
        {/* HOME */}
        <section id="home" className="hero">
          <div className="hero-content">
            <p className="badge">
              100% Free • Open Source • Privacy Friendly
            </p>

            <h1>
              Powerful PDF tools.
              <br />
              <span>Free for everyone.</span>
            </h1>

            <p className="hero-text">
              Merge, split, rotate, convert and modify PDF files
              directly in your browser.
            </p>

            <a href="#tools" className="primary-btn">
              Explore PDF Tools
            </a>
          </div>
        </section>

        {/* TOOLS */}
        <section id="tools" className="tools-section">
          <div className="section-heading">
            <p className="small-title">PDF TOOLS</p>

            <h2>Everything you need</h2>

            <p>
              Simple PDF tools designed for students and everyone.
            </p>
          </div>

          <div className="tools-grid">

            <div className="tool-card">
              <div className="tool-icon">📎</div>
              <h3>Merge PDF</h3>
              <p>Combine multiple PDF files into one.</p>
              <button>Open Tool</button>
            </div>

            <div className="tool-card">
              <div className="tool-icon">✂️</div>
              <h3>Split PDF</h3>
              <p>Extract selected pages from a PDF.</p>
              <button>Open Tool</button>
            </div>

            <div className="tool-card">
              <div className="tool-icon">🔄</div>
              <h3>Rotate PDF</h3>
              <p>Rotate PDF pages easily.</p>
              <button>Open Tool</button>
            </div>

            <div className="tool-card">
              <div className="tool-icon">🖼️</div>
              <h3>Images → PDF</h3>
              <p>Convert JPG and PNG images into PDF.</p>
              <button>Open Tool</button>
            </div>

            <div className="tool-card">
              <div className="tool-icon">🗑️</div>
              <h3>Delete Pages</h3>
              <p>Remove unwanted pages from a PDF.</p>
              <button>Open Tool</button>
            </div>

            <div className="tool-card">
              <div className="tool-icon">📤</div>
              <h3>Extract Pages</h3>
              <p>Create a new PDF from selected pages.</p>
              <button>Open Tool</button>
            </div>

            <div className="tool-card">
              <div className="tool-icon">🔢</div>
              <h3>Page Numbers</h3>
              <p>Add page numbers to your PDF.</p>
              <button>Open Tool</button>
            </div>

            <div className="tool-card">
              <div className="tool-icon">💧</div>
              <h3>Watermark</h3>
              <p>Add a text watermark to every page.</p>
              <button>Open Tool</button>
            </div>

            <div className="tool-card">
              <div className="tool-icon">📦</div>
              <h3>Compress PDF</h3>
              <p>Optimize a PDF for a smaller file size.</p>
              <button>Open Tool</button>
            </div>

          </div>
        </section>

        {/* WORKSPACE */}
        <section id="workspace" className="workspace">
          <div className="workspace-header">
            <button className="back-btn">
              ← Back
            </button>

            <h2>PDF Tool</h2>
          </div>

          <div className="tool-container">

            <div className="tool-description">
              Select a PDF tool to get started.
            </div>

            <label className="upload-box">
              <span className="upload-icon">📁</span>

              <strong>Choose files</strong>

              <span>or drag and drop here</span>

              <input
                type="file"
                multiple
                accept=".pdf,image/jpeg,image/png"
              />
            </label>

            <div className="file-list"></div>

            <div className="tool-options"></div>

            <button className="process-btn">
              Process PDF
            </button>

            <div className="status"></div>

          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="about">
          <h2>About OpenPDF</h2>

          <p>
            OpenPDF is a free and open-source PDF toolkit
            designed for students and everyone.
          </p>

          <p>
            Your files are processed directly in your browser.
          </p>
        </section>

        {/* FEEDBACK */}
        <section className="feedback-section">
          <form id="feedbackform">

            <label htmlFor="name">
              Name *
            </label>

            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              required
            />

            <label htmlFor="email">
              Email *
            </label>

            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              required
            />

            <label htmlFor="message">
              Feedback
            </label>

            <textarea
              id="message"
              placeholder="Enter your feedback"
            />

            <br />

            <button type="submit">
              Submit
            </button>

          </form>

          <p id="result"></p>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="github">
        <div className="logo">
          Open<span>PDF</span>
        </div>

        <p>
          Free • Open Source • Privacy Friendly
        </p>
      </footer>
    </>
  );
}

export default App;