// THIS CODE AND INFORMATION IS PROVIDED AS IS WITHOUT WARRANTY OF
// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
// PARTICULAR PURPOSE.
//
// Copyright (c) Microsoft. All rights reserved
//

import * as React from 'react';
import { observer } from 'mobx-react';
import { Dropdown, Icon, IconButton } from '@fluentui/react';
import Header from '../header';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { observable } from 'mobx';
import { UploadButton } from '../uploadbutton';
import { UploadFile } from '../../data/uploadfile';
import { format, formatMB, Random, UUID } from '../../helpers/utils';
import moment from 'moment';
import adalContext from '../../helpers/adalConfig';

@observer
class DataUpload2 extends React.Component<RouteComponentProps> {
  @observable isOver = false;
  @observable private files: UploadFile[] = [
    {id:'1', name:'Data upload file', items:213432, size:1239800123, state:'0', uploadDate: new Date('3/5/2021'), user:'ptallett@microsoft.com'},
    {id:'1', name:'Data file name 14575', items:6987, size:1239800, state:'1', uploadDate: new Date('6/22/2021'), user:'ptallett@microsoft.com'},
    {id:'1', name:'Data file name 14575', items:0, size:0, state:'2', uploadDate: new Date('3/5/2021'), user:'ptallett@microsoft.com'},
    {id:'1', name:'File name', items:213432, size:12, state:'1', uploadDate: new Date('3/5/2021'), user:'ptallett@microsoft.com'},
    {id:'1', name:'New parts to upload for MT - SAP Catalog', items:213432, size:1239800123, state:'1', uploadDate: new Date('3/5/2012'), user:'ptallett@microsoft.com'}
  ];
  
  componentDidMount() {
    const files = window.localStorage.getItem('uploads');
    if (files) {
      this.files = JSON.parse(files);
    }
  }
  
  private backClick(): void {
    if (this.props.history.length > 1) {
      this.props.history.goBack();
    } else {
      this.props.history.push('/home/dashboard');
    }
  }

  private dragOver(e: React.DragEvent<HTMLDivElement>) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    this.isOver = true;
  }

  private dragLeave() {
    this.isOver = false;
  }

  private async drop(e: React.DragEvent<HTMLDivElement>) {
    this.filesUploaded(e.dataTransfer.files);
    e.stopPropagation();
    e.preventDefault();
    this.isOver = false;
  }

  private async filesUploaded(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const f = new UploadFile();
      f.id = UUID();
      f.name = file.name;
      f.size = file.size;
      f.items = Math.floor(f.size / 43);
      f.uploadDate = new Date();
      f.user = adalContext.getUsername() || 'ptallett@microsoft.com';
      f.state = String(Math.floor(Random(3)));
      if (f.state === '2') {
        f.size = 0;
        f.items = 0;
      }

      this.files.unshift(f);
    }

    this.save();
  }

  private save() {
    window.localStorage.setItem('uploads', JSON.stringify(this.files));
  }

  private removeClick(index: number): void {
    this.files.splice(index, 1);
    this.save();
  }

  getSync(state: string) {
    if (state === '1') {
      return <div className='br8 w16 h16 bggreen df aic jcc'>
        <Icon className='fs10 fgwhite bold' iconName='Accept' />
      </div>
    } else if (state === '2') {
      return <div className='br8 w16 h16 bgyellow df aic jcc'>
        <span className='fs12 fgwhite bold' >!</span>
      </div>
    } else {
      return <span className='fs24 fgblack'>...</span>
    }
  }

  public render() {
    const sortOptions = [{ key: '1', text: 'newest upload' }];

    return (
      <div className='w100pc h100pc df fdc bgf5'>
        <Header href={window.location.href} hidePivot appTitle='Data Upload Appplication' />
        <div className='h1 bgde w100pc' />
        <div className='df aic'>
          <div className='fgblack fs15 fw600 tdn df mt30 mb10 aic cpointer ml150 w100' onClick={() => this.backClick()}>
            <Icon className='fgblack fs20 mt2 mr7' iconName='SkypeArrow' />BACK
          </div>
          <span className='mt20 fs22 bold fgblack'>Material Traceability</span>
        </div>
        <span className='fs12 fggrey ml250'>SAP</span>
        <div className='df fdc'>
          <div className='ml250 mt20 mr50 mb30 w100-200 df fdc'
            onDragOver={(e) => this.dragOver(e)} onDragLeave={() => this.dragLeave()} onDrop={(e) => this.drop(e)}>
            <div className='df aic w100-100'>
              {!this.isOver ?
                <div className='h210 bgwhite mt5 df fdc jcc aic bdash w100-100' role='region' aria-label='file uploader'>
                  <Icon className='fs60 fgblack' iconName='CloudUpload' role='img' />
                  <div className='fgblack fs20 bold mt10 lh18'>Drag and drop your CSV files here</div>
                  <div className='fggrey fs12 lh18 mt10'>or</div>
                  <UploadButton className='fs14 mt10 fgwhite' text='BROWSE FOR FILES' iconName='' buttonType='Primary'
                    acceptFileTypes='*' multiple onChangeFileList={(files) => this.filesUploaded(files)} />
                  <div className='fggrey fs12 lh18 mt10'>Max 12MB per file</div>
                </div>
                :
                <div className='h210 bgf7 mt5 df fdc jcc aic byellow w100-100'>
                  <Icon className='fs60 fgblack noevents' iconName='CloudUpload' role='img' />
                  <div className='fgblack fs20 lh18 mt10 noevents bold'>Drop files here</div>
                  <div className='h90' />
                </div>}
            </div>
          </div>
        </div>
        <div className='ml250 df fdc flex1'>
          <div className='df w100-150 mb20'>
            <div className='bold fs14 mt7'>Data upload history</div>
            <div className='flex1' />
            <div className='fs14 fggrey mt7 mr5'>Sort By:</div>
            <Dropdown className='bctransparent bgtransparent' options={sortOptions} selectedKey='1' />
          </div>
          <div className='df w100-150 mb5'>
            <span className='fs14 fggrey ml10 mr5 flex3 minw100'>Filename</span>
            <span className='fs14 fggrey mr5 flex1'>Synced</span>
            <span className='fs14 fggrey mr5 flex1'>Items</span>
            <span className='fs14 fggrey mr5 flex1'>Size</span>
            <span className='fs14 fggrey mr5 flex2'>Upload Date</span>
            <span className='fs14 fggrey mr5 flex2'>User</span>
          </div>
          <div className='flex1 oa mb20'>
            <div className='df fdc'>
              {this.files.map((f, index) => <div key={index} className='df w100-150 bgwhite fgblack h50 mb5 aic'>
                <span className='fs14 bold ml10 mr5 flex3 minw100'>{f.name}</span>
                <span className='fs14 mr5 flex1'>{this.getSync(f.state)}</span>
                <span className='fs14 mr5 flex1'>{f.items ? format(f.items) : '-'}</span>
                <span className='fs14 mr5 flex1'>{f.size ? formatMB(f.size) : '-'}</span>
                <span className='fs14 mr5 flex2'>{moment(f.uploadDate).fromNow()}</span>
                <span className='fs14 mr5 flex2'>{f.user}</span>
                <IconButton className='fgblack' iconProps={{ iconName: 'Cancel' }} onClick={() => this.removeClick(index)}/>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(DataUpload2);
