import React from 'react';
import './ToolPane.css';

interface ToolPaneProps{

}

export class ToolPane extends React.Component<ToolPaneProps>{
    public render(): React.ReactNode{
        return (
            <div>
                <div>TOOL PANEL</div>
                <button>Click to start</button>
            </div>
        );
    }
}