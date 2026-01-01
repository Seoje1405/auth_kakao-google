"use client";

import { useState, useEffect, useRef } from "react";

// Window 객체에 SpeechRecognition 관련 타입 추가
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

export default function VoiceRecognition() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);

  // 타입을 any로 지정하여 'Cannot find name' 오류 해결
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // 브라우저 호환성 체크 (Chrome, Safari 등)
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true; // 계속해서 인식할지 여부
    recognition.interimResults = true; // 중간 결과를 반환할지 여부
    recognition.lang = "ko-KR"; // 한국어 설정

    // 이벤트 타입도 any로 처리
    recognition.onresult = (event: any) => {
      let currentTranscript = "";
      // results 객체 구조에 따라 텍스트 추출
      for (let i = event.resultIndex; i < event.results.length; i++) {
        currentTranscript += event.results[i][0].transcript;
      }
      setTranscript(currentTranscript);
    };

    recognition.onend = () => {
      // 인식이 자동으로 종료되었을 때 상태 동기화
      if (isListening) {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;
  }, [isListening]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!isSupported) {
    return (
      <p className="text-red-500">
        이 브라우저는 음성 인식을 지원하지 않습니다.
      </p>
    );
  }

  return (
    <div className="mt-8 p-6 border rounded-lg shadow-sm w-full max-w-md bg-white dark:bg-gray-800">
      <h2 className="text-lg font-bold mb-4">음성 인식 테스트</h2>

      <div className="mb-4 min-h-[100px] p-4 bg-gray-100 dark:bg-gray-700 rounded whitespace-pre-wrap">
        {transcript || "마이크 버튼을 누르고 말씀해보세요..."}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={toggleListening}
          className={`px-4 py-2 rounded-full font-semibold transition-colors ${
            isListening
              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {isListening ? "중지 (Listening...)" : "음성 인식 시작"}
        </button>

        {transcript && (
          <button
            onClick={() => setTranscript("")}
            className="px-4 py-2 border rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            초기화
          </button>
        )}
      </div>
    </div>
  );
}
