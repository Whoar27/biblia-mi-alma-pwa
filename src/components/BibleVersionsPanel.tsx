import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Cloud, MoreHorizontal, Plus, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ReactDOM from "react-dom";

export interface BibleVersion {
  id: string;
  code: string; // Ej: RVR1960
  name: string;
  publisher: string;
  year?: string;
  coverUrl?: string; // Si tiene imagen
  downloaded?: boolean;
  selected?: boolean;
}

export interface BibleVersionsPanelProps {
  open: boolean;
  onClose: () => void;
  versions: BibleVersion[];
  onSelect: (code: string) => void;
  onAdd?: () => void;
  onSettings?: () => void;
}

export const BibleVersionsPanel: React.FC<BibleVersionsPanelProps> = ({
  open,
  onClose,
  versions,
  onSelect,
  onAdd,
  onSettings,
}) => {
  const [localVersions, setLocalVersions] = useState(versions);

  React.useEffect(() => {
    setLocalVersions(versions);
  }, [versions]);

  const handleInfo = (v: BibleVersion) => {
    alert(`Versión: ${v.name}\nCódigo: ${v.code}\nEditorial: ${v.publisher}${v.year ? `\nAño: ${v.year}` : ""}`);
  };

  const handleRemove = (v: BibleVersion) => {
    setLocalVersions(localVersions.filter(ver => ver.code !== v.code));
  };

  const handleDeleteDownload = (v: BibleVersion) => {
    if (window.confirm(`¿Eliminar la descarga de ${v.name}?`)) {
      setLocalVersions(localVersions.map(ver => ver.code === v.code ? { ...ver, downloaded: false } : ver));
    }
  };

  if (!open) return null;

  return ReactDOM.createPortal(
    <>
      {/* Overlay profesional, cubre toda la pantalla */}
      <div className="fixed inset-0 z-40 bg-black/60 transition-opacity animate-in fade-in-0" onClick={onClose} />
      {/* Panel bottom sheet limpio y profesional, SIEMPRE pegado al fondo de la pantalla */}
      <div className="p-0 w-full min-h-[200px] h-[min(98vh,600px)] rounded-t-2xl fixed bottom-0 left-0 sm:left-1/2 sm:-translate-x-1/2 sm:max-w-lg max-w-full animate-in slide-in-from-bottom-10 duration-200 shadow-2xl z-[9999] bg-white flex flex-col">
        {/* Barra superior */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2 border-b border-gray-200">
          <span className="font-bold text-lg">Mis versiones</span>
          <div className="flex items-center">
            <div className="flex items-center gap-1 mr-4">
              {onSettings && (
                <Button variant="ghost" size="icon" onClick={onSettings} className="p-2">
                  <Settings className="w-5 h-5" />
                </Button>
              )}
              {onAdd && (
                <Button variant="ghost" size="icon" onClick={onAdd} className="p-2">
                  <Plus className="w-5 h-5" />
                </Button>
              )}
            </div>
            {/* Botón cerrar */}
            <button onClick={onClose} className="ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors">
              <span className="sr-only">Cerrar</span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 6L14 14M14 6L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            </button>
          </div>
        </div>
        {/* Lista de versiones con scroll independiente */}
        <div className="overflow-y-auto px-5 pt-2 pb-2 flex-1">
          {localVersions.map((v) => (
            <div
              key={v.id}
              className={`flex items-center gap-4 rounded-xl px-3 py-3 mb-2 border transition-all cursor-pointer 
                ${v.selected ? "bg-primary/10 border-primary ring-2 ring-primary/30" : "bg-background border-gray-200 hover:bg-accent"}
              `}
              style={{ minHeight: 64 }}
            >
              {/* Cover o sigla */}
              {v.coverUrl ? (
                <img
                  src={v.coverUrl}
                  alt={v.code}
                  className="w-12 h-12 rounded-lg object-cover border"
                />
              ) : (
                <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center border text-xs font-bold bg-muted/50 ${v.selected ? "border-primary text-primary" : "border-gray-300 text-gray-500"}`}>
                  <span className="leading-none">{v.code.replace(/\d+$/, "")}</span>
                  <span className="leading-none">{v.code.match(/\d+$/)?.[0] || ""}</span>
                </div>
              )}
              {/* Info (clickable) */}
              <div className="flex-1 min-w-0" onClick={() => onSelect(v.code)}>
                <div className="text-xs text-gray-500 truncate">{v.publisher}</div>
                <div className="font-medium text-base leading-tight break-words whitespace-normal">{v.name}</div>
              </div>
              {/* Iconos */}
              {v.downloaded === false && (
                <Cloud className="w-5 h-5 text-gray-400 mr-1" />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="p-2">
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="z-[10001]">
                  <DropdownMenuItem onClick={() => handleInfo(v)}>
                    Más información
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleRemove(v)}>
                    Remover de la lista
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600 focus:bg-red-50" onClick={() => handleDeleteDownload(v)}>
                    Eliminar descarga
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
        {/* Footer sticky: botón y leyenda siempre visibles */}
        <div className="sticky bottom-0 left-0 w-full bg-white px-5 pt-2 pb-4 flex flex-col items-center gap-2 border-t border-gray-200">
          <Button className="w-full rounded-xl font-semibold tracking-widest">MÁS VERSIONES</Button>
          <div className="text-xs text-gray-400 mt-1">3.530 Versiones en 2.293 Idiomas</div>
        </div>
      </div>
    </>,
    document.body
  );
}; 