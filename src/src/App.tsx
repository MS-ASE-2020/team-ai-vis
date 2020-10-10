import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ToolPane } from './components/ToolPane';
import { Preview } from './components/Preview';

interface AppProps{

}

export class App extends React.Component<AppProps>{
    public render(): React.ReactNode{
        return (
            <div className="main">
                <div className="banner">AI-VIS</div>
                <div className="content">
                    <div className="left-pane"><ToolPane /></div>
                    <div className="workspace-pane"><Preview /></div>
                    <div className="right-pane">RIGHT PANEL</div>
                </div>
            </div>
        );
    }
}

export default App;
