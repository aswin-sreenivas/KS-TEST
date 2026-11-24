/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates Official Brand Logo
 * Preserves the exact official letterhead logo extracted from verified documents.
 */

import React from 'react';

const OFFICIAL_LOGO_PATH = '/assets/aistudio/Dark_Olive_Compass_Engineering_Logo_4658eaa5.png';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  showTagline = true,
  size = 'md',
}) => {
  const isLight = variant === 'light';

  const logoHeights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
  };

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Uploaded Compass Logo (white mark on dark surfaces, dark olive on light surfaces) */}
      <div className="flex items-center justify-center shrink-0 bg-transparent">
        <img
          src={OFFICIAL_LOGO_PATH}
          alt="K S Associates – Official Logo"
          width={2129}
          height={739}
          loading="eager"
          decoding="sync"
          className={`${logoHeights[size]} w-auto object-contain block ${
            isLight ? 'brightness-0 invert' : ''
          }`}
        />
      </div>

      {/* Official Tagline */}
      {showTagline && (
        <div className="flex flex-col justify-center border-l border-white/20 pl-3.5 leading-tight">
          <span
            className={`font-heading text-xs tracking-wide uppercase font-semibold ${
              isLight ? 'text-white' : 'text-[#343A24]'
            }`}
          >
            Engineering Construction & Surveying
          </span>
          <span
            className={`text-[11px] font-normal tracking-normal mt-0.5 ${
              isLight ? 'text-[#C6A65B]' : 'text-[#77786F]'
            }`}
          >
            Feroke · Calicut, Kerala
          </span>
        </div>
      )}
    </div>
  );
};
