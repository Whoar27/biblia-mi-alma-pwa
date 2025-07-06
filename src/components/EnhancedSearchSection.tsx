import { useState, useEffect } from "react";
import { Search, ChevronRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const temas = [
  { nombre: "Amor", color: "bg-blue-500", img: "/placeholder.svg" },
  { nombre: "Ira", color: "bg-red-500", img: "/placeholder.svg" },
  { nombre: "Depresión", color: "bg-yellow-700", img: "/placeholder.svg" },
  { nombre: "Ansiedad", color: "bg-amber-700", img: "/placeholder.svg" },
  { nombre: "Esperanza", color: "bg-yellow-600", img: "/placeholder.svg" },
  { nombre: "Paz", color: "bg-blue-700", img: "/placeholder.svg" },
];

const filtros = ["Planes", "Iglesias", "Videos", "Imágenes"];

const nuevos = [
  { id: 1, titulo: "Mateo 5:4", subtitulo: "Proyecto Biblia", duracion: "1:45", img: "/placeholder.svg" },
  { id: 2, titulo: "Mateo 5:3", subtitulo: "Proyecto Biblia", duracion: "1:56", img: "/placeholder.svg" },
];

const siguiendo = [
  { id: 1, titulo: "Plan de Amor", subtitulo: "Plan destacado", img: "/placeholder.svg" },
  { id: 2, titulo: "Plan de Esperanza", subtitulo: "Plan destacado", img: "/placeholder.svg" },
];

export const EnhancedSearchSection = () => {
  const [busqueda, setBusqueda] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Header especifico para buscar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 py-2">
        <div className="max-w-md mx-auto px-4">
          {/* Título e icono con transición de opacidad y altura */}
          <div
            className={`flex items-center gap-3 mb-3 transition-all duration-300 overflow-hidden ${isScrolled ? 'opacity-0 max-h-0' : 'opacity-100 max-h-16'}`}
            style={{ pointerEvents: isScrolled ? 'none' : 'auto' }}
          >
            <Search className="text-biblical-purple h-6 w-6" />
            <h1 className="font-bold text-xl">Buscar</h1>
          </div>
          {/* Barra de búsqueda */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mb-2">
            <Search className="text-gray-400 mr-2" />
            <input
              className="bg-transparent outline-none flex-1 text-base"
              placeholder="Buscar"
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
        </div>
      </header>
      
      {/* Contenido con padding superior para el header fijo */}
      <div className="pt-24 p-4 pb-24 max-w-md mx-auto">
        {/* Filtros rápidos */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
          {filtros.map(f => (
            <Button key={f} variant="outline" className="rounded-full px-4 py-1 whitespace-nowrap font-semibold">
              {f}
            </Button>
          ))}
        </div>

        {/* Buscar por tema */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">Buscar por tema</h2>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
              VER TODOS <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {temas.map(t => (
              <div key={t.nombre} className={`min-w-[110px] h-20 rounded-xl flex flex-col items-center justify-center ${t.color} text-white font-semibold shadow-md relative`}>
                <img src={t.img} alt={t.nombre} className="absolute left-2 top-2 w-8 h-8 rounded-md object-cover opacity-80" />
                <span className="z-10 text-base mt-8">{t.nombre}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Nuevos */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">Nuevos</h2>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
              VER TODOS <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {nuevos.map(n => (
              <div key={n.id} className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-300 flex items-center justify-center">
                  <Play className="absolute left-2 top-2 text-white bg-black/60 rounded-full p-1 w-6 h-6" />
                  <img src={n.img} alt={n.titulo} className="w-full h-full object-cover rounded-lg" />
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-full">{n.duracion}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base truncate">{n.titulo}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 bg-blue-400 rounded-full mr-1" />
                    {n.subtitulo}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Siguiendo */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-lg">Siguiendo</h2>
            <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
              VER TODOS <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {siguiendo.map(s => (
              <div key={s.id} className="flex items-center gap-3 bg-gray-100 rounded-xl p-2">
                <img src={s.img} alt={s.titulo} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-base truncate">{s.titulo}</div>
                  <div className="text-xs text-gray-500">{s.subtitulo}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
