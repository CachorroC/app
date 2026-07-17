'use client';

import { CSSProperties,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState, } from 'react';

/** Minimal option shape the combobox filters and selects over. */
export interface ComboboxOption {
  id   : string | number;
  label: string;
}

interface UseComboboxArgs<TOption extends ComboboxOption> {
  options   : TOption[];
  inputValue: string;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  onSelect  : ( option: TOption ) => void;
}

/** Handlers spread onto each `<li>` option row. */
export interface ComboboxOptionProps {
  'aria-selected': boolean;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  onMouseDown    : ( event: MouseEvent<HTMLLIElement> ) => void;
  onMouseEnter   : () => void;
}

export interface UseComboboxResult<TOption extends ComboboxOption> {
  wrapperRef        : RefObject<HTMLDivElement | null>;
  isOpen            : boolean;
  filteredOptions   : TOption[];
  highlightedIndex  : number;
  panelStyle        : CSSProperties;
  open              : () => void;
  close             : () => void;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  handleInputKeyDown: ( event: KeyboardEvent<HTMLInputElement> ) => void;
  handleInputBlur   : () => void;
  // eslint-disable-next-line no-unused-vars -- type-only signature, not a real binding
  getOptionProps    : ( index: number ) => ComboboxOptionProps;
}

/** Viewport margin (px) kept clear beyond the dropdown panel. */
const VIEWPORT_MARGIN = 16;
/** Cap on panel height even when there's plenty of vertical room. */
const MAX_PANEL_HEIGHT = 240;
/** Below this much available space, the panel flips to whichever side has more room. */
const MIN_PANEL_HEIGHT = 120;

const DEFAULT_PANEL_STYLE: CSSProperties = {
  position : 'absolute',
  left     : 0,
  right    : 0,
  top      : '100%',
  marginTop: 4,
  maxHeight: MAX_PANEL_HEIGHT,
};

/**
 * Headless combobox behavior: filters `options` by `inputValue`, tracks open/highlight
 * state and keyboard navigation, and computes a keyboard-aware panel position via
 * `window.visualViewport`. This replaces native `<input list>` + `<datalist>`, whose
 * suggestions popup is drawn by the browser/OS shell and can render on top of the
 * on-screen keyboard with no CSS able to reposition it.
 */
export function useCombobox<TOption extends ComboboxOption>( {
  options, inputValue, onSelect,
}: UseComboboxArgs<TOption> ): UseComboboxResult<TOption> {
  const wrapperRef = useRef<HTMLDivElement>( null );
  const [
    isOpen,
    setIsOpen 
  ] = useState( false );
  const [
    highlightedIndex,
    setHighlightedIndex 
  ] = useState( -1 );
  const [
    panelStyle,
    setPanelStyle 
  ] = useState<CSSProperties>( DEFAULT_PANEL_STYLE );

  const filteredOptions = useMemo(
    () => {
      const query = inputValue.trim()
        .toLowerCase();

      if ( !query ) {
        return options;
      }

      return options.filter( ( option ) => {
        return option.label.toLowerCase()
          .includes( query );
      } );
    }, [
      options,
      inputValue 
    ] 
  );

  const updatePanelStyle = useCallback(
    () => {
      const wrapper = wrapperRef.current;

      if ( !wrapper ) {
        return;
      }

      const rect = wrapper.getBoundingClientRect();
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;
      const spaceBelow = viewportHeight - rect.bottom - VIEWPORT_MARGIN;
      const spaceAbove = rect.top - VIEWPORT_MARGIN;
      const flipUp = spaceBelow < MIN_PANEL_HEIGHT && spaceAbove > spaceBelow;
      const maxHeight = Math.max(
        0, Math.min(
          MAX_PANEL_HEIGHT, flipUp
            ? spaceAbove
            : spaceBelow 
        ) 
      );

      setPanelStyle( flipUp
        ? {
            position    : 'absolute',
            left        : 0,
            right       : 0,
            bottom      : '100%',
            marginBottom: 4,
            maxHeight,
          }
        : {
            position : 'absolute',
            left     : 0,
            right    : 0,
            top      : '100%',
            marginTop: 4,
            maxHeight,
          } );
    }, [] 
  );

  const open = useCallback(
    () => {
      updatePanelStyle();
      setIsOpen( true );
    }, [
      updatePanelStyle 
    ] 
  );

  const close = useCallback(
    () => {
      setIsOpen( false );
      setHighlightedIndex( -1 );
    }, [] 
  );

  useEffect(
    () => {
      if ( !isOpen ) {
        return undefined;
      }

      updatePanelStyle();

      window.addEventListener(
        'resize', updatePanelStyle 
      );
      window.addEventListener(
        'scroll', updatePanelStyle, true 
      );
      window.visualViewport?.addEventListener(
        'resize', updatePanelStyle 
      );

      return () => {
        window.removeEventListener(
          'resize', updatePanelStyle 
        );
        window.removeEventListener(
          'scroll', updatePanelStyle, true 
        );
        window.visualViewport?.removeEventListener(
          'resize', updatePanelStyle 
        );
      };
    }, [
      isOpen,
      updatePanelStyle 
    ] 
  );

  const handleInputKeyDown = useCallback(
    ( event: KeyboardEvent<HTMLInputElement> ) => {
      if ( event.key === 'ArrowDown' ) {
        event.preventDefault();

        if ( !isOpen ) {
          open();

          return;
        }

        setHighlightedIndex( ( current ) => {
          return Math.min(
            current + 1, filteredOptions.length - 1 
          );
        } );

        return;
      }

      if ( event.key === 'ArrowUp' ) {
        event.preventDefault();
        setHighlightedIndex( ( current ) => {
          return Math.max(
            current - 1, 0 
          );
        } );

        return;
      }

      if ( event.key === 'Enter' ) {
        if ( !isOpen || highlightedIndex < 0 ) {
          return;
        }

        const option = filteredOptions[ highlightedIndex ];

        if ( option ) {
          event.preventDefault();
          onSelect( option );
          close();
        }

        return;
      }

      if ( event.key === 'Escape' ) {
        close();
      }
    }, [
      isOpen,
      highlightedIndex,
      filteredOptions,
      open,
      close,
      onSelect,
    ] 
  );

  const handleInputBlur = useCallback(
    () => {
      close();
    }, [
      close 
    ] 
  );

  const getOptionProps = useCallback(
    ( index: number ): ComboboxOptionProps => {
      return {
        'aria-selected': index === highlightedIndex,
        onMouseDown    : ( event: MouseEvent<HTMLLIElement> ) => {
          event.preventDefault();

          const option = filteredOptions[ index ];

          if ( option ) {
            onSelect( option );
          }

          close();
        },
        onMouseEnter: () => {
          setHighlightedIndex( index );
        },
      };
    }, [
      highlightedIndex,
      filteredOptions,
      onSelect,
      close,
    ] 
  );

  return {
    wrapperRef,
    isOpen,
    filteredOptions,
    highlightedIndex,
    panelStyle,
    open,
    close,
    handleInputKeyDown,
    handleInputBlur,
    getOptionProps,
  };
}
