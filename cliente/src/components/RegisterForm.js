const RegisterForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
}) => (
  <form onSubmit={handleSubmit} className="mt-3">
    <div className="form-group mb-3">
      <label className="form-label">Nome</label>
      <input
        autoComplete="on"
        type="text"
        className="form-control"
        placeholder="Inserisci il tuo nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Indirizzo email</label>
      <input
        autoComplete="on"
        type="email"
        className="form-control"
        placeholder="Inserisci la tua email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group mb-3">
      <label className="form-label">Password</label>
      <input
        autoComplete="on"
        type="password"
        className="form-control"
        placeholder="Inserisci la tua password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>

    <button disabled={!name || !email || !password} className="btn btn-primary">
      Invia
    </button>
  </form>
);

export default RegisterForm;
