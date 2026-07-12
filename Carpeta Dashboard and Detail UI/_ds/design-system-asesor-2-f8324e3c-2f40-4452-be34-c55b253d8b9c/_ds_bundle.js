/* @ds-bundle: {"format":3,"namespace":"DesignSystemAsesor2_f8324e","components":[{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"Badge","sourcePath":"components/data/Badge.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"Chip","sourcePath":"components/data/Chip.jsx"},{"name":"StatusChip","sourcePath":"components/data/StatusChip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"TextField","sourcePath":"components/forms/TextField.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/data/Avatar.jsx":"1a3b1fd87680","components/data/Badge.jsx":"fc6be87ffdb1","components/data/Card.jsx":"17f500fc5733","components/data/Chip.jsx":"b5e7f6b88a29","components/data/StatusChip.jsx":"b06587104e98","components/forms/Button.jsx":"00be82eb2e8f","components/forms/Checkbox.jsx":"75f377911727","components/forms/IconButton.jsx":"ad3f67e88394","components/forms/Select.jsx":"5a057f6a77a4","components/forms/Switch.jsx":"013ba872dc24","components/forms/TextField.jsx":"78e575b99bd9","components/navigation/Tabs.jsx":"18c8de02d7dc","ui_kits/asesor/App.jsx":"d5bda6fcb0a1","ui_kits/asesor/CarpetaDetail.jsx":"869d3fff6aa0","ui_kits/asesor/CarpetasView.jsx":"2124439afedb","ui_kits/asesor/LoginView.jsx":"eaa857c78340","ui_kits/asesor/Sidebar.jsx":"88a9cdaf7d49","ui_kits/asesor/TopBar.jsx":"322333e4556c","ui_kits/asesor/data.js":"8a18d829330b","ui_kits/asesor/helpers.js":"52d96b4c3fda"},"inlinedExternals":[],"unexposedExports":[]} */

( () => {
  const __ds_ns = ( window.DesignSystemAsesor2_f8324e
    = window.DesignSystemAsesor2_f8324e || {} );

  const __ds_scope = {};

  __ds_ns.__errors = __ds_ns.__errors || [];

  // components/data/Avatar.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      function initials( name = '' ) {
        const parts = name.trim()
          .split( /\s+/ )
          .filter( Boolean );

        if ( !parts.length ) {
          return '';
        }

        return ( parts[ 0 ][ 0 ] + ( parts[ 1 ]?.[ 0 ] || '' ) ).toUpperCase();
      }

      /** Avatar — user/entity initials or image. */
      function Avatar( {
        name, src, size = 'md', className = '', ...rest 
      } ) {
        const cls = [
          'aj-avatar',
          size !== 'md'
            ? `aj-avatar--${ size }`
            : '',
          className,
        ]
          .filter( Boolean )
          .join( ' ' );

        return /*#__PURE__*/ React.createElement(
          'span',
          _extends(
            {
              className: cls,
            },
            rest,
          ),
          src
            ? /*#__PURE__*/ React.createElement(
                'img', {
                  src: src,
                  alt: name || '',
                } 
              )
            : initials( name ),
        );
      }

      Object.assign(
        __ds_scope, {
          Avatar 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/data/Avatar.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/data/Badge.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /** Badge — small count or dot, usually overlaid on an icon. */
      function Badge( {
        count,
        dot = false,
        variant = 'error',
        max = 99,
        className = '',
        ...rest
      } ) {
        if ( dot ) {
          return /*#__PURE__*/ React.createElement(
            'span',
            _extends(
              {
                className: [
                  'aj-badge',
                  'aj-badge--dot',
                  variant !== 'error'
                    ? `aj-badge--${ variant }`
                    : '',
                  className,
                ]
                  .filter( Boolean )
                  .join( ' ' ),
              },
              rest,
            ),
          );
        }

        const display
          = typeof count === 'number' && count > max
            ? `${ max }+`
            : count;

        return /*#__PURE__*/ React.createElement(
          'span',
          _extends(
            {
              className: [
                'aj-badge',
                variant !== 'error'
                  ? `aj-badge--${ variant }`
                  : '',
                className,
              ]
                .filter( Boolean )
                .join( ' ' ),
            },
            rest,
          ),
          display,
        );
      }

      Object.assign(
        __ds_scope, {
          Badge 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/data/Badge.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/data/Card.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /** Card — surface container for grouped content. */
      function Card( {
        variant = 'outlined',
        padded = false,
        interactive = false,
        className = '',
        children,
        ...rest
      } ) {
        const cls = [
          'aj-card',
          variant !== 'outlined'
            ? `aj-card--${ variant }`
            : '',
          padded
            ? 'aj-card--pad'
            : '',
          interactive
            ? 'aj-card--interactive'
            : '',
          className,
        ]
          .filter( Boolean )
          .join( ' ' );

        return /*#__PURE__*/ React.createElement(
          'div',
          _extends(
            {
              className: cls,
            },
            rest,
          ),
          children,
        );
      }

      Object.assign(
        __ds_scope, {
          Card 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/data/Card.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/data/Chip.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /** Chip — interactive filter / assist chip. */
      function Chip( {
        label,
        icon,
        trailingIcon,
        selected = false,
        onClick,
        className = '',
        children,
        ...rest
      } ) {
        return /*#__PURE__*/ React.createElement(
          'button',
          _extends(
            {
              type     : 'button',
              className: [
                'aj-chip',
                selected
                  ? 'aj-chip--selected'
                  : '',
                className,
              ]
                .filter( Boolean )
                .join( ' ' ),
              'aria-pressed': selected,
              onClick       : onClick,
            },
            rest,
          ),
          selected
            && !icon
            /*#__PURE__*/ && React.createElement(
            'span',
            {
              className    : 'material-symbols-rounded',
              'aria-hidden': 'true',
            },
            'check',
          ),
          icon
          /*#__PURE__*/ && React.createElement(
            'span',
            {
              className    : 'material-symbols-rounded',
              'aria-hidden': 'true',
            },
            icon,
          ),
          label ?? children,
          trailingIcon
          /*#__PURE__*/ && React.createElement(
            'span',
            {
              className    : 'material-symbols-rounded',
              'aria-hidden': 'true',
            },
            trailingIcon,
          ),
        );
      }

      Object.assign(
        __ds_scope, {
          Chip 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/data/Chip.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/data/StatusChip.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      const STATUS_META = {
        active: {
          icon : 'autorenew',
          label: 'En proceso',
        },
        review: {
          icon : 'rate_review',
          label: 'Por revisar',
        },
        done: {
          icon : 'task_alt',
          label: 'Terminado',
        },
        overdue: {
          icon : 'warning',
          label: 'Vencido',
        },
        neutral: {
          icon : null,
          label: '',
        },
      };

      /**
       * StatusChip — compact legal case-status / category indicator.
       */
      function StatusChip( {
        status = 'neutral',
        label,
        showIcon = true,
        dot = false,
        className = '',
        ...rest
      } ) {
        const meta = STATUS_META[ status ] || STATUS_META.neutral;
        const text = label ?? meta.label;

        return /*#__PURE__*/ React.createElement(
          'span',
          _extends(
            {
              className: [
                'aj-status',
                `aj-status--${ status }`,
                className
              ]
                .filter( Boolean )
                .join( ' ' ),
            },
            rest,
          ),
          dot
          /*#__PURE__*/ && React.createElement(
            'span', {
              className    : 'aj-status__dot',
              'aria-hidden': 'true',
            } 
          ),
          !dot
            && showIcon
            && meta.icon
            /*#__PURE__*/ && React.createElement(
            'span',
            {
              className    : 'material-symbols-rounded',
              'aria-hidden': 'true',
            },
            meta.icon,
          ),
          text,
        );
      }

      Object.assign(
        __ds_scope, {
          StatusChip 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/data/StatusChip.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/forms/Button.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /**
       * Button — Material 3 button in the Asesor Jurídico system.
       * Variants: filled (primary action), tonal, elevated, outlined, text.
       */
      function Button( {
        variant = 'filled',
        size = 'md',
        icon,
        trailingIcon,
        children,
        className = '',
        type = 'button',
        ...rest
      } ) {
        const cls = [
          'aj-btn',
          `aj-btn--${ variant }`,
          size !== 'md'
            ? `aj-btn--${ size }`
            : '',
          className,
        ]
          .filter( Boolean )
          .join( ' ' );

        return /*#__PURE__*/ React.createElement(
          'button',
          _extends(
            {
              type     : type,
              className: cls,
            },
            rest,
          ),
          icon
          /*#__PURE__*/ && React.createElement(
            'span',
            {
              className    : 'material-symbols-rounded',
              'aria-hidden': 'true',
            },
            icon,
          ),
          children,
          trailingIcon
          /*#__PURE__*/ && React.createElement(
            'span',
            {
              className    : 'material-symbols-rounded',
              'aria-hidden': 'true',
            },
            trailingIcon,
          ),
        );
      }

      Object.assign(
        __ds_scope, {
          Button 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/forms/Button.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/forms/Checkbox.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /** Checkbox with label. */
      function Checkbox( {
        checked,
        onChange,
        label,
        disabled = false,
        className = '',
        ...rest
      } ) {
        return /*#__PURE__*/ React.createElement(
          'label',
          {
            className: [
              'aj-check',
              className
            ].filter( Boolean )
              .join( ' ' ),
          },
          /*#__PURE__*/ React.createElement(
            'input',
            _extends(
              {
                type    : 'checkbox',
                checked : checked,
                onChange: onChange,
                disabled: disabled,
              },
              rest,
            ),
          ),
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className: 'aj-check__box',
            },
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className    : 'material-symbols-rounded',
                'aria-hidden': 'true',
              },
              'check',
            ),
          ),
          label && /*#__PURE__*/ React.createElement(
            'span', null, label 
          ),
        );
      }

      Object.assign(
        __ds_scope, {
          Checkbox 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/forms/Checkbox.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/forms/IconButton.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /**
       * IconButton — circular icon-only action.
       * Variants: standard, filled, tonal, outlined.
       */
      function IconButton( {
        icon,
        variant = 'standard',
        size = 'md',
        className = '',
        'aria-label': ariaLabel,
        ...rest
      } ) {
        const cls = [
          'aj-iconbtn',
          variant !== 'standard'
            ? `aj-iconbtn--${ variant }`
            : '',
          size === 'sm'
            ? 'aj-iconbtn--sm'
            : '',
          className,
        ]
          .filter( Boolean )
          .join( ' ' );

        return /*#__PURE__*/ React.createElement(
          'button',
          _extends(
            {
              type        : 'button',
              className   : cls,
              'aria-label': ariaLabel,
            },
            rest,
          ),
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className    : 'material-symbols-rounded',
              'aria-hidden': 'true',
            },
            icon,
          ),
        );
      }

      Object.assign(
        __ds_scope, {
          IconButton 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/forms/IconButton.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/forms/Select.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /**
       * Select — outlined native dropdown.
       */
      function Select( {
        label,
        value,
        onChange,
        options = [],
        disabled = false,
        block = false,
        className = '',
        id,
        ...rest
      } ) {
        const wrap = [
          'aj-field',
          block
            ? 'aj-field--block'
            : '',
          className
        ]
          .filter( Boolean )
          .join( ' ' );

        return /*#__PURE__*/ React.createElement(
          'label',
          {
            className: wrap,
            htmlFor  : id,
          },
          label
          /*#__PURE__*/ && React.createElement(
            'span',
            {
              className: 'aj-field__label',
            },
            label,
          ),
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className: 'aj-select',
              style    : block
                ? {
                    width: '100%',
                  }
                : undefined,
            },
            /*#__PURE__*/ React.createElement(
              'select',
              _extends(
                {
                  id      : id,
                  value   : value,
                  onChange: onChange,
                  disabled: disabled,
                },
                rest,
              ),
              options.map( ( o ) => {
                const opt
                  = typeof o === 'string'
                    ? {
                        value: o,
                        label: o,
                      }
                    : o;

                return /*#__PURE__*/ React.createElement(
                  'option',
                  {
                    key  : opt.value,
                    value: opt.value,
                  },
                  opt.label,
                );
              } ),
            ),
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className    : 'aj-select__chevron material-symbols-rounded',
                'aria-hidden': 'true',
              },
              'expand_more',
            ),
          ),
        );
      }

      Object.assign(
        __ds_scope, {
          Select 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/forms/Select.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/forms/Switch.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /** Switch — on/off toggle. */
      function Switch( {
        checked,
        onChange,
        label,
        disabled = false,
        className = '',
        ...rest
      } ) {
        return /*#__PURE__*/ React.createElement(
          'label',
          {
            className: [
              'aj-switch',
              className
            ].filter( Boolean )
              .join( ' ' ),
            style: label
              ? {
                  gap: 'var(--space-3)',
                }
              : undefined,
          },
          /*#__PURE__*/ React.createElement(
            'input',
            _extends(
              {
                type    : 'checkbox',
                role    : 'switch',
                checked : checked,
                onChange: onChange,
                disabled: disabled,
              },
              rest,
            ),
          ),
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className: 'aj-switch__track',
            },
            /*#__PURE__*/ React.createElement(
              'span', {
                className: 'aj-switch__thumb',
              } 
            ),
          ),
          label
          /*#__PURE__*/ && React.createElement(
            'span',
            {
              style: {
                font : 'var(--type-body-md)',
                color: 'var(--md-on-surface)',
              },
            },
            label,
          ),
        );
      }

      Object.assign(
        __ds_scope, {
          Switch 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/forms/Switch.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/forms/TextField.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /**
       * TextField — labelled text input with optional icons, helper/error text.
       */
      function TextField( {
        label,
        value,
        onChange,
        placeholder,
        leadingIcon,
        trailingIcon,
        helperText,
        error = false,
        mono = false,
        disabled = false,
        block = false,
        type = 'text',
        className = '',
        id,
        ...rest
      } ) {
        const cls = [
          'aj-field',
          block
            ? 'aj-field--block'
            : '',
          mono
            ? 'aj-field--mono'
            : '',
          error
            ? 'aj-field--error'
            : '',
          disabled
            ? 'aj-field--disabled'
            : '',
          className,
        ]
          .filter( Boolean )
          .join( ' ' );

        return /*#__PURE__*/ React.createElement(
          'label',
          {
            className: cls,
            htmlFor  : id,
          },
          label
          /*#__PURE__*/ && React.createElement(
            'span',
            {
              className: 'aj-field__label',
            },
            label,
          ),
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className: 'aj-field__box',
            },
            leadingIcon
            /*#__PURE__*/ && React.createElement(
              'span',
              {
                className    : 'material-symbols-rounded',
                'aria-hidden': 'true',
              },
              leadingIcon,
            ),
            /*#__PURE__*/ React.createElement(
              'input',
              _extends(
                {
                  id         : id,
                  className  : 'aj-field__input',
                  type       : type,
                  value      : value,
                  onChange   : onChange,
                  placeholder: placeholder,
                  disabled   : disabled,
                },
                rest,
              ),
            ),
            trailingIcon
            /*#__PURE__*/ && React.createElement(
              'span',
              {
                className    : 'material-symbols-rounded',
                'aria-hidden': 'true',
              },
              trailingIcon,
            ),
          ),
          helperText
          /*#__PURE__*/ && React.createElement(
            'span',
            {
              className: 'aj-field__help',
            },
            helperText,
          ),
        );
      }

      Object.assign(
        __ds_scope, {
          TextField 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/forms/TextField.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // components/navigation/Tabs.jsx
  try {
    ( () => {
      function _extends() {
        return (
          ( _extends = Object.assign
            ? Object.assign.bind()
            : function ( n ) {
              for ( var e = 1; e < arguments.length; e++ ) {
                var t = arguments[ e ];

                for ( var r in t ) {
                  ( {} ).hasOwnProperty.call(
                    t, r 
                  ) && ( n[ r ] = t[ r ] );
                }
              }

              return n;
            } ),
          _extends.apply(
            null, arguments 
          )
        );
      }

      /** Tabs — horizontal segmented navigation. */
      function Tabs( {
        tabs = [], value, onChange, className = '', ...rest 
      } ) {
        return /*#__PURE__*/ React.createElement(
          'div',
          _extends(
            {
              className: [
                'aj-tabs',
                className
              ].filter( Boolean )
                .join( ' ' ),
              role: 'tablist',
            },
            rest,
          ),
          tabs.map( ( t ) => {
            const tab
              = typeof t === 'string'
                ? {
                    value: t,
                    label: t,
                  }
                : t;
            const active = tab.value === value;

            return /*#__PURE__*/ React.createElement(
              'button',
              {
                key            : tab.value,
                role           : 'tab',
                'aria-selected': active,
                className      : [
                  'aj-tab',
                  active
                    ? 'aj-tab--active'
                    : ''
                ]
                  .filter( Boolean )
                  .join( ' ' ),
                onClick: () => {
                  return onChange && onChange( tab.value );
                },
              },
              tab.icon
              /*#__PURE__*/ && React.createElement(
                'span',
                {
                  className    : 'material-symbols-rounded',
                  'aria-hidden': 'true',
                },
                tab.icon,
              ),
              tab.label,
              typeof tab.count === 'number'
              /*#__PURE__*/ && React.createElement(
                'span',
                {
                  className: 'aj-tab__count',
                },
                tab.count,
              ),
            );
          } ),
        );
      }

      Object.assign(
        __ds_scope, {
          Tabs 
        } 
      );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'components/navigation/Tabs.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // ui_kits/asesor/App.jsx
  try {
    ( () => {
      // App — orchestrates auth, navigation, and the carpetas → detail flow.
      function App() {
        const D = window.AJ_DATA;
        const [
          authed,
          setAuthed
        ] = React.useState( true );
        const [
          nav,
          setNav
        ] = React.useState( 'carpetas' );
        const [
          catFilter,
          setCatFilter
        ] = React.useState( 'todos' );
        const [
          search,
          setSearch
        ] = React.useState( '' );
        const [
          selected,
          setSelected
        ] = React.useState( null );
        const counts = React.useMemo(
          () => {
            const c = {
              todos: D.carpetas.length,
            };
            D.categories.forEach( ( cat ) => {
              if ( cat.key === 'todos' ) {
                return;
              }

              c[ cat.key ] = D.carpetas.filter( ( x ) => {
                return x.category === cat.key;
              }, ).length;
            } );

            return c;
          }, [] 
        );

        function handleNav(
          key, cat 
        ) {
          if ( key === 'logout' ) {
            setAuthed( false );

            return;
          }

          setSelected( null );
          setNav( key );

          if ( cat ) {
            setCatFilter( cat );
          }
        }

        if ( !authed ) {
          return /*#__PURE__*/ React.createElement(
            LoginView, {
              onLogin: () => {
                return setAuthed( true );
              },
            } 
          );
        }

        const titles = {
          carpetas: {
            t: 'Carpetas',
            s: `${ D.carpetas.length } procesos · ${ D.carpetas.filter( ( c ) => {
              return c.vencido;
            } ).length } requieren atención`,
          },
          agenda: {
            t: 'Agenda',
            s: 'Tareas y fechas relevantes',
          },
          facturas: {
            t: 'Facturación',
            s: 'Facturas electrónicas emitidas',
          },
          juzgados: {
            t: 'Juzgados',
            s: 'Despachos vinculados',
          },
        };
        const head = titles[ nav ] || titles.carpetas;

        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'aj-app',
          },
          /*#__PURE__*/ React.createElement(
            Sidebar, {
              active: selected
                ? 'carpetas'
                : nav,
              onNav     : handleNav,
              categories: D.categories.filter( ( c ) => {
                return c.key !== 'todos';
              } ),
              counts: counts,
            } 
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-main',
            },
            /*#__PURE__*/ React.createElement(
              TopBar, {
                title: selected
                  ? 'Detalle de carpeta'
                  : head.t,
                subtitle: selected
                  ? `N.º ${ selected.numero }`
                  : head.s,
                search  : search,
                onSearch: setSearch,
              } 
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-content',
              },
              selected
                ? /*#__PURE__*/ React.createElement(
                    CarpetaDetail, {
                      carpeta: selected,
                      data   : D,
                      onBack : () => {
                        return setSelected( null );
                      },
                    } 
                  )
                : nav === 'carpetas'
                  ? /*#__PURE__*/ React.createElement(
                      CarpetasView, {
                        carpetas    : D.carpetas,
                        categories  : D.categories,
                        catFilter   : catFilter,
                        setCatFilter: setCatFilter,
                        search      : search,
                        onOpen      : setSelected,
                      } 
                    )
                  : /*#__PURE__*/ React.createElement(
                      Placeholder, {
                        nav: nav,
                      } 
                    ),
            ),
          ),
        );
      }

      function Placeholder( {
        nav 
      } ) {
        const map = {
          agenda: {
            icon : 'event',
            title: 'Agenda',
            text : 'Vista de calendario con tareas y fechas relevantes de cada carpeta.',
          },
          facturas: {
            icon : 'receipt_long',
            title: 'Facturación',
            text : 'Listado de facturas electrónicas y emisores. (Demostración)',
          },
          juzgados: {
            icon : 'account_balance',
            title: 'Juzgados',
            text : 'Directorio de despachos vinculados a los procesos.',
          },
        };
        const m = map[ nav ] || map.agenda;

        return /*#__PURE__*/ React.createElement(
          'div',
          {
            style: {
              display       : 'flex',
              flexDirection : 'column',
              alignItems    : 'center',
              justifyContent: 'center',
              height        : '60vh',
              color         : 'var(--md-on-surface-variant)',
              gap           : '12px',
              textAlign     : 'center',
            },
          },
          /*#__PURE__*/ React.createElement(
            'span',
            {
              className: 'material-symbols-rounded',
              style    : {
                fontSize: 56,
                color   : 'var(--md-outline)',
              },
            },
            m.icon,
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              style: {
                font : 'var(--type-headline-sm)',
                color: 'var(--md-on-surface)',
              },
            },
            m.title,
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              style: {
                font    : 'var(--type-body-md)',
                maxWidth: '34ch',
              },
            },
            m.text,
          ),
        );
      }

      ReactDOM.createRoot( document.getElementById( 'root' ) )
        .render(
        /*#__PURE__*/ React.createElement(
            App, null 
          ), );
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'ui_kits/asesor/App.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // ui_kits/asesor/CarpetaDetail.jsx
  try {
    ( () => {
      // CarpetaDetail — full case file with tabbed sections.
      function CarpetaDetail( {
        carpeta, data, onBack 
      } ) {
        const {
          fmtCOP, fmtDate, tipoLabel, catMeta 
        } = window.AJ;
        const [
          tab,
          setTab
        ] = React.useState( 'resumen' );
        const cat = catMeta[ carpeta.category ] || {
          label: carpeta.category,
          color: 'var(--md-outline)',
        };
        const tabs = [
          {
            value: 'resumen',
            label: 'Resumen',
            icon : 'description',
          },
          {
            value: 'demanda',
            label: 'Demanda',
            icon : 'gavel',
          },
          {
            value: 'deudor',
            label: 'Deudor',
            icon : 'person',
          },
          {
            value: 'actuaciones',
            label: 'Actuaciones',
            icon : 'history',
            count: data.actuaciones.length,
          },
          {
            value: 'facturas',
            label: 'Facturas',
            icon : 'receipt_long',
            count: data.facturas.length,
          },
          {
            value: 'tareas',
            label: 'Tareas',
            icon : 'check_circle',
            count: data.tareas.filter( ( t ) => {
              return !t.done;
            } ).length,
          },
        ];

        const kv = (
          k, v, mono 
        ) =>
        /*#__PURE__*/ {
          return React.createElement(
            'div',
            {
              className: 'aj-kv__item',
            },
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'aj-kv__k',
              },
              k,
            ),
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'aj-kv__v' + ( mono
                  ? ' mono'
                  : '' ),
              },
              v,
            ),
          );
        };

        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'aj-detail',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-detail__head',
            },
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'aj-detail__back',
              },
              /*#__PURE__*/ React.createElement(
                IconButton, {
                  icon        : 'arrow_back',
                  variant     : 'standard',
                  'aria-label': 'Volver',
                  onClick     : onBack,
                } 
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-detail__titles',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'aj-detail__eyebrow',
                },
                'Carpeta N.\xBA ',
                carpeta.numero,
                ' \xB7 ',
                carpeta.radicado,
              ),
              /*#__PURE__*/ React.createElement(
                'h1',
                {
                  className: 'aj-detail__title',
                },
                carpeta.nombre,
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'aj-detail__chips',
                },
                /*#__PURE__*/ React.createElement(
                  StatusChip, {
                    status: carpeta.status,
                  } 
                ),
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'aj-cat-dot',
                    style    : {
                      font: 'var(--type-label-md)',
                    },
                  },
                  /*#__PURE__*/ React.createElement(
                    'span', {
                      className: 'd',
                      style    : {
                        background: cat.color,
                      },
                    } 
                  ),
                  cat.label,
                ),
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'aj-cat-dot',
                    style    : {
                      font: 'var(--type-label-md)',
                    },
                  },
                  tipoLabel[ carpeta.tipoProceso ],
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              Button,
              {
                variant: 'tonal',
                icon   : 'edit',
              },
              'Editar',
            ),
          ),
          /*#__PURE__*/ React.createElement(
            Tabs, {
              value   : tab,
              onChange: setTab,
              tabs    : tabs,
            } 
          ),
          tab === 'resumen'
          /*#__PURE__*/ && React.createElement(
            'div',
            {
              className: 'aj-detail__grid',
            },
            /*#__PURE__*/ React.createElement(
              Card,
              {
                variant: 'outlined',
                padded : true,
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'aj-panel-title',
                },
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'material-symbols-rounded',
                  },
                  'account_balance',
                ),
                'Informaci\xF3n del proceso',
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'aj-kv',
                },
                kv(
                  'Juzgado', carpeta.juzgado 
                ),
                kv(
                  'Ciudad', carpeta.ciudad 
                ),
                kv(
                  'Etapa procesal', carpeta.etapa 
                ),
                kv(
                  'Tipo de proceso', tipoLabel[ carpeta.tipoProceso ] 
                ),
                kv(
                  'Capital adeudado', fmtCOP( carpeta.capital ), true 
                ),
                kv(
                  'Avalúo',
                  carpeta.avaluo
                    ? fmtCOP( carpeta.avaluo )
                    : '—',
                  true,
                ),
                kv(
                  'Última actuación', carpeta.ultimaActuacion 
                ),
                kv(
                  'Fecha', fmtDate( carpeta.fechaUltimaAct ), true 
                ),
              ),
            ),
            /*#__PURE__*/ React.createElement(
              Card,
              {
                variant: 'filled',
                padded : true,
              },
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  className: 'aj-panel-title',
                },
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'material-symbols-rounded',
                  },
                  'person',
                ),
                'Deudor',
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  style: {
                    display     : 'flex',
                    alignItems  : 'center',
                    gap         : 'var(--space-3)',
                    marginBottom: 'var(--space-4)',
                  },
                },
                /*#__PURE__*/ React.createElement(
                  Avatar, {
                    name: carpeta.deudor.nombre,
                    size: 'lg',
                  } 
                ),
                /*#__PURE__*/ React.createElement(
                  'div',
                  null,
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      style: {
                        font: 'var(--type-title-md)',
                      },
                    },
                    carpeta.deudor.nombre,
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      style: {
                        font : 'var(--type-body-sm)',
                        color: 'var(--md-on-surface-variant)',
                      },
                    },
                    'C.C. ',
                    carpeta.deudor.cedula,
                  ),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  style: {
                    display      : 'flex',
                    flexDirection: 'column',
                    gap          : 'var(--space-3)',
                  },
                },
                kv(
                  'Teléfono', carpeta.deudor.tel, true 
                ),
                kv(
                  'Correo', carpeta.deudor.email 
                ),
                kv(
                  'Ciudad', carpeta.deudor.ciudad 
                ),
              ),
            ),
          ),
          tab === 'deudor'
          /*#__PURE__*/ && React.createElement(
            Card,
            {
              variant: 'outlined',
              padded : true,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-panel-title',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'material-symbols-rounded',
                },
                'person',
              ),
              'Datos del deudor',
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-kv',
              },
              kv(
                'Nombre completo', carpeta.deudor.nombre 
              ),
              kv(
                'Cédula', carpeta.deudor.cedula, true 
              ),
              kv(
                'Teléfono', carpeta.deudor.tel, true 
              ),
              kv(
                'Correo electrónico', carpeta.deudor.email 
              ),
              kv(
                'Ciudad', carpeta.deudor.ciudad 
              ),
            ),
          ),
          tab === 'demanda'
          /*#__PURE__*/ && React.createElement(
            Card,
            {
              variant: 'outlined',
              padded : true,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-panel-title',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'material-symbols-rounded',
                },
                'gavel',
              ),
              'Demanda',
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-kv',
              },
              kv(
                'Radicado', carpeta.radicado, true 
              ),
              kv(
                'Despacho', carpeta.juzgado 
              ),
              kv(
                'Etapa procesal', carpeta.etapa 
              ),
              kv(
                'Tipo de proceso', tipoLabel[ carpeta.tipoProceso ] 
              ),
              kv(
                'Capital adeudado', fmtCOP( carpeta.capital ), true 
              ),
              kv(
                'Avalúo',
                carpeta.avaluo
                  ? fmtCOP( carpeta.avaluo )
                  : '—',
                true,
              ),
            ),
          ),
          tab === 'actuaciones'
          /*#__PURE__*/ && React.createElement(
            Card,
            {
              variant: 'outlined',
              padded : true,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-panel-title',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'material-symbols-rounded',
                },
                'history',
              ),
              'Actuaciones procesales',
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-timeline',
              },
              data.actuaciones.map( (
                a, i 
              ) =>
              /*#__PURE__*/ {
                return React.createElement(
                  'div',
                  {
                    className: 'aj-tl-item',
                    key      : i,
                  },
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'aj-tl-rail',
                    },
                    /*#__PURE__*/ React.createElement(
                      'span', {
                        className: 'aj-tl-dot',
                      } 
                    ),
                    /*#__PURE__*/ React.createElement(
                      'span', {
                        className: 'aj-tl-line',
                      } 
                    ),
                  ),
                  /*#__PURE__*/ React.createElement(
                    'div',
                    {
                      className: 'aj-tl-body',
                    },
                    /*#__PURE__*/ React.createElement(
                      'span',
                      {
                        className: 'aj-tl-date',
                      },
                      fmtDate( a.fecha ),
                      a.conDocumentos && ' · con documentos',
                    ),
                    /*#__PURE__*/ React.createElement(
                      'span',
                      {
                        className: 'aj-tl-act',
                      },
                      a.actuacion,
                    ),
                    /*#__PURE__*/ React.createElement(
                      'span',
                      {
                        className: 'aj-tl-note',
                      },
                      a.anotacion,
                    ),
                  ),
                );
              }, ),
            ),
          ),
          tab === 'facturas'
          /*#__PURE__*/ && React.createElement(
            Card,
            {
              variant: 'outlined',
              padded : true,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-panel-title',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'material-symbols-rounded',
                },
                'receipt_long',
              ),
              'Facturaci\xF3n',
            ),
            data.facturas.map( ( f ) =>
            /*#__PURE__*/ {
              return React.createElement(
                'div',
                {
                  className: 'aj-frow',
                  key      : f.id,
                },
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'aj-frow__id',
                  },
                  f.id,
                ),
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'aj-frow__desc',
                  },
                  f.razonSocial,
                ),
                /*#__PURE__*/ React.createElement(
                  StatusChip, {
                    status: f.estado === 'Pagada'
                      ? 'done'
                      : 'review',
                    label: f.estado,
                  } 
                ),
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'aj-frow__amt',
                  },
                  fmtCOP( f.valorTotal ),
                ),
              );
            }, ),
          ),
          tab === 'tareas'
          /*#__PURE__*/ && React.createElement(
            Card,
            {
              variant: 'outlined',
              padded : true,
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-panel-title',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'material-symbols-rounded',
                },
                'check_circle',
              ),
              'Tareas pendientes',
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-tasklist',
              },
              data.tareas.map( (
                t, i 
              ) => {
                const over
                  = !t.done && new Date( t.dueDate ) < new Date( '2026-06-18' );

                return /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'aj-task',
                    key      : i,
                  },
                  /*#__PURE__*/ React.createElement(
                    Checkbox, {
                      checked : t.done,
                      onChange: () => {},
                    } 
                  ),
                  /*#__PURE__*/ React.createElement(
                    'span',
                    {
                      className: 'aj-task__text' + ( t.done
                        ? ' done'
                        : '' ),
                    },
                    t.text,
                  ),
                  /*#__PURE__*/ React.createElement(
                    'span',
                    {
                      className: 'aj-task__due' + ( over
                        ? ' over'
                        : '' ),
                    },
                    fmtDate( t.dueDate ),
                  ),
                );
              } ),
            ),
          ),
        );
      }

      window.CarpetaDetail = CarpetaDetail;
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'ui_kits/asesor/CarpetaDetail.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // ui_kits/asesor/CarpetasView.jsx
  try {
    ( () => {
      // CarpetasView — KPI stats + filterable case table (the dashboard home).
      function CarpetasView( {
        carpetas,
        categories,
        catFilter,
        setCatFilter,
        search,
        onOpen,
      } ) {
        const {
          fmtCOP, catMeta, tipoLabel 
        } = window.AJ;
        const filtered = carpetas.filter( ( c ) => {
          const matchesCat = catFilter === 'todos' || c.category === catFilter;
          const q = ( search || '' ).toLowerCase();
          const matchesQ
            = !q
            || c.nombre.toLowerCase()
              .includes( q )
            || String( c.numero )
              .includes( q )
            || c.radicado.toLowerCase()
              .includes( q );

          return matchesCat && matchesQ;
        } );
        const totalCapital = carpetas.reduce(
          (
            s, c 
          ) => {
            return s + ( c.terminado
              ? 0
              : c.capital );
          },
          0,
        );
        const activos = carpetas.filter( ( c ) => {
          return !c.terminado;
        } ).length;
        const vencidos = carpetas.filter( ( c ) => {
          return c.vencido;
        } ).length;
        const porRevisar = carpetas.filter( ( c ) => {
          return !c.revisado && !c.terminado;
        }, ).length;
        const stats = [
          {
            label: 'Carpetas activas',
            value: activos,
            sub  : `${ carpetas.length } en total`,
            icon : 'folder_open',
            fg   : 'var(--md-on-primary-container)',
            bg   : 'var(--md-primary-container)',
          },
          {
            label: 'Capital en gestión',
            value: fmtCOPshort( totalCapital ),
            money: true,
            sub  : 'Suma de procesos activos',
            icon : 'payments',
            fg   : 'var(--md-on-tertiary-container)',
            bg   : 'var(--md-tertiary-container)',
          },
          {
            label: 'Por revisar',
            value: porRevisar,
            sub  : 'Sin revisión reciente',
            icon : 'rate_review',
            fg   : '#5C3D00',
            bg   : 'var(--status-review-container)',
          },
          {
            label: 'Vencidos',
            value: vencidos,
            sub  : 'Requieren atención',
            icon : 'warning',
            fg   : 'var(--red-10)',
            bg   : 'var(--status-overdue-container)',
          },
        ];

        function fmtCOPshort( n ) {
          if ( n >= 1e9 ) {
            return '$ ' + ( n / 1e9 ).toFixed( 1 )
              .replace(
                '.', ',' 
              ) + ' MM';
          }

          if ( n >= 1e6 ) {
            return '$ ' + ( n / 1e6 ).toFixed( 0 ) + ' M';
          }

          return fmtCOP( n );
        }

        return /*#__PURE__*/ React.createElement(
          'div',
          null,
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-stats',
            },
            stats.map( ( s ) =>
            /*#__PURE__*/ {
              return React.createElement(
                Card,
                {
                  key      : s.label,
                  variant  : 'elevated',
                  className: 'aj-stat',
                },
                /*#__PURE__*/ React.createElement(
                  'div',
                  {
                    className: 'aj-stat__top',
                  },
                  /*#__PURE__*/ React.createElement(
                    'span',
                    {
                      className: 'aj-stat__label',
                    },
                    s.label,
                  ),
                  /*#__PURE__*/ React.createElement(
                    'span',
                    {
                      className: 'aj-stat__icon',
                      style    : {
                        background: s.bg,
                        color     : s.fg,
                      },
                    },
                    /*#__PURE__*/ React.createElement(
                      'span',
                      {
                        className: 'material-symbols-rounded',
                      },
                      s.icon,
                    ),
                  ),
                ),
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'aj-stat__value' + ( s.money
                      ? ' money'
                      : '' ),
                  },
                  s.value,
                ),
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className: 'aj-stat__sub',
                  },
                  s.sub,
                ),
              );
            }, ),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-filters',
            },
            categories.map( ( c ) =>
            /*#__PURE__*/ {
              return React.createElement(
                Chip, {
                  key     : c.key,
                  label   : c.label,
                  selected: catFilter === c.key,
                  onClick : () => {
                    return setCatFilter( c.key );
                  },
                } 
              );
            }, ),
            /*#__PURE__*/ React.createElement(
              'span', {
                className: 'aj-filters__spacer',
              } 
            ),
            /*#__PURE__*/ React.createElement(
              Button,
              {
                variant: 'outlined',
                icon   : 'download',
              },
              'Exportar',
            ),
          ),
          /*#__PURE__*/ React.createElement(
            Card,
            {
              variant: 'outlined',
            },
            /*#__PURE__*/ React.createElement(
              'table',
              {
                className: 'aj-table',
              },
              /*#__PURE__*/ React.createElement(
                'thead',
                null,
                /*#__PURE__*/ React.createElement(
                  'tr',
                  null,
                  /*#__PURE__*/ React.createElement(
                    'th', null, 'N.\xBA' 
                  ),
                  /*#__PURE__*/ React.createElement(
                    'th', null, 'Carpeta' 
                  ),
                  /*#__PURE__*/ React.createElement(
                    'th', null, 'Categor\xEDa' 
                  ),
                  /*#__PURE__*/ React.createElement(
                    'th',
                    null,
                    'Etapa procesal',
                  ),
                  /*#__PURE__*/ React.createElement(
                    'th', null, 'Capital' 
                  ),
                  /*#__PURE__*/ React.createElement(
                    'th', null, 'Estado' 
                  ),
                  /*#__PURE__*/ React.createElement(
                    'th', null 
                  ),
                ),
              ),
              /*#__PURE__*/ React.createElement(
                'tbody',
                null,
                filtered.map( ( c ) => {
                  const cat = catMeta[ c.category ] || {
                    label: c.category,
                    color: 'var(--md-outline)',
                  };

                  return /*#__PURE__*/ React.createElement(
                    'tr',
                    {
                      key    : c.numero,
                      onClick: () => {
                        return onOpen( c );
                      },
                    },
                    /*#__PURE__*/ React.createElement(
                      'td',
                      {
                        className: 'num',
                      },
                      c.numero,
                    ),
                    /*#__PURE__*/ React.createElement(
                      'td',
                      null,
                      /*#__PURE__*/ React.createElement(
                        'div',
                        {
                          className: 'aj-cell-case',
                        },
                        /*#__PURE__*/ React.createElement(
                          'span',
                          {
                            className: 'name',
                          },
                          c.nombre,
                        ),
                        /*#__PURE__*/ React.createElement(
                          'span',
                          {
                            className: 'meta',
                          },
                          tipoLabel[ c.tipoProceso ],
                          ' \xB7 ',
                          c.juzgado,
                        ),
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'td',
                      null,
                      /*#__PURE__*/ React.createElement(
                        'span',
                        {
                          className: 'aj-cat-dot',
                        },
                        /*#__PURE__*/ React.createElement(
                          'span', {
                            className: 'd',
                            style    : {
                              background: cat.color,
                            },
                          } 
                        ),
                        cat.label,
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'td', null, c.etapa 
                    ),
                    /*#__PURE__*/ React.createElement(
                      'td',
                      null,
                      /*#__PURE__*/ React.createElement(
                        'span',
                        {
                          className: 'aj-money',
                        },
                        c.capital
                          ? fmtCOP( c.capital )
                          : '—',
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'td',
                      null,
                      /*#__PURE__*/ React.createElement(
                        StatusChip, {
                          status: c.status,
                        } 
                      ),
                    ),
                    /*#__PURE__*/ React.createElement(
                      'td',
                      null,
                      /*#__PURE__*/ React.createElement(
                        IconButton, {
                          icon        : 'chevron_right',
                          size        : 'sm',
                          'aria-label': 'Abrir',
                        } 
                      ),
                    ),
                  );
                } ),
              ),
            ),
          ),
        );
      }

      window.CarpetasView = CarpetasView;
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'ui_kits/asesor/CarpetasView.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // ui_kits/asesor/LoginView.jsx
  try {
    ( () => {
      // LoginView — branded split sign-in screen.
      function LoginView( {
        onLogin 
      } ) {
        const [
          email,
          setEmail
        ] = React.useState( 'carlos.vega@bufete.co' );
        const [
          pass,
          setPass
        ] = React.useState( '••••••••' );

        return /*#__PURE__*/ React.createElement(
          'div',
          {
            className: 'aj-login',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-login__brand',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-login__mark',
              },
              /*#__PURE__*/ React.createElement(
                'img', {
                  src: '../../assets/logo-mark.png',
                  alt: '',
                } 
              ),
              /*#__PURE__*/ React.createElement(
                'span',
                null,
                'Asesor Jur\xEDdico',
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-login__pitch',
              },
              /*#__PURE__*/ React.createElement(
                'h2',
                null,
                'Gestione cada proceso en un solo lugar.',
              ),
              /*#__PURE__*/ React.createElement(
                'p',
                null,
                'Carpetas, demandas, actuaciones y facturaci\xF3n \u2014 sincronizadas con los juzgados.',
              ),
            ),
            /*#__PURE__*/ React.createElement(
              'span',
              {
                className: 'aj-login__foot',
              },
              '\xA9 2026 Asesor Jur\xEDdico \xB7 Bogot\xE1, Colombia',
            ),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-login__form',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-login__card',
              },
              /*#__PURE__*/ React.createElement(
                'h3',
                null,
                'Iniciar sesi\xF3n',
              ),
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'sub',
                },
                'Acceda a su tablero de procesos',
              ),
              /*#__PURE__*/ React.createElement(
                TextField, {
                  block      : true,
                  label      : 'Correo',
                  leadingIcon: 'mail',
                  value      : email,
                  onChange   : ( e ) => {
                    return setEmail( e.target.value );
                  },
                } 
              ),
              /*#__PURE__*/ React.createElement(
                TextField, {
                  block      : true,
                  label      : 'Contrase\xF1a',
                  leadingIcon: 'lock',
                  type       : 'password',
                  value      : pass,
                  onChange   : ( e ) => {
                    return setPass( e.target.value );
                  },
                } 
              ),
              /*#__PURE__*/ React.createElement(
                'div',
                {
                  style: {
                    display       : 'flex',
                    alignItems    : 'center',
                    justifyContent: 'space-between',
                  },
                },
                /*#__PURE__*/ React.createElement(
                  Checkbox, {
                    label   : 'Recordarme',
                    checked : true,
                    onChange: () => {},
                  } 
                ),
                /*#__PURE__*/ React.createElement(
                  'a',
                  {
                    href : '#',
                    style: {
                      font: 'var(--type-label-lg)',
                    },
                  },
                  '\xBFOlvid\xF3 su contrase\xF1a?',
                ),
              ),
              /*#__PURE__*/ React.createElement(
                Button,
                {
                  variant     : 'filled',
                  size        : 'lg',
                  trailingIcon: 'arrow_forward',
                  onClick     : onLogin,
                },
                'Ingresar',
              ),
            ),
          ),
        );
      }

      window.LoginView = LoginView;
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'ui_kits/asesor/LoginView.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // ui_kits/asesor/Sidebar.jsx
  try {
    ( () => {
      // Sidebar — primary navigation rail for Asesor Jurídico.
      function Sidebar( {
        active, onNav, categories, counts 
      } ) {
        const navMain = [
          {
            key  : 'carpetas',
            label: 'Carpetas',
            icon : 'folder',
          },
          {
            key  : 'agenda',
            label: 'Agenda',
            icon : 'event',
          },
          {
            key  : 'facturas',
            label: 'Facturación',
            icon : 'receipt_long',
          },
          {
            key  : 'juzgados',
            label: 'Juzgados',
            icon : 'account_balance',
          },
        ];

        return /*#__PURE__*/ React.createElement(
          'aside',
          {
            className: 'aj-sidebar',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-sidebar__brand',
            },
            /*#__PURE__*/ React.createElement(
              'img', {
                src   : '../../assets/logo-mark.png',
                alt   : '',
                width : '36',
                height: '36',
              } 
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-sidebar__wm',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'a',
                },
                'Asesor',
              ),
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'b',
                },
                'Jur\xEDdico',
              ),
            ),
          ),
          /*#__PURE__*/ React.createElement(
            'nav',
            {
              className: 'aj-sidebar__nav',
            },
            navMain.map( ( n ) =>
            /*#__PURE__*/ {
              return React.createElement(
                'button',
                {
                  key: n.key,
                  className:
                    'aj-navitem'
                    + ( active === n.key
                      ? ' aj-navitem--active'
                      : '' ),
                  onClick: () => {
                    return onNav( n.key );
                  },
                },
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className    : 'material-symbols-rounded',
                    'aria-hidden': 'true',
                  },
                  n.icon,
                ),
                n.label,
              );
            }, ),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-sidebar__section',
            },
            'Categor\xEDas',
          ),
          /*#__PURE__*/ React.createElement(
            'nav',
            {
              className: 'aj-sidebar__nav',
            },
            categories.map( ( c ) =>
            /*#__PURE__*/ {
              return React.createElement(
                'button',
                {
                  key      : c.key,
                  className: 'aj-navitem aj-navitem--sub',
                  onClick  : () => {
                    return onNav(
                      'carpetas', c.key 
                    );
                  },
                },
                /*#__PURE__*/ React.createElement(
                  'span',
                  {
                    className    : 'material-symbols-rounded',
                    'aria-hidden': 'true',
                  },
                  c.icon,
                ),
                c.label,
                counts[ c.key ] != null
                /*#__PURE__*/ && React.createElement(
                  'span',
                  {
                    className: 'aj-navitem__count',
                  },
                  counts[ c.key ],
                ),
              );
            }, ),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-sidebar__user',
            },
            /*#__PURE__*/ React.createElement(
              Avatar, {
                name: 'Carlos Vega',
                size: 'sm',
              } 
            ),
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-sidebar__userinfo',
              },
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'n',
                },
                'Carlos Vega',
              ),
              /*#__PURE__*/ React.createElement(
                'span',
                {
                  className: 'r',
                },
                'Abogado titular',
              ),
            ),
            /*#__PURE__*/ React.createElement(
              IconButton, {
                icon        : 'logout',
                'aria-label': 'Salir',
                onClick     : () => {
                  return onNav( 'logout' );
                },
              } 
            ),
          ),
        );
      }

      window.Sidebar = Sidebar;
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'ui_kits/asesor/Sidebar.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // ui_kits/asesor/TopBar.jsx
  try {
    ( () => {
      // TopBar — page header with search and quick actions.
      function TopBar( {
        title, subtitle, onSearch, search 
      } ) {
        return /*#__PURE__*/ React.createElement(
          'header',
          {
            className: 'aj-topbar',
          },
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-topbar__titles',
            },
            /*#__PURE__*/ React.createElement(
              'h1',
              {
                className: 'aj-topbar__title',
              },
              title,
            ),
            subtitle
            /*#__PURE__*/ && React.createElement(
              'span',
              {
                className: 'aj-topbar__subtitle',
              },
              subtitle,
            ),
          ),
          /*#__PURE__*/ React.createElement(
            'div',
            {
              className: 'aj-topbar__actions',
            },
            /*#__PURE__*/ React.createElement(
              'div',
              {
                className: 'aj-topbar__search',
              },
              /*#__PURE__*/ React.createElement(
                TextField, {
                  block      : true,
                  leadingIcon: 'search',
                  placeholder: 'Buscar por nombre, n\xFAmero o radicado\u2026',
                  value      : search,
                  onChange   : ( e ) => {
                    return onSearch( e.target.value );
                  },
                } 
              ),
            ),
            /*#__PURE__*/ React.createElement(
              IconButton, {
                icon        : 'notifications',
                variant     : 'standard',
                'aria-label': 'Notificaciones',
              } 
            ),
            /*#__PURE__*/ React.createElement(
              Button,
              {
                variant: 'filled',
                icon   : 'add',
              },
              'Nueva carpeta',
            ),
          ),
        );
      }

      window.TopBar = TopBar;
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'ui_kits/asesor/TopBar.jsx',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // ui_kits/asesor/data.js
  try {
    ( () => {
      // Mock data for the Asesor Jurídico UI kit — shapes mirror the Prisma schema
      // (Carpeta, Demanda, Deudor, Actuacion, Factura, Task, Nota).

      window.AJ_DATA = ( function () {
        const carpetas = [
          {
            numero         : 4821,
            nombre         : 'Banco Bancolombia S.A. c/ María Restrepo',
            category       : 'Bancolombia',
            tipoProceso    : 'HIPOTECARIO',
            status         : 'active',
            revisado       : true,
            terminado      : false,
            ciudad         : 'Bogotá',
            juzgado        : 'Juzgado 12 Civil del Circuito',
            etapa          : 'Mandamiento de pago',
            capital        : 124500000,
            avaluo         : 210000000,
            notasCount     : 7,
            tareas         : 3,
            radicado       : '11001-31-03-012-2024-00481-00',
            ultimaActuacion: 'Auto admite demanda',
            fechaUltimaAct : '2026-06-09',
            deudor         : {
              nombre: 'María Restrepo Gómez',
              cedula: '52.918.347',
              tel   : '310 845 2290',
              email : 'mrestrepo@correo.com',
              ciudad: 'Bogotá',
            },
            vencido: false,
          },
          {
            numero         : 4793,
            nombre         : 'Reintegra S.A.S. c/ Jorge Calderón',
            category       : 'Reintegra',
            tipoProceso    : 'SINGULAR',
            status         : 'overdue',
            revisado       : false,
            terminado      : false,
            ciudad         : 'Medellín',
            juzgado        : 'Juzgado 4 Civil Municipal',
            etapa          : 'Notificación',
            capital        : 8750000,
            avaluo         : 0,
            notasCount     : 2,
            tareas         : 5,
            radicado       : '05001-40-03-004-2025-00219-00',
            ultimaActuacion: 'Fija fecha audiencia',
            fechaUltimaAct : '2026-05-28',
            deudor         : {
              nombre: 'Jorge Calderón Ruiz',
              cedula: '71.402.118',
              tel   : '300 221 7754',
              email : 'jcalderon@correo.com',
              ciudad: 'Medellín',
            },
            vencido: true,
          },
          {
            numero         : 4760,
            nombre         : 'Bancolombia S.A. c/ Inversiones del Llano',
            category       : 'Bancolombia',
            tipoProceso    : 'PRENDARIO',
            status         : 'review',
            revisado       : false,
            terminado      : false,
            ciudad         : 'Villavicencio',
            juzgado        : 'Juzgado 2 Civil del Circuito',
            etapa          : 'Liquidación del crédito',
            capital        : 56200000,
            avaluo         : 98000000,
            notasCount     : 0,
            tareas         : 1,
            radicado       : '50001-31-03-002-2024-00133-00',
            ultimaActuacion: 'Aprueba liquidación',
            fechaUltimaAct : '2026-06-11',
            deudor         : {
              nombre: 'Inversiones del Llano S.A.S.',
              cedula: '900.482.112',
              tel   : '320 559 1180',
              email : 'contacto@invllano.co',
              ciudad: 'Villavicencio',
            },
            vencido: false,
          },
          {
            numero         : 4712,
            nombre         : 'Insolvencia — Pedro Naranjo',
            category       : 'Insolvencia',
            tipoProceso    : 'SINGULAR',
            status         : 'active',
            revisado       : true,
            terminado      : false,
            ciudad         : 'Bogotá',
            juzgado        : 'Centro de Conciliación',
            etapa          : 'Audiencia de negociación',
            capital        : 32100000,
            avaluo         : 0,
            notasCount     : 4,
            tareas         : 2,
            radicado       : '11001-31-99-000-2025-00077-00',
            ultimaActuacion: 'Acta de acuerdo parcial',
            fechaUltimaAct : '2026-06-02',
            deudor         : {
              nombre: 'Pedro Naranjo Vélez',
              cedula: '79.553.201',
              tel   : '315 770 4421',
              email : 'pnaranjo@correo.com',
              ciudad: 'Bogotá',
            },
            vencido: false,
          },
          {
            numero         : 4655,
            nombre         : 'Líos Jurídicos — Comercial Andina',
            category       : 'LiosJuridicos',
            tipoProceso    : 'ACUMULADO',
            status         : 'active',
            revisado       : true,
            terminado      : false,
            ciudad         : 'Barranquilla',
            juzgado        : 'Juzgado 7 Civil del Circuito',
            etapa          : 'Medidas cautelares',
            capital        : 187300000,
            avaluo         : 240000000,
            notasCount     : 12,
            tareas         : 6,
            radicado       : '08001-31-03-007-2023-00912-00',
            ultimaActuacion: 'Decreta embargo',
            fechaUltimaAct : '2026-06-14',
            deudor         : {
              nombre: 'Comercial Andina Ltda.',
              cedula: '890.901.447',
              tel   : '305 412 9087',
              email : 'juridica@comandina.co',
              ciudad: 'Barranquilla',
            },
            vencido: false,
          },
          {
            numero         : 4501,
            nombre         : 'Bancolombia S.A. c/ Luis Mejía',
            category       : 'Terminados',
            tipoProceso    : 'HIPOTECARIO',
            status         : 'done',
            revisado       : true,
            terminado      : true,
            ciudad         : 'Bogotá',
            juzgado        : 'Juzgado 18 Civil del Circuito',
            etapa          : 'Terminado por pago',
            capital        : 0,
            avaluo         : 0,
            notasCount     : 1,
            tareas         : 0,
            radicado       : '11001-31-03-018-2022-00305-00',
            ultimaActuacion: 'Auto de terminación',
            fechaUltimaAct : '2026-04-30',
            deudor         : {
              nombre: 'Luis Mejía Ospina',
              cedula: '80.114.552',
              tel   : '311 209 6633',
              email : 'lmejia@correo.com',
              ciudad: 'Bogotá',
            },
            vencido: false,
          },
        ];

        // Actuaciones timeline for the selected carpeta (most recent first)
        const actuaciones = [
          {
            fecha    : '2026-06-09',
            actuacion: 'Auto admite la demanda',
            anotacion:
              'Se admite y se ordena mandamiento de pago contra el deudor.',
            conDocumentos: true,
          },
          {
            fecha        : '2026-05-21',
            actuacion    : 'Reparto',
            anotacion    : 'Asignado al Juzgado 12 Civil del Circuito de Bogotá.',
            conDocumentos: false,
          },
          {
            fecha        : '2026-05-18',
            actuacion    : 'Presentación de la demanda',
            anotacion    : 'Radicada con anexos y poder.',
            conDocumentos: true,
          },
          {
            fecha        : '2026-05-10',
            actuacion    : 'Entrega de garantías al abogado',
            anotacion    : 'Pagaré y carta de instrucciones.',
            conDocumentos: true,
          },
        ];
        const facturas = [
          {
            id         : 'FE-2024-0192',
            fecha      : '2026-06-01',
            razonSocial: 'Honorarios profesionales',
            valorTotal : 3500000,
            hasIva     : true,
            estado     : 'Pagada',
          },
          {
            id         : 'FE-2024-0181',
            fecha      : '2026-05-12',
            razonSocial: 'Gastos de notificación',
            valorTotal : 420000,
            hasIva     : false,
            estado     : 'Pagada',
          },
          {
            id         : 'FE-2024-0170',
            fecha      : '2026-04-28',
            razonSocial: 'Honorarios — etapa inicial',
            valorTotal : 2800000,
            hasIva     : true,
            estado     : 'Pendiente',
          },
        ];
        const tareas = [
          {
            text   : 'Aportar prueba de notificación personal',
            dueDate: '2026-06-22',
            done   : false,
          },
          {
            text   : 'Solicitar avalúo del inmueble',
            dueDate: '2026-06-30',
            done   : false,
          },
          {
            text   : 'Revisar liquidación del crédito',
            dueDate: '2026-06-15',
            done   : true,
          },
        ];
        const categories = [
          {
            key  : 'todos',
            label: 'Todos',
            icon : 'inbox',
          },
          {
            key  : 'Bancolombia',
            label: 'Bancolombia',
            icon : 'account_balance',
          },
          {
            key  : 'Reintegra',
            label: 'Reintegra',
            icon : 'sync_alt',
          },
          {
            key  : 'Insolvencia',
            label: 'Insolvencia',
            icon : 'balance',
          },
          {
            key  : 'LiosJuridicos',
            label: 'Líos Jurídicos',
            icon : 'gavel',
          },
          {
            key  : 'Terminados',
            label: 'Terminados',
            icon : 'task_alt',
          },
        ];

        return {
          carpetas,
          actuaciones,
          facturas,
          tareas,
          categories,
        };
      } )();
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'ui_kits/asesor/data.js',
      error: String( ( e && e.message ) || e ),
    } );
  }

  // ui_kits/asesor/helpers.js
  try {
    ( () => {
      // Formatting + category helpers for the Asesor Jurídico UI kit.
      window.AJ = window.AJ || {};

      window.AJ.fmtCOP = function ( n ) {
        if ( n === 0 ) {
          return '$ 0';
        }

        return '$ ' + new Intl.NumberFormat( 'es-CO' )
          .format( n );
      };

      window.AJ.fmtDate = function ( iso ) {
        if ( !iso ) {
          return '—';
        }

        const d = new Date( iso + 'T00:00:00' );

        return d.toLocaleDateString(
          'es-CO', {
            day  : '2-digit',
            month: 'short',
            year : 'numeric',
          } 
        );
      };

      window.AJ.catMeta = {
        Bancolombia: {
          label: 'Bancolombia',
          color: 'var(--cat-bancolombia)',
        },
        Reintegra: {
          label: 'Reintegra',
          color: 'var(--cat-reintegra)',
        },
        Insolvencia: {
          label: 'Insolvencia',
          color: 'var(--cat-insolvencia)',
        },
        LiosJuridicos: {
          label: 'Líos Jurídicos',
          color: 'var(--cat-lios-juridicos)',
        },
        Terminados: {
          label: 'Terminados',
          color: 'var(--cat-terminados)',
        },
        SinTercero: {
          label: 'Sin Tercero',
          color: 'var(--cat-sin-tercero)',
        },
      };
      window.AJ.tipoLabel = {
        HIPOTECARIO: 'Hipotecario',
        PRENDARIO  : 'Prendario',
        SINGULAR   : 'Singular',
        ACUMULADO  : 'Acumulado',
      };
    } )();
  } catch ( e ) {
    __ds_ns.__errors.push( {
      path : 'ui_kits/asesor/helpers.js',
      error: String( ( e && e.message ) || e ),
    } );
  }

  __ds_ns.Avatar = __ds_scope.Avatar;

  __ds_ns.Badge = __ds_scope.Badge;

  __ds_ns.Card = __ds_scope.Card;

  __ds_ns.Chip = __ds_scope.Chip;

  __ds_ns.StatusChip = __ds_scope.StatusChip;

  __ds_ns.Button = __ds_scope.Button;

  __ds_ns.Checkbox = __ds_scope.Checkbox;

  __ds_ns.IconButton = __ds_scope.IconButton;

  __ds_ns.Select = __ds_scope.Select;

  __ds_ns.Switch = __ds_scope.Switch;

  __ds_ns.TextField = __ds_scope.TextField;

  __ds_ns.Tabs = __ds_scope.Tabs;
} )();
