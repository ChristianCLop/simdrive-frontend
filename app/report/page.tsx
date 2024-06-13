'use client'

import { useEffect, useState } from 'react';
import { IoPerson } from 'react-icons/io5';
import { BsFillCalendar2DateFill, BsFillPersonVcardFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { PiExamDuotone } from "react-icons/pi";
import { MdOutlineFeedback } from 'react-icons/md';

interface Conductor {
  nombre: string;
  apellido: string;
  cedula: string;
}

interface MaestroReporte {
  ubicacion: string;
  fecha_inicio: string | null;
  fecha_fin: string | null;
  puntuacion: number;
}

interface DetalleReporte {
  id_detalle: number;
  id_reporte: number;
  id_infraccion: number;
  cantidad: number;
  nombre_infraccion: string;
}

export default function Report() {
  const [cedula, setCedula] = useState<string>('');
  const [conductor, setConductor] = useState<Conductor | null>(null);
  const [maestroReportes, setMaestroReportes] = useState<MaestroReporte[]>([]);
  const [detalleAprendizaje, setDetalleAprendizaje] = useState<DetalleReporte[]>([]);
  const [detalleEvaluacion, setDetalleEvaluacion] = useState<DetalleReporte[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedCedula = localStorage.getItem('cedula');
    if (storedCedula) {
      setCedula(storedCedula);
      fetchData(storedCedula);
    }
  }, []);

  const fetchData = async (cedula: string) => {
    try {
      const responseMaestro = await fetch(`http://localhost:4500/maestro/${cedula}`);
      const dataMaestro = await responseMaestro.json();
      if (responseMaestro.ok) {
        const user = dataMaestro.user[0];
        setConductor(user);
        setMaestroReportes(dataMaestro.maestro_reportes);
      } else {
        setError(dataMaestro.message);
      }

      const responseAprendizaje = await fetch(`http://localhost:4500/detalle/aprendizaje/${cedula}`);
      const dataAprendizaje = await responseAprendizaje.json();
      if (responseAprendizaje.ok) {
        setDetalleAprendizaje(dataAprendizaje.detalle_reporte);
      } else {
        setError(dataAprendizaje.message);
      }

      const responseEvaluacion = await fetch(`http://localhost:4500/detalle/evaluacion/${cedula}`);
      const dataEvaluacion = await responseEvaluacion.json();
      if (responseEvaluacion.ok) {
        setDetalleEvaluacion(dataEvaluacion.detalle_reporte);
      } else {
        setError(dataEvaluacion.message);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data', error);
      setError('Error en el servicio');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const aprendizajeReporte = maestroReportes.find(report => report.ubicacion === 'aprendizaje');
  const evaluacionReporte = maestroReportes.find(report => report.ubicacion === 'evaluacion');

  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center">
      <div className="w-screen h-screen grid grid-rows-4">
        <div className="bg-report row-start-1 items-start justify-center w-full h-full">
          <div className="grid grid-cols-2">
            <div className="col-start-1 text-center mt-14">
              <h1 className="text-5xl uppercase font-bold font-serif text-white">Reporte final</h1>
            </div>
            <div className="col-start-2">
              <div className="grid grid-cols-2 w-full h-full">
                <div className="col-start-1 flex flex-col items-end justify-center">
                  <div className="flex items-center">
                    <IoPerson className="text-white mr-3" />
                    <h1 className="text-xl text-white font-bold uppercase">{conductor && `${conductor.nombre} ${conductor.apellido}`}</h1>
                  </div>
                  <div className="flex items-center">
                    <BsFillPersonVcardFill className="text-white mr-3" />
                    <h1 className="text-xl text-white font-medium">{cedula}</h1>
                  </div>
                </div>
                <div className="col-start-2 flex items-center justify-center relative z-10">
                  <div className="border rounded-full overflow-hidden w-40 h-40">
                    <img className="object-cover h-full w-full" src="/img/person.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-start-2 row-span-3 w-full h-full flex items-center justify-center bg-black">
          <div className="w-full h-full grid grid-cols-3">
            <div className="col-start-1 border m-4 rounded-xl border-black bg-white">
              <div className="grid grid-rows-2 w-full h-full relative">
                <div className="row-start-1 grid grid-rows-3 border-b-8 border-black">
                  <div className="row-start-1 flex justify-center items-center">
                    <FaGraduationCap className="text-black text-5xl" />
                    <h1 className="text-2xl text-black font-semibold">Aprendizaje</h1>
                  </div>
                  <div className="row-start-2 ml-5 flex flex-col items-start justify-end">
                    <div className="relative flex items-center">
                      <BsFillCalendar2DateFill className="text-black mr-3" />
                      <h1 className="text-xl text-black font-bold">Inicio: {aprendizajeReporte?.fecha_inicio}</h1>
                    </div>
                    <div className="relative flex items-center">
                      <BsFillCalendar2DateFill className="text-black mr-3" />
                      <h1 className="text-xl text-black font-bold">Fin: {aprendizajeReporte?.fecha_fin}</h1>
                    </div>
                  </div>
                  <div className="row-start-3 ml-5 mt-5 flex items-center justify-start">
                    <div className="relative flex items-center">
                      <PiExamDuotone className="mr-1 text-4xl" style={{ color: `rgba(${200 - (aprendizajeReporte?.puntuacion || 0) * 2}, ${(aprendizajeReporte?.puntuacion || 0) * 1.5}, 0, 1)` }} />
                      <h1 className="text-3xl font-semibold" style={{ color: `rgba(${200 - (aprendizajeReporte?.puntuacion || 0) * 2}, ${(aprendizajeReporte?.puntuacion || 0) * 1.5}, 0, 1)` }}>
                        Puntuación: {aprendizajeReporte?.puntuacion}
                      </h1>
                    </div>
                  </div>
                </div>
                <div className="row-start-2 grid grid-rows-3 border-t-8 border-black">
                  <div className="row-start-1 flex justify-center items-center">
                    <PiExamDuotone className="text-black text-5xl" />
                    <h1 className="text-2xl text-black font-semibold">Evaluación</h1>
                  </div>
                  <div className="row-start-2 ml-5 flex flex-col items-start justify-end">
                    <div className="relative flex items-center">
                      <BsFillCalendar2DateFill className="text-black mr-3" />
                      <h1 className="text-xl text-black font-bold">Inicio: {evaluacionReporte?.fecha_inicio}</h1>
                    </div>
                    <div className="relative flex items-center">
                      <BsFillCalendar2DateFill className="text-black mr-3" />
                      <h1 className="text-xl text-black font-bold">Fin: {evaluacionReporte?.fecha_fin}</h1>
                    </div>
                  </div>
                  <div className="row-start-3 ml-5 mt-5 flex items-center justify-start">
                    <div className="relative flex items-center">
                      <PiExamDuotone className="mr-1 text-4xl" style={{ color: `rgba(${200 - (evaluacionReporte?.puntuacion || 0) * 2}, ${(evaluacionReporte?.puntuacion || 0) * 1.5}, 0, 1)` }} />
                      <h1 className="text-3xl font-semibold" style={{ color: `rgba(${200 - (evaluacionReporte?.puntuacion || 0) * 2}, ${(evaluacionReporte?.puntuacion || 0) * 1.5}, 0, 1)` }}>
                        Puntuación: {evaluacionReporte?.puntuacion}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-start-2 col-span-2 border m-4 rounded-xl border-black bg-white overflow-y-hidden max-h-full">
              <div className="grid grid-rows-2 w-full h-full">
                <div className="grid grid-rows-5">
                  <div className="row-start-1">
                    <div className="row-start-1 flex items-center justify-between border-b border-black">
                      <div className="relative">
                        <FaGraduationCap className="absolute top-1/2 transform -translate-y-1/2 left-3 text-black text-5xl" />
                        <h1 className=" text-2xl p-2 pl-16 text-black font-semibold">Aprendizaje</h1>
                      </div>
                      <a href="/feedback">
                        <button type="submit"
                          className="rounded-xl p-3 m-2 bg-[#1cb96f] shadow-lg shadow-[#1cb96f]/50 text-white text-xs justify-center items-center flex">
                          Ver Retroalimentación
                          <MdOutlineFeedback className="text-white ml-1" />
                        </button>
                      </a>
                    </div>
                    <div className="row-start-2 row-span-3 border-black">
                      <div className="max-h-44 overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-auto overflow-scroll w-full ">
                          <thead>
                            <tr className="w-full bg-gray-200">
                              <th className="py-2 px-4 border-b border-gray-300 text-left text-black">Infracción</th>
                              <th className="py-2 px-4 border-b border-gray-300 text-left text-black">Cantidad</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detalleAprendizaje.map((detalle, index) => (
                              <tr key={index}>
                                <td className="py-2 px-4 border-b border-gray-300 text-black">{detalle.nombre_infraccion}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-black">{detalle.cantidad}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row-start-2">
                  <div className="grid grid-rows-5">
                    <div className="row-start-1 flex items-center justify-between border-b border-black">
                      <div className="relative">
                        <PiExamDuotone className="absolute top-1/2 transform -translate-y-1/2 left-3 text-black text-5xl" />
                        <h1 className=" text-2xl pl-16 text-black font-semibold">Evaluación</h1>
                      </div>
                      <div className="relative">
                        <a href="/feedback">
                          <button type="submit"
                            className="rounded-xl p-3 m-2 bg-[#1cb96f] shadow-lg shadow-[#1cb96f]/50 text-white text-xs justify-center items-center flex">
                            Ver Retroalimentación
                            <MdOutlineFeedback className="text-white ml-1" />
                          </button>
                        </a>
                      </div>
                    </div>
                    <div className="row-start-2 row-span-3">
                      <div className="max-h-44 overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 table-auto overflow-scroll w-full">
                          <thead>
                            <tr className="w-full bg-gray-200">
                              <th className="py-2 px-4 border-b border-gray-300 text-left text-black">Infracción</th>
                              <th className="py-2 px-4 border-b border-gray-300 text-left text-black">Cantidad</th>
                            </tr>
                          </thead>
                          <tbody>
                            {detalleEvaluacion.map((detalle, index) => (
                              <tr key={index}>
                                <td className="py-2 px-4 border-b border-gray-300 text-black">{detalle.nombre_infraccion}</td>
                                <td className="py-2 px-4 border-b border-gray-300 text-black">{detalle.cantidad}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}