// THIS CODE AND INFORMATION IS PROVIDED AS IS WITHOUT WARRANTY OF
// ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING BUT NOT LIMITED TO
// THE IMPLIED WARRANTIES OF MERCHANTABILITY AND/OR FITNESS FOR A
// PARTICULAR PURPOSE.
//
// Copyright (c) Microsoft. All rights reserved
//

import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps, withRouter } from 'react-router';
import { Pivot, PivotItem } from '@fluentui/react';
import SetUpConnectors from './setupconnector';

@observer
class ConnectorHeader extends React.Component<RouteComponentProps> {

  public render() {
    return (
      <div className=' top82 pa w100pc h50 df aic bgwhite'>
        <Pivot className='px30 h100pc' aria-label='Header'>
          <PivotItem className='mr20' headerText='Set up Connector'>
            <SetUpConnectors />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}

export default withRouter(ConnectorHeader);