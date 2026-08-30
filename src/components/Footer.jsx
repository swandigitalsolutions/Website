export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src="/swan-logo.png" alt="Swan Digital Solutions" className="h-7 w-auto" />
          <span className="font-display text-sm font-medium">
            SWAN <span className="text-red">DIGITAL</span> SOLUTIONS
          </span>
        </div>
        <p className="text-xs text-mist text-center">
          &copy; {new Date().getFullYear()} Swan Digital Solutions. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-xs text-mist">
          <a href="mailto:swandigitalsolutions@gmail.com" className="hover:text-white transition-colors">
            swandigitalsolutions@gmail.com
          </a>
          <a href="tel:+918310579306" className="hover:text-white transition-colors">
            +91 83105 79306
          </a>
        </div>
      </div>
    </footer>
  )
}
