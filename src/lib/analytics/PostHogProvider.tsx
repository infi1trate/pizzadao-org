import { useEffect, type ReactNode } from "react";
import { useLocation } from "react-router-dom";
import {
  captureAttribution,
  initPostHog,
  trackPageView,
} from "./posthog";

/**
 * Mounts PostHog and tracks SPA route changes as $pageview events.
 * Must live INSIDE <BrowserRouter> because it uses useLocation().
 */
const PostHogProvider = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  // Init once on mount.
  useEffect(() => {
    initPostHog();
    captureAttribution();
  }, []);

  // Capture pageview on every route change.
  useEffect(() => {
    trackPageView(location.pathname, location.search);
  }, [location.pathname, location.search]);

  return <>{children}</>;
};

export default PostHogProvider;
