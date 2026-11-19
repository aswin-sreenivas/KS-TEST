/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * K S Associates – Corporate Enquiry Form Component (Refined Standard)
 */

import React, { useState, useEffect, useRef, useId } from 'react';
import { COMPANY_INFO } from '../data/company';
import { ServiceCategory } from '../types/app';
import { saveStoredEnquiry } from '../utils/storage';
import { Send, CheckCircle2, AlertCircle, Phone, MessageSquare, Loader2 } from 'lucide-react';

interface ContactFormProps {
  defaultService?: ServiceCategory | '';
  onSuccess?: () => void;
  className?: string;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  serviceRequired: ServiceCategory | '';
  projectLocation: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormState, string>>;

export const ContactForm: React.FC<ContactFormProps> = ({
  defaultService = '',
  onSuccess,
  className = '',
}) => {
  const formIdPrefix = useId();
  const submitTimerRef = useRef<number | null>(null);

  const [formData, setFormData] = useState<FormState>({
    fullName: '',
    phone: '',
    email: '',
    serviceRequired: defaultService || '',
    projectLocation: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  // Keep defaultService synchronized if modal opens with a different preselected service
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      serviceRequired: defaultService || prev.serviceRequired,
    }));
  }, [defaultService]);

  // Clean up pending submit timer on unmount
  useEffect(() => {
    return () => {
      if (submitTimerRef.current !== null) {
        window.clearTimeout(submitTimerRef.current);
      }
    };
  }, []);

  const updateField = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full Name is required';
    }

    const phoneTrimmed = formData.phone.trim();
    const digitCount = phoneTrimmed.replace(/\D/g, '').length;
    if (!phoneTrimmed) {
      errs.phone = 'Phone number is required';
    } else if (!/^[0-9+\s\-()]{8,18}$/.test(phoneTrimmed) || digitCount < 8) {
      errs.phone = 'Please provide a valid phone number (min 8 digits)';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.serviceRequired) {
      errs.serviceRequired = 'Please select a primary service';
    }

    if (!formData.projectLocation.trim()) {
      errs.projectLocation = 'Project location / site address is required';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide brief details of your project requirements';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting || !validate()) {
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

    submitTimerRef.current = window.setTimeout(() => {
      submitTimerRef.current = null;
      const generatedRef = `KSA-${Date.now().toString().slice(-6)}`;

      saveStoredEnquiry({
        ref: generatedRef,
        ...trimmedPayload,
        submittedAt: new Date().toISOString(),
      });

      setReferenceId(generatedRef);
      setIsSubmitting(false);
      setSubmissionSuccess(true);

      if (onSuccess) {
        onSuccess();
      }
    }, 600);
  };

  const whatsappForwardText = `Hello K S Associates,\nMy name is ${formData.fullName.trim()}.\nEnquiry Ref: ${referenceId}\nService: ${formData.serviceRequired}\nLocation: ${formData.projectLocation.trim()}\nPhone: ${formData.phone.trim()}\nMessage: ${formData.message.trim()}`;
  const whatsappForwardUrl = `https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
    whatsappForwardText
  )}`;

  if (submissionSuccess) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="bg-white p-8 rounded-[2px] border border-[#292B27]/12 text-center space-y-4"
      >
        <div className="w-12 h-12 bg-[#343A24] text-[#C6A65B] rounded-[2px] mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-2xl font-heading font-semibold text-[#343A24]">
            Enquiry Received
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
          <strong>{formData.projectLocation}</strong> has been registered. Our engineering desk will review your details and contact you shortly.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={whatsappForwardUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#343A24] text-white rounded-[3px] font-semibold text-xs uppercase tracking-wider hover:bg-[#242918] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
          >
            <MessageSquare className="w-4 h-4 text-[#C6A65B]" />
            <span>Forward to WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={() => {
              setSubmissionSuccess(false);
              setErrors({});
              setFormData({
                fullName: '',
                phone: '',
                email: '',
                serviceRequired: defaultService || '',
                projectLocation: '',
                message: '',
              });
            }}
            className="px-5 py-2.5 bg-[#F5F4EF] text-[#292B27] rounded-[3px] font-medium text-xs uppercase tracking-wider hover:bg-[#ECEAE2] transition-colors border border-[#292B27]/10 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
          >
            Submit Another Request
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

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-4 ${className}`}>
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
          className={`w-full px-3.5 py-2.5 bg-white border rounded-[3px] text-sm text-[#292B27] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
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
            className={`w-full px-3.5 py-2.5 bg-white border rounded-[3px] text-sm text-[#292B27] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
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
            className={`w-full px-3.5 py-2.5 bg-white border rounded-[3px] text-sm text-[#292B27] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
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

      {/* Service Required: EXACTLY Construction, Survey, 3D Design */}
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
          className={`w-full px-3.5 py-2.5 bg-white border rounded-[3px] text-sm text-[#292B27] focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
            errors.serviceRequired ? 'border-red-600 bg-red-50/20' : 'border-[#292B27]/18'
          }`}
        >
          <option value="">Select Service (1. Construction / 2. Survey / 3. 3D Design)</option>
          <option value="Construction">1. Construction (Structural, RCC, Building)</option>
          <option value="Survey">2. Survey (Plot Boundary, Topography & Baselines)</option>
          <option value="3D Design">3. 3D Design (Architectural Visualization & Facades)</option>
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
          className={`w-full px-3.5 py-2.5 bg-white border rounded-[3px] text-sm text-[#292B27] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors ${
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

      {/* Message */}
      <div>
        <label
          htmlFor={messageId}
          className="block text-xs font-semibold uppercase tracking-wider text-[#343A24] mb-1"
        >
          Project Details / Requirements <span className="text-red-700" aria-hidden="true">*</span>
        </label>
        <textarea
          id={messageId}
          name="message"
          rows={4}
          required
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${messageId}-error` : undefined}
          value={formData.message}
          onChange={(e) => updateField('message', e.target.value)}
          placeholder="Describe plot dimensions, proposed floors, structural scope, or architectural rendering requirements..."
          className={`w-full px-3.5 py-2.5 bg-white border rounded-[3px] text-sm text-[#292B27] placeholder:text-black/30 focus:outline-none focus:ring-1 focus:ring-[#343A24] focus:border-[#343A24] transition-colors resize-none ${
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

      {/* Submit Action */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 bg-[#343A24] text-[#C6A65B] hover:bg-[#242918] font-semibold text-xs uppercase tracking-wider rounded-[3px] transition-colors duration-150 flex items-center justify-center gap-2 disabled:opacity-70 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C6A65B]"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-[#C6A65B]" />
            <span>Transmitting Enquiry...</span>
          </>
        ) : (
          <>
            <span>Submit Engineering Enquiry</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-between text-[11px] text-[#77786F] pt-1">
        <span>Office: Feroke, Calicut</span>
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          className="hover:text-[#292B27] flex items-center gap-1 font-numeric font-bold"
        >
          <Phone className="w-3 h-3 text-[#C6A65B]" />
          {COMPANY_INFO.displayPhone}
        </a>
      </div>
    </form>
  );
};
