// Root component for /privacy-policy/ and /terms-and-conditions/. Shared by the
// browser entry (legal-main.jsx) and the build-time pre-renderer
// (entry-server.jsx), so the pre-rendered HTML and the hydrated page match.
import LegalPage from './components/LegalPage'
import { legalBySlug } from './data/legal'

export default function LegalRoot({ slug }) {
  const page = legalBySlug(slug)
  if (!page) throw new Error(`Unknown legal page: ${slug}`)
  return <LegalPage page={page} />
}
