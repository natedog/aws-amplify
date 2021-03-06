/*
 * Copyright 2017-2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

import React, { Component } from 'react';
import { Auth, I18n, Logger } from 'aws-amplify';

import AuthPiece from './AuthPiece';
import AmplifyTheme from '../AmplifyTheme';
import { Header, Footer, InputRow, ButtonRow, Link } from '../AmplifyUI';

const logger = new Logger('ConfirmSignIn');

export default class ConfirmSignIn extends AuthPiece {
    constructor(props) {
        super(props);

        this.confirm = this.confirm.bind(this);
    }

    confirm() {
        const user = this.props.authData;
        const { code } = this.inputs;
        Auth.confirmSignIn(user, code)
            .then(() => this.changeState('signedIn'))
            .catch(err => this.error(err));
    }

    render() {
        const { authState, hide } = this.props;
        if (authState !== 'confirmSignIn') { return null; }

        const theme = this.props.theme || AmplifyTheme;

        if (hide && hide.includes(ConfirmSignIn)) { return null; }

        return (
            <div className="amplify-form-section" style={theme.formSection}>
                <Header theme={theme}>{I18n.get('Confirm Code')}</Header>
                <div className="amplify-form-body" style={theme.sectionBody}>
                    <InputRow
                        autoFocus
                        placeholder={I18n.get('Code')}
                        theme={theme}
                        key="code"
                        name="code"
                        onChange={this.handleInputChange}
                    />
                    <ButtonRow theme={theme} onClick={this.confirm}>
                        {I18n.get('Confirm')}
                    </ButtonRow>
                </div>
                <Footer theme={theme}>
                    <Link theme={theme} onClick={() => this.changeState('signIn')}>
                        {I18n.get('Back to Sign In')}
                    </Link>
                </Footer>
            </div>
        )
    }
}
