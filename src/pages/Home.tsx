/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Homepage (Refined Architectural Standard)
 */

import React, { useState, useEffect } from 'react';
import { COMPANY_INFO, SERVICES, PROJECTS, ProjectItem, ServiceItem } from '../data/company';
import { PageRoute, ServiceCategory } from '../types/app';
import heroImg1 from '@/src/assets/images/ks_hero_render_1793621473732.jpg';
import heroImg2 from '@/src/assets/images/ks_hero_exterior_2_1793621489483.jpg';
import heroImg1Webp from '@/src/assets/optimized/ks_hero_render.webp';
import heroImg2Webp from '@/src/assets/optimized/ks_hero_exterior_2.webp';
import {
  ArrowRight,
  Building2,
  Compass,
  Box,
  MapPin,
  ArrowUpRight
} from 'lucide-react';

interface HomeProps {
  onNavigate: (page: PageRoute) => void;
  onOpenProjectModal: (project: ProjectItem) => void;
  onOpenContactModal: (service?: ServiceCategory) => void;
}

const HERO_SLIDES = [
  {
    img: heroImg1,
    webp: heroImg1Webp,
    caption: 'Contemporary Tropical Modernist Residence · 3D Exterior Architectural Visualization',
  },
  {
    img: heroImg2,
    webp: heroImg2Webp,
    caption: 'Cantilevered Architectural Pavilion Study · Volumetric Elevation Rendering',
  },
] as const;

const SERVICE_ID_TO_CATEGORY: Record<ServiceItem['id'], ServiceCategory> = {
  construction: 'Construction',
  survey: 'Survey',
  '3d-design': '3D Design',
};

const ENGINEERING_PILLARS = [
  {
    title: 'Engineering-Focused Approach',
    description:
      'Every proposal is guided by sound civil engineering principles, verified structural calculations, and rigorous technical review.',
  },
  {
    title: 'Detailed Project Planning',
    description:
      'Comprehensive scheduling, material specification, and phase mapping prevent site bottlenecks and reduce rework costs.',
  },
  {
    title: 'Proven Construction Experience',
    description:
      'Documented subcontract structural works on major institutional buildings including RCC foundations, columns, beams, and slabs.',
  },
  {
    title: 'Photorealistic Architectural 3D',
    description:
      'High-fidelity visualizations enable clients and engineers to preview daylighting, elevations, and finishes before casting concrete.',
  },
  {
    title: 'Attention to Structural Quality',
    description:
      'Strict adherence to engineering drawings, reinforcement details, shuttering tolerances, and concrete curing protocols.',
  },
  {
    title: 'Client-Oriented Coordination',
    description:
      'Transparent communication, direct engineering contact, and proactive site supervision from initial survey to final handover.',
  },
] as const;

export const Home: React.FC<HomeProps> = ({
  onNavigate,
  onOpenProjectModal,
  onOpenContactModal,
}) => {
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, []);

  // Primary 4 actual projects from verified documents
  const featuredProjects = PROJECTS.slice(0, 4);

  return (
    <div className="w-full">
      {/* ===================== HERO SECTION ===================== */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#242918]">
        {/* Full-Screen Architectural Background Slider */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={slide.caption}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              activeHeroSlide === idx ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          >
            <picture className="block w-full h-full">
              <source srcSet={slide.webp} type="image/webp" />
              <img
                src={slide.img}
                alt={slide.caption}
                width={1376}
                height={768}
                loading="eager"
                decoding="async"
                fetchPriority={idx === 0 ? 'high' : 'auto'}
                className="w-full h-full object-cover object-center brightness-[0.75] contrast-[1.04]"
              />
            </picture>
          </div>
        ))}

        {/* Architectural Restrained Dark Tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#242918] via-[#242918]/50 to-black/55 pointer-events-none" />

        {/* Hero Content Container */}
        <div className="relative z-10 corporate-container py-32 sm:py-36 flex flex-col justify-center min-h-[92vh]">
          <div className="max-w-3xl space-y-6">
            {/* Main Heading with Fancy Entry Attraction Font */}
            <h1 className="font-fancy-entry font-bold text-4xl sm:text-6xl lg:text-[72px] text-white tracking-[0.02em] leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.65)]">
              Building Trust. <br />
              <span className="text-[#DECA8D] font-bold">
                Creating Landmarks.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-white/90 font-normal max-w-2xl leading-relaxed">
              Civil engineering, planned construction, and precision surveying delivered with excellence, reliability, and strong foundations.
            </p>

            {/* CTA Buttons with restrained 2-4px radius */}
            <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
              <button
                type="button"
                onClick={() => onNavigate('projects')}
                className="w-full sm:w-auto px-4 py-2 bg-[#C6A65B] hover:bg-[#DECA8D] text-[#292B27] font-semibold text-[11px] uppercase tracking-wider rounded-[3px] transition-colors duration-150 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
              >
                <span>Explore Our Projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenContactModal()}
                className="w-full sm:w-auto px-4 py-2 bg-[#343A24]/90 hover:bg-[#343A24] text-white border border-[#C6A65B]/40 hover:border-[#C6A65B] font-medium text-[11px] uppercase tracking-wider rounded-[3px] transition-colors duration-150 flex items-center justify-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
              >
                <span>Discuss Your Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A65B]" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== COMPANY INTRODUCTION ===================== */}
      <section id="intro-section" className="py-24 sm:py-28 bg-[#F5F4EF] border-b border-[#292B27]/10">
        <div className="corporate-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
                  Engineering Practice · Feroke, Calicut
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-semibold text-[#343A24] leading-tight">
                  Engineering with Purpose. <br />
                  Building with Precision.
                </h2>
              </div>

              <div className="space-y-4 text-[15px] sm:text-base text-[#4A4D46] leading-relaxed">
                <p>
                  <strong className="text-[#292B27]">{COMPANY_INFO.fullName}</strong> is a civil engineering and construction company committed to delivering high-quality construction solutions with excellence, reliability and professionalism across Kerala.
                </p>
                <p>
                  Our services focus on planning, designing and executing construction projects with strict attention to quality, safety and customer satisfaction. We aim to turn our clients' visions into reality through innovative ideas, skilled workmanship and strong foundations.
                </p>
              </div>

              {/* 3 Core Pillars Pill-less Clean List */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-[#292B27]/10">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#343A24]">
                    <Building2 className="w-4 h-4 text-[#C6A65B] shrink-0" />
                    <span><span className="font-numeric">01.</span> Construction</span>
                  </div>
                  <p className="text-xs text-[#77786F] leading-relaxed">
                    RCC foundations, columns, beams, slabs, and planned structural execution.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#343A24]">
                    <Compass className="w-4 h-4 text-[#C6A65B] shrink-0" />
                    <span><span className="font-numeric">02.</span> Survey</span>
                  </div>
                  <p className="text-xs text-[#77786F] leading-relaxed">
                    Topographic site measurement, boundary demarcation, and baseline setting.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#343A24]">
                    <Box className="w-4 h-4 text-[#C6A65B] shrink-0" />
                    <span><span className="font-numeric">03.</span> 3D Design</span>
                  </div>
                  <p className="text-xs text-[#77786F] leading-relaxed">
                    Photorealistic 3D exterior renders and spatial volumetric analysis.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#343A24] hover:text-[#C6A65B] transition-colors duration-150 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#343A24]"
                >
                  <span>Learn About Our Approach & Credentials</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Architectural Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative">
                <div className="aspect-[4/3] rounded-[2px] overflow-hidden border border-[#292B27]/12 shadow-sm">
                  <picture className="block w-full h-full">
                    <source srcSet={heroImg2Webp} type="image/webp" />
                    <img
                      src={heroImg2}
                      alt="Architectural 3D exterior elevation design study by K S Associates in Feroke, Calicut"
                      width={1376}
                      height={768}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                </div>
                {/* Architectural Fact Plate */}
                <div className="mt-4 p-4 bg-white rounded-[2px] border border-[#292B27]/10 text-xs text-[#4A4D46] space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#C6A65B] block font-semibold">
                    Documented Structural Subcontract Works
                  </span>
                  <p className="font-medium text-[#292B27]">
                    Govt. ITI Building SC Development, Tuneri, Kerala.
                  </p>
                  <p className="text-[11px] text-[#77786F]">
                    Certified execution of RCC foundations, columns, beams, and slabs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES OVERVIEW ===================== */}
      <section className="py-24 sm:py-28 bg-white border-b border-[#292B27]/10">
        <div className="corporate-container">
          <div className="max-w-3xl mb-14 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
              Core Practice Areas
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold text-[#343A24]">
              What We Do
            </h2>
            <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
              We offer three integrated disciplines that ensure complete engineering control from initial site survey to structural construction and 3D architectural visualization.
            </p>
          </div>

          {/* Exactly Three Primary Services in Structured Editorial Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <div
                key={service.id}
                className="group flex flex-col bg-[#F5F4EF] rounded-[2px] overflow-hidden border border-[#292B27]/10 hover:border-[#343A24] transition-colors duration-150"
              >
                {/* Service Image with 16/10 aspect ratio */}
                <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                  <picture className="block w-full h-full">
                    {service.thumbnailWebp && (
                      <source srcSet={service.thumbnailWebp} type="image/webp" />
                    )}
                    <img
                      src={service.image}
                      alt={`${service.title} service in Feroke, Calicut — ${service.highlightText}`}
                      width={1280}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </picture>
                  <div className="absolute top-3 left-3 bg-[#343A24] text-[#C6A65B] font-numeric text-xs font-bold px-2 py-0.5 rounded-[2px]">
                    {service.number}
                  </div>
                </div>

                {/* Service Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-heading font-semibold text-[#343A24]">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#292B27]/10 flex items-center justify-between text-xs">
                    <button
                      type="button"
                      onClick={() => onNavigate('services')}
                      className="uppercase tracking-wider font-semibold text-[#343A24] hover:text-[#C6A65B] transition-colors duration-150 flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#343A24]"
                    >
                      <span>Explore Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => onOpenContactModal(SERVICE_ID_TO_CATEGORY[service.id])}
                      className="text-[#C6A65B] hover:text-[#292B27] font-medium transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#343A24]"
                    >
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FEATURED PROJECTS ===================== */}
      <section className="py-24 sm:py-28 bg-[#F5F4EF] border-b border-[#292B27]/10">
        <div className="corporate-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
                Selected Portfolio
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold text-[#343A24]">
                Selected Projects
              </h2>
              <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
                Actual architectural proposals, commercial developments, residential villas, and verified civil subcontract works.
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#343A24] text-[#C6A65B] hover:bg-[#242918] text-xs font-semibold uppercase tracking-wider rounded-[3px] transition-colors duration-150 self-start md:self-auto focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
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
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/5">
                    <picture className="block w-full h-full">
                      {project.thumbnailWebp && (
                        <source srcSet={project.thumbnailWebp} type="image/webp" />
                      )}
                      <img
                        src={project.image}
                        alt={`${project.title} in ${project.location} — ${project.projectType} 3D architectural design and plans`}
                        width={1280}
                        height={778}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </picture>

                    {/* Clean unboxed status tag */}
                    <div className="absolute top-3 left-3 bg-[#343A24] text-white text-[11px] px-2.5 py-1 rounded-[2px] flex items-center gap-1.5 font-medium">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          project.status === 'Completed' ? 'bg-emerald-400' : 'bg-[#C6A65B]'
                        }`}
                      />
                      <span>{project.status}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2.5">
                    {/* Unboxed metadata with typographic separators */}
                    <div className="flex items-center gap-2 text-xs text-[#77786F]">
                      <span className="font-semibold text-[#C6A65B] uppercase tracking-wider">
                        {project.projectType}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C6A65B] shrink-0" />
                        {project.location}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-heading font-semibold text-[#343A24] group-hover:text-[#C6A65B] transition-colors duration-150 leading-snug">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#4A4D46] line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="px-6 py-3.5 bg-[#F5F4EF] border-t border-[#292B27]/10 flex items-center justify-between text-xs text-[#292B27]">
                  <span className="font-medium group-hover:text-[#C6A65B] transition-colors flex items-center gap-1">
                    <span>View Drawings & Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  {project.totalArea && (
                    <span className="font-numeric text-[#77786F] text-[11px]">{project.totalArea}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== WHY K S ASSOCIATES ===================== */}
      <section className="py-24 sm:py-28 bg-white border-b border-[#292B27]/10">
        <div className="corporate-container">
          <div className="max-w-3xl mb-14 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
              Engineering Discipline
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-heading font-semibold text-[#343A24]">
              Built on Planning. Driven by Precision.
            </h2>
            <p className="text-sm sm:text-base text-[#4A4D46] leading-relaxed">
              Our approach is defined by engineering integrity, systematic documentation, and transparent coordination across every phase of your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ENGINEERING_PILLARS.map((item, idx) => (
              <div
                key={item.title}
                className="p-6 bg-[#F5F4EF] rounded-[2px] border border-[#292B27]/10 space-y-2.5"
              >
                <div className="w-7 h-7 bg-[#343A24] text-[#C6A65B] flex items-center justify-center font-numeric text-xs font-bold rounded-[2px]">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-heading font-semibold text-[#343A24]">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4A4D46] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CALL TO ACTION ===================== */}
      <section className="py-20 sm:py-24 bg-[#343A24] text-white">
        <div className="corporate-container text-center space-y-6">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C6A65B]">
            Start Your Next Project
          </span>
          <h2 className="text-3xl sm:text-5xl font-heading font-semibold text-white leading-tight">
            Have a Project in Mind?
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
            Let's discuss your next construction, surveying or 3D design requirement with our engineering team in Feroke, Calicut.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={() => onOpenContactModal()}
              className="w-full sm:w-auto px-7 py-3 bg-[#C6A65B] text-[#292B27] hover:bg-[#DECA8D] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-white"
            >
              Contact Us
            </button>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                COMPANY_INFO.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
            >
              WhatsApp Enquiry
            </a>
          </div>

          <div className="pt-6 text-xs text-white/60 flex flex-wrap items-center justify-center gap-4">
            <span>Direct Call: <strong className="text-white font-numeric">{COMPANY_INFO.displayPhone}</strong></span>
            <span aria-hidden="true">·</span>
            <span>Office: Farook Hospital Complex, Feroke</span>
            <span aria-hidden="true">·</span>
            <span>GSTIN: <strong className="font-numeric">{COMPANY_INFO.gstin}</strong></span>
          </div>
        </div>
      </section>
    </div>
  );
};
