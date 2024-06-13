export default function Home() {
  return (
    <div className="bg-white">
      <header className="bg-black w-full p-4">
        <div className="grid grid-col-2">
          <div className="col-start-1">
            <img src="/img/SimDrive.svg" alt="logoSimDrive" />
          </div>
          <div className="col-start-2 flex flex-row justify-between">
            <nav className="flex items-center justify-end">
              <div className="flex gap-20 font-serif">
                <a href="#home">Nosotros</a>
                <a href="#simDrive">SimDrive</a>
                <a href="#evolución">Evolución</a>
              </div>
            </nav>
            <a href="/login">
              <div className="">
                <div className="border px-6 py-1 rounded-2xl">
                  <p className="font-serif">Login</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </header>
      <main className="items-center justify-center">
        <section id="home" className="w-full bg-landing">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-3 z-50">
              <img src="/img/carro.png" alt="carro" />
            </div>
            <div className="col-span-2 flex flex-col justify-center gap-16">
              <h1 className="font-serif uppercase text-5xl z-50">Bienvenidos a Simdrive</h1>
              <p className="font-serif text-2xl z-50">Un mundo para aprender las señales de tránsito de manera fácil, interesante e intuitiva.</p>
            </div>
          </div>
        </section>
        <section id="simDrive" className="w-full">
          <div className="flex flex-col justify-center pt-10 w-full bg-1">
            <div className="flex justify-center">
              <h1 className="text-7xl text-black font-serif font-semibold">Qué es SimDrive?</h1>
            </div>
            <div className="text-center text-black mt-10 px-28">
              <p className="text-2xl text-black font-serif"> Este entorno ofrece un mundo  virtual detallado y realista que abarca una amplia gama de situaciones de conducción. Desde entornos educativos que proporcionan instrucción paso a paso,  hasta zonas de práctica diseñadas para mejorar las habilidades de manejo, y finalmente, la zona de evaluación ubicada en grandes ciudades donde se evalúa el  rendimiento de los estudiantes en condiciones realistas. Además, el entorno simulado puede incluir características como variaciones climáticas, tráfico dinámico  y obstáculos imprevistos para ofrecer una experiencia de aprendizaje completa  y desafiante</p>
            </div>
            <div className="grid grid-cols-2 mt-16">
              <div className="col-start-1 flex justify-center items-center">
                <img src="/img/signs.png" alt="" />
              </div>
              <div className="col-start-2 flex justify-center items-center">
                <img src="/img/os.png" alt="" />
              </div>
            </div>
            <div className="grid grid-cols-2 mt-28 bg-[#eee1ff]">
              <div className="col-start-1 flex justify-center">
                <img src="/img/people.png" alt="" />
              </div>
              <div className="col-start-2 grid grid-cols-2 items-center">
                <div className="col-start-1">
                  <h1 className="text-4xl text-black font-serif font-semibold mb-2">No tienes cuenta?</h1>
                  <p className="text-black font-serif my-2">Crea un para poder ver tus evaluaciones e intentos</p>
                  <a href="/register">
                    <div className="border border-[#009806] bg-[#009806] rounded-2xl text-center mt-10">
                      <p className="p-4 uppercase font-serif">Registrate</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="evolución">
          <div className="grid grid-cols-2 py-28 gap-6 bg-2">
            <div className="col-start-1 grid grid-rows-2 gap-36">
              <div className="flex items-center ml-24">
                <div className="">
                  <h1 className="text-5xl text-black font-serif font-semibold mb-6">Evolución de método de aprendizaje</h1>
                  <p className="text-xl text-black font-serif font-medium">Durante los últimos años, hemos sido testigos de una notable aceleración en la forma en que aprendemos, gracias a la rápida adopción de nuevas tecnologías. Uno de los campos que ha  experimentado un cambio significativo es el uso de Mundos Virtuales. Estas tecnologías han transformado la manera en que nos educamos y relacionamos entre nosotros</p>
                </div>
              </div>
              <div className="flex justify-center items-center w-[600px] ml-20">
                <img className="rounded-xl" src="/img/SimDriveOS.jpeg" alt="" />
              </div>
            </div>
            <div className="col-start-2 grid grid-rows-2 gap-36">
              <div className="flex justify-center items-center w-[600px] ml-7">
                <img className="rounded-xl" src="/img/manejo.jpg" alt="" />
              </div>
              <div className="flex items-center mr-24">
                <div className="text-end items-center justify-center">
                  <h1 className="text-5xl text-black font-serif font-semibold mb-6">Por qué SimDrive?</h1>
                  <p className="text-xl text-black font-serif font-medium">SimCar esta creado para mantener un aprendizaje fácil e intuitivo, combinando los mundos virtuales que nos ayuda a que el estudiante comprenda las señaléticas de transito sin tener que pasar peligro en las calles.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-black text-center p-4 h-[200px]">
        <div>
          <img src="/img/SimDrive.svg" alt="" />
        </div>
      </footer>
    </div>
  );
}
