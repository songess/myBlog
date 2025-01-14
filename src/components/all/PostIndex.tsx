'use client';

import { useEffect, useState, useCallback } from 'react';

interface TocItem {
  content: string;
  id: string;
  tagOrder: number;
}

export default function PostIndex() {
  const [tocList, setTocList] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isView, setIsView] = useState<boolean>(false);

  useEffect(() => {
    const headings = document.querySelectorAll('h1, h2, h3');
    const tocItems: TocItem[] = [];

    headings.forEach((heading) => {
      if (!heading.id) {
        heading.id =
          heading.textContent?.toLowerCase().replace(/\s+/g, '-') || '';
      }
      const id = heading.id;
      const content = heading.textContent || '';
      const tagOrder = parseInt(heading.tagName[1]);

      tocItems.push({
        content,
        id,
        tagOrder,
      });
    });

    setTocList(tocItems.slice(1));
    setIsView(tocItems.length > 0);
    if (tocItems.length > 0) {
      setActiveId(tocItems[0].id);
    }
  }, []);

  const getMargin = (tagOrder: number) => {
    switch (tagOrder) {
      case 1:
        return 'ml-0';
      case 2:
        return 'ml-4';
      case 3:
        return 'ml-6';
      case 4:
        return 'ml-6';
      case 5:
        return 'ml-6';
      case 6:
        return 'ml-6';
      default:
        return 'ml-0';
    }
  };

  const scrollToHeading = async (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -86;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveId(id);
    }
  };

  const findVisibleHeading = useCallback(() => {
    const headings = tocList.map((item) => document.getElementById(item.id));
    const visibleHeadings = headings.filter((heading) => {
      if (!heading) return false;
      const rect = heading.getBoundingClientRect();
      return rect.top >= 0 && rect.top <= window.innerHeight;
    });

    if (visibleHeadings.length > 0) {
      // 화면 상단과 가장 가까운 헤딩을 찾음
      const closestHeading = visibleHeadings.reduce((prev, current) => {
        if (!prev || !current) return current;
        const prevRect = prev.getBoundingClientRect();
        const currentRect = current.getBoundingClientRect();
        return Math.abs(prevRect.top) < Math.abs(currentRect.top)
          ? prev
          : current;
      });

      if (closestHeading && closestHeading.id !== activeId) {
        setActiveId(closestHeading.id);
      }
    }
  }, [tocList, activeId]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      // 스크롤 이벤트 디바운스 처리
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        findVisibleHeading();
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [findVisibleHeading]);

  if (!isView) return null;

  return (
    <div className="hidden lg:block">
      <div className="fixed top-1/2 right-4 -translate-y-1/2 w-[240px]">
        <div className="text-sm font-medium mb-2 text-gray-500">목차</div>
        <nav className="rounded-md py-4 px-5 text-gray-300 flex flex-col bg-white dark:bg-gray-800 border-l dark:border-gray-700 max-h-[80vh] overflow-y-auto">
          {tocList.map((item) => (
            <div
              key={item.id}
              className={`${getMargin(item.tagOrder)} ${
                activeId === item.id ? 'text-black dark:text-white' : ''
              } hover:text-black dark:hover:text-white cursor-pointer transition-colors duration-200`}
              onClick={() => scrollToHeading(item.id)}
            >
              <button className="text-sm text-left w-full py-1">
                {item.content}
              </button>
            </div>
          ))}
        </nav>
      </div>
    </div>
  );
}
