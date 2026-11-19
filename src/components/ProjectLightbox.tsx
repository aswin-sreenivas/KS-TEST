/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Architectural Project Detail & Lightbox Modal
 */

import React, { useState, useEffect, useRef } from 'react';
import { ProjectItem } from '../data/company';
import { getRoutePath } from '../types/app';
import { useDialogBehavior } from '../hooks/useDialogBehavior';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Layers,
  MapPin,
  CheckCircle,
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ImageOff,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface ProjectLightboxProps {
  project: ProjectItem | null;
  onClose: () => void;
  onNavigateNext?: () => void;
  onNavigatePrev?: () => void;
  onEnquireProject?: (project: ProjectItem) => void;
}

export const ProjectLightbox: React.FC<ProjectLightboxProps> = ({
  project,
  onClose,
  onNavigateNext,
  onNavigatePrev,
  onEnquireProject,
}) => {
  const [selectedDrawingIndex, setSelectedDrawingIndex] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imageError, setImageError] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useDialogBehavior(Boolean(project), onClose, modalRef);

  useEffect(() => {
    setSelectedDrawingIndex(0);
    setZoomLevel(1);
    setImageError(false);
  }, [project?.id]);

  // Arrow key navigation between projects
  useEffect(() => {
    if (!project) return;
    const handleArrowKeys = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' && onNavigateNext) {
        event.preventDefault();
        onNavigateNext();
      } else if (event.key === 'ArrowLeft' && onNavigatePrev) {
        event.preventDefault();
        onNavigatePrev();
      }
    };

    document.addEventListener('keydown', handleArrowKeys);
    return () => document.removeEventListener('keydown', handleArrowKeys);
  }, [project, onNavigateNext, onNavigatePrev]);

  if (!project) return null;

  const isBlueprintPlaceholder = Boolean(project.hasBlueprintPlaceholder);

  const drawingsList =
    project.drawings && project.drawings.length > 0
      ? project.drawings
      : [
          { label: '3D Visualization', type: 'render' as const, image: project.image },
          ...(project.cadDrawing
            ? [{ label: 'Working Drawing / CAD', type: 'floorplan' as const, image: project.cadDrawing }]
            : []),
        ];

  const safeIndex = Math.min(selectedDrawingIndex, Math.max(drawingsList.length - 1, 0));
  const currentDrawing = drawingsList[safeIndex] || drawingsList[0];

  const handleZoomIn = () => setZoomLevel((prev) => Number(Math.min(prev + 0.3, 2.5).toFixed(2)));
  const handleZoomOut = () => setZoomLevel((prev) => Number(Math.max(prev - 0.3, 0.8).toFixed(2)));
  const handleResetZoom = () => setZoomLevel(1);

  const handleEnquireClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onEnquireProject) {
      event.preventDefault();
      onEnquireProject(project);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 flex items-start justify-center p-2.5 sm:p-6"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-6xl bg-[#F5F4EF] rounded-[3px] border border-[#292B27]/20 max-h-[94vh] flex flex-col shadow-2xl focus:outline-none"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#343A24] text-white border-b border-[#C6A65B]/20 shrink-0 gap-2">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs min-w-0">
            <span className="uppercase tracking-widest text-[#C6A65B] font-semibold truncate">
              Project Specification
            </span>
            <span className="text-white/30 hidden sm:inline" aria-hidden="true">|</span>
            <span className="text-white/85 hidden sm:inline">
              Status: <strong className="text-white font-medium">{project.status}</strong>
            </span>
          </div>

          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {onNavigatePrev && (
              <button
                type="button"
                onClick={onNavigatePrev}
                className="min-w-[44px] min-h-[44px] p-2 text-white/80 hover:text-white rounded-[2px] hover:bg-white/10 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B]"
                title="Previous Project"
                aria-label="Previous Project"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {onNavigateNext && (
              <button
                type="button"
                onClick={onNavigateNext}
                className="min-w-[44px] min-h-[44px] p-2 text-white/80 hover:text-white rounded-[2px] hover:bg-white/10 transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B]"
                title="Next Project"
                aria-label="Next Project"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="min-w-[44px] min-h-[44px] p-2 text-white/80 hover:text-white rounded-[2px] hover:bg-white/10 transition-colors ml-1 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B]"
              title="Close Modal"
              aria-label="Close project modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-6 space-y-6">
          {/* Main Visual Display Area */}
          {isBlueprintPlaceholder ? (
            <div className="relative rounded-[2px] overflow-hidden bg-[#242918] border border-[#C6A65B]/30 min-h-[280px] sm:min-h-[340px] flex flex-col items-center justify-center text-center p-8 text-white">
              {/* Architectural Blueprint Grid Pattern */}
              <svg
                aria-hidden="true"
                className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="blueprint-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                    <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#C6A65B" strokeWidth="0.75" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
              </svg>

              <div className="relative z-10 max-w-md space-y-4">
                <div className="w-14 h-14 mx-auto rounded-[2px] border border-[#C6A65B]/45 bg-[#343A24] flex items-center justify-center text-[#C6A65B]">
                  <Compass className="w-7 h-7" />
                </div>
                <div className="space-y-1.5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#C6A65B] block">
                    Architectural Drawing Set
                  </span>
                  <h4 className="text-xl sm:text-2xl font-heading font-semibold text-white">
                    Plans available on request
                  </h4>
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    Ground floor, upper floor, and room dimensional sheets for this Ponnani residential layout can be reviewed by contacting our engineering desk.
                  </p>
                </div>
                <div className="pt-2">
                  <a
                    href={getRoutePath('contact')}
                    onClick={handleEnquireClick}
                    className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#C6A65B] hover:bg-[#DECA8D] text-[#292B27] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <span>Request Plans</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {/* View Selection Tabs */}
              {drawingsList.length > 1 && (
                <div
                  role="tablist"
                  aria-label="Project drawing sheets"
                  className="flex flex-wrap items-center gap-2 pb-1 border-b border-[#292B27]/10"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#77786F] mr-1">
                    Views:
                  </span>
                  {drawingsList.map((d, idx) => (
                    <button
                      key={`${project.id}-${d.label}-${idx}`}
                      type="button"
                      role="tab"
                      aria-selected={safeIndex === idx}
                      onClick={() => {
                        setSelectedDrawingIndex(idx);
                        setZoomLevel(1);
                        setImageError(false);
                      }}
                      className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-[2px] transition-colors flex items-center gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24] ${
                        safeIndex === idx
                          ? 'bg-[#343A24] text-[#C6A65B] font-semibold'
                          : 'bg-white text-[#4A4D46] hover:text-[#292B27] border border-[#292B27]/10'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>{d.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Interactive Image Frame */}
              <div className="relative rounded-[2px] overflow-hidden bg-black/5 border border-[#292B27]/12 min-h-[280px] sm:min-h-[380px] h-[48vh] sm:h-[54vh] flex items-center justify-center">
                <div className="w-full h-full overflow-auto flex p-2">
                  {imageError || !currentDrawing?.image ? (
                    <div className="m-auto flex flex-col items-center justify-center text-center p-6 text-[#77786F] space-y-2">
                      <ImageOff className="w-8 h-8 text-[#C6A65B]" />
                      <p className="text-xs font-medium text-[#292B27]">Drawing Sheet Unavailable</p>
                      <p className="text-[11px]">
                        Please switch to another sheet or contact our office for full CAD documentation.
                      </p>
                    </div>
                  ) : (
                    <img
                      src={currentDrawing.image}
                      alt={`${project.title} in ${project.location} — ${currentDrawing.label}`}
                      width={1280}
                      height={778}
                      decoding="async"
                      onError={() => setImageError(true)}
                      style={
                        zoomLevel === 1
                          ? undefined
                          : {
                              width: `${Math.round(zoomLevel * 100)}%`,
                              maxWidth: 'none',
                              maxHeight: zoomLevel > 1 ? 'none' : '50vh',
                            }
                      }
                      className={`${
                        zoomLevel === 1 ? 'max-h-[46vh] sm:max-h-[50vh] w-auto max-w-full' : 'h-auto'
                      } object-contain rounded-[2px] select-none transition-all duration-150 m-auto`}
                    />
                  )}
                </div>

                {/* Zoom Controls */}
                <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-[#343A24] p-1 rounded-[2px] border border-[#C6A65B]/30 text-white shadow-md">
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    className="min-w-[40px] min-h-[40px] flex items-center justify-center hover:text-[#C6A65B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
                    title="Zoom In"
                    aria-label="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    className="min-w-[40px] min-h-[40px] flex items-center justify-center hover:text-[#C6A65B] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
                    title="Zoom Out"
                    aria-label="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  {zoomLevel !== 1 && (
                    <button
                      type="button"
                      onClick={handleResetZoom}
                      className="min-w-[40px] min-h-[40px] flex items-center justify-center hover:text-[#C6A65B] transition-colors border-l border-white/20 pl-1 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
                      title="Reset Zoom"
                      aria-label="Reset Zoom"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <span className="text-[11px] font-numeric font-bold px-2 text-[#C6A65B]">
                    {Math.round(zoomLevel * 100)}%
                  </span>
                </div>
              </div>

              {/* Visual caption */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-[#4A4D46] px-1 gap-1">
                <span className="font-medium text-[#292B27]">
                  {currentDrawing.caption || currentDrawing.label}
                </span>
                <span className="text-[#77786F] text-[11px]">
                  Sheet <span className="font-numeric font-bold">{safeIndex + 1}</span> of{' '}
                  <span className="font-numeric font-bold">{drawingsList.length}</span> · Ref:{' '}
                  {project.id.toUpperCase()}
                </span>
              </div>
            </div>
          )}

          {/* Project Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-1">
            {/* Main Project Description & Context */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#C6A65B] tracking-wider uppercase mb-1">
                  <span>{project.projectType}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1 text-[#77786F]">
                    <MapPin className="w-3.5 h-3.5 text-[#C6A65B]" />
                    {project.location}
                  </span>
                </div>
                <h3 id="project-modal-title" className="text-2xl sm:text-3xl font-heading font-semibold text-[#343A24]">
                  {project.title}
                </h3>
              </div>

              <p className="text-sm text-[#4A4D46] leading-relaxed">
                {project.description}
              </p>

              {/* Subcontract details if present */}
              {project.subcontractDetails && (
                <div className="p-4 bg-white rounded-[2px] border-l-2 border-[#C6A65B] space-y-1.5 border border-[#292B27]/8">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#343A24]">
                    <CheckCircle className="w-4 h-4 text-[#C6A65B]" />
                    <span>Documented Subcontract Certification</span>
                  </div>
                  <p className="text-xs text-[#4A4D46] leading-relaxed">
                    {project.subcontractDetails.mainContractorNotes}
                  </p>
                  <div className="text-[11px] text-[#77786F] pt-1 border-t border-[#292B27]/8 flex flex-wrap gap-4">
                    <span>
                      Issuing Authority: <strong>{project.subcontractDetails.certifyingAuthority}</strong>
                    </span>
                    <span>
                      Date of Issue: <strong>{project.subcontractDetails.certificationDate}</strong>
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Metadata */}
            <div className="lg:col-span-4 space-y-4 bg-white p-5 rounded-[2px] border border-[#292B27]/10 text-xs">
              {project.areaDetails && project.areaDetails.length > 0 && (
                <div>
                  <h4 className="font-semibold text-[#343A24] uppercase tracking-wider text-[11px] mb-2 pb-1 border-b border-[#292B27]/10 font-heading">
                    Floor Area Specifications
                  </h4>
                  <div className="space-y-1.5">
                    {project.areaDetails.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center py-1 border-b border-[#292B27]/5">
                        <span className="text-[#77786F]">{item.label}:</span>
                        <span className="font-numeric font-bold text-[#292B27]">{item.area}</span>
                      </div>
                    ))}
                    {project.totalArea && (
                      <div className="flex justify-between items-center pt-2 font-semibold text-[#343A24]">
                        <span>Total Built-up:</span>
                        <span className="font-numeric text-[#C6A65B] font-bold">{project.totalArea}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {project.availableMaterials && project.availableMaterials.length > 0 && (
                <div>
                  <h4 className="font-semibold text-[#343A24] uppercase tracking-wider text-[11px] mb-2 pb-1 border-b border-[#292B27]/10 font-heading">
                    Documented Materials
                  </h4>
                  <ul className="space-y-1.5">
                    {project.availableMaterials.map((mat, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[#4A4D46]">
                        <FileText className="w-3.5 h-3.5 text-[#C6A65B] shrink-0" />
                        <span>{mat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-2 space-y-2">
                <a
                  href={getRoutePath('contact')}
                  onClick={handleEnquireClick}
                  className="min-h-[44px] w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 bg-[#343A24] hover:bg-[#242918] text-[#C6A65B] text-center font-semibold uppercase tracking-wider rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                >
                  <span>{isBlueprintPlaceholder ? 'Request Plans' : 'Enquire about this project'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[44px] w-full py-2.5 px-4 bg-[#F5F4EF] hover:bg-[#ECEAE2] text-[#292B27] border border-[#292B27]/12 text-center font-medium uppercase tracking-wider rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
