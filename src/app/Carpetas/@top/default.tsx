'use client';
import { ForwardBackwardNavButtons } from '#@/components/Buttons/nav-buttons';
import { InputSearchBar } from '#@/components/layout/InputSearchBar';
import typography from '#@/styles/fonts/typography.module.css';
import { usePathname } from 'next/navigation';

export default function Default() {
      const pathname = usePathname();

      const splitter = pathname.split(
        '/' 
      );
      return (
        <>
          {splitter.map(
            (
              splitted, index 
            ) => {
                      return (
                        <h4
                          key={index}
                          className={typography.headlineMedium}
                        >
                          {splitted}
                        </h4>
                      );
            } 
          )}
          <InputSearchBar />
          <ForwardBackwardNavButtons />
        </>
      );
}
