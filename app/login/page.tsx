'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BsFillPersonVcardFill } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
  const [cedula, setCedula] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4500/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cedula, contrasena }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Login exitoso', result);
        localStorage.setItem('cedula', cedula);
        router.push('/report');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error en el login', error);
      setError('Error en el servicio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-login w-screen h-screen flex items-center justify-center">
      <div className="bg-black grid grid-cols-2 border rounded-3xl overflow-hidden w-[55%] border-10 border-black">
        <div className="col-start-1 relative">
          <img className="object-center h-full w-full rounded-tl-3xl rounded-bl-3xl" src="/img/login1.jpg" alt="" />
        </div>
        <div className="col-start-2 bg-white w-full h-full">
          <form className="grid grid-rows-5 gap-1 text-center text-black w-full h-full items-center px-10" onSubmit={handleSubmit}>
            <div className="row-start-1 text-center">
              <h1 className="text-3xl uppercase font-bold text-[#19b46b] pt-2">Iniciar Sesión</h1>
            </div>
            <div className="row-start-2 w-full">
              <label htmlFor="cedula" className="block text-left w-full font-semibold">Cédula:</label>
              <div className="relative w-full">
                <BsFillPersonVcardFill className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="text"
                  id="cedula"
                  name="cedula"
                  placeholder="10 Dígitos"
                  className="border border-black rounded-xl p-2 pl-10 w-full"
                  required
                  minLength={10}
                  maxLength={10}
                  value={cedula}
                  onChange={(e) => setCedula(e.target.value)}
                />
              </div>
            </div>
            <div className="row-start-3 w-full">
              <label htmlFor="password" className="block text-left w-full font-semibold">Contraseña:</label>
              <div className="relative w-full">
                {showPassword ? (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <FaEye
                    onClick={togglePasswordVisibility}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 cursor-pointer"
                  />
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  id="contrasena"
                  name="contrasena"
                  placeholder="Minimo 4 caracteres"
                  className="border border-black rounded-xl p-2 pl-10 w-full"
                  required
                  minLength={4}
                  maxLength={25}
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                />
              </div>
            </div>
            {error && <div className="row-start-4 w-full text-red-500">{error}</div>}
            <div className="row-start-4 w-full">
              <button type="submit" className="border rounded-xl p-3 bg-[#1cb96f] shadow-lg shadow-[#1cb96f]/50 text-white w-full text-base" disabled={loading}>
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </button>
            </div>
            <div className="row-start-5 w-full">
              <p className="text-lg">No tienes una cuenta? <a href="/register" className="text-[#159e5e] font-semibold">Crea una!!</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
