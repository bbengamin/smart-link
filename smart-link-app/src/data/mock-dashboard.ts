/**
 * Mock data for the Business Dashboard (demo mode).
 * Replaced by live DB queries when Supabase is connected.
 */

export interface MockBooking {
  id: string;
  customerName: string;
  customerPhone: string;
  service: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  total: number;
}

export interface MockStats {
  totalRevenue: number;
  bookingsThisMonth: number;
  pendingBookings: number;
  avgRating: number;
  reviewCount: number;
  bookingsByDay: { day: string; count: number }[];
  topServices: { name: string; bookings: number; revenue: number }[];
}

export const mockBookings: MockBooking[] = [
  { id: "b1", customerName: "James Wilson", customerPhone: "+1 (555) 012-3456", service: "Haircut", date: "2026-05-30", time: "10:00", status: "confirmed", total: 30 },
  { id: "b2", customerName: "Maria Garcia", customerPhone: "+1 (555) 234-5678", service: "Fade + Beard", date: "2026-05-30", time: "11:30", status: "pending", total: 45 },
  { id: "b3", customerName: "David Chen", customerPhone: "+1 (555) 345-6789", service: "Hot Towel Shave", date: "2026-05-31", time: "09:00", status: "confirmed", total: 35 },
  { id: "b4", customerName: "Sarah Johnson", customerPhone: "+1 (555) 456-7890", service: "Kids Cut", date: "2026-05-31", time: "14:00", status: "pending", total: 22 },
  { id: "b5", customerName: "Mike Brown", customerPhone: "+1 (555) 567-8901", service: "Haircut", date: "2026-06-01", time: "13:00", status: "confirmed", total: 30 },
  { id: "b6", customerName: "Alex Rivera", customerPhone: "+1 (555) 678-9012", service: "Beard Trim", date: "2026-06-01", time: "15:30", status: "pending", total: 20 },
  { id: "b7", customerName: "Tom Anderson", customerPhone: "+1 (555) 789-0123", service: "Hair Design", date: "2026-06-02", time: "10:30", status: "confirmed", total: 40 },
  { id: "b8", customerName: "Chris Lee", customerPhone: "+1 (555) 890-1234", service: "Fade + Beard", date: "2026-06-02", time: "16:00", status: "cancelled", total: 45 },
];

export const mockStats: MockStats = {
  totalRevenue: 4820,
  bookingsThisMonth: 47,
  pendingBookings: 12,
  avgRating: 4.9,
  reviewCount: 127,
  bookingsByDay: [
    { day: "Mon", count: 8 },
    { day: "Tue", count: 6 },
    { day: "Wed", count: 9 },
    { day: "Thu", count: 7 },
    { day: "Fri", count: 11 },
    { day: "Sat", count: 14 },
    { day: "Sun", count: 2 },
  ],
  topServices: [
    { name: "Haircut", bookings: 18, revenue: 540 },
    { name: "Fade + Beard", bookings: 12, revenue: 540 },
    { name: "Beard Trim", bookings: 8, revenue: 160 },
    { name: "Hot Towel Shave", bookings: 5, revenue: 175 },
    { name: "Hair Design", bookings: 4, revenue: 160 },
  ],
};
