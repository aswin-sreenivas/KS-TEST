/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Architectural Project Archive & Portfolio
 */

import React, { useState, useMemo } from 'react';
import { PROJECTS, CREDENTIALS_DATA, ProjectItem } from '../data/company';
import { PageRoute } from '../types/app';
import {
  MapPin,
  ArrowRight,
  ShieldCheck,
  Eye,
  Compass,
} from 'lucide-react';

interface ProjectsProps {
  onOpenProjectModal: (project: ProjectItem) => void;
  onOpenContactModal: () => void;
  onNavigate?: (page: PageRoute, hashSection?: string) => void;
}

type CategoryFilter = 'all' | 'commercial' | 'residential' | 'construction' | 'render';
type StatusFilter = 'all' | 'Proposed' | 'Completed';

const CATEGORY_TABS: ReadonlyArray<{ id: CategoryFilter; label: string }> = [
  { id: 'all', label: 'All Projects' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'residential', label: 'Residential & Villas' },
  { id: 'construction', label: 'Civil Subcontracts' },
  { id: 'render', label: '3D Render Studies' },
];

export const Projects: React.FC<ProjectsProps> = ({
  onOpenProjectModal,
  onOpenContactModal,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter((proj) => {
      let matchesCategory = true;
      if (activeFilter === 'commercial') {
        matchesCategory = proj.projectType === 'Commercial Building';
      } else if (activeFilter === 'residential') {
        matchesCategory =
          proj.projectType === 'Residential Building' ||
          proj.projectType === 'Apartment Building' ||
          proj.projectType === 'Villa Project';
      } else if (activeFilter === 'construction') {
        matchesCategory = proj.category === 'construction';
      } else if (activeFilter === 'render') {
        matchesCategory = proj.category === '3d-design' && !proj.hasBlueprintPlaceholder;
      }

      const matchesStatus = statusFilter === 'all' || proj.status === statusFilter;
      return matchesCategory && matchesStatus;
    });
  }, [activeFilter, statusFilter]);

  return (
    <div className="w-full pt-28 pb-20">
      {/* Header Banner */}
      <section className="bg-[#343A24] text-white py-16 sm:py-20 mb-12 border-b border-[#C6A65B]/20">
        <div className="corporate-container">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
              Architectural Drawings & Civil Works
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-semibold text-white tracking-tight">
              Projects & Portfolio
            </h1>
            <p className="text-base sm:text-lg text-white/85 font-normal leading-relaxed">
              Explore our architectural 3D visualizations, commercial proposals, residential villas, and documented civil subcontract works.
            </p>
          </div>
        </div>
      </section>

      <div className="corporate-container space-y-12">
        {/* Interactive Filter Bars — Horizontally scrollable on narrow viewports */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-[#292B27]/10">
          {/* Category Filter */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-nowrap md:flex-wrap items-center gap-1.5 p-1 bg-[#ECEAE2] rounded-[3px] border border-[#292B27]/8 overflow-x-auto max-w-full"
          >
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                aria-pressed={activeFilter === tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`shrink-0 min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-[2px] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24] ${
                  activeFilter === tab.id
                    ? 'bg-[#343A24] text-[#C6A65B] font-semibold'
                    : 'text-[#4A4D46] hover:text-[#292B27]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2 text-xs shrink-0">
            <span className="text-[#595B53] uppercase font-semibold tracking-wider text-[11px]">
              Status:
            </span>
            <div
              role="group"
              aria-label="Filter projects by status"
              className="flex items-center gap-1 bg-[#ECEAE2] p-1 rounded-[3px] border border-[#292B27]/8 overflow-x-auto"
            >
              <button
                type="button"
                aria-pressed={statusFilter === 'all'}
                onClick={() => setStatusFilter('all')}
                className={`shrink-0 min-h-[44px] px-3 py-2 rounded-[2px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24] ${
                  statusFilter === 'all'
                    ? 'bg-white text-[#292B27] font-semibold shadow-xs'
                    : 'text-[#595B53] hover:text-[#292B27]'
                }`}
              >
                All (<span className="font-numeric font-bold">{PROJECTS.length}</span>)
              </button>
              <button
                type="button"
                aria-pressed={statusFilter === 'Proposed'}
                onClick={() => setStatusFilter('Proposed')}
                className={`shrink-0 min-h-[44px] px-3 py-2 rounded-[2px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24] ${
                  statusFilter === 'Proposed'
                    ? 'bg-white text-[#292B27] font-semibold shadow-xs'
                    : 'text-[#595B53] hover:text-[#292B27]'
                }`}
              >
                Proposed
              </button>
              <button
                type="button"
                aria-pressed={statusFilter === 'Completed'}
                onClick={() => setStatusFilter('Completed')}
                className={`shrink-0 min-h-[44px] px-3 py-2 rounded-[2px] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24] ${
                  statusFilter === 'Completed'
                    ? 'bg-white text-[#292B27] font-semibold shadow-xs'
                    : 'text-[#595B53] hover:text-[#292B27]'
                }`}
              >
                Completed
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Grid or Empty Filter State */}
        {filteredProjects.length === 0 ? (
          <div className="p-10 bg-white rounded-[2px] border border-[#292B27]/10 text-center space-y-3">
            <p className="text-sm font-medium text-[#343A24]">
              No projects match the selected category and status combination.
            </p>
            <p className="text-xs text-[#595B53]">
              Reset filters to inspect all architectural proposals and documented projects.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('all');
                setStatusFilter('all');
              }}
              className="min-h-[44px] mt-1 px-5 py-2.5 bg-[#343A24] text-[#C6A65B] hover:bg-[#242918] text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-label={`Inspect drawings and details for ${project.title}`}
                onClick={() => onOpenProjectModal(project)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProjectModal(project);
                  }
                }}
                className="group cursor-pointer bg-white rounded-[2px] overflow-hidden border border-[#292B27]/12 hover:border-[#343A24] transition-colors duration-150 flex flex-col justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
              >
                <div>
                  {/* Image Showcase or Clean Blueprint Placeholder */}
                  {project.hasBlueprintPlaceholder ? (
                    <div className="relative aspect-[16/10] overflow-hidden bg-[#242918] flex flex-col items-center justify-center text-center p-5 text-white">
                      <svg
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full opacity-15 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <defs>
                          <pattern
                            id={`card-blueprint-${project.id}`}
                            width="24"
                            height="24"
                            patternUnits="userSpaceOnUse"
                          >
                            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#C6A65B" strokeWidth="0.7" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#card-blueprint-${project.id})`} />
                      </svg>
                      <div className="relative z-10 flex flex-col items-center space-y-2">
                        <div className="w-10 h-10 rounded-[2px] bg-[#343A24] border border-[#C6A65B]/45 flex items-center justify-center text-[#C6A65B]">
                          <Compass className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold text-white tracking-wide">
                          Plans available on request
                        </span>
                      </div>

                      <div className="absolute top-3 left-3 bg-[#343A24] text-white text-[11px] px-2 py-0.5 rounded-[2px] flex items-center gap-1.5 font-medium border border-[#C6A65B]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C6A65B]" />
                        <span>{project.status}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                      <picture className="block w-full h-full">
                        {project.thumbnailWebp && (
                          <source srcSet={project.thumbnailWebp} type="image/webp" />
                        )}
                        <img
                          src={project.image}
                          alt={`${project.title} in ${project.location} — ${project.projectType} visualization`}
                          width={1280}
                          height={778}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      </picture>

                      <div className="absolute top-3 left-3 bg-[#343A24] text-white text-[11px] px-2 py-0.5 rounded-[2px] flex items-center gap-1.5 font-medium">
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            project.status === 'Completed' ? 'bg-emerald-400' : 'bg-[#C6A65B]'
                          }`}
                        />
                        <span>{project.status}</span>
                      </div>

                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center">
                        <span className="px-3.5 py-1.5 bg-[#343A24] text-[#C6A65B] rounded-[2px] text-xs font-semibold uppercase tracking-wider flex items-center gap-2 border border-[#C6A65B]/40">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Drawings</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Content */}
                  <div className="p-6 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#595B53]">
                      <span className="font-semibold text-[#9B7E38] uppercase tracking-wider">
                        {project.projectType}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1 truncate">
                        <MapPin className="w-3.5 h-3.5 text-[#C6A65B] shrink-0" />
                        {project.location}
                      </span>
                    </div>

                    <h2 className="text-xl font-heading font-semibold text-[#343A24] group-hover:text-[#9B7E38] transition-colors duration-150 leading-snug">
                      {project.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[#4A4D46] line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 py-3.5 bg-[#F5F4EF] border-t border-[#292B27]/10 flex items-center justify-between text-xs text-[#292B27]">
                  {project.hasBlueprintPlaceholder ? (
                    <span className="text-[11px] font-medium text-[#595B53]">
                      Plans available on request
                    </span>
                  ) : project.totalArea ? (
                    <span className="font-numeric text-[#4A4D46] text-[11px]">
                      Built-up: <strong className="text-[#292B27] font-bold">{project.totalArea}</strong>
                    </span>
                  ) : (
                    <span className="text-[11px] text-[#595B53]">
                      {project.category === 'construction' ? 'RCC Subcontract Work' : 'Architectural Study'}
                    </span>
                  )}

                  {project.hasBlueprintPlaceholder ? (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onNavigate) {
                          onNavigate('contact');
                        } else {
                          onOpenContactModal();
                        }
                      }}
                      className="min-h-[36px] text-[#343A24] font-semibold hover:text-[#9B7E38] flex items-center gap-1 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                    >
                      <span>Request Plans</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="text-[#343A24] font-medium group-hover:text-[#9B7E38] flex items-center gap-1 transition-colors">
                      <span>View Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Subcontract Credential Callout */}
        <div className="p-6 sm:p-8 bg-white rounded-[2px] border border-[#292B27]/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9B7E38]">
              <ShieldCheck className="w-4 h-4 text-[#C6A65B]" />
              <span>Documented Subcontract Certification</span>
            </div>
            <h2 className="text-2xl font-heading font-semibold text-[#343A24]">
              Government ITI Building SC Development, Tuneri
            </h2>
            <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
              Certificate dated {CREDENTIALS_DATA.certificate.issueDate} issued by {CREDENTIALS_DATA.certificate.issuer} records K S Associates' subcontract execution of RCC foundations, columns, beams, and slabs in compliance with approved drawings.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenContactModal}
            className="min-h-[44px] px-5 py-3 bg-[#343A24] text-[#C6A65B] hover:bg-[#242918] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
          >
            Enquire for Subcontracts
          </button>
        </div>
      </div>
    </div>
  );
};
