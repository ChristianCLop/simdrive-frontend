'use client'

import { useState, FormEvent } from "react";
import { useRouter } from 'next/navigation';
import { BsFillPersonVcardFill } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoPersonCircle } from "react-icons/io5";

export default function Register() {
  const [cedula, setCedula] = useState<string>('');
  const [nombre, setNombre] = useState<string>('');
  const [apellido, setApellido] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const [confContrasena, setConfContrasena] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordConf, setShowPasswordConf] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  const togglePasswordConfVisibility = () => {
    setShowPasswordConf(prevState => !prevState);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (contrasena !== confContrasena) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:4500/conductores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cedula, nombre, apellido, contrasena }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Registro exitoso', result);
        router.push('/login');
      } else {
        setError(result.message);
      }
    } catch (error) {
      console.error('Error en el registro', error);
      setError('Error en el servicio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-login w-screen h-screen flex items-center justify-center">
      <div className="bg-black grid grid-cols-2 border rounded-3xl overflow-hidden w-[1050px] h-[500px] border-10 border-black">
        <div className="col-start-1 bg-white p-10">
          <form className="grid grid-rows-6 grid-cols-2 gap-4 text-center text-black" onSubmit={handleSubmit}>
            <div className="row-start-1 col-span-2 text-center">
              <h1 className="text-3xl uppercase font-bold text-[#19b46b]">Registrate!</h1>
            </div>
            <div className="row-start-2 col-span-2 w-full">
              <label htmlFor="cedula" className="block text-left w-full font-semibold">Cédula:</label>
              <div className="relative w-full">
                <BsFillPersonVcardFill className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="text"
                  id="cedula"
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
              <label htmlFor="nombre" className="block text-left w-full font-semibold">Nombre:</label>
              <div className="relative w-full">
                <IoPersonCircle className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="text"
                  id="nombre"
                  placeholder="4 Caracteres minimo"
                  className="border border-black rounded-xl p-2 pl-10 w-full"
                  required
                  minLength={4}
                  maxLength={25}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
            </div>
            <div className="row-start-3 w-full">
              <label htmlFor="apellido" className="block text-left w-full font-semibold">Apellido:</label>
              <div className="relative w-full">
                <IoPersonCircle className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="text"
                  id="apellido"
                  placeholder="4 Caracteres minimo"
                  className="border border-black rounded-xl p-2 pl-10 w-full"
                  required
                  minLength={4}
                  maxLength={25}
                  value={apellido}
                  onChange={(e) => setApellido(e.target.value)}
                />
              </div>
            </div>
            <div className="row-start-4 w-full">
              <label htmlFor="contrasena" className="block text-left w-full font-semibold">Contraseña:</label>
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
            <div className="row-start-4 w-full">
              <label htmlFor="conf_contrasena" className="block text-left w-full font-semibold">Confirmar Contraseña:</label>
              <div className="relative w-full">
                {showPasswordConf ? (
                  <FaEyeSlash
                    onClick={togglePasswordConfVisibility}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 cursor-pointer"
                  />
                ) : (
                  <FaEye
                    onClick={togglePasswordConfVisibility}
                    className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400 cursor-pointer"
                  />
                )}
                <input
                  type={showPasswordConf ? "text" : "password"}
                  id="conf_contrasena"
                  placeholder="Minimo 4 caracteres"
                  className="border border-black rounded-xl p-2 pl-10 w-full"
                  required
                  minLength={4}
                  maxLength={25}
                  value={confContrasena}
                  onChange={(e) => setConfContrasena(e.target.value)}
                />
              </div>
            </div>
            {error && (
              <div className="row-start-5 col-span-2 text-red-600">
                {error}
              </div>
            )}
            <div className="row-start-6 col-span-2 w-full">
              <button type="submit" className="border rounded-xl p-3 bg-[#1cb96f] shadow-lg shadow-[#1cb96f]/50 text-white w-full text-base" disabled={loading}>
                {loading ? 'Registrando...' : 'Registrarse'}
              </button>
            </div>
            <div className="row-start-7 col-span-2 w-full">
              <p className="text-lg">¿Tienes una cuenta? <a href="/login" className="text-[#159e5e] font-semibold">Inicia Sesión!!</a></p>
            </div>
          </form>
        </div>
        <div className="col-start-2 relative">
          <img className="object-center h-full w-full rounded-tr-3xl rounded-br-3xl" src="/img/login1.jpg" alt="" />
        </div>
      </div>
    </div>
  );
}
