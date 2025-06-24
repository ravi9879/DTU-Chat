function Home() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ minWidth: 350, maxWidth: 400 }}>
        <h2 className="text-center mb-3 text-primary">Welcome to SmartChat</h2>
        <p className="text-center text-secondary mb-4">
          This is your chat dashboard. Use the navigation to start chatting or manage your account.
        </p>
        <div className="d-flex flex-column gap-2">
          <a href="/chat" className="btn btn-primary fw-semibold">Go to Chat</a>
          <a href="/bot" className="btn btn-outline-primary fw-semibold">Try Chat Bot</a>
          <a href="/sign-up" className="btn btn-outline-secondary fw-semibold">Sign Up</a>
        </div>
      </div>
    </div>
  );
}

export default Home ;