'use client';

import { useState } from 'react';
import { Icon } from '#@/components/ui';
import layout from '#@/styles/layout.module.css';
import { generateMemorial } from '#@/memoriales/actions/generate-memorial';
import { GenerationState,
  GenerationStatus, } from '#@/memoriales/components/generation-status';
import { MemorialForm } from '#@/memoriales/components/memorial-form';
import { TemplateSelector } from '#@/memoriales/components/template-selector';
import { Button } from '#@/memoriales/components/ui/button';
import { downloadDocx } from '#@/memoriales/lib/download';
import { getTemplateById,
  memorialesRegistry, } from '#@/memoriales/manifests/registry';
import { plexMonoMemoriales,
  quicksandMemoriales, } from '#@/memoriales/styles/fonts';
import tokens from '#@/memoriales/styles/tokens.module.css';
import styles from './page.module.css';

const TEMPLATES = Object.values( memorialesRegistry );

interface DownloadPayload {
  filename: string;
  base64  : string;
}

export default function MemorialesPage() {
  const [
    view,
    setView
  ] = useState<'selection' | 'form'>( 'selection' );
  const [
    selectedId,
    setSelectedId
  ] = useState<string | null>( null );
  const [
    status,
    setStatus
  ] = useState<GenerationState>( 'idle' );
  const [
    errorMessage,
    setErrorMessage
  ] = useState<string | undefined>();
  const [
    technicalDetail,
    setTechnicalDetail
  ] = useState<string | undefined>();
  const [
    downloadPayload,
    setDownloadPayload
  ]
    = useState<DownloadPayload | null>( null );
  const [
    lastValues,
    setLastValues
  ] = useState<Record<string, unknown> | null>( null, );
  const [
    formInstanceKey,
    setFormInstanceKey
  ] = useState( 0 );

  const selectedTemplate = selectedId
    ? ( getTemplateById( selectedId ) ?? null )
    : null;

  function handleSelect( id: string ) {
    setSelectedId( id );
    setView( 'form' );
    setStatus( 'idle' );
    setErrorMessage( undefined );
    setTechnicalDetail( undefined );
    setDownloadPayload( null );
    setLastValues( null );
  }

  function handleBackToSelection() {
    setView( 'selection' );
    setStatus( 'idle' );
  }

  async function handleSubmit( values: Record<string, unknown> ) {
    if ( !selectedTemplate ) {
      return;
    }

    setLastValues( values );
    setStatus( 'generating' );

    const result = await generateMemorial(
      selectedTemplate.id, values
    );

    if ( result.ok ) {
      setDownloadPayload( {
        filename: result.filename,
        base64  : result.base64,
      } );
      setStatus( 'success' );
    } else {
      setErrorMessage( result.message );
      setTechnicalDetail( result.technical );
      setStatus( 'error' );
    }
  }

  function handleDownload() {
    if ( downloadPayload ) {
      downloadDocx(
        downloadPayload.filename, downloadPayload.base64 
      );
    }
  }

  function handleGenerateAnother() {
    setStatus( 'idle' );
    setDownloadPayload( null );
    setLastValues( null );
    setFormInstanceKey( ( key ) => {
      return key + 1;
    } );
  }

  function handleRetry() {
    if ( lastValues ) {
      void handleSubmit( lastValues );
    } else {
      setStatus( 'idle' );
    }
  }

  const formDisabled
    = status === 'validating' || status === 'generating' || status === 'success';
  const submitLabel
    = status === 'validating'
      ? 'Validando…'
      : status === 'generating'
        ? 'Generando…'
        : 'Generar documento';

  return (
    <div className={layout.left}>
      <div
        className={`${ tokens.scope } ${ quicksandMemoriales.variable } ${ plexMonoMemoriales.variable } ${ styles.page }`}
      >
        <header className={styles.header}>
          <Icon
            name="gavel"
            className={styles.headerIcon}
            size={32}
          />
          <div>
            <div className={styles.breadcrumb}>
              <span>Carpetas</span>
              <Icon
                name="chevron_right"
                size={16}
              />
              <span className={styles.breadcrumbCurrent}>Memoriales</span>
            </div>
            <h1 className={styles.title}>Memoriales</h1>
          </div>
        </header>
        <p className={styles.intro}>
          Genere memoriales a partir de las plantillas del despacho y descargue
          el documento en formato .docx.
        </p>

        {view === 'selection'
          ? (
              <TemplateSelector
                templates={TEMPLATES}
                selectedId={selectedId}
                onSelect={handleSelect}
              />
            )
          : null}

        {view === 'form' && selectedTemplate
          ? (
              <section className={styles.formSection}>
                <div className={styles.selectedBar}>
                  <div className={styles.selectedInfo}>
                    <Icon
                      name="description"
                      className={styles.selectedIcon}
                      size={22}
                    />
                    <div>
                      <div className={styles.selectedLabel}>
                        Memorial seleccionado
                      </div>
                      <div className={styles.selectedName}>
                        {selectedTemplate.displayName}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="text"
                    icon={
                      <Icon
                        name="arrow_back"
                        size={18}
                      />
                    }
                    onClick={handleBackToSelection}
                  >
                    Cambiar memorial
                  </Button>
                </div>

                <GenerationStatus
                  status={status}
                  errorMessage={errorMessage}
                  technicalDetail={technicalDetail}
                  onDownload={handleDownload}
                  onGenerateAnother={handleGenerateAnother}
                  onRetry={handleRetry}
                />

                <MemorialForm
                  key={`${ selectedTemplate.id }-${ formInstanceKey }`}
                  template={selectedTemplate}
                  onSubmit={handleSubmit}
                  disabled={formDisabled}
                  submitLabel={submitLabel}
                />
              </section>
            )
          : null}
      </div>
    </div>
  );
}
