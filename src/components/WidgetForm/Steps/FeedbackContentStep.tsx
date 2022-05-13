import { FormEvent, useState } from "react";

import { ArrowLeft } from "phosphor-react";
import { feedbackTypes, FeedBackType } from ".."
import { CloseButton } from "../../CloseButton"
import { ScreenshotButton } from "../ScreenshotButton";
import { api } from "../../../lib/api";
import { Loading } from "../Loading";

interface FeedbackContentStepProps {
    feedbackType: FeedBackType;
    onHandleRestartFeedback: () => void;
    onFeedbackSent: () => void;
}

export const FeedbackContentStep = ( {feedbackType, onHandleRestartFeedback, onFeedbackSent} : FeedbackContentStepProps) => {
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [screenshot, setScreenshot] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [isSendingFeedback, setIsSendingFeedback] = useState(false);

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        setIsSendingFeedback(true);

        await api.post('/feedbacks', {
            type: feedbackType,
            comment,
            screenshot,
        })

        setIsSendingFeedback(false);

        onFeedbackSent();
    }

    return (
        <>
        <header>
            <button type="button" className="top-5 left-5 absolute" onClick={onHandleRestartFeedback}>
                <ArrowLeft weight="bold" className="w-4 h-4"/>
            </button>

            <span className="text-xl leading-6 flex items-center gap-2">
                <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} className="w-6 h-6"/>
                {feedbackTypeInfo.title}
            </span>

            <CloseButton />
        </header>
        
        <form className="my-4 w-full" onSubmit={handleSubmit}>
            <textarea 
              className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin "
              placeholder="Conte com detalhes o que está acontecendo..."
              onChange={(event) => setComment(event.target.value)}
            />

            <footer className="flex gap-2 mt-2">
                <ScreenshotButton 
                  onScreenshotTook={setScreenshot}
                  screenshot={screenshot}
                />
                <button
                  type="submit"
                  disabled={comment.trim().length === 0 || isSendingFeedback}
                  className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500" 
                >
                    {isSendingFeedback ? <Loading /> : 'Enviar feedback'} 
                </button>
            </footer>
        </form>
        </>
    )
}