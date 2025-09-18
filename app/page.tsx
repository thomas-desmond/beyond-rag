"use client";

import { useState, useRef, useEffect } from "react";
import { Send, ImagePlus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LanguageSelector } from "@/components/ui/language-selector";
import { useTranslation } from "@/lib/i18n-context";
import { TranslationKey } from "@/lib/translations";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Message {
  content: string | File;
  type: "text" | "image";
  role: "user" | "assistant";
  translationKey?: TranslationKey; // For system messages that need translation
  dynamicContent?: string; // For API responses that should be preserved
}

type Step =
  | "initial"
  | "awaiting_image"
  | "analyzing_image"
  | "showing_description"
  | "awaiting_social_media_confirmation";

export default function Home() {
  const { t, language } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>("initial");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [imageDescription, setImageDescription] = useState("");


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSocialMediaChoice = async (choice: 'yes' | 'no') => {
    const userMessage: Message = {
      content: choice === 'yes' ? t('yesButton') : t('noButton'),
      type: "text",
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    if (choice === 'yes') {
      try {
        const response = await fetch("https://beyond-rag-api.cf-tme.workers.dev/social-posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          body: JSON.stringify({ description: imageDescription }),
        });

        if (!response.ok) {
          throw new Error(t('apiError'));
        }

        const data = await response.json();
        setMessages((prev) => [
          ...prev,
          {
            content: "",
            translationKey: "socialMediaPostsPrefix",
            dynamicContent: data.response,
            type: "text",
            role: "assistant",
          },
          {
            content: "",
            translationKey: "readyForAnother",
            type: "text",
            role: "assistant",
          },
        ]);
        setCurrentStep("awaiting_image");

      } catch (error) {
        setMessages((prev) => [
          ...prev,
          {
            content: "",
            translationKey: "socialMediaError",
            type: "text",
            role: "assistant",
          },
        ]);
        setCurrentStep("initial");
      }
    } else {
      setMessages((prev) => [
        ...prev,
        {
          content: "",
          translationKey: "noProblemMessage",
          type: "text",
          role: "assistant",
        },
      ]);
      setCurrentStep("awaiting_image");
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Set initial message based on current step
    if (messages.length === 0) {
      setMessages([
        {
          content: "",
          type: "text",
          role: "assistant",
          translationKey: "welcomeMessage",
        },
      ]);
      setCurrentStep("awaiting_image");
    }
  }, [messages.length]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      type: "text",
      role: "user",
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Handle different steps - social media confirmation now handled by buttons
    // No text input handling needed for social media confirmation
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setMessages((prev) => [
      ...prev,
      {
        content: file,
        type: "image",
        role: "user",
      },
    ]);

    analyzeUploadedImage(file);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isInputDisabled = currentStep === "analyzing_image";
  const isImageUploadDisabled = currentStep !== "awaiting_image";

  return (
    <div className="flex flex-col h-screen bg-[#f6f6f7]">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-[#f48120] rounded-full" />
            <h1 className="text-lg font-semibold text-gray-900">
              {t('appTitle')}
            </h1>
            {isAnalyzing && (
              <div className="flex items-center space-x-2 ml-4">
                <Loader2 className="h-4 w-4 animate-spin text-[#f48120]" />
                <span className="text-sm text-gray-500">{t('generating')}</span>
              </div>
            )}
          </div>
          <LanguageSelector />
        </div>
      </header>

      <main className="flex-1 max-w-3xl w-full mx-auto p-4 overflow-hidden flex flex-col">
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "flex",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 max-w-[80%]",
                    message.role === "user"
                      ? "bg-[#f48120] text-white"
                      : "bg-white border border-gray-200"
                  )}
                >
                  {message.type === "text" ? (
                    <p className="break-words whitespace-pre-line">
                      {message.translationKey 
                        ? message.dynamicContent 
                          ? `${t(message.translationKey)}:\n\n${message.dynamicContent}`
                          : t(message.translationKey)
                        : message.content as string
                      }
                    </p>
                  ) : (
                    <div className="relative w-64 h-64">
                      <Image
                        src={URL.createObjectURL(message.content as File)}
                        alt={t('uploadedImageAlt')}
                        fill
                        className="object-contain rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

{currentStep === "awaiting_social_media_confirmation" && (
          <div className="mt-4 flex gap-2 justify-center">
            <Button
              onClick={() => handleSocialMediaChoice('yes')}
              className="bg-[#f48120] hover:bg-[#e6730e] text-white px-6 py-2"
            >
              {t('yesButton')}
            </Button>
            <Button
              onClick={() => handleSocialMediaChoice('no')}
              variant="outline"
              className="px-6 py-2"
            >
              {t('noButton')}
            </Button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-4 flex gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
            disabled={isImageUploadDisabled}
          />
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isImageUploadDisabled}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              isInputDisabled ? t('processingPlaceholder') : t('messagePlaceholder')
            }
            className="flex-1"
            disabled={isInputDisabled || currentStep === "awaiting_social_media_confirmation"}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isInputDisabled || !input.trim() || currentStep === "awaiting_social_media_confirmation"}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </main>
    </div>
  );

  async function analyzeUploadedImage(file: File) {
    setMessages((prev) => [
      ...prev,
      {
        content: "",
        translationKey: "analyzingMessage",
        type: "text",
        role: "assistant",
      },
    ]);
    setCurrentStep("analyzing_image");
    const payload = {
      image: file
        ? Array.from(new Uint8Array(await file.arrayBuffer()))
        : null,
    };

    setIsAnalyzing(true);

    try {
      const response = await fetch(
        "https://beyond-rag-api.cf-tme.workers.dev/image-description",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept-Language": language,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(t('imageApiError'));
      }

      const data = await response.json();
      setImageDescription(data.response);
      setMessages((prev) => [
        ...prev,
        {
          content: "",
          translationKey: "imageDescriptionPrefix",
          dynamicContent: data.response,
          type: "text",
          role: "assistant",
        },
        {
          content: "",
          translationKey: "socialMediaQuestion",
          type: "text",
          role: "assistant",
        },
      ]);
      setIsAnalyzing(false);

      setCurrentStep("awaiting_social_media_confirmation");
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          content: "",
          translationKey: "imageAnalysisError",
          type: "text",
          role: "assistant",
        },
      ]);
    }
  }
}
