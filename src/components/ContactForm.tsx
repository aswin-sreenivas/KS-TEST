/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Enquiry Form Component
 */

import React, { useState, useEffect, useId } from 'react';
import { COMPANY_INFO } from '../data/company';
import { FORM_ENDPOINT } from '../config/site';
import { ServiceCategory } from '../types/app';
import { saveStoredEnquiry } from '../utils/storage';
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  MessageSquare,
  Loader2,
} from 'lucide-react';

interface ContactFormProps {
  defaultService?: ServiceCategory | '';
  onSuccess?: () => void;
  className?: string;
}

export interface EnquiryFormState {
  fullName: string;
  phone: string;
  email: string;
  serviceRequired: ServiceCategory | '';
  projectLocation: string;
  message: string;
}

export type EnquiryFormErrors = Partial<Record<keyof EnquiryFormState, string>>;

export function normalizeIndianPhone(rawPhone: string): string | null {
  const trimmed = rawPhone.trim();
  if (!trimmed || !/^[0-9+\s\-()]+$/.test(trimmed)) {
    return null;
  }

  const compact = trimmed.replace(/[\s\-()]/g, '');
  let localDigits = compact;

  if (compact.startsWith('+91')) {
    localDigits = compact.slice(3);
  } else if (compact.startsWith('91') && compact.length === 12) {
    localDigits = compact.slice(2);
  } else if (compact.startsWith('+')) {
    return null;
  }

  return /^\d{10}$/.test(localDigits) ? localDigits : null;
}

export function validateEnquiryForm(data: EnquiryFormState): EnquiryFormErrors {
  const errs: EnquiryFormErrors = {};

  if (!data.fullName.trim()) {
    errs.fullName = 'Full Name is required';
  }

  if (!data.phone.trim()) {
    errs.phone = 'Phone number is required';
  } else if (!normalizeIndianPhone(data.phone)) {
    errs.phone = 'Please enter a valid 10-digit phone number (optional +91 prefix)';
  }

  if (!data.email.trim()) {
    errs.email = 'Email address is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
    errs.email = 'Please provide a valid email address';
  }

  if (!data.serviceRequired) {
    errs.serviceRequired = 'Please select a service (Construction, Survey, or 3D Design)';
  }

  if (!data.projectLocation.trim()) {
    errs.projectLocation = 'Project location is required';
  }

  const detailsTrimmed = data.message.trim();
  if (!detailsTrimmed) {
    errs.message = 'Please enter your project details';
  } else if (detailsTrimmed.length < 10) {
    errs.message = 'Please provide at least 10 characters describing your project';
  }

  return errs;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultService = '',
  onSuccess,
  className = '',
}) => {
  const formIdPrefix = useId();

  const [formData, setFormData] = useState<EnquiryFormState>({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: defaultService || '',
    projectLocation: '',
    message: '',
  });

  const [honeypot, setHoneypot] = useState('');
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceRequired: defaultService || prev.serviceRequired,
    }));
  }, [defaultService]);

  const updateField = <K extends keyof EnquiryFormState>(
    field: K,
    value: EnquiryFormState[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (submitError) {
      setSubmitError('');
    }
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const buildWhatsAppUrl = (refCode?: string) => {
    const lines = [
      'Hello K S Associates,',
      refCode ? `Enquiry Ref: ${refCode}` : null,
      `Name: ${formData.fullName.trim() || '-'}`,
      `Phone: ${formData.phone.trim() || '-'}`,
      `Email: ${formData.email.trim() || '-'}`,
      `Service: ${formData.serviceRequired || '-'}`,
      `Project Location: ${formData.projectLocation.trim() || '-'}`,
      `Project Details: ${formData.message.trim() || '-'}`,
    ].filter(Boolean);

    return `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
      lines.join('\n')
    )}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    // Silent spam trap for automated bots filling hidden honeypot field
    if (honeypot.trim().length > 0) {
      setReferenceId(`KSA-${Date.now().toString().slice(-6)}`);
      setSubmissionSuccess(true);
      return;
    }

    const validationErrors = validateEnquiryForm(formData);
    setErrors(validationErrors);
    setSubmitError('');

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    const trimmedPayload = {
      fullName: formData.fullName.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim(),
      serviceRequired: formData.serviceRequired,
      projectLocation: formData.projectLocation.trim(),
      message: formData.message.trim(),
    };

    const generatedRef = `KSA-${Date.now().toString().slice(-6)}`;
    const isPlaceholderEndpoint = FORM_ENDPOINT.includes('YOUR_FORM_ID');

    try {
      if (!isPlaceholderEndpoint) {
        const response = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            referenceId: generatedRef,
            fullName: trimmedPayload.fullName,
            phone: trimmedPayload.phone,
            email: trimmedPayload.email,
            service: trimmedPayload.serviceRequired,
            projectLocation: trimmedPayload.projectLocation,
            projectDetails: trimmedPayload.message,
            _subject: `New Enquiry (${generatedRef}) – ${trimmedPayload.serviceRequired}`,
          }),
        });

        if (!response.ok) {
          throw new Error(`Submission failed with status ${response.status}`);
        }
      }

      saveStoredEnquiry({
        ref: generatedRef,
        ...trimmedPayload,
        submittedAt: new Date().toISOString(),
      });

      setReferenceId(generatedRef);
      setSubmissionSuccess(true);

      if (onSuccess) {
        onSuccess();
      }
    } catch {
      setSubmitError(
        'We could not submit the form over the network right now. Please try again or send your details directly via WhatsApp below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submissionSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white p-6 sm:p-8 rounded-[2px] border border-[#292B27]/12 text-center space-y-4"
      >
        <div className="w-12 h-12 bg-[#343A24] text-[#C6A65B] rounded-[2px] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-heading font-semibold text-[#343A24]">
            Enquiry Submitted
          </h3>
          <p className="text-xs text-[#77786F] mt-1">
            Reference Number:{' '}
            <span className="font-numeric font-bold text-[#292B27] bg-[#F5F4EF] px-2 py-0.5 rounded-[2px]">
              {referenceId}
            </span>
          </p>
        </div>
        <p className="text-xs sm:text-sm text-[#4A4D46] max-w-md mx-auto leading-relaxed">
          Thank you, <strong>{formData.fullName}</strong>. Your enquiry regarding{' '}
          <strong>{formData.serviceRequired}</strong> at{' '}
          <strong>{formData.projectLocation}</strong> has been logged. For fastest response from our engineering desk, you can also send these details directly on WhatsApp.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={buildWhatsAppUrl(referenceId)}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366] text-[#17211B] hover:bg-[#20bd5a] rounded-[3px] font-semibold text-xs uppercase tracking-wider transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send via WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmissionSuccess(false);
              setErrors({});
              setSubmitError('');
              setFormData({
                fullName: '',
                phone: '',
                email: '',
                serviceRequired: defaultService || '',
                projectLocation: '',
                message: '',
              });
            }}
            className="min-h-[44px] px-5 py-2.5 bg-[#F5F4EF] text-[#292B27] rounded-[3px] font-medium text-xs uppercase tracking-wider hover:bg-[#ECEAE2] transition-colors border border-[#292B27]/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  const fullNameId = `${formIdPrefix}-fullName`;
  const phoneId = `${formIdPrefix}-phone`;
  const emailId = `${formIdPrefix}-email`;
  const serviceId = `${formIdPrefix}-service`;
  const locationId = `${formIdPrefix}-location`;
  const messageId = `${formIdPrefix}-message`;
  const gotchaId = `${formIdPrefix}-gotcha`;

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-4 ${className}`}>
      {/* Honeypot anti-spam trap */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={gotchaId}>Leave this field blank</label>
        <input
          id={gotchaId}
          name="_gotcha"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {submitError && (
        <div
          role="alert"
          className="p-3.5 bg-red-50 border border-red-200 rounded-[2px] text-xs text-red-800 space-y-2.5"
        >
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-700" />
            <span>{submitError}</span>
          </div>
          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#343A24] text-[#C6A65B] rounded-[3px] font-semibold text-xs uppercase tracking-wider hover:bg-[#242918] transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Send via WhatsApp Instead</span>
          </a>
        </div>
      )}

      {/* Full Name */}
      <div>
        <label
          htmlFor={fullNameId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#343A24] mb-1"
        >
          Full Name <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <input
          id={fullNameId}
          name="fullName"
          type="text"
          autoComplete="name"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.fullName)}
          aria-describedby={errors.fullName ? `${fullNameId}-error` : undefined}
          value={formData.fullName}
          onChange={(e) => updateField('fullName', e.target.value)}
          placeholder="Enter your full name"
          className={`w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-[3px] text-base sm:text-sm text-[#292B27] placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
            errors.fullName ? 'border-red-600 bg-red-50/20' : 'border-[#292B27]/18'
          }`}
        />
        {errors.fullName && (
          <p id={`${fullNameId}-error`} role="alert" className="text-red-700 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.fullName}
          </p>
        )}
      </div>

      {/* Phone & Email Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={phoneId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#343A24] mb-1"
          >
            Phone Number <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <input
            id={phoneId}
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? `${phoneId}-error` : undefined}
            value={formData.phone}
            onChange={(e) => updateField('phone', e.target.value)}
            placeholder={COMPANY_INFO.displayPhone}
            className={`w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-[3px] text-base sm:text-sm text-[#292B27] placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
              errors.phone ? 'border-red-600 bg-red-50/20' : 'border-[#292B27]/18'
            }`}
          />
          {errors.phone && (
            <p id={`${phoneId}-error`} role="alert" className="text-red-700 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor={emailId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#343A24] mb-1"
          >
            Email Address <span className="text-red-700" aria-hidden="true">*</span>
          </label>
          <input
            id={emailId}
            name="email"
            type="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${emailId}-error` : undefined}
            value={formData.email}
            onChange={(e) => updateField('email', e.target.value)}
            placeholder="name@domain.com"
            className={`w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-[3px] text-base sm:text-sm text-[#292B27] placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
              errors.email ? 'border-red-600 bg-red-50/20' : 'border-[#292B27]/18'
            }`}
          />
          {errors.email && (
            <p id={`${emailId}-error`} role="alert" className="text-red-700 text-xs mt-1 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Service Required: Construction, Survey, 3D Design */}
      <div>
        <label
          htmlFor={serviceId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#343A24] mb-1"
        >
          Service Required <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <select
          id={serviceId}
          name="serviceRequired"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.serviceRequired)}
          aria-describedby={errors.serviceRequired ? `${serviceId}-error` : undefined}
          value={formData.serviceRequired}
          onChange={(e) => updateField('serviceRequired', e.target.value as ServiceCategory | '')}
          className={`w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-[3px] text-base sm:text-sm text-[#292B27] focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
            errors.serviceRequired ? 'border-red-600 bg-red-50/20' : 'border-[#292B27]/18'
          }`}
        >
          <option value="">Select Service (Construction / Survey / 3D Design)</option>
          <option value="Construction">Construction (Building & RCC Structural Works)</option>
          <option value="Survey">Survey (Plot Boundary, Topography & Baselines)</option>
          <option value="3D Design">3D Design (Architectural Visualization & Facades)</option>
        </select>
        {errors.serviceRequired && (
          <p id={`${serviceId}-error`} role="alert" className="text-red-700 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.serviceRequired}
          </p>
        )}
      </div>

      {/* Project Location */}
      <div>
        <label
          htmlFor={locationId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#343A24] mb-1"
        >
          Project Location <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <input
          id={locationId}
          name="projectLocation"
          type="text"
          required
          aria-required="true"
          aria-invalid={Boolean(errors.projectLocation)}
          aria-describedby={errors.projectLocation ? `${locationId}-error` : undefined}
          value={formData.projectLocation}
          onChange={(e) => updateField('projectLocation', e.target.value)}
          placeholder="e.g. Feroke, Calicut / Kozhikode"
          className={`w-full min-h-[44px] px-3.5 py-2.5 bg-white border rounded-[3px] text-base sm:text-sm text-[#292B27] placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
            errors.projectLocation ? 'border-red-600 bg-red-50/20' : 'border-[#292B27]/18'
          }`}
        />
        {errors.projectLocation && (
          <p id={`${locationId}-error`} role="alert" className="text-red-700 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.projectLocation}
          </p>
        )}
      </div>

      {/* Project Details */}
      <div>
        <label
          htmlFor={messageId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#343A24] mb-1"
        >
          Project Details <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          minLength={10}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Describe plot size, proposed floors, structural scope, or 3D design requirements (min. 10 characters)..."
          className={`w-full px-3.5 py-2.5 bg-white border rounded-[3px] text-base sm:text-sm text-[#292B27] placeholder:text-black/35 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors resize-y ${
            errors.message ? 'border-red-600 bg-red-50/20' : 'border-[#292B27]/18'
          }`}
        />
        {errors.message && (
          <p id={`${messageId}-error`} role="alert" className="text-red-700 text-xs mt-1 flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Action & Instant WhatsApp Alternative */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-1 min-h-[44px] py-3 px-6 bg-[#343A24] text-[#C6A65B] hover:bg-[#242918] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#C6A65B]" />
              <span>Submitting Enquiry...</span>
            </>
          ) : (
            <>
              <span>Submit Enquiry</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>

        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] py-3 px-5 bg-[#F5F4EF] hover:bg-[#ECEAE2] text-[#292B27] border border-[#292B27]/18 font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#343A24]"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>Send via WhatsApp</span>
        </a>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#77786F] pt-1">
        <span>Office: Feroke, Calicut</span>
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="min-h-[44px] inline-flex items-center gap-1.5 text-[#343A24] hover:text-[#C6A65B] font-medium"
        >
          <Phone className="w-3.5 h-3.5 text-[#C6A65B]" />
          <span>
            Call: <strong className="font-numeric">{COMPANY_INFO.displayPhone}</strong>
          </span>
        </a>
      </div>
    </form>
  );
};
