import { useState } from "react";

import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";

export const feedbackTypes = {
    BUG: {
        title: "Problema",
        image: {
            source: "https://raw.githubusercontent.com/marcel099/nlw-8-feedback-widget/87a1f9a43a3e97ff4e7828f1bc75aefdcbba1efd/web/src/assets/bug.svg",
            alt: "Imagem de um inseto"
        }
    },
    IDEA: {
        title: "Ideia",
        image: {
            source: "https://raw.githubusercontent.com/marcel099/nlw-8-feedback-widget/87a1f9a43a3e97ff4e7828f1bc75aefdcbba1efd/web/src/assets/idea.svg",
            alt: "Imagem de uma lâmpada"
        }
    },
    OTHER: {
        title: "Outro",
        image: {
            source: "https://raw.githubusercontent.com/marcel099/nlw-8-feedback-widget/87a1f9a43a3e97ff4e7828f1bc75aefdcbba1efd/web/src/assets/thought.svg",
            alt: "Imagem de um balão de pensamento"
        }
    }
}

export type FeedBackType = keyof typeof feedbackTypes;

export const WidgetForm = () => {
    const [feedbackType, setFeedbackType] = useState<FeedBackType | null>(null);
    const [feedbackSent, setFeedbackSent] = useState(false)

    const handleRestartFeedback = () => {
        setFeedbackType(null);
        setFeedbackSent(false);
    }

    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {feedbackSent ? <FeedbackSuccessStep onHandleRestartFeedback={handleRestartFeedback}/> : 
              <>
                {!feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged = {setFeedbackType}/>
                ) : (
                    <FeedbackContentStep 
                      feedbackType={feedbackType} 
                      onHandleRestartFeedback={handleRestartFeedback}
                      onFeedbackSent={() => setFeedbackSent(true)}
                    />
                )}
              </>}

            <footer className="text-xs text-neutral-400">
              Feito com ♥ pela <a className="underline underline-offset-2" href="https://rocketseat.com.br">Rocketseat</a>
            </footer>
        </div>
    );
};

