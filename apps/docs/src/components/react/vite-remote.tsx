import { Suspense, lazy } from "react";
const ViteApp = lazy(() => import("viteRemote/App"));

export default function ViteRemoteComponent() {
  const url = import.meta.env.PUBLIC_VITE_REMOTE_URL;
  console.log(url);
  return (
    <Suspense fallback="Loading">
      {url}
      <ViteApp />
    </Suspense>
  );
}
