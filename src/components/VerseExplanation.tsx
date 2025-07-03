
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, BookOpen, ExternalLink } from "lucide-react";

interface VerseExplanationProps {
  verse: any;
  onBack: () => void;
  onNavigateToVerse: (reference: string) => void;
}

const verseExplanations = {
  "Juan 3:16": {
    explanation: "Este versículo es considerado el corazón del evangelio cristiano. Revela el amor incondicional de Dios hacia la humanidad y su plan de salvación a través de Jesucristo.",
    reflection: "Reflexiona en el amor sacrificial de Dios. Su amor no está basado en nuestros méritos, sino en su naturaleza amorosa. La vida eterna no es solo duración infinita, sino calidad de vida en comunión con Dios.",
    keyWords: [
      { word: "Amó", meaning: "Amor ágape - amor incondicional y sacrificial" },
      { word: "Mundo", meaning: "Toda la humanidad, sin excepción" },
      { word: "Unigénito", meaning: "Único en su clase, el único Hijo de Dios" },
      { word: "Vida eterna", meaning: "Vida abundante y sin fin con Dios" }
    ],
    relatedVerses: [
      { reference: "Romanos 5:8", text: "Mas Dios muestra su amor para con nosotros, en que siendo aún pecadores, Cristo murió por nosotros." },
      { reference: "1 Juan 4:9", text: "En esto se mostró el amor de Dios para con nosotros, en que Dios envió a su Hijo unigénito al mundo, para que vivamos por él." },
      { reference: "Juan 10:10", text: "El ladrón no viene sino para hurtar y matar y destruir; yo he venido para que tengan vida, y para que la tengan en abundancia." }
    ]
  }
};

export const VerseExplanation = ({ verse, onBack, onNavigateToVerse }: VerseExplanationProps) => {
  const explanation = verseExplanations[verse.reference as keyof typeof verseExplanations];

  if (!explanation) {
    return (
      <div className="p-4">
        <Button onClick={onBack} variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
        <Card>
          <CardContent className="pt-6 text-center">
            <p>Explicación no disponible para este versículo.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      <Button onClick={onBack} variant="ghost" className="mb-4">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver al Inicio
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            {verse.reference}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="text-lg leading-relaxed font-medium border-l-4 border-primary pl-4 mb-4 italic">
            "{verse.text}"
          </blockquote>
          <Badge variant="secondary">{verse.theme}</Badge>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Explicación</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            {explanation.explanation}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Reflexión</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="leading-relaxed text-muted-foreground">
            {explanation.reflection}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Palabras Clave</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {explanation.keyWords.map((item, index) => (
              <div key={index} className="border-l-2 border-primary/30 pl-3">
                <h4 className="font-semibold text-primary">{item.word}</h4>
                <p className="text-sm text-muted-foreground">{item.meaning}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Versículos Relacionados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {explanation.relatedVerses.map((relatedVerse, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h4 className="font-semibold text-primary mb-1">{relatedVerse.reference}</h4>
                    <p className="text-sm text-muted-foreground">{relatedVerse.text}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigateToVerse(relatedVerse.reference)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
