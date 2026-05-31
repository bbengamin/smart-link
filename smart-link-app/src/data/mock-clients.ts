/**
 * Mock data for the Client List View (demo mode).
 * Replaced by live DB queries when Supabase is connected.
 */

export interface MockClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalBookings: number;
  lastVisit: string;
  totalSpent: number;
  favoriteService: string;
  status: "active" | "inactive" | "new";
}

export const mockClients: MockClient[] = [
  { id: "c1", name: "James Wilson", phone: "+1 (555) 012-3456", email: "james.w@email.com", totalBookings: 12, lastVisit: "2026-05-30", totalSpent: 380, favoriteService: "Haircut", status: "active" },
  { id: "c2", name: "Maria Garcia", phone: "+1 (555) 234-5678", email: "maria.g@email.com", totalBookings: 8, lastVisit: "2026-05-30", totalSpent: 340, favoriteService: "Fade + Beard", status: "active" },
  { id: "c3", name: "David Chen", phone: "+1 (555) 345-6789", email: "david.c@email.com", totalBookings: 15, lastVisit: "2026-05-31", totalSpent: 520, favoriteService: "Hot Towel Shave", status: "active" },
  { id: "c4", name: "Sarah Johnson", phone: "+1 (555) 456-7890", email: "sarah.j@email.com", totalBookings: 3, lastVisit: "2026-05-31", totalSpent: 74, favoriteService: "Kids Cut", status: "new" },
  { id: "c5", name: "Mike Brown", phone: "+1 (555) 567-8901", email: "mike.b@email.com", totalBookings: 22, lastVisit: "2026-06-01", totalSpent: 660, favoriteService: "Haircut", status: "active" },
  { id: "c6", name: "Alex Rivera", phone: "+1 (555) 678-9012", email: "alex.r@email.com", totalBookings: 6, lastVisit: "2026-06-01", totalSpent: 120, favoriteService: "Beard Trim", status: "active" },
  { id: "c7", name: "Tom Anderson", phone: "+1 (555) 789-0123", email: "tom.a@email.com", totalBookings: 18, lastVisit: "2026-06-02", totalSpent: 720, favoriteService: "Hair Design", status: "active" },
  { id: "c8", name: "Chris Lee", phone: "+1 (555) 890-1234", email: "chris.l@email.com", totalBookings: 2, lastVisit: "2026-05-15", totalSpent: 90, favoriteService: "Fade + Beard", status: "inactive" },
  { id: "c9", name: "Priya Patel", phone: "+1 (555) 901-2345", email: "priya.p@email.com", totalBookings: 9, lastVisit: "2026-05-28", totalSpent: 450, favoriteService: "Hot Towel Shave", status: "active" },
  { id: "c10", name: "Kevin Nguyen", phone: "+1 (555) 012-9876", email: "kevin.n@email.com", totalBookings: 1, lastVisit: "2026-05-20", totalSpent: 30, favoriteService: "Haircut", status: "new" },
  { id: "c11", name: "Lisa Thompson", phone: "+1 (555) 123-4567", email: "lisa.t@email.com", totalBookings: 14, lastVisit: "2026-05-25", totalSpent: 580, favoriteService: "Fade + Beard", status: "active" },
  { id: "c12", name: "Robert Kim", phone: "+1 (555) 234-5678", email: "robert.k@email.com", totalBookings: 0, lastVisit: "", totalSpent: 0, favoriteService: "—", status: "inactive" },
];
