/**
 * Client-side multi-step booking form.
 * Steps: Date → Service → Details → Confirmation
 */

"use client";

import { useState, useMemo, useCallback } from "react";
import { track } from "@/lib/analytics";
import { submitBooking, BookingFormData } from "./action";

interface Service {
  id?: string;
  name: string;
  description?: string;
  price: number; // cents
  duration_minutes: number;
  category?: string;
}

interface BusinessHours {
  [day: string]: { open: string; close: string };
}

interface BookingFormProps {
  businessSlug: string;
  businessName: string;
  services: Service[];
  hours: BusinessHours;
  isDemo: boolean;
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_LABELS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function generateTimeSlots(
  date: Date,
  hours: BusinessHours,
  serviceDuration: number
): string[] {
  const dayKey = DAY_LABELS[date.getDay()].toLowerCase();
  const dayHours = hours[dayKey];
  if (!dayHours) return [];

  const [openH, openM] = dayHours.open.split(":").map(Number);
  const [closeH, closeM] = dayHours.close.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  const slots: string[] = [];
  let current = openMinutes;
  while (current + serviceDuration <= closeMinutes) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    slots.push(`${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}`);
    current += 30; // 30-min intervals
  }
  return slots;
}

function formatDate(date: Date): string {
  return `${MONTH_LABELS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

function isDateDisabled(date: Date, minDate: Date, maxDate: Date, hours: BusinessHours): boolean {
  if (date < minDate || date > maxDate) return true;
  const dayKey = DAY_LABELS[date.getDay()].toLowerCase();
  return !hours[dayKey];
}

export function BookingForm({
  businessSlug,
  businessName,
  services,
  hours,
  isDemo,
}: BookingFormProps) {
  // Step state: 0=date, 1=service, 2=details, 3=confirmation
  const [step, setStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; id?: string } | null>(null);

  // Calendar state
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const today = useMemo(() => {
    const t = new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);

  const minDate = today;
  const maxDate = useMemo(() => {
    const d = new Date(today);
    d.setDate(d.getDate() + 30);
    return d;
  }, [today]);

  // Calendar grid
  const calendarDays = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = [];

    // Padding for first week
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d));
    }

    return days;
  }, [viewDate]);

  // Available time slots for selected date
  const timeSlots = useMemo(() => {
    if (!selectedDate || !selectedService) return [];
    return generateTimeSlots(selectedDate, hours, selectedService.duration_minutes);
  }, [selectedDate, selectedService, hours]);

  // Check if a date has available slots
  const hasAvailableSlots = useCallback(
    (date: Date) => {
      const slots = generateTimeSlots(date, hours, selectedService?.duration_minutes || 60);
      return slots.length > 0;
    },
    [hours, selectedService]
  );

  const handleDateSelect = (date: Date) => {
    if (isDateDisabled(date, minDate, maxDate, hours)) return;
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleNext = () => {
    if (step === 0 && selectedDate) setStep(1);
    else if (step === 1 && selectedService) setStep(2);
    else if (step === 2) handleSubmit();
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !selectedService) return;
    setIsSubmitting(true);

    const result = await submitBooking({
      businessSlug,
      serviceId: selectedService.id || selectedService.name,
      serviceName: selectedService.name,
      servicePrice: selectedService.price,
      serviceDuration: selectedService.duration_minutes,
      date: selectedDate.toISOString().split("T")[0],
      time: selectedTime,
      customerName,
      customerPhone,
      customerEmail,
      notes,
    });

    setIsSubmitting(false);
    if (result.success) {
      setBookingResult({ success: true, id: result.bookingId });
      setStep(3);
    } else {
      alert(result.error || "Failed to book. Try again.");
    }
  };

  const handleReset = () => {
    setStep(0);
    setSelectedDate(null);
    setSelectedTime(null);
    setSelectedService(null);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setNotes("");
    setBookingResult(null);
  };

  // Navigate calendar months
  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Progress bar */}
      {step < 3 && (
        <div className="px-6 pt-5 pb-3">
          <div className="flex items-center gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex items-center flex-1">
                <div
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    i <= step ? "bg-blue-600" : "bg-gray-100"
                  }`}
                />
                {i < 2 && (
                  <div className="w-3 shrink-0" />
                )}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-2">
            Step {step + 1} of 3
          </p>
        </div>
      )}

      <div className="p-6">
        {/* Step 0: Date Selection */}
        {step === 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Choose a Date</h2>
            <p className="text-sm text-gray-500 mb-5">
              Available for the next 30 days
            </p>

            {/* Calendar */}
            <div className="border border-gray-100 rounded-xl p-4 mb-4">
              {/* Month navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={prevMonth}
                  className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="font-medium text-gray-900">
                  {MONTH_LABELS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-1.5 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAY_LABELS.map((d) => (
                  <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">
                    {d}
                  </div>
                ))}
              </div>

              {/* Days */}
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((date, idx) => {
                  if (!date) return <div key={`empty-${idx}`} />;
                  const isToday = date.toDateString() === today.toDateString();
                  const isSelected = selectedDate?.toDateString() === date.toDateString();
                  const disabled = isDateDisabled(date, minDate, maxDate, hours);
                  const isPast = date < today;
                  const hasSlots = !isPast && hasAvailableSlots(date);

                  return (
                    <button
                      key={date.toISOString()}
                      onClick={() => handleDateSelect(date)}
                      disabled={disabled || isPast}
                      className={`
                        relative h-10 w-full rounded-lg text-sm font-medium transition-all
                        ${isSelected
                          ? "bg-blue-600 text-white shadow-sm"
                          : isToday
                            ? "border border-blue-300 text-blue-600"
                            : disabled || isPast
                              ? "text-gray-200 cursor-not-allowed"
                              : hasSlots
                                ? "text-gray-900 hover:bg-blue-50"
                                : "text-gray-300 cursor-not-allowed"
                        }
                      `}
                    >
                      {date.getDate()}
                      {/* Dot indicator for available slots */}
                      {!disabled && !isPast && !isSelected && hasSlots && (
                        <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-blue-400 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {selectedDate && (
              <p className="text-sm text-blue-600 font-medium mb-2">
                Selected: {formatDate(selectedDate)}
              </p>
            )}
          </div>
        )}

        {/* Step 1: Service Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">
              {selectedDate && `Select a Service — ${formatDate(selectedDate)}`}
            </h2>
            <p className="text-sm text-gray-500 mb-5">
              Pick the service you'd like to book
            </p>

            {timeSlots.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p className="text-4xl mb-3">📅</p>
                <p>This business is closed on the selected day.</p>
                <button
                  onClick={() => setStep(0)}
                  className="mt-3 text-blue-600 text-sm hover:underline"
                >
                  Choose a different date
                </button>
              </div>
            ) : selectedService ? (
              <>
                {/* Time slots */}
                <h3 className="text-sm font-medium text-gray-700 mb-3">Available Times</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mb-6">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`
                        py-2.5 px-3 rounded-xl text-sm font-medium border transition-all
                        ${selectedTime === time
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-100 bg-white text-gray-700 hover:border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      {time}
                    </button>
                  ))}
                </div>

                {/* Selected service + back to services */}
                <div className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{selectedService.name}</p>
                      <p className="text-sm text-gray-500">
                        {formatPrice(selectedService.price)} · {selectedService.duration_minutes} min
                      </p>
                    </div>
                    <span className="text-sm font-medium text-blue-600">
                      {selectedTime}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => { setSelectedService(null); setSelectedTime(null); }}
                  className="text-sm text-blue-600 hover:underline mb-4"
                >
                  ← Choose a different service
                </button>
              </>
            ) : (
              <div className="space-y-2">
                {services.map((service) => (
                  <button
                    key={service.id || service.name}
                    onClick={() => setSelectedService(service)}
                    className="w-full flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl hover:border-gray-200 hover:shadow-sm transition-all text-left"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      {service.description && (
                        <p className="text-sm text-gray-400 mt-0.5">{service.description}</p>
                      )}
                      <p className="text-xs text-gray-400 mt-1">
                        {service.duration_minutes} min
                      </p>
                    </div>
                    <span className="font-semibold text-gray-900 ml-4 shrink-0">
                      {formatPrice(service.price)}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Customer Details */}
        {step === 2 && selectedService && selectedDate && selectedTime && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-1">Your Details</h2>
            <p className="text-sm text-gray-500 mb-5">
              Fill in your info to complete the booking
            </p>

            {/* Booking summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-gray-400">Service</span>
                  <p className="font-medium text-gray-900">{selectedService.name}</p>
                </div>
                <div>
                  <span className="text-gray-400">Price</span>
                  <p className="font-medium text-gray-900">{formatPrice(selectedService.price)}</p>
                </div>
                <div>
                  <span className="text-gray-400">Date</span>
                  <p className="font-medium text-gray-900">{formatDate(selectedDate)}</p>
                </div>
                <div>
                  <span className="text-gray-400">Time</span>
                  <p className="font-medium text-gray-900">{selectedTime}</p>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && bookingResult && (
          <div className="text-center py-6">
            {bookingResult.success ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Confirmed!</h2>
                <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                  {isDemo
                    ? "This is a demo booking. In production, you'd receive an SMS and email confirmation."
                    : `A confirmation has been sent to ${customerEmail || "your phone"}.`
                  }
                </p>
                <div className="inline-flex flex-col items-center gap-3">
                  <a
                    href={`/business/${businessSlug}`}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    Back to {businessName}
                  </a>
                  <button
                    onClick={handleReset}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Make another booking
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Booking Failed</h2>
                <p className="text-gray-500 mb-6">{bookingResult.id || "An error occurred."}</p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  Try Again
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer actions */}
      {step < 3 && (
        <div className="px-6 pb-6 flex gap-3">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="px-5 py-3 border border-gray-200 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={
              isSubmitting ||
              (step === 0 && !selectedDate) ||
              (step === 1 && (!selectedService || (selectedService && !selectedTime))) ||
              (step === 2 && !customerName.trim())
            }
            className={`
              flex-1 py-3 rounded-xl text-sm font-semibold transition-all
              ${
                isSubmitting ||
                (step === 0 && !selectedDate) ||
                (step === 1 && (!selectedService || (selectedService && !selectedTime))) ||
                (step === 2 && !customerName.trim())
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-500 text-white shadow-sm hover:shadow-md"
              }
            `}
          >
            {isSubmitting
              ? "Booking..."
              : step === 2
                ? "Confirm Booking"
                : "Continue"
            }
          </button>
        </div>
      )}
    </div>
  );
}
