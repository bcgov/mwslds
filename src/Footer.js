import React from 'react'

import backToTop from 'Gov-2.0-Bootstrap-Skeleton/dist/images/back-to-top.png'

import './bcgov_bootstrap'

const genericLinks = [
  {
    name: 'Home',
    href: '#',
  },
  {
    name: 'About',
    href: '#',
  },
  {
    name: 'Disclaimer',
    href: 'https://www2.gov.bc.ca/gov/content/home/disclaimer',
  },
  {
    name: 'Privacy',
    href: 'https://www2.gov.bc.ca/gov/content/home/privacy',
  },
  {
    name: 'Accessibility',
    href: 'https://www2.gov.bc.ca/gov/content/home/accessibility',
  },
  {
    name: 'Copyright',
    href: 'https://www2.gov.bc.ca/gov/content/home/copyright',
  },
  {
    name: 'Contact Us',
    href: 'https://www2.gov.bc.ca/gov/content/home/contact-us',
  },
]

export default function Footer(props) {
  const { items } = props

  const allItems = genericLinks.concat(items || [])

  const itemElements = allItems.map(link => (
    <li key={link.name}><a className="nav-item nav-link" href={link.href}>{link.name}</a></li>
  ))

  return (
    <div id="footer">
      <img className="back-to-top footer-overlap" src={backToTop} alt="Back to top" />
      <div id="footerWrapper">
        <div id="footerAdminSection">
          <div id="footerAdminLinksContainer" className="container">
            <div id="footerAdminLinks" className="row">
              <ul className="inline">
                {itemElements}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
