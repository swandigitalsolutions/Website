/**
 * Two self-contained "website screenshots" rendered as real DOM/CSS —
 * no images, so they stay razor-sharp at any size and cost nothing to
 * load. `variant="before"` is a cluttered early-2010s template;
 * `variant="after"` is a clean modern rebuild. Both fill their parent
 * (position:absolute inset-0) so the compare slider lines them up.
 *
 * Sizing uses container query units (cqw) so type scales with the frame.
 */
export default function SiteMock({ variant }) {
  return variant === 'before' ? <Before /> : <After />
}

const wrapStyle = {
  containerType: 'size',
  position: 'absolute',
  inset: 0,
  overflow: 'hidden',
}

function Before() {
  return (
    <div style={{ ...wrapStyle, background: '#eceae3', fontFamily: 'Georgia, "Times New Roman", serif', color: '#222' }}>
      {/* header */}
      <div style={{ height: '13cqh', background: 'linear-gradient(#2a7d8c, #1c5b74)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 3cqw', borderBottom: '2px solid #0d3547' }}>
        <span style={{ color: '#ffd83b', fontWeight: 'bold', fontSize: '3.4cqw', textShadow: '1px 1px 0 #063' }}>◈ NORTHWIND HOTELS</span>
        <span style={{ color: '#dbeff5', fontSize: '2cqw' }}>Home&nbsp;|&nbsp;Rooms&nbsp;|&nbsp;About&nbsp;Us&nbsp;|&nbsp;Contact</span>
      </div>
      {/* banner */}
      <div style={{ height: '20cqh', background: 'repeating-linear-gradient(45deg,#3b3b3b,#3b3b3b 8px,#333 8px,#333 16px)', border: '2px inset #999', margin: '2cqh 3cqw', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#ffe14d', fontSize: '3.8cqw', fontWeight: 'bold' }}>Welcome to Our Website!</span>
        <span style={{ color: '#8fd', fontSize: '2.2cqw', fontStyle: 'italic' }}>Book your stay today!!!</span>
      </div>
      {/* body: sidebar + content */}
      <div style={{ display: 'flex', gap: '2cqw', padding: '0 3cqw' }}>
        <div style={{ width: '26%', background: '#dcd9cd', border: '1px solid #b3ae9c', padding: '1.6cqh 1.4cqw' }}>
          <div style={{ fontWeight: 'bold', fontSize: '2cqw', borderBottom: '1px solid #999', marginBottom: '1cqh' }}>Navigation</div>
          {['» Home', '» Our Rooms', '» Facilities', '» Tariff / Rates', '» Photo Gallery', '» Reach Us'].map((t) => (
            <div key={t} style={{ color: '#0000ee', textDecoration: 'underline', fontSize: '1.9cqw', lineHeight: 1.9 }}>{t}</div>
          ))}
          <div style={{ marginTop: '1.5cqh', border: '1px solid #b3ae9c', background: '#000', color: '#0f0', fontFamily: 'monospace', fontSize: '1.7cqw', textAlign: 'center', padding: '0.6cqh 0' }}>
            Visitors: 0042571
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '2.6cqw', fontWeight: 'bold', color: '#1c5b74', marginBottom: '0.8cqh' }}>About Northwind Hotels</div>
          {[92, 98, 88, 72].map((w, i) => (
            <div key={i} style={{ height: '1.5cqh', width: w + '%', background: '#c9c5b6', margin: '0.7cqh 0' }} />
          ))}
          <div style={{ display: 'flex', gap: '1.5cqw', marginTop: '1.5cqh' }}>
            <div style={{ width: '38%', height: '9cqh', background: 'linear-gradient(#f9c, #c69)', border: '2px ridge #d8a' }} />
            <div style={{ flex: 1 }}>
              {[80, 95, 70].map((w, i) => (
                <div key={i} style={{ height: '1.4cqh', width: w + '%', background: '#c9c5b6', margin: '0.6cqh 0' }} />
              ))}
              <div style={{ marginTop: '1cqh', display: 'inline-block', padding: '0.7cqh 1.6cqw', fontSize: '1.9cqw', background: 'linear-gradient(#fefefe,#cfcfcf)', border: '2px outset #eee' }}>
                Submit Enquiry
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: '#1c5b74', color: '#bcd', fontSize: '1.6cqw', textAlign: 'center', padding: '1cqh 0' }}>
        © 2012 Northwind Hotels. All Rights Reserved. &nbsp; Best viewed in 1024×768 with IE6+
      </div>
    </div>
  )
}

function After() {
  return (
    <div style={{ ...wrapStyle, background: 'linear-gradient(180deg,#0b1120,#0e1a2b)', fontFamily: 'ui-sans-serif, system-ui, "Inter", sans-serif', color: '#e8eef7' }}>
      {/* nav */}
      <div style={{ height: '11cqh', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 5cqw' }}>
        <span style={{ fontWeight: 700, fontSize: '2.6cqw', letterSpacing: '-0.02em' }}>Northwind</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '2.4cqw', fontSize: '1.8cqw', color: '#9fb0c9' }}>
          <span>Rooms</span><span>Dining</span><span>Journal</span>
          <span style={{ padding: '1cqh 2.2cqw', borderRadius: '999px', background: '#e9202a', color: '#fff', fontWeight: 600 }}>Book now</span>
        </span>
      </div>
      {/* hero */}
      <div style={{ display: 'flex', gap: '4cqw', padding: '4cqh 5cqw 0', alignItems: 'center' }}>
        <div style={{ flex: 1.1 }}>
          <div style={{ fontSize: '6.4cqw', fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
            Stay by the&nbsp;lake.
          </div>
          <div style={{ fontSize: '2.1cqw', color: '#9fb0c9', marginTop: '2cqh', maxWidth: '90%', lineHeight: 1.5 }}>
            Sixteen rooms, a wood-fired kitchen and nothing but water to the horizon.
          </div>
          <div style={{ display: 'flex', gap: '1.6cqw', marginTop: '3cqh' }}>
            <div style={{ padding: '1.5cqh 3cqw', borderRadius: '999px', background: '#e9202a', color: '#fff', fontWeight: 600, fontSize: '1.9cqw' }}>Check availability</div>
            <div style={{ padding: '1.5cqh 3cqw', borderRadius: '999px', border: '1px solid #2b3a52', color: '#cdd8e8', fontSize: '1.9cqw' }}>View rooms</div>
          </div>
        </div>
        <div style={{ flex: 1, height: '46cqh', borderRadius: '4cqw', background: 'linear-gradient(140deg,#1e3a8a,#0ea5b7 60%,#f59e0b)', boxShadow: '0 20px 50px -20px rgba(14,165,183,0.5)' }} />
      </div>
      {/* feature row */}
      <div style={{ display: 'flex', gap: '2cqw', padding: '4cqh 5cqw' }}>
        {['Lakefront suites', 'Farm kitchen', 'Free cancellation'].map((t) => (
          <div key={t} style={{ flex: 1, border: '1px solid #1c2b45', borderRadius: '2.4cqw', padding: '2.2cqh 2cqw', background: 'rgba(255,255,255,0.02)' }}>
            <div style={{ width: '4.5cqw', height: '4.5cqw', borderRadius: '1.4cqw', background: 'rgba(233,32,42,0.15)', border: '1px solid rgba(233,32,42,0.4)' }} />
            <div style={{ fontSize: '1.9cqw', fontWeight: 600, marginTop: '1.4cqh' }}>{t}</div>
            <div style={{ height: '1.2cqh', width: '80%', background: '#1c2b45', marginTop: '1cqh', borderRadius: '4px' }} />
          </div>
        ))}
      </div>
    </div>
  )
}
