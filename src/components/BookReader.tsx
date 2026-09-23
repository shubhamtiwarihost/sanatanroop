'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  X,
  FileText,
  RotateCcw,
  BookOpen,
  Columns,
  Square,
  Download,
  AlertCircle,
  HelpCircle,
  Bookmark,
} from 'lucide-react';

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

export interface BookInfo {
  id: string;
  titleHi: string;
  titleEn: string;
  author: string;
  description: string;
  pdfUrl: string;
  pdfFileName?: string;
  pdfFileSize?: string;
  coverEmblem?: string;
  categoryLabel?: string;
  versesCount?: string;
}

interface BookReaderProps {
  book: BookInfo;
  onClose: () => void;
}

export default function BookReader({ book, onClose }: BookReaderProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [scale, setScale] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pageRendering, setPageRendering] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isTwoPage, setIsTwoPage] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(1000);
  const [inputPage, setInputPage] = useState<string>('1');
  const [showHelp, setShowHelp] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const readerAreaRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  // Auto-detect container size
  useEffect(() => {
    const updateSize = () => {
      if (readerAreaRef.current) {
        setContainerWidth(readerAreaRef.current.clientWidth);
      } else if (typeof window !== 'undefined') {
        setContainerWidth(window.innerWidth);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Auto enable 2-page mode on wide screens if user hasn't explicitly toggled
  const isLargeScreen = containerWidth >= 1024;
  const activeTwoPage = isTwoPage && isLargeScreen;

  // Zoom options
  const zoomLevels = [0.65, 0.8, 1.0, 1.25, 1.5, 2.0];
  const zoomIn = () => {
    setScale((prev) => {
      const next = zoomLevels.find((z) => z > prev + 0.05);
      return next || prev;
    });
  };
  const zoomOut = () => {
    setScale((prev) => {
      const reversed = [...zoomLevels].reverse();
      const next = reversed.find((z) => z < prev - 0.05);
      return next || prev;
    });
  };
  const resetZoom = () => setScale(1.0);

  // Navigation handlers
  const step = activeTwoPage ? 2 : 1;

  const goToPrevPage = useCallback(() => {
    setCurrentPage((prev) => {
      const nextVal = Math.max(prev - step, 1);
      setInputPage(String(nextVal));
      return nextVal;
    });
  }, [step]);

  const goToNextPage = useCallback(() => {
    setCurrentPage((prev) => {
      if (prev >= numPages) return prev;
      const nextVal = Math.min(prev + step, numPages);
      setInputPage(String(nextVal));
      return nextVal;
    });
  }, [numPages, step]);

  const goToPage = (pageNumber: number) => {
    const valid = Math.max(1, Math.min(pageNumber, numPages || 1));
    setCurrentPage(valid);
    setInputPage(String(valid));
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const p = parseInt(inputPage, 10);
    if (!isNaN(p)) {
      goToPage(p);
    }
  };

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        goToPrevPage();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        goToNextPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToPage(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        if (numPages > 0) goToPage(numPages);
      } else if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          onClose();
        }
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        zoomOut();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, [goToPrevPage, goToNextPage, numPages, onClose, toggleFullscreen]);

  // Touch and swipe gestures for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diffX = e.changedTouches[0].clientX - touchStartX.current;
    const diffY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX < 0) {
        goToNextPage();
      } else {
        goToPrevPage();
      }
    }
  };

  // PDF Document load handlers
  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setError(null);
  };

  const handleDocumentLoadError = (err: any) => {
    console.error('PDF Load Error:', err);
    setIsLoading(false);
    setError('यह पावन ग्रंथ लोड करने में असमर्थ। कृपया पुनः प्रयास करें अथवा सीधे PDF डाउनलोड करें।');
  };

  // Calculate dynamic page width for sharp rendering
  const computedPageWidth = useMemo(() => {
    if (activeTwoPage) {
      const availableWidth = (containerWidth - 120) / 2;
      return Math.round(Math.min(availableWidth, 580) * scale);
    } else {
      const availableWidth = containerWidth - 48;
      return Math.round(Math.min(availableWidth, 780) * scale);
    }
  }, [containerWidth, activeTwoPage, scale]);

  const progressPercent = numPages > 0 ? Math.round((currentPage / numPages) * 100) : 0;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-[#120d0a] text-amber-100 flex flex-col overflow-hidden select-none font-sans"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* ===== TOP NAVIGATION & CONTROLS TOOLBAR ===== */}
      <header className="flex-shrink-0 bg-[#1e1510]/95 border-b border-[#c5a059]/30 px-3 sm:px-6 py-2.5 flex items-center justify-between backdrop-blur-md shadow-lg z-30">
        
        {/* Left Section: Back button and Book Identity */}
        <div className="flex items-center space-x-3 min-w-0">
          <button
            onClick={onClose}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl border border-[#c5a059]/40 bg-[#2b1e17] hover:bg-[#c5a059]/20 text-[#e6c278] hover:text-white transition shadow-sm"
            title="ग्रंथ सूची पर वापस जाएं (Back to Books)"
          >
            <X className="w-4 h-4" />
            <span className="text-xs font-serif font-bold hidden sm:inline">वापस</span>
          </button>

          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-serif font-bold text-amber-200 truncate max-w-[150px] sm:max-w-[280px] md:max-w-[400px]">
                {book.titleHi}
              </span>
              {book.categoryLabel && (
                <span className="hidden md:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {book.categoryLabel}
                </span>
              )}
            </div>
            <div className="text-[11px] text-stone-400 font-serif truncate hidden sm:block">
              रचयिता: {book.author}
            </div>
          </div>
        </div>

        {/* Center: Page Navigation & Jump */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={goToPrevPage}
            disabled={currentPage <= 1 || isLoading}
            className="p-1.5 sm:p-2 rounded-lg border border-[#c5a059]/30 bg-[#2b1e17] hover:bg-[#c5a059]/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#e6c278] transition"
            title="पिछला पृष्ठ (Left Arrow)"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Page Counter & Input */}
          <form onSubmit={handleInputSubmit} className="flex items-center bg-[#2b1e17] border border-[#c5a059]/40 rounded-lg px-2 py-1">
            <span className="text-[11px] font-serif text-stone-400 mr-1 hidden xs:inline">पृष्ठ</span>
            <input
              type="text"
              inputMode="numeric"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
              onBlur={() => setInputPage(String(currentPage))}
              className="w-10 sm:w-12 text-center text-xs font-mono font-bold bg-transparent text-amber-300 focus:outline-none"
              title="पृष्ठ संख्या दर्ज करें"
            />
            <span className="text-xs font-mono text-stone-400">/ {numPages || '...'}</span>
          </form>

          <button
            onClick={goToNextPage}
            disabled={currentPage >= numPages || isLoading}
            className="p-1.5 sm:p-2 rounded-lg border border-[#c5a059]/30 bg-[#2b1e17] hover:bg-[#c5a059]/20 disabled:opacity-30 disabled:cursor-not-allowed text-[#e6c278] transition"
            title="अगला पृष्ठ (Right Arrow)"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Right Section: View Mode, Zoom, Fullscreen, Download */}
        <div className="flex items-center space-x-1 sm:space-x-1.5">
          {/* Two-Page Spread Toggle (Desktop only) */}
          {isLargeScreen && (
            <button
              onClick={() => setIsTwoPage(!isTwoPage)}
              className={`p-2 rounded-lg border transition flex items-center space-x-1 text-xs font-serif ${
                activeTwoPage
                  ? 'border-amber-500 bg-amber-500/20 text-amber-300 font-bold'
                  : 'border-[#c5a059]/30 bg-[#2b1e17] text-[#e6c278] hover:bg-[#c5a059]/10'
              }`}
              title={activeTwoPage ? 'एकल पृष्ठ दृश्य (Single Page View)' : 'दो पृष्ठ दृश्य (Two Page View)'}
            >
              {activeTwoPage ? <Columns className="w-4 h-4" /> : <Square className="w-4 h-4" />}
              <span className="hidden xl:inline">{activeTwoPage ? 'दो पृष्ठ' : 'एक पृष्ठ'}</span>
            </button>
          )}

          {/* Zoom Out */}
          <button
            onClick={zoomOut}
            disabled={scale <= 0.65}
            className="p-2 rounded-lg border border-[#c5a059]/30 bg-[#2b1e17] hover:bg-[#c5a059]/20 disabled:opacity-30 text-[#e6c278] transition hidden sm:inline-flex"
            title="आकार घटाएं (Zoom Out: -)"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          {/* Zoom Reset */}
          <button
            onClick={resetZoom}
            className="px-2 py-1.5 rounded-lg border border-[#c5a059]/30 bg-[#2b1e17] hover:bg-[#c5a059]/20 text-[11px] font-mono text-amber-300 transition hidden sm:inline-flex"
            title="वास्तविक आकार (Reset Zoom: 100%)"
          >
            {Math.round(scale * 100)}%
          </button>

          {/* Zoom In */}
          <button
            onClick={zoomIn}
            disabled={scale >= 2.0}
            className="p-2 rounded-lg border border-[#c5a059]/30 bg-[#2b1e17] hover:bg-[#c5a059]/20 disabled:opacity-30 text-[#e6c278] transition hidden sm:inline-flex"
            title="आकार बढ़ाएं (Zoom In: +)"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg border border-[#c5a059]/30 bg-[#2b1e17] hover:bg-[#c5a059]/20 text-[#e6c278] transition"
            title={isFullscreen ? 'पूर्ण स्क्रीन से बाहर निकलें (F)' : 'पूर्ण स्क्रीन पाठ (F)'}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>

          {/* Direct Download Button */}
          {book.pdfUrl && (
            <a
              href={book.pdfUrl}
              download={book.pdfFileName || `${book.titleEn || 'sanatan-book'}.pdf`}
              className="p-2 rounded-lg border border-red-500/50 bg-red-900/40 hover:bg-red-800/60 text-red-200 transition hidden md:inline-flex items-center space-x-1"
              title="मूल PDF डाउनलोड करें"
            >
              <Download className="w-4 h-4" />
              <span className="text-[11px] font-serif font-bold hidden xl:inline">PDF</span>
            </a>
          )}

          {/* Keyboard Shortcuts Help */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="p-2 rounded-lg border border-[#c5a059]/30 bg-[#2b1e17] hover:bg-[#c5a059]/20 text-stone-400 hover:text-amber-200 transition hidden sm:inline-flex"
            title="सहायता एवं शॉर्टकट"
          >
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ===== KEYBOARD SHORTCUTS MODAL OVERLAY ===== */}
      {showHelp && (
        <div className="absolute top-14 right-4 z-40 bg-[#1e1510] border border-[#c5a059]/50 rounded-2xl p-4 shadow-2xl max-w-xs text-xs font-serif space-y-2">
          <div className="flex items-center justify-between border-b border-[#c5a059]/30 pb-1.5">
            <span className="font-bold text-amber-300">कीबोर्ड शॉर्टकट निर्देशिका</span>
            <button onClick={() => setShowHelp(false)} className="text-stone-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-1.5 text-stone-300">
            <div className="flex justify-between">
              <span>अगला पृष्ठ</span>
              <kbd className="bg-black/40 px-1.5 py-0.5 rounded text-[10px] font-mono border border-stone-700">➔ / Space</kbd>
            </div>
            <div className="flex justify-between">
              <span>पिछला पृष्ठ</span>
              <kbd className="bg-black/40 px-1.5 py-0.5 rounded text-[10px] font-mono border border-stone-700">⬅</kbd>
            </div>
            <div className="flex justify-between">
              <span>ज़ूम इन / आउट</span>
              <kbd className="bg-black/40 px-1.5 py-0.5 rounded text-[10px] font-mono border border-stone-700">+ / -</kbd>
            </div>
            <div className="flex justify-between">
              <span>पूर्ण स्क्रीन</span>
              <kbd className="bg-black/40 px-1.5 py-0.5 rounded text-[10px] font-mono border border-stone-700">F</kbd>
            </div>
            <div className="flex justify-between">
              <span>प्रथम / अन्तिम पृष्ठ</span>
              <kbd className="bg-black/40 px-1.5 py-0.5 rounded text-[10px] font-mono border border-stone-700">Home / End</kbd>
            </div>
            <div className="flex justify-between">
              <span>पाठक बंद करें</span>
              <kbd className="bg-black/40 px-1.5 py-0.5 rounded text-[10px] font-mono border border-stone-700">Esc</kbd>
            </div>
          </div>
        </div>
      )}

      {/* ===== MAIN BOOK READING STAGE ===== */}
      <main
        ref={readerAreaRef}
        className="flex-1 overflow-auto relative flex items-center justify-center p-2 sm:p-6 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1d140e] via-[#120d0a] to-[#0a0705]"
      >
        {/* Floating Left Page Turn Trigger Button */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage <= 1 || isLoading}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-16 sm:w-12 sm:h-20 rounded-r-xl bg-[#20150f]/80 hover:bg-amber-600/30 text-amber-200 border-y border-r border-[#c5a059]/40 flex items-center justify-center backdrop-blur-sm transition-all disabled:opacity-0 pointer-events-auto shadow-xl group"
          title="पिछला पृष्ठ"
        >
          <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Floating Right Page Turn Trigger Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage >= numPages || isLoading}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-16 sm:w-12 sm:h-20 rounded-l-xl bg-[#20150f]/80 hover:bg-amber-600/30 text-amber-200 border-y border-l border-[#c5a059]/40 flex items-center justify-center backdrop-blur-sm transition-all disabled:opacity-0 pointer-events-auto shadow-xl group"
          title="अगला पृष्ठ"
        >
          <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center p-8 space-y-4 z-10 text-center">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full border-4 border-[#c5a059]/20" />
              <div className="absolute inset-0 rounded-full border-4 border-[#FF9933] border-t-transparent animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-2xl animate-pulse">
                🕉️
              </div>
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-amber-200">पावन ग्रंथ प्रस्तुत किया जा रहा है...</h3>
              <p className="text-xs text-stone-400 font-serif">कृपया धैर्य रखें, मूल पाण्डुलिपि लोड हो रही है</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <div className="max-w-md bg-[#231812] border-2 border-red-500/40 rounded-3xl p-6 text-center space-y-4 shadow-2xl z-10">
            <div className="w-14 h-14 mx-auto rounded-full bg-red-950/60 border border-red-500/40 flex items-center justify-center text-red-400">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-serif font-bold text-red-200">ग्रंथ लोड करने में त्रुटि</h3>
              <p className="text-xs text-stone-300 font-serif leading-relaxed">{error}</p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={() => {
                  setIsLoading(true);
                  setError(null);
                }}
                className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-stone-950 font-serif font-bold text-xs shadow-md transition"
              >
                पुनः प्रयास करें (Try Again)
              </button>
              {book.pdfUrl && (
                <a
                  href={book.pdfUrl}
                  download={book.pdfFileName || `${book.titleEn}.pdf`}
                  className="px-4 py-2 rounded-xl border border-[#c5a059]/40 bg-[#2b1e17] text-amber-200 hover:text-white font-serif text-xs transition inline-flex items-center space-x-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>सीधे डाउनलोड करें</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* PDF Book View Canvas */}
        <div className={`transition-opacity duration-300 ${isLoading || error ? 'opacity-0 h-0 pointer-events-none' : 'opacity-100'}`}>
          <Document
            file={book.pdfUrl}
            onLoadSuccess={handleDocumentLoadSuccess}
            onLoadError={handleDocumentLoadError}
            loading={null}
            error={null}
            className="flex items-center justify-center"
          >
            {/* Double Page View */}
            {activeTwoPage ? (
              <div className="relative flex items-center justify-center bg-[#241710] p-3 sm:p-5 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-4 border-[#3a251a]">
                {/* Book Spine Center Divider */}
                <div className="absolute top-0 bottom-0 left-1/2 -ml-3 w-6 pointer-events-none bg-gradient-to-r from-black/40 via-black/80 to-black/40 z-20" />

                {/* Left Page */}
                <div className="relative overflow-hidden bg-[#faf7f0] rounded-l-xl shadow-lg border-y border-l border-stone-300">
                  <Page
                    pageNumber={currentPage}
                    width={computedPageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="select-text"
                  />
                  <div className="text-center py-1 text-[10px] font-mono text-stone-600 bg-[#f3ede0] border-t border-stone-200">
                    पृष्ठ {currentPage}
                  </div>
                </div>

                {/* Right Page (if exists) */}
                {currentPage + 1 <= numPages ? (
                  <div className="relative overflow-hidden bg-[#faf7f0] rounded-r-xl shadow-lg border-y border-r border-stone-300">
                    <Page
                      pageNumber={currentPage + 1}
                      width={computedPageWidth}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="select-text"
                    />
                    <div className="text-center py-1 text-[10px] font-mono text-stone-600 bg-[#f3ede0] border-t border-stone-200">
                      पृष्ठ {currentPage + 1}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{ width: computedPageWidth }}
                    className="flex flex-col items-center justify-center bg-[#f3ede0] rounded-r-xl border border-stone-300 p-8 text-center text-stone-500 font-serif"
                  >
                    <BookOpen className="w-10 h-10 text-stone-400 mb-2 opacity-50" />
                    <p className="text-sm font-bold">॥ ग्रन्थ समाप्तम् ॥</p>
                    <p className="text-xs">आपने सम्पूर्ण ग्रंथ का पठन पूर्ण किया।</p>
                  </div>
                )}
              </div>
            ) : (
              /* Single Page View */
              <div className="relative bg-[#241710] p-2 sm:p-4 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.8)] border-4 border-[#3a251a]">
                <div className="relative overflow-hidden bg-[#faf7f0] rounded-xl shadow-2xl border border-stone-300">
                  <Page
                    pageNumber={currentPage}
                    width={computedPageWidth}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                    className="select-text"
                  />
                  <div className="flex items-center justify-between px-4 py-1 text-[10px] font-mono text-stone-600 bg-[#f3ede0] border-t border-stone-200">
                    <span className="font-serif truncate max-w-[200px]">{book.titleHi}</span>
                    <span>पृष्ठ {currentPage} / {numPages}</span>
                  </div>
                </div>
              </div>
            )}
          </Document>
        </div>
      </main>

      {/* ===== BOTTOM PROGRESS & QUICK NAV FOOTER ===== */}
      <footer className="flex-shrink-0 bg-[#1a120c]/95 border-t border-[#c5a059]/20 px-4 py-2 sm:py-2.5 backdrop-blur-md z-30">
        <div className="max-w-4xl mx-auto flex flex-col space-y-1.5">
          {/* Progress bar */}
          <div className="w-full bg-[#2a1d15] h-1.5 sm:h-2 rounded-full overflow-hidden border border-[#c5a059]/30">
            <div
              className="h-full bg-gradient-to-r from-amber-700 via-[#FF9933] to-amber-400 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(255,153,51,0.5)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Details below progress */}
          <div className="flex items-center justify-between text-[11px] font-serif text-stone-400">
            <div className="flex items-center space-x-2">
              <span className="text-amber-300 font-bold">
                {progressPercent}% पठित ({progressPercent}% Read)
              </span>
              <span className="hidden sm:inline text-stone-500">•</span>
              <span className="hidden sm:inline">
                पृष्ठ {currentPage} {activeTwoPage && currentPage + 1 <= numPages ? `व ${currentPage + 1}` : ''} (कुल {numPages} पृष्ठ)
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="hidden md:inline text-stone-500">
                तीर कुंजियों (Arrow Keys) द्वारा पृष्ठ पलटें
              </span>
              <button
                onClick={() => goToPage(1)}
                className="hover:text-amber-200 transition text-[10px] underline"
              >
                आरंभ (First)
              </button>
              <button
                onClick={() => numPages && goToPage(numPages)}
                className="hover:text-amber-200 transition text-[10px] underline"
              >
                अन्त (Last)
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
