'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdFeedback } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { HiArrowLeftStartOnRectangle } from "react-icons/hi2";

interface Infraccion {
    id_detalle: number;
    id_reporte: number;
    id_infraccion: number;
    cantidad: number;
    nombre: string;
}

export default function Report() {
    const [infracciones, setInfracciones] = useState<Infraccion[]>([]);
    const [cedula, setCedula] = useState<string>('');

    useEffect(() => {
        const storedCedula = localStorage.getItem('cedula');
        if (storedCedula) {
            setCedula(storedCedula);
            fetchData(storedCedula);
        }
    }, []);

    const fetchData = async (cedula: string) => {
        try {
            const fetchInfracciones = async () => {
                try {
                    const response = await axios.get(`http://localhost:4500/infracciones/evaluacion/${cedula}`);
                    console.log('API response:', response.data);
                    setInfracciones(response.data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
            fetchInfracciones();
        } catch (error) {
            console.error('Error fetching data', error);
        }
    };

    return (
        <div className="bg-white w-screen h-screen flex items-center justify-center">
            <div className="w-screen h-screen grid grid-rows-4">
                <div className="bg-report row-start-1 flex items-start justify-center w-full h-full">
                </div>
                <div className="row-start-2 row-span-3 w-full h-full flex items-center justify-center">
                    <div className="grid grid-rows-4 w-full h-full">
                        <div className="row-start-1 w-full h-full">
                            <div className="relative w-full mt-5">
                                <MdFeedback className="absolute top-1/2 transform -translate-y-1/2 left-3 text-black text-5xl" />
                                <h1 className="border-b border-black text-2xl p-2 pl-16 w-full text-black font-semibold">Retroalimentación</h1>
                            </div>
                        </div>
                        <div className="row-start-2 row-span-3 ml-4 mr-4">
                            <Swiper
                                spaceBetween={20}
                                slidesPerView={3}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                {infracciones.map((infraccion) => (
                                    <SwiperSlide key={infraccion.id_detalle}>
                                        <div className="border-2 border-black rounded-lg grid grid-rows-4 w-60 ml-20 mr-20">
                                            <div className="row-start-1 row-span-2 flex items-center justify-center border-b-2 border-black">
                                                <div className="border overflow-hidden w-full h-32 rounded-tl-lg rounded-tr-lg">
                                                    <img className="object-fill h-full w-full" src="/img/cone.jpg" alt="Profile Image" />
                                                </div>
                                            </div>
                                            <div className="row-start-3 flex items-center justify-center">
                                                <h1 className="text-black text-xl font-semibold">{infraccion.nombre}</h1>
                                            </div>
                                            <div className="row-start-4 flex items-center justify-center text-center">
                                                <h1 className="text-black text-base">Cantidad: {infraccion.cantidad}</h1>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
                <div className="row-start-5 flex items-center justify-end mb-5 mr-5">
                    <a href="/report">
                        <button type="submit"
                            className="border justify-center items-center flex rounded-xl p-2 px-6 bg-[#b91c1c] shadow-lg shadow-[#7e2727]/50 text-white text-base">
                            <HiArrowLeftStartOnRectangle className="text-white mr-1" />
                            Atras
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}
