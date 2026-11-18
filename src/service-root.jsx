// Root component for /services/<slug>/ pages. Used by the browser entry
// (service-main.jsx) and the build-time pre-renderer (entry-server.jsx), so the
// pre-rendered HTML and the hydrated page always match. Kept separate from the
// home page entry so the home page does not download service-page code.
import ServicePage from './components/ServicePage'
import { serviceBySlug } from './data/services'

export default function ServiceRoot({ slug }) {
  const service = serviceBySlug(slug)
  if (!service) throw new Error(`Unknown or unpublished service: ${slug}`)
  return <ServicePage service={service} />
}
