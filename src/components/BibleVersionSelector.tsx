
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Book, Check } from "lucide-react";

interface BibleVersionSelectorProps {
  selectedVersion: string;
  onVersionChange: (version: string) => void;
}

const bibleVersions = [
  {
    code: "RVR1960",
    name: "Reina-Valera 1960",
    description: "La versión más popular en español, equilibrada entre tradición y claridad",
    year: 1960,
    popular: true
  },
  {
    code: "NVI",
    name: "Nueva Versión Internacional",
    description: "Traducción moderna y precisa, fácil de entender",
    year: 1999,
    popular: true
  },
  {
    code: "RVA2015",
    name: "Reina-Valera Actualizada 2015",
    description: "Versión actualizada que mantiene la elegancia del castellano clásico",
    year: 2015,
    popular: false
  },
  {
    code: "LBLA",
    name: "La Biblia de las Américas",
    description: "Traducción literal y precisa para estudio profundo",
    year: 1986,
    popular: false
  },
  {
    code: "DHH",
    name: "Dios Habla Hoy",
    description: "Lenguaje sencillo y contemporáneo, ideal para nuevos lectores",
    year: 1996,
    popular: false
  },
  {
    code: "TLA",
    name: "Traducción en Lenguaje Actual",
    description: "Traducción muy clara con lenguaje de hoy",
    year: 2000,
    popular: false
  }
];

export const BibleVersionSelector = ({ selectedVersion, onVersionChange }: BibleVersionSelectorProps) => {
  const popularVersions = bibleVersions.filter(v => v.popular);
  const otherVersions = bibleVersions.filter(v => !v.popular);

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <Book className="h-12 w-12 mx-auto mb-4 text-primary" />
        <h2 className="text-2xl font-bold mb-2">Versiones de la Biblia</h2>
        <p className="text-muted-foreground">
          Elige la versión que prefieras para tu estudio y lectura
        </p>
      </div>

      {/* Selector rápido */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Selección Rápida</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedVersion} onValueChange={onVersionChange}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una versión" />
            </SelectTrigger>
            <SelectContent>
              {bibleVersions.map((version) => (
                <SelectItem key={version.code} value={version.code}>
                  {version.name} ({version.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Versiones populares */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Versiones Más Populares</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedVersion} onValueChange={onVersionChange}>
            <div className="space-y-4">
              {popularVersions.map((version) => (
                <div key={version.code} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={version.code} id={version.code} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={version.code} className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{version.name}</h3>
                        <span className="text-xs text-muted-foreground">({version.code})</span>
                        {selectedVersion === version.code && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{version.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Publicada en {version.year}</p>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Otras versiones */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Otras Versiones</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedVersion} onValueChange={onVersionChange}>
            <div className="space-y-4">
              {otherVersions.map((version) => (
                <div key={version.code} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={version.code} id={version.code} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={version.code} className="cursor-pointer">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{version.name}</h3>
                        <span className="text-xs text-muted-foreground">({version.code})</span>
                        {selectedVersion === version.code && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{version.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">Publicada en {version.year}</p>
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card className="bg-muted/30">
        <CardContent className="pt-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-2">
              <strong>Versión actual:</strong> {bibleVersions.find(v => v.code === selectedVersion)?.name}
            </p>
            <p>
              Los cambios se aplicarán a toda la aplicación, incluyendo el versículo diario y la lectura de capítulos.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
