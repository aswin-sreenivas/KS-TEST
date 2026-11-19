/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Profile: About Us
 */

import React from 'react';
import { COMPANY_INFO, CREDENTIALS_DATA } from '../data/company';
import { PageRoute } from '../types/app';
import heroImg1 from '@/src/assets/images/ks_hero_render_1793621473732.jpg';
import constructionRccImg from '@/src/assets/images/ks_construction_rcc_1793621557021.jpg';
import surveyingSiteImg from '@/src/assets/images/ks_surveying_site_1793621570744.jpg';
import cadDrawingImg from '@/src/assets/images/ks_cad_drawing_1793621586595.jpg';
import heroImg1Webp from '@/src/assets/optimized/ks_hero_render.webp';
import constructionRccWebp from '@/src/assets/optimized/ks_construction_rcc.webp';
import surveyingSiteWebp from '@/src/assets/optimized/ks_surveying_site.webp';
import cadDrawingWebp from '@/src/assets/optimized/ks_cad_drawing.webp';
import {
  CheckCircle2,
  ShieldCheck,
  Award,
  FileCheck,
} from 'lucide-react';

interface AboutProps {
  onNavigate: (page: PageRoute, hashSection?: string) => void;
  onOpenContactModal: () => void;
}

export const About: React.FC<AboutProps> = ({ onOpenContactModal }) => {
  return (
    <div className="w-full pt-28 pb-20">
      {/* Header Banner */}
      <section className="bg-[#343A24] text-white py-16 sm:py-20 mb-16 border-b border-[#C6A65B]/20">
        <div className="corporate-container">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
              Practice Profile · Engineering Construction & Surveying
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-semibold text-white tracking-tight">
              About K S Associates
            </h1>
            <p className="text-base sm:text-lg text-white/85 font-normal leading-relaxed">
              An engineering-led practice integrating precision land surveying, structural civil execution, and photorealistic architectural 3D visualization.
            </p>
          </div>
        </div>
      </section>

      <div className="corporate-container space-y-20 sm:space-y-24">
        {/* SECTION 1: Company Introduction */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B7E38]">
                Section <span className="font-numeric">01</span> · Corporate Profile
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#343A24]">
                Company Introduction
              </h2>
            </div>

            <div className="space-y-4 text-[15px] sm:text-base text-[#4A4D46] leading-relaxed">
              <p>
                <strong className="text-[#292B27]">{COMPANY_INFO.fullName}</strong> is a civil engineering and construction company committed to delivering high-quality construction solutions with excellence, reliability and professionalism. Operating with GSTIN registration <span className="font-numeric text-[#292B27] font-bold">{COMPANY_INFO.gstin}</span> from our primary office in the Farook Hospital Complex (Feroke, Calicut), we provide specialized civil engineering and surveying services across Kerala.
              </p>
              <p>
                Our services focus on planning, designing and executing construction projects with meticulous attention to quality, safety and customer satisfaction. We aim to turn our clients' visions into reality through innovative ideas, skilled workmanship and strong foundations.
              </p>
              <p>
                Our core activities center on three interconnected engineering pillars: <strong>Construction</strong>, <strong>Survey</strong>, and <strong>3D Design</strong>. Accurate survey data establishes the site's physical truth; 3D visualization validates spatial aesthetics and proportions; and disciplined structural execution builds enduring landmarks.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#292B27]">
              <div className="p-4 bg-white rounded-[2px] border border-[#292B27]/10 space-y-1">
                <span className="text-[#9B7E38] text-[11px] uppercase tracking-wider block font-semibold">
                  PRIMARY DESK
                </span>
                <div className="text-[#4A4D46] leading-relaxed space-y-1">
                  <div>
                    Call:{' '}
                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="font-numeric font-bold text-[#292B27] hover:text-[#9B7E38]"
                    >
                      {COMPANY_INFO.displayPhone}
                    </a>
                  </div>
                  <div>
                    WhatsApp:{' '}
                    <a
                      href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                        COMPANY_INFO.whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-numeric font-bold text-[#15803D] hover:underline"
                    >
                      {COMPANY_INFO.displayWhatsApp}
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 bg-white rounded-[2px] border border-[#292B27]/10 space-y-1">
                <span className="text-[#9B7E38] text-[11px] uppercase tracking-wider block font-semibold">
                  REGISTERED OFFICE
                </span>
                <span className="text-[#4A4D46] leading-relaxed block">
                  {COMPANY_INFO.address.line1}, {COMPANY_INFO.address.landmark}, Feroke, Calicut – {COMPANY_INFO.address.pincode}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-[2px] overflow-hidden border border-[#292B27]/12 shadow-sm aspect-[4/3]">
              <picture className="block w-full h-full">
                <source srcSet={heroImg1Webp} type="image/webp" />
                <img
                  src={heroImg1}
                  alt="K S Associates 3D architectural visualization and residential elevation in Feroke, Calicut"
                  width={1376}
                  height={768}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </picture>
              <div className="absolute bottom-3 right-3 bg-[#343A24] text-[#C6A65B] text-[11px] px-2.5 py-1 rounded-[2px] font-semibold uppercase tracking-wider">
                Architectural Visualization Practice
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Our Approach */}
        <section className="bg-white p-6 sm:p-12 rounded-[2px] border border-[#292B27]/10 space-y-8">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B7E38]">
              Section <span className="font-numeric">02</span> · Operational Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#343A24]">
              Our Approach
            </h2>
            <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
              How accurate surveying, realistic visualization, and rigorous civil engineering synchronize to minimize construction risks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/8 space-y-2.5">
              <div className="w-8 h-8 bg-[#343A24] text-[#C6A65B] flex items-center justify-center font-numeric font-bold text-xs rounded-[2px]">
                01
              </div>
              <h3 className="font-heading font-semibold text-lg text-[#343A24]">
                Phase 1: Ground Truth & Survey
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                Before architectural lines are finalized, the physical boundaries, levels, setbacks, and contours of the plot are verified. This helps avoid boundary discrepancies and foundation level errors.
              </p>
            </div>

            <div className="p-6 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/8 space-y-2.5">
              <div className="w-8 h-8 bg-[#343A24] text-[#C6A65B] flex items-center justify-center font-numeric font-bold text-xs rounded-[2px]">
                02
              </div>
              <h3 className="font-heading font-semibold text-lg text-[#343A24]">
                Phase 2: 3D Architectural Modeling
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                Floor plans are translated into true-to-scale 3D exterior models. Stakeholders inspect daylighting, facade materials, window placement, and volumetric proportions, finalizing decisions prior to mobilization.
              </p>
            </div>

            <div className="p-6 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/8 space-y-2.5">
              <div className="w-8 h-8 bg-[#343A24] text-[#C6A65B] flex items-center justify-center font-numeric font-bold text-xs rounded-[2px]">
                03
              </div>
              <h3 className="font-heading font-semibold text-lg text-[#343A24]">
                Phase 3: Structural Execution
              </h3>
              <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                Execution follows approved structural drawings strictly. Steel reinforcement, formwork tolerances, concrete grades, and curing cycles are systematically monitored to support long-term structural performance.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Our Expertise */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-square rounded-[2px] overflow-hidden border border-[#292B27]/10">
                <picture className="block w-full h-full">
                  <source srcSet={constructionRccWebp} type="image/webp" />
                  <img
                    src={constructionRccImg}
                    alt="RCC structural framework and concrete slab construction in Kozhikode by K S Associates"
                    width={1376}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <div className="aspect-square rounded-[2px] overflow-hidden border border-[#292B27]/10">
                <picture className="block w-full h-full">
                  <source srcSet={surveyingSiteWebp} type="image/webp" />
                  <img
                    src={surveyingSiteImg}
                    alt="Precision land surveying and site boundary measurement in Calicut by K S Associates"
                    width={1376}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
              <div className="aspect-video rounded-[2px] overflow-hidden border border-[#292B27]/10 col-span-2">
                <picture className="block w-full h-full">
                  <source srcSet={cadDrawingWebp} type="image/webp" />
                  <img
                    src={cadDrawingImg}
                    alt="Architectural working CAD floor plans and structural blueprint drafting by K S Associates"
                    width={1376}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </picture>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B7E38]">
                Section <span className="font-numeric">03</span> · Core Competencies
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-semibold text-[#343A24]">
                Our Expertise
              </h2>
            </div>

            <div className="space-y-4 text-[15px] text-[#4A4D46] leading-relaxed">
              <p>
                Our technical capability spans commercial buildings, multi-family residential apartments, and custom villas across Kozhikode and Malappuram districts.
              </p>
              <ul className="space-y-3 text-xs sm:text-sm text-[#292B27]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A65B] shrink-0 mt-0.5" />
                  <span>
                    <strong>Reinforced Concrete (RCC) Subcontracts:</strong> Execution of foundations, load-bearing columns, floor beams, and structural slabs for public and institutional buildings.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A65B] shrink-0 mt-0.5" />
                  <span>
                    <strong>Engineering Surveying & Demarcation:</strong> Establishing site boundaries, property dimensions, and coordinate baselines.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C6A65B] shrink-0 mt-0.5" />
                  <span>
                    <strong>3D Architectural Rendering:</strong> Translating CAD drawings into daylight, twilight, and facade architectural perspectives.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 4 & 5: Our Commitment & Our Work Philosophy */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 sm:p-8 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B7E38]">
              Section <span className="font-numeric">04</span> · Quality Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#343A24]">
              Our Commitment
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
              <p>
                At K S Associates, our commitment is centered on transparency, build quality, and structural accountability. We follow standard site testing and quality-control practices with disciplined material oversight.
              </p>
              <p>
                We work diligently so that drawings delivered are practical to build, site dimensions are carefully checked, and structural concrete members adhere to approved architectural specifications and project milestones.
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-8 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/10 space-y-4">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#9B7E38]">
              Section <span className="font-numeric">05</span> · Ethos
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#343A24]">
              Our Work Philosophy
            </h2>
            <div className="space-y-3 text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
              <p className="font-medium text-[#292B27]">
                "A building is only as reliable as the foundation beneath it and the planning behind it."
              </p>
              <p>
                We believe that sound architecture is a careful synthesis of site context, structural principles, and craftsmanship. By maintaining focus across our three primary services, we help clients build enduring, functional structures.
              </p>
            </div>
          </div>
        </section>

        {/* DOCUMENTED CONSTRUCTION EXPERIENCE & CREDENTIALS SECTION */}
        <section className="p-6 sm:p-12 bg-white rounded-[2px] border border-[#292B27]/12 space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#292B27]/10 pb-6 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#9B7E38]">
                <ShieldCheck className="w-4 h-4 text-[#C6A65B]" />
                <span>Verified Documentation</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-[#343A24] mt-1">
                {CREDENTIALS_DATA.title}
              </h2>
            </div>
            <div className="text-xs bg-[#F5F4EF] px-3 py-1.5 rounded-[2px] border border-[#292B27]/10 self-start md:self-auto">
              Certificate Date: <span className="font-numeric font-bold">{CREDENTIALS_DATA.certificate.issueDate}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-4">
              <div className="text-sm font-semibold text-[#343A24]">
                Project: {CREDENTIALS_DATA.certificate.project}
              </div>
              <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                {CREDENTIALS_DATA.certificate.verificationStatement}
              </p>

              <div className="space-y-2 pt-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#343A24] block">
                  Documented Subcontract Scope:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A4D46]">
                  {CREDENTIALS_DATA.certificate.scopeSummary.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/8">
                      <FileCheck className="w-3.5 h-3.5 text-[#C6A65B] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#343A24] text-white p-6 rounded-[2px] space-y-4 border border-[#C6A65B]/20">
              <div className="flex items-center gap-2 text-[#C6A65B] text-xs font-semibold uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Subcontract Certificate Record</span>
              </div>
              <div className="space-y-3 text-xs text-white/85">
                <div>
                  <span className="text-white/60 block text-[10px]">ISSUING AUTHORITY</span>
                  <strong className="text-white text-sm">{CREDENTIALS_DATA.certificate.issuer}</strong>
                  <div className="text-[#C6A65B] text-[11px] font-medium mt-0.5">
                    {CREDENTIALS_DATA.certificate.issuerCredentials}
                  </div>
                  <p className="text-[11px] text-white/80 leading-relaxed mt-1.5 bg-white/5 p-2.5 rounded-[2px] border-l-2 border-[#C6A65B]">
                    {CREDENTIALS_DATA.certificate.noteOnISO}
                  </p>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-white/60 block text-[10px]">AWARDED TO</span>
                  <strong className="text-white">{COMPANY_INFO.name}</strong>
                  <div className="text-white/75">{COMPANY_INFO.tagline}</div>
                </div>
                <div className="pt-2 border-t border-white/10">
                  <span className="text-white/60 block text-[10px]">RECORD LOCATION</span>
                  <span className="text-white">Tuneri, Kozhikode, Kerala</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="p-6 sm:p-12 bg-[#343A24] text-white rounded-[2px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-heading font-semibold text-white">
              Ready to Discuss Your Project with Our Engineers?
            </h2>
            <p className="text-xs sm:text-sm text-white/80">
              Get in touch for construction subcontracts, land boundary surveying, or 3D architectural elevations.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenContactModal}
            className="min-h-[44px] px-6 py-3 bg-[#C6A65B] text-[#292B27] hover:bg-[#DECA8D] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Request Consultation
          </button>
        </section>
      </div>
    </div>
  );
};
