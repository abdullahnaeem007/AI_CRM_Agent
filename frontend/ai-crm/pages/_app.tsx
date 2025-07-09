import '../styles/globals.css';
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className="bg-crm-bg1 min-h-screen">
      <Component {...pageProps} />
    </div>
  );
}
