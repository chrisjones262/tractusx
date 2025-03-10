// THIS CODE AND INFORMATION IS PROVIDED AS IS WITHOUT WARRANTY OF
// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
// PARTICULAR PURPOSE.
//
// Copyright (c) Microsoft. All rights reserved
//

import * as React from 'react';
import { observer } from 'mobx-react';
import { AppState } from '../stores/appstate';
import { Icon, PrimaryButton } from '@fluentui/react';
import { Application } from '../data/application';
import Ratings from './ratings';
import { RouteComponentProps } from 'react-router';
import AppCard from './appcard';
import { format } from '../helpers/utils';

@observer
export default class AppDetail extends React.Component<RouteComponentProps> {

  private getApp() {
    let app = AppState.state.apps[0];
    const href = window.location.href;
    const path = href.substr(href.lastIndexOf('/') + 1);
    const apps = AppState.state.apps.filter((a) => a.id === path);
    if (apps.length === 1) {
      app = apps[0];
    }
    return app;
  }

  private renderDownloads(app: Application) {
    return <div className='df'>
      <span className='fs14 fggrey bold'>{format(app.downloads)}</span>
      <Icon className='fggrey fs20 ml5' iconName='Contact' />
    </div>
  }

  private backClick(): void {
    if (this.props.history.length > 1) {
      this.props.history.goBack();
    } else {
      this.props.history.push('/home/dashboard');
    }
  }

  private openClick(): void {
    const app = this.getApp();
    if (app.url) {
      if (app.url.substr(0, 1) !== '/') {
        window.open(app.url, '_blank');
      } else {
        this.props.history.push(app.url);
      }
    }
  }

  private mouseEnter(s: string) {
    //
  }

  public render() {
    const app = this.getApp();
    
    return (
      <div className='w100pc h100pc df fdc'>
        <div className='fgblack fs15 fw600 tdn ml5 df ml70 mt20 aic cpointer' onClick={() => this.backClick()}>
          <Icon className='fgblack fs20 mt2 mr7' iconName='SkypeArrow' />
          BACK
        </div>
        <div className='df h100pc'>
          <div className='ml50 mr20 mt20 w100-20 bgwhite df fdc oa'>
            <div className='df mr50 ml50 mt50'>
              <span className='fs14 fggrey'>Catena-X</span>
              <div className='flex1' />
              <Ratings app={app} />
            </div>
            <div className='df mr50 ml50 aic'>
              <span className='fs30 fgblack bold'>{app.title}</span>
              <div className='flex1' />
              {this.renderDownloads(app)}
            </div>
            <div className='df mr50 ml50 mt20'>
              <div className='flex1'>
                {app.tags.map((t, index) => <div key={index} className='dib bggrey br15 h30 px10 lh30 fgwhite mr5 mb5 fs14'>{t}</div>)}
              </div>
              <PrimaryButton className='w170 h50 br5 fs14 ml100' text='OPEN' onClick={() => this.openClick()} />
            </div>
            <div className='ml50 w100-100 mt20 df bglightgrey'>
              <div className='df oa'>
                {app.screenshots.map((s, index) => <img key={index} className='mr10 card mt5 ml5 mr5 mb5' src={s} alt='screenshot' width={260}
                  onMouseEnter={() => this.mouseEnter(s)} />)}
              </div>
            </div>
            <div className='mt20 ml50 w100-100'>
              <span className='fs14' dangerouslySetInnerHTML={{ __html: app.description }} />
            </div>
            <span className='fggreen fs16 ml50 fw600 mt20'>SHOW MORE INFORMATION</span>
            <div className='ml50 w100-100 bggrey h1 mt20'></div>
            <div className='df'>
              <span className='fgblack fs16 ml50 bold mt20'>Ratings</span>
              <div className='flex1' />
              <span className='fggreen fs16 ml50 fw600 mt20 mr50'>WRITE A REVIEW</span>
            </div>
            <div className='df ml50 mt10 w100-100 mb20'>
              <Ratings app={app} />
              <div className='flex1' />
              {this.renderDownloads(app)}
            </div>
          </div>
          <div className='mt20 mr50 h100-100 df fdc'>
            <span className='bold fs14 ml10'>Similar applications</span>
            {AppState.state.apps.map((a, index) => <AppCard key={index} app={a} wide/>)}
            <span className='bold fs14 ml10 mt20'>More apps by {app.companyName}</span>
            {AppState.state.apps.filter((ap) => ap.companyName === app.companyName).map((a, index) => <AppCard key={index} app={a} wide />)}
          </div>
        </div>
      </div>
    );
  }
}
