/* eslint-disable react/button-has-type */
import React, { useState } from 'react';
import {
  AppBar,
  AppBarSection,
  AppBarSpacer,
  Avatar
} from '@progress/kendo-react-layout';
import { useLocation } from 'react-router-dom'
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators';

export default function NavBar() {
  const location = window.location.pathname
  var mySubString = location.substring(
    location.indexOf("/") + 1, 
    location.lastIndexOf("/")  
  );
  console.log(location, mySubString)
  return (
    <>
      <AppBar className="fixed-header">
        <AppBarSpacer
          style={{
            width: 4
          }}
        />
        <AppBarSection>
          <h1 className="title">
            <a href="/">Kendo Apollo SpaceX</a>
          </h1>
        </AppBarSection>
        <AppBarSpacer />
        <AppBarSection>
          <ul>
            <li>
              <span>
                <a href="/launches" style={{borderBottomStyle: (mySubString ==="launches" || location === '/launches') ? "solid": "none"}}>Launches</a>
              </span>
            </li>
            <li>
              <span>
                <a href="/rockets" style={{borderBottomStyle: (mySubString ==="rockets" || location === '/rockets') ? "solid": "none"}}>Rockets</a>
              </span>
            </li>
            <li>
              <span>
                <a href="/users" style={{borderBottomStyle: (mySubString ==="users" || location === '/users') ? "solid": "none"}}>Users</a>
              </span>
            </li>
          </ul>
        </AppBarSection>
      </AppBar>
      <style>{`
          body {
              background: #dfdfdf;
          }
          .title {
              font-size: 18px;
              margin: 0;
          }
          ul {
              font-size: 14px;
              list-style-type: none;
              padding: 0;
              margin: 0;
              display: flex;
          }
          li {
              margin: 0 10px;
          }
          li:hover {
              cursor: pointer;
              color: #84cef1;
          }
          .k-button {
              padding: 0;
          }
          .k-badge-container {
              margin-right: 8px;
          }
      `}</style>
    </>
  );
}
