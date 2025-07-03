
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Book, Download, Trash2, Info, Check, Cloud } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface BibleVersion {
  code: string;
  name: string;
  description: string;
  year: number;
  editor: string;
  cover: string;
  size: string;
  downloaded: boolean;
}

interface EnhancedBibleVersionSelectorProps {
  selectedVersion: string;
  onVersionChange: (version: string) => void;
  onBack: () => void;
}

const bibleVersions: BibleVersion[] = [
  {
    code: "RVR1960",
    name: "Reina-Valera 1960",
    description: "La versión más popular en español, equilibrada entre tradición y claridad",
    year: 1960,
    editor: "Sociedades Bíblicas",
    cover: "/placeholder.svg",
    size: "12.5 MB",
    downloaded: true
  },
  {
    code: "NVI",
    name: "Nueva Versión Internacional",
    description: "Traducción moderna y precisa, fácil de entender",
    year: 1999,
    editor: "Sociedad Bíblica Internacional",
    cover: "/placeholder.svg",
    size: "11.8 MB",
    downloaded: false
  },
  {
    code: "RVA2015",
    name: "Reina-Valera Actualizada 2015",
    description: "Versión actualizada que mantiene la elegancia del castellano clásico",
    year: 2015,
    editor: "Editorial Mundo Hispano",
    cover: "/placeholder.svg",
    size: "13.2 MB",
    downloaded: true
  },
  {
    code: "LBLA",
    name: "La Biblia de las Américas",
    description: "Traducción literal y precisa para estudio profundo",
    year: 1986,
    editor: "The Lockman Foundation",
    cover: "/placeholder.svg",
    size: "14.1 MB",
    downloaded: false
  }
];

export const EnhancedBibleVersionSelector = ({ 
  selectedVersion, 
  onVersionChange,
  onBack 
}: EnhancedBibleVersionSelectorProps) => {
  const [versions, setVersions] = useState<BibleVersion[]>(bibleVersions);
  const { toast } = useToast();

  const handleDownload = (versionCode: string) => {
    setVersions(versions.map(v => 
      v.code === versionCode 
        ? { ...v, downloaded: true }
        : v
    ));
    toast({
      title: "Descarga iniciada",
      description: "La versión se está descargando para uso offline"
    });
  };

  const handleDelete = (versionCode: string) => {
    setVersions(versions.map(v => 
      v.code === versionCode 
        ? { ...v, downloaded: false }
        : v
    ));
    toast({
      title: "Versión eliminada",
      description: "La versión fue eliminada del almacenamiento local"
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <Button variant="ghost" onClick={onBack} size="sm">
          ← Volver
        </Button>
        <Book className="h-6 w-6 text-biblical-purple" />
        <h2 className="text-xl font-bold">Versiones de la Biblia</h2>
      </div>

      <RadioGroup value={selectedVersion} onValueChange={onVersionChange}>
        <div className="space-y-4">
          {versions.map((version) => (
            <Card key={version.code} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex">
                  <div className="w-20 h-24 bg-gradient-to-br from-biblical-gold to-biblical-orange flex items-center justify-center">
                    <Book className="h-8 w-8 text-white" />
                  </div>
                  
                  <div className="flex-1 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={version.code} id={version.code} />
                        <Label htmlFor={version.code} className="cursor-pointer">
                          <h3 className="font-semibold text-lg">{version.name}</h3>
                        </Label>
                        {selectedVersion === version.code && (
                          <Check className="h-4 w-4 text-biblical-green" />
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {version.downloaded ? (
                          <Badge className="bg-biblical-green-light text-biblical-green">
                            <Cloud className="h-3 w-3 mr-1" />
                            Descargada
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            {version.size}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {version.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        <p>{version.editor} • {version.year}</p>
                      </div>
                      
                      <div className="flex gap-2">
                        {version.downloaded ? (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(version.code)}
                            className="text-biblical-red hover:bg-biblical-red-light"
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Eliminar
                          </Button>
                        ) : (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownload(version.code)}
                            className="text-biblical-blue hover:bg-biblical-blue-light"
                          >
                            <Download className="h-3 w-3 mr-1" />
                            Descargar
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="sm">
                          <Info className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
