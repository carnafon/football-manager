import React, { useState } from 'react';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const url = isLogin ? '/api/auth/login' : '/api/auth/register';
    const body: any = { email, password };
    if (!isLogin) body.name = name;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) return setMessage(data.error || 'Error');
      if (data.token) {
        localStorage.setItem('fm_token', data.token);
        setMessage('Autenticado');
      } else {
        setMessage('OK');
      }
    } catch (err) {
      setMessage('Error de red');
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '20px auto' }}>
      <h2>{isLogin ? 'Iniciar sesión' : 'Registro'}</h2>
      <form onSubmit={submit}>
        {!isLogin && (
          <div>
            <label>Nombre</label>
            <input value={name} onChange={e => setName(e.target.value)} />
          </div>
        )}
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">{isLogin ? 'Entrar' : 'Registrarse'}</button>
          <button type="button" onClick={() => { setIsLogin(!isLogin); setMessage(''); }} style={{ marginLeft: 8 }}>
            {isLogin ? 'Ir a registro' : 'Ir a login'}
          </button>
        </div>
      </form>
      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
};

export default Auth;
