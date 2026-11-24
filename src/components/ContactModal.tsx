/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Contact Modal (Refined Standard)
 */

import React, { useId, useRef } from 'react';
import { ContactForm } from './ContactForm';
import { ServiceCategory } from '../types/app';
import { useDialogBehavior } from '../hooks/useDialogBehavior';
import { X } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: ServiceCategory | '';
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultService,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useDialogBehavior(isOpen, onClose, modalRef);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 flex items-start justify-center p-4"
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-lg bg-[#F5F4EF] rounded-[3px] border border-[#292B27]/20 shadow-2xl overflow-hidden focus:outline-none"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#343A24] text-white border-b border-[#C6A65B]/20">
          <div>
            <h3 id={titleId} className="font-heading text-lg sm:text-xl font-semibold tracking-normal text-white">
              Discuss Your Project
            </h3>
            <p className="text-[11px] text-[#C6A65B] uppercase tracking-wider font-semibold">
              K S Associates · Engineering Consultation
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] p-2 flex items-center justify-center text-white/80 hover:text-white rounded-[2px] hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A65B]"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          <ContactForm defaultService={defaultService} />
        </div>
      </div>
    </div>
  );
};
