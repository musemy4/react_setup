// React
import React from 'react';
// External Lib
import _ from 'lodash';
// Interfaces
import { ISetup } from './setup_interface';

interface IProps {
    propsSetupInfo: Array<ISetup>;
    addData: (data: Array<ISetup>, type: string) => void;
}

interface IState {
    stateSetupInfo: Array<ISetup>;
}

export class FrontSetup extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = { stateSetupInfo: props.propsSetupInfo };
        props.addData(props.propsSetupInfo, 'SETUP');
    }

    onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const { stateSetupInfo } = this.state;

        const newStateSetupInfo = stateSetupInfo.map((setupGroup: ISetup) => {
            const findChildren = _.find(setupGroup.children, { config_code: id } );
            if (findChildren) {
                const copySetupGroup = { ...setupGroup };
                copySetupGroup.children = setupGroup.children.map((setupChildren: ISetup) => {
                    const findSetupInfo = setupChildren.config_code === id;
                    if (findSetupInfo) {
                        const copySetupInfo = { ...setupChildren };
                        return {
                            config_code: copySetupInfo.config_code,
                            config_group: copySetupInfo.config_group,
                            config_name: copySetupInfo.config_name,
                            data_type: copySetupInfo.data_type,
                            order_load: copySetupInfo.order_load,
                            setup_data: value,
                            children:copySetupInfo.children
                        }
                    }
                    return setupChildren;
                })
                return copySetupGroup;
            }
            return setupGroup;
        });
        this.setState({ stateSetupInfo: newStateSetupInfo });
        const { addData } = this.props;
        addData(newStateSetupInfo, 'SETUP');
    }

    onRadioChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const { stateSetupInfo } = this.state;
        
        const newStateSetupInfo = stateSetupInfo.map((setupGroup: ISetup) => {
            const findRoot = setupGroup.config_code === id;
            if (findRoot) {
                const copyRootSetupInfo = { ...setupGroup };
                return {
                    config_code: copyRootSetupInfo.config_code,
                    config_group: copyRootSetupInfo.config_group,
                    config_name: copyRootSetupInfo.config_name,
                    data_type: copyRootSetupInfo.data_type,
                    order_load: copyRootSetupInfo.order_load,
                    setup_data: value,
                    children:copyRootSetupInfo.children
                }
            }
            return setupGroup;
        });
        this.setState({ stateSetupInfo: newStateSetupInfo });
        const { addData } = this.props;
        addData(newStateSetupInfo, 'SETUP');
    }

    render() {
        const { stateSetupInfo } = this.state;
        return (
            <div className="front-setting-content">
                <ul className="subgroup_setup mt10">
                    {
                        stateSetupInfo.map((setupInfo: ISetup) => {
                            return (
                                <li key={ setupInfo.config_code }>
                                    <h3>{ setupInfo.config_name }</h3>
                                    { 
                                        setupInfo.data_type === 'string' && setupInfo.children.length > 0
                                            ? setupInfo.children.map((setupChildren: ISetup) => {
                                                return (
                                                    <div key={ setupChildren.config_code }>
                                                        <p>- {setupChildren.config_name}</p>
                                                        <input onChange={ this.onInputChange } className="input_t1 w_full" id={ setupChildren.config_code } value={ setupChildren.setup_data } />
                                                    </div>
                                                )
                                            })
                                            : <div className="radio_area">
                                                <span className="radio_wrap">
                                                    <label htmlFor={ setupInfo.config_code }>
                                                        <input className="ml-5 mr-3" onChange={ this.onRadioChangeHandler } value="true" type="radio" name={ setupInfo.config_code } id={ setupInfo.config_code } checked={ setupInfo.setup_data === 'true' } />
                                                        사용
                                                    </label>
                                                </span>
                                                <span className="radio_wrap">
                                                    <label htmlFor={ setupInfo.config_code }>
                                                        <input className="ml-5 mr-3" onChange={ this.onRadioChangeHandler } value="false" type="radio" name={ setupInfo.config_code } id={ setupInfo.config_code } checked={ setupInfo.setup_data === 'false' } />
                                                        미사용
                                                    </label>
                                                </span>
                                            </div>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}