// Legacy route compatibility layer
// Maps old routes from oldsrc/App.jsx to new spec routes
import { Navigate } from 'react-router-dom';

// Re-export screens from oldsrc for legacy routes that don't have new implementations yet
// These components are imported directly from oldsrc to maintain compatibility

export const legacyRoutes = [
  // Legacy routes that redirect to new routes
  { path: '/room', element: <Navigate to="/events/join" replace /> },
  { path: '/read_qr', element: <Navigate to="/qr/scan" replace /> },
  { path: '/make_qr', element: <Navigate to="/qr/profile" replace /> },
  { path: '/my_profile', element: <Navigate to="/me/profile" replace /> },
  { path: '/edit_profile', element: <Navigate to="/me/profile/edit" replace /> },
  { path: '/profile_history', element: <Navigate to="/me/friendships/received" replace /> },
  
  // These legacy routes need state management migration - keep as placeholders
  // They depend on location.state which is not compatible with direct linking
  // TODO: Implement proper URL-based state for these routes
  // { path: '/question', element: <Navigate to="/events/:eventId/quiz/:questionNo" replace /> },
  // { path: '/answer', element: <Navigate to="/events/:eventId/quiz/:questionNo/answer" replace /> },
  // { path: '/result', element: <Navigate to="/events/:eventId/result" replace /> },
  
  // Legacy routes that are kept for backward compatibility but not actively used
  // { path: '/make_question', element: ... },
  // { path: '/make_false_selection', element: ... },
  // { path: '/profile', element: ... },
];
