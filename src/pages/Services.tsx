/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Core Engineering Services
 */

import React, { useEffect } from 'react';
import { COMPANY_INFO, CREDENTIALS_DATA, PROJECTS, ProjectItem } from '../data/company';
import { PageRoute, ServiceCategory } from '../types/app';
import constructionRccImg from '@/src/assets/images/ks_construction_rcc_1793621557021.jpg';
import surveyingSiteImg from '@/src/assets/images/ks_surveying_site_1793621570744.jpg';
import chungamRender from '@/src/assets/pdf_extracts/chungam_3d_render.png';
import idimuzhikkalRender from '@/src/assets/pdf_extracts/idimuzhikkal_3d_render.png';
import constructionRccWebp from '@/src/assets/optimized/ks_construction_rcc.webp';
import surveyingSiteWebp from '@/src/assets/optimized/ks_surveying_site.webp';
import chungamThumbWebp from '@/src/assets/optimized/chungam_3d_thumb.webp';
import idimuzhikkalThumbWebp from '@/src/assets/optimized/idimuzhikkal_3d_thumb.webp';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
} from 'lucide-react';

interface ServicesProps {
  onNavigate: (page: PageRoute, hashSection?: string) => void;
  onOpenContactModal: (service?: ServiceCategory) => void;
  onOpenProjectModal?: (project: ProjectItem) => void;
}

export const Services: React.FC<ServicesProps> = ({
  onNavigate,
  onOpenContactModal,
  onOpenProjectModal,
}) => {
  // Smooth scroll to anchor when landing on /services/#construction, #survey, or #3d-design
  useEffect(() => {
    const hashId = window.location.hash.replace(/^#/, '');
    if (!hashId) return;

    const target = document.getElementById(hashId);
    if (target) {
      window.requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    }
  }, []);

  const chungamProject = PROJECTS.find((p) => p.id === 'chungam-flat-feroke');
  const idimuzhikkalProject = PROJECTS.find((p) => p.id === 'idimuzhikkal-residence');

  return (
    <div className="w-full pt-28 pb-20">
      {/* Services Header Banner */}
      <section className="bg-[#343A24] text-white py-16 sm:py-20 mb-16 border-b border-[#C6A65B]/20">
        <div className="corporate-container">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
              Multidisciplinary Engineering Practice
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-semibold text-white tracking-tight">
              Our Core Services
            </h1>
            <p className="text-base sm:text-lg text-white/85 font-normal leading-relaxed">
              Three synchronized disciplines providing end-to-end technical clarity: structural construction, land surveying, and architectural 3D design.
            </p>
          </div>
        </div>
      </section>

      <div className="corporate-container space-y-24 sm:space-y-28">
        {/* ===================== SERVICE 01: CONSTRUCTION ===================== */}
        <section id="construction" className="scroll-mt-24 space-y-6">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-[#343A24] text-[#C6A65B] flex items-center justify-center font-numeric font-bold text-xs rounded-[2px]">
              01
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9B7E38]">
              Primary Service <span className="font-numeric">01</span> · Civil & Structural
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-semibold text-[#343A24]">
                Construction Solutions
              </h2>

              <p className="text-base sm:text-lg text-[#292B27] font-medium leading-relaxed border-l-2 border-[#C6A65B] pl-4">
                "From structural execution to building construction, K S Associates focuses on planned execution, engineering standards and quality-oriented construction work."
              </p>

              <p className="text-sm text-[#4A4D46] leading-relaxed">
                We handle comprehensive civil construction works with an unwavering focus on structural stability. The firm has documented subcontract experience covering RCC foundations, column placement, beam alignment, and suspended slab casting on public infrastructure in Kerala.
              </p>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#343A24] block">
                  Structural & Civil Capabilities:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#292B27]">
                  {[
                    'RCC Foundations & Substructure Footings',
                    'Engineered Concrete Column Framing',
                    'Cast-in-Place Beams & Floor Slabs',
                    'Structural Drawing Execution Compliance',
                    'Bar Bending & Steel Reinforcement Supervision',
                    'Quality Concrete Curing & Testing Control',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-2.5 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/8">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A65B] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Subcontract Note */}
              <div className="p-4 bg-white rounded-[2px] border border-[#292B27]/10 text-xs text-[#4A4D46] space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-[#343A24]">
                  <ShieldCheck className="w-4 h-4 text-[#C6A65B]" />
                  <span>Documented Structural Subcontract</span>
                </div>
                <p>
                  Subcontract structural execution on the "{CREDENTIALS_DATA.certificate.project}" (certificate issued by {CREDENTIALS_DATA.certificate.issuer}, an ISO 9001:2015 certified firm).
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <button
                  type="button"
                  onClick={() => onOpenContactModal('Construction')}
                  className="min-h-[44px] px-5 py-2.5 bg-[#343A24] hover:bg-[#242918] text-[#C6A65B] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                >
                  <span>Enquire for Construction Works</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('projects')}
                  className="min-h-[44px] px-5 py-2.5 bg-[#F5F4EF] hover:bg-[#ECEAE2] text-[#292B27] font-medium text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 border border-[#292B27]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                >
                  View Structural Projects
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative rounded-[2px] overflow-hidden border border-[#292B27]/12 shadow-sm aspect-[16/10]">
                <picture className="block w-full h-full">
                  <source srcSet={constructionRccWebp} type="image/webp" />
                  <img
                    src={constructionRccImg}
                    alt="RCC structural framework and building construction execution in Kozhikode by K S Associates"
                    width={1376}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
                <div className="absolute bottom-3 left-3 bg-[#343A24] text-white text-xs px-2.5 py-1 rounded-[2px] font-semibold uppercase tracking-wider">
                  RCC Framework · Formwork & Column Execution
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SERVICE 02: SURVEY ===================== */}
        <section id="survey" className="scroll-mt-24 space-y-6 pt-12 border-t border-[#292B27]/10">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-[#343A24] text-[#C6A65B] flex items-center justify-center font-numeric font-bold text-xs rounded-[2px]">
              02
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9B7E38]">
              Primary Service <span className="font-numeric">02</span> · Land Survey & Baselines
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-[2px] overflow-hidden border border-[#292B27]/12 shadow-sm aspect-[16/10]">
                <picture className="block w-full h-full">
                  <source srcSet={surveyingSiteWebp} type="image/webp" />
                  <img
                    src={surveyingSiteImg}
                    alt="Land surveying and boundary demarcation in Calicut by K S Associates"
                    width={1376}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
                <div className="absolute bottom-3 left-3 bg-[#343A24] text-white text-xs px-2.5 py-1 rounded-[2px] font-semibold uppercase tracking-wider">
                  Site Measurement & Topographic Baselines
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-semibold text-[#343A24]">
                Surveying Services
              </h2>

              <p className="text-base sm:text-lg text-[#292B27] font-medium leading-relaxed border-l-2 border-[#C6A65B] pl-4">
                "Accurate surveying and site measurements form an essential foundation for informed planning and development."
              </p>

              <p className="text-sm text-[#4A4D46] leading-relaxed">
                Before architects place a room or structural engineers calculate column footings, the physical reality of the site must be established without ambiguity. Our surveying operations verify perimeter boundaries, natural gradients, access road alignments, and setback limits across Feroke, Kozhikode, and surrounding regions.
              </p>

              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#343A24] block">
                  Field Survey Scope:
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#292B27]">
                  {[
                    'Plot Boundary & Perimeter Demarcation',
                    'Topographic Site & Contour Measurements',
                    'Building Approval Site Plan Verification',
                    'Access Road Alignment & Setback Mapping',
                    'Structural Baseline Coordinate Transfer',
                    'Pre-Construction Plot Validation',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 p-2.5 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/8">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C6A65B] shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex flex-wrap gap-3 items-center">
                <button
                  type="button"
                  onClick={() => onOpenContactModal('Survey')}
                  className="min-h-[44px] px-5 py-2.5 bg-[#343A24] hover:bg-[#242918] text-[#C6A65B] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                >
                  <span>Enquire for Surveying</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="min-h-[44px] px-5 py-2.5 bg-white text-[#292B27] hover:text-[#9B7E38] text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 border border-[#292B27]/15 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C6A65B]" />
                  <span>
                    Call: <strong className="font-numeric">{COMPANY_INFO.displayPhone}</strong>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ===================== SERVICE 03: 3D DESIGN ===================== */}
        <section id="3d-design" className="scroll-mt-24 space-y-6 pt-12 border-t border-[#292B27]/10">
          <div className="flex items-center gap-3">
            <span className="w-7 h-7 bg-[#343A24] text-[#C6A65B] flex items-center justify-center font-numeric font-bold text-xs rounded-[2px]">
              03
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#9B7E38]">
              Primary Service <span className="font-numeric">03</span> · Architectural Visualization
            </span>
          </div>

          <div className="space-y-6">
            <div className="max-w-3xl space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-semibold text-[#343A24]">
                Architectural 3D Design
              </h2>

              <p className="text-base sm:text-lg text-[#292B27] font-medium leading-relaxed border-l-2 border-[#C6A65B] pl-4">
                "Visualize your building before construction begins through detailed architectural 3D designs and realistic exterior visualizations."
              </p>

              <p className="text-sm text-[#4A4D46] leading-relaxed">
                Across our portfolio of commercial complexes, multi-family apartments, and residential villas, our 3D design division transforms technical floor plans and elevations into architectural visualizations. Review textures, material finishes, shading elements, and twilight ambient illumination prior to construction.
              </p>
            </div>

            {/* Distinct Visual Showcase Grid — Interactive Preview */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <button
                type="button"
                onClick={() => chungamProject && onOpenProjectModal?.(chungamProject)}
                className="relative rounded-[2px] overflow-hidden border border-[#292B27]/12 aspect-[16/10] group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                aria-label="Inspect Apartment Building at Chungam 3D render and drawings"
              >
                <picture className="block w-full h-full">
                  <source srcSet={chungamThumbWebp} type="image/webp" />
                  <img
                    src={chungamRender}
                    alt="Apartment Building at Chungam night 3D architectural exterior render in Feroke, Kerala"
                    width={1280}
                    height={778}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
                  <div className="text-xs font-semibold text-[#C6A65B] uppercase tracking-wider">
                    Multi-Family Residential Render
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    Apartment Building at Chungam
                  </h3>
                  <p className="text-xs text-white/85 mt-0.5">
                    Balanced dual-unit facade study with evening architectural illumination.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => idimuzhikkalProject && onOpenProjectModal?.(idimuzhikkalProject)}
                className="relative rounded-[2px] overflow-hidden border border-[#292B27]/12 aspect-[16/10] group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
                aria-label="Inspect Residential Building at Idimuzhikkal 3D render and drawings"
              >
                <picture className="block w-full h-full">
                  <source srcSet={idimuzhikkalThumbWebp} type="image/webp" />
                  <img
                    src={idimuzhikkalRender}
                    alt="Residential Building at Idimuzhikkal modern Kerala terracotta roof 3D exterior visualization"
                    width={1280}
                    height={778}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end text-white">
                  <div className="text-xs font-semibold text-[#C6A65B] uppercase tracking-wider">
                    Residential Elevation Study
                  </div>
                  <h3 className="font-heading text-lg font-semibold">
                    Residential Building at Idimuzhikkal
                  </h3>
                  <p className="text-xs text-white/85 mt-0.5">
                    Terracotta pitched roof fusion with double-height arched window and brick accents.
                  </p>
                </div>
              </button>
            </div>

            {/* Scope Grid */}
            <div className="p-6 sm:p-8 bg-white rounded-[2px] border border-[#292B27]/10 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#343A24] block">
                3D Design Deliverables:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-[#4A4D46]">
                <div className="space-y-1">
                  <strong className="text-[#292B27] block text-sm font-heading">
                    Exterior 3D Perspectives
                  </strong>
                  <p className="leading-relaxed">
                    True-to-scale elevations showing roof pitch, pergolas, balconies, and entry porticos.
                  </p>
                </div>
                <div className="space-y-1">
                  <strong className="text-[#292B27] block text-sm font-heading">
                    Daylight & Twilight Simulation
                  </strong>
                  <p className="leading-relaxed">
                    Testing solar angles, shade patterns, and ambient facade architectural illumination.
                  </p>
                </div>
                <div className="space-y-1">
                  <strong className="text-[#292B27] block text-sm font-heading">
                    Material & Texture Exploration
                  </strong>
                  <p className="leading-relaxed">
                    Comparing paint palettes, exterior tiles, granite stone, timber battens, and glass tints.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3 items-center">
              <button
                type="button"
                onClick={() => onOpenContactModal('3D Design')}
                className="min-h-[44px] px-5 py-2.5 bg-[#343A24] hover:bg-[#242918] text-[#C6A65B] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 flex items-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
              >
                <span>Request 3D Architectural Visualization</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="min-h-[44px] px-5 py-2.5 bg-[#F5F4EF] hover:bg-[#ECEAE2] text-[#292B27] font-medium text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 border border-[#292B27]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
              >
                Browse Render Portfolio
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
