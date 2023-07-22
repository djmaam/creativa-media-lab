import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Social from './Social';

const Footer = props => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="footer-inner">
              <h3 className="footer-title">{data.site.siteMetadata.title}</h3>
              <Social />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
